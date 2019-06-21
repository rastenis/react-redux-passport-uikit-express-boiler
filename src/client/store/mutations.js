export const REQUEST_AUTH = `REQUEST_AUTH`;
export const PROCESSING_AUTH = `PROCESSING_AUTH`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const AUTH_ERROR = `AUTH_ERROR`;
export const SET_STATE = `SET_STATE`;
export const REQUEST_ACCOUNT_CREATION = `REQUEST_ACCOUNT_CREATION`;

export const requestAuth = (email, password) => ({
  type: REQUEST_AUTH,
  email,
  password
});

export const processAuth = (status = AUTHENTICATING, session = null) => ({
  type: PROCESSING_AUTH,
  session,
  authenticated: status
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state
});

export const requestCreateAccount = (email, password) => ({
  type: REQUEST_ACCOUNT_CREATION,
  email,
  password
});
