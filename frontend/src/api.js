const requestHeader = { "X-Requested-With": "XMLHttpRequest" };

async function apiRequest(path, { method = "GET", body } = {}) {
  let response;
  try {
    response = await fetch(path, {
      method,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json", ...requestHeader } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });
  } catch {
    throw new Error("Cannot reach the server. Check that the backend is running and try again.");
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error("The server returned an unexpected response. Please try again.");
  }
  if (!response.ok) {
    const error = new Error(payload.error || "The request could not be completed.");
    error.details = payload.details ?? [];
    error.status = response.status;
    throw error;
  }
  return payload;
}

export const register = (values) =>
  apiRequest("/api/auth/register", { method: "POST", body: values });
export const login = (values) =>
  apiRequest("/api/auth/login", { method: "POST", body: values });
export const getCurrentUser = () => apiRequest("/api/auth/me");
export const logout = () => apiRequest("/api/auth/logout", { method: "POST", body: {} });
