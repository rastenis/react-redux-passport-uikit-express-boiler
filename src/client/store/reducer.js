import { combineReducers } from "redux";
import * as mutations from "./mutations";

let defaultState = {
  session: {},
  users: []
};

export const reducer = combineReducers({
  session(userSession = defaultState.session, action) {
    let { type, authenticated, session } = action;
    switch (type) {
      case mutations.SET_STATE:
        return { ...userSession, id: action.state.session.id };
      case mutations.REQUEST_AUTH:
        return { ...userSession, authenticated: mutations.AUTHENTICATING };
      case mutations.PROCESSING_AUTH:
        return { ...userSession, authenticated };
      default:
        return userSession;
    }
  },

  users: (users = defaultState.users, action) => {
    switch (action.type) {
      case mutations.SET_STATE:
        return action.state.users;
    }
    return users;
  }
});
