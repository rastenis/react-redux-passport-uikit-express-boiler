import { take, put } from "redux-saga/effects";
import axios from "axios";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

import * as mutations from "./mutations";

export function* authenticationSaga() {
  while (true) {
    const { email, password } = yield take(mutations.REQUEST_AUTH);
    try {
      const { data } = yield axios.post(`/auth`, {
        email,
        password
      });
      yield put(mutations.setState(data.state));
      yield put(
        mutations.processAuth(mutations.AUTHENTICATED, {
          id: data.user._id,
          token: data.token
        })
      );
      history.push(`/dashboard`);
    } catch (e) {
      // TODO: set error message
      yield put(mutations.processAuth(mutations.AUTH_ERROR));
    }
  }
}
