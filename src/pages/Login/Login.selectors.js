export const selectLoginState = (state) => ({
    status: state.login.status,
    user: state.login.user,
    error: state.login.error,
    token: state.login.token,
  });