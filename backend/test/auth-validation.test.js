import test from "node:test";
import assert from "node:assert/strict";
import { loginSchema, registrationSchema } from "../src/validation/auth.js";

const validRegistration = {
  name: "Alex Researcher",
  email: " ALEX@example.org ",
  phone: "+1 555 123 4567",
  institution: "Example University",
  department: "Chemical Biology",
  designation: "Research scholar",
  password: "long-secure-password",
  confirmPassword: "long-secure-password",
  termsAccepted: true
};

test("registration validates required details and normalizes email", () => {
  const result = registrationSchema.safeParse(validRegistration);
  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.email, "alex@example.org");
});

test("registration rejects mismatched passwords and missing terms acceptance", () => {
  const result = registrationSchema.safeParse({
    ...validRegistration,
    confirmPassword: "a-different-password",
    termsAccepted: false
  });
  assert.equal(result.success, false);
  if (!result.success) {
    const fields = result.error.issues.map((issue) => issue.path[0]);
    assert.ok(fields.includes("confirmPassword"));
    assert.ok(fields.includes("termsAccepted"));
  }
});

test("registration rejects passwords longer than bcrypt's byte limit", () => {
  const password = "é".repeat(37);
  const result = registrationSchema.safeParse({
    ...validRegistration,
    password,
    confirmPassword: password
  });
  assert.equal(result.success, false);
});

test("login normalizes email and rejects missing credentials", () => {
  const valid = loginSchema.safeParse({ email: " USER@example.org ", password: "a-password" });
  assert.equal(valid.success, true);
  if (valid.success) assert.equal(valid.data.email, "user@example.org");
  assert.equal(loginSchema.safeParse({ email: "not-an-email", password: "" }).success, false);
});
