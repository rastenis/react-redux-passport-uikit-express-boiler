import { take, put } from "redux-saga/effects";
import axios from "axios";
const url = window.location.host;

axios.interceptors.request.use(request => {
  console.log("Starting Request", request);
  return request;
});

import { createBrowserHistory } from "history";
const history = createBrowserHistory();
import * as mutations from "./mutations";

export function* authenticationSaga() {
  while (true) {
    const { email, password } = yield take(mutations.REQUEST_AUTH);
    console.log("requesting auth with", email, password);
    try {
      const { data } = yield axios.post(`http://${url}/api/auth`, {
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
      console.log(e);
      // TODO: set error message
      yield put(mutations.processAuth(mutations.AUTH_ERROR));
    }
  }
}
