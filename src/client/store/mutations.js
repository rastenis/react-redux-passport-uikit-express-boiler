export const REQUEST_AUTH = `REQUEST_AUTH`;
export const PROCESSING_AUTH = `PROCESSING_AUTH`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const AUTH_ERROR = `AUTH_ERROR`;
export const SET_STATE = `SET_STATE`;
export const ADD_MESSAGE = `ADD_MESSAGE`;
export const REMOVE_MESSAGE = `REMOVE_MESSAGE`;
export const REQUEST_ACCOUNT_CREATION = `REQUEST_ACCOUNT_CREATION`;
export const REQUEST_SESSION_FETCH = `REQUEST_SESSION_FETCH`;

export const requestAuth = (email, password) => ({
  type: REQUEST_AUTH,
  email,
  password
});

export const processAuth = (status = AUTHENTICATING) => ({
  type: PROCESSING_AUTH,
  authenticated: status
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
  state
});

export const requestAccountCreation = (email, password) => ({
  type: REQUEST_ACCOUNT_CREATION,
  email,
  password
});
