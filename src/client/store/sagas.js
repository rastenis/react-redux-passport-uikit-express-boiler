import { take, put } from "redux-saga/effects";
import axios from "axios";
import { history } from "./history";
import * as mutations from "./mutations";

const url = window.location.host;

axios.interceptors.request.use(request => {
  console.log("Starting Request", request);
  return request;
});

export function* authenticationSaga() {
  while (true) {
    const { email, password } = yield take(mutations.REQUEST_AUTH);
    try {
      const { data } = yield axios.post(`http://${url}/api/auth`, {
        email,
        password
      });
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuth(mutations.AUTHENTICATED));
      yield put(mutations.addMessage({ msg: data.msg, error: false }));

      history.push(`/`);
    } catch (e) {
      console.log(e.response.data);
      // TODO: set error message
      yield put(mutations.processAuth(mutations.AUTH_ERROR));
      yield put(mutations.addMessage({ msg: e.response.data, error: true }));
    }
  }
}

export function* registrationSaga() {
  while (true) {
    const { email, password } = yield take(mutations.REQUEST_ACCOUNT_CREATION);
    try {
      const { data } = yield axios.post(`http://${url}/api/register`, {
        email,
        password
      });
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuth(mutations.AUTHENTICATED));
      yield put(mutations.addMessage(data.msg));

      history.push(`/`);
    } catch (e) {
      console.log(e);
      // TODO: set error message
      yield put(mutations.processAuth(mutations.AUTH_ERROR));
    }
  }
}

export function* sessionFetchSaga() {
  while (true) {
    yield take(mutations.REQUEST_SESSION_FETCH);
    try {
      const { data } = yield axios.get(`http://${url}/api/ping`);
      yield put(mutations.setState(data.state));
      yield put(
        mutations.processAuth(data.auth ? mutations.AUTHENTICATED : null)
      );

      history.push(`/`);
    } catch (e) {}
  }
}
