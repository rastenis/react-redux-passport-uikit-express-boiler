import { combineReducers } from "redux";
import * as mutations from "./mutations";

let defaultState = {
  data: {},
  auth: mutations.WAITING,
  messages: []
};

export const reducer = combineReducers({
  data(userData = defaultState.data, action) {
    let { type, data } = action;
    switch (type) {
      case mutations.SET_STATE:
        return { ...userData, ...data };
      case mutations.CLEAR_STATE:
        return {};
      default:
        return userData;
    }
  },
  auth(userAuth = defaultState.auth, action) {
    let { type, authenticated } = action;
    switch (type) {
      case mutations.REQUEST_AUTH:
        return mutations.AUTHENTICATING;
      case mutations.PROCESSING_AUTH:
        return authenticated;
      default:
        return userAuth;
    }
  },
  messages(messages = defaultState.messages, action) {
    let { type, msg } = action;
    switch (type) {
      case mutations.ADD_MESSAGE:
        return [...messages, msg];
      case mutations.REMOVE_MESSAGE:
        return messages.filter(m => {
          return m.id != msg.id;
        });
      default:
        return messages;
    }
  }
});
