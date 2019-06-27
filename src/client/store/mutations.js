export const REQUEST_AUTH = `REQUEST_AUTH`;
export const PROCESSING_AUTH = `PROCESSING_AUTH`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const AUTH_ERROR = `AUTH_ERROR`;
export const SET_STATE = `SET_STATE`;
export const CLEAR_STATE = `CLEAR_STATE`;
export const ADD_MESSAGE = `ADD_MESSAGE`;
export const REMOVE_MESSAGE = `REMOVE_MESSAGE`;
export const REQUEST_ACCOUNT_CREATION = `REQUEST_ACCOUNT_CREATION`;
export const REQUEST_SESSION_FETCH = `REQUEST_SESSION_FETCH`;
export const REQUEST_LOGOUT = `REQUEST_LOGOUT`;
export const WAITING = `WAITING`;
export const REQUEST_AUTH_UNLINK = `REQUEST_AUTH_UNLINK`;
export const REQUEST_PASSWORD_CHANGE = `REQUEST_PASSWORD_CHANGE`;

export const requestAuth = (email, password) => ({
  type: REQUEST_AUTH,
  email,
  password
});

export const processAuth = (status = AUTHENTICATING) => ({
  type: PROCESSING_AUTH,
  authenticated: status
});

export const requestLogout = () => ({
  type: REQUEST_LOGOUT
});

export const addMessage = msg => ({
  type: ADD_MESSAGE,
  msg: msg
});

export const removeMessage = msg => ({
  type: REMOVE_MESSAGE,
  msg: msg
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  data: state
});

export const clearState = () => ({
  type: CLEAR_STATE
});

export const requestAccountCreation = (email, password) => ({
  type: REQUEST_ACCOUNT_CREATION,
  email,
  password
});

export const requestPasswordChange = (oldPassword, newPassword) => ({
  type: REQUEST_PASSWORD_CHANGE,
  oldPassword,
  newPassword
});

export const requestAuthUnlink = toUnlink => ({
  type: REQUEST_AUTH_UNLINK,
  toUnlink
});
