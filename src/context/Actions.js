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

export const START_USER_UPDATE = (userCredentials) => ({
  type: "START_USER_UPDATE",
});

export const SUCCESS_USER_UPDATE = (user) => ({
  type: "SUCCESS_USER_UPDATE",
  payload: user,
});

