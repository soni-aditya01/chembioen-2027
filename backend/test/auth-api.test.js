import test, { after, before } from "node:test";
import assert from "node:assert/strict";

process.env.NODE_ENV = "test";
process.env.PORT = "4000";
process.env.FRONTEND_ORIGIN = "http://127.0.0.1:5173";
process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/chembioen_test";
process.env.JWT_SECRET = "test-only-secret-not-used-outside-automated-tests";

const { app } = await import("../src/app.js");
const { User } = await import("../src/models/User.js");
const origin = process.env.FRONTEND_ORIGIN;
const users = new Map();
const originalMethods = {
  create: User.create,
  findOne: User.findOne,
  findById: User.findById
};
let server;
let api;

before(async () => {
  User.create = async (profile) => {
    if ([...users.values()].some((user) => user.email === profile.email)) {
      throw Object.assign(new Error("Duplicate email"), {
        code: 11000,
        keyPattern: { email: 1 }
      });
    }
    const user = new User(profile);
    users.set(user.id, user);
    return user;
  };
  User.findOne = (filter) => ({
    select: async () => [...users.values()].find((user) => user.email === filter.email) ?? null
  });
  User.findById = async (id) => users.get(id) ?? null;
  server = await new Promise((resolve) => {
    const listeningServer = app.listen(0, "127.0.0.1", () => resolve(listeningServer));
  });
  api = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
  User.create = originalMethods.create;
  User.findOne = originalMethods.findOne;
  User.findById = originalMethods.findById;
});

function post(path, body, requestOrigin = origin, cookie) {
  return fetch(`${api}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Origin: requestOrigin,
      ...(cookie ? { Cookie: cookie } : {})
    },
    body: JSON.stringify(body)
  });
}

function sessionCookie(response) {
  return response.headers.get("set-cookie")?.split(";")[0];
}

test("registration, login, protected profile and logout complete via HTTP", async () => {
  const registration = {
    name: "Taylor Chemist",
    email: "taylor@example.org",
    phone: "+1 555 111 2233",
    institution: "Example University",
    department: "Chemical Biology",
    designation: "Research scholar",
    password: "a-long-test-password",
    confirmPassword: "a-long-test-password",
    termsAccepted: true
  };

  const registerResponse = await post("/api/auth/register", registration);
  assert.equal(registerResponse.status, 201);
  const registered = await registerResponse.json();
  assert.equal(registered.user.email, registration.email);
  assert.equal("token" in registered, false);
  assert.equal("passwordHash" in registered.user, false);
  const registrationCookie = sessionCookie(registerResponse);
  assert.ok(registrationCookie);

  const unauthenticatedResponse = await fetch(`${api}/api/auth/me`);
  assert.equal(unauthenticatedResponse.status, 401);
  const profileResponse = await fetch(`${api}/api/auth/me`, {
    headers: { Cookie: registrationCookie }
  });
  assert.equal(profileResponse.status, 200);
  assert.equal((await profileResponse.json()).user.name, registration.name);

  const duplicateResponse = await post("/api/auth/register", registration);
  assert.equal(duplicateResponse.status, 409);
  const invalidLogin = await post("/api/auth/login", {
    email: registration.email,
    password: "incorrect-password"
  });
  assert.equal(invalidLogin.status, 401);

  const loginResponse = await post("/api/auth/login", {
    email: registration.email,
    password: registration.password
  });
  assert.equal(loginResponse.status, 200);
  const loginCookie = sessionCookie(loginResponse);
  assert.ok(loginCookie);
  const loggedInProfile = await fetch(`${api}/api/auth/me`, {
    headers: { Cookie: loginCookie }
  });
  assert.equal(loggedInProfile.status, 200);
  assert.equal((await loggedInProfile.json()).user.email, registration.email);
  const logoutResponse = await post("/api/auth/logout", {}, origin, loginCookie);
  assert.equal(logoutResponse.status, 200);
  assert.match(logoutResponse.headers.get("set-cookie"), /Expires=Thu, 01 Jan 1970/i);
});

test("mutating authentication requests reject an untrusted origin", async () => {
  const response = await post(
    "/api/auth/register",
    { email: "blocked@example.org" },
    "https://untrusted.example"
  );
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, "INVALID_ORIGIN");
});
