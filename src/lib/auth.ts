// Simple authentication utility functions

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};

/**
 * Get the current user
 */
export const getUser = () => {
  const userString = localStorage.getItem("user");
  if (!userString) return null;

  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

/**
 * Log out the current user
 */
export const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");

  // Force a page reload to reset the application state
  window.location.href = "/login";
};
