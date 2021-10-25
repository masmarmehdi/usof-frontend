export const START_LOGIN_SESSION = (userCredentials) => ({
  type: "START_LOGIN_SESSION",
});

export const SUCCESS_LOGIN = (user) => ({
  type: "SUCCESS_LOGIN",
  payload: user,
});

export const LOGOUT = (user) => ({
  type: "LOGOUT",
});
