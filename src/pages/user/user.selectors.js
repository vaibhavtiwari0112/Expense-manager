// Selects the user object from the state
export const selectUser = (state) => state.user?.user || null;

// Selects the authentication token from the state
export const selectUserToken = (state) => state.user?.token || null;

// Selects the verification status of the user from the state
export const selectUserIsVerified = (state) => state.user?.isVerified || false;

// Selects the loading state for user-related actions
export const selectUserLoading = (state) => state.user?.status === "loading";

// Selects any error messages related to user actions from the state
export const selectUserError = (state) => state.user?.error || null;

// Selects the overall status of the user slice
export const selectUserStatus = (state) => state.user?.status || "idle";
