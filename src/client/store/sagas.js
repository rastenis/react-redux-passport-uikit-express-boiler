import { take, put } from "redux-saga/effects";
import axios from "axios";
import { history } from "./history";
import * as mutations from "./mutations";

const url = process.env.NODE_ENV == "production" ? "" : `http://localhost:7777`;

axios.interceptors.request.use(request => {
  console.log("Starting Request", request);
  return request;
});

export function* authenticationSaga(context) {
  while (true) {
    const { email, password } = yield take(mutations.REQUEST_AUTH);
    try {
      const { data } = yield axios.post(`${url}/api/auth`, {
        email,
        password
      });
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuth(mutations.AUTHENTICATED));
      yield put(mutations.addMessage({ msg: data.msg, error: false }));

      yield put({
        type: mutations.REQUEST_SESSION_FETCH
      });

      context.routerHistory.push("/");
    } catch (e) {
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
      const { data } = yield axios.post(`${url}/api/register`, {
        email,
        password
      });
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuth(mutations.AUTHENTICATED));
      yield put(mutations.addMessage({ msg: data.msg, error: false }));

      context.routerHistory.push("/");
    } catch (e) {
      // TODO: set error message
      yield put(mutations.processAuth(mutations.AUTH_ERROR));
      yield put(mutations.addMessage({ msg: e.response.data, error: true }));
    }
  }
}

export function* passwordChangeSaga() {
  while (true) {
    const { newPassword, oldPassword } = yield take(
      mutations.REQUEST_PASSWORD_CHANGE
    );
    try {
      const { data } = yield axios.post(`${url}/api/changePassword`, {
        oldPassword,
        newPassword
      });
      yield put(mutations.addMessage({ msg: data.msg, error: false }));
    } catch (e) {
      yield put(mutations.addMessage({ msg: e.response.data, error: true }));
    }
  }
}
export function* authUnlinkSaga() {
  while (true) {
    const { toUnlink } = yield take(mutations.REQUEST_AUTH_UNLINK);
    try {
      const { data } = yield axios.post(`${url}/api/unlink`, {
        toUnlink
      });
      yield put(mutations.addMessage({ msg: data.msg, error: false }));
      yield put(mutations.setState(data.state));
    } catch (e) {
      yield put(mutations.addMessage({ msg: e.response.data, error: true }));
    }
  }
}

export function* sessionFetchSaga() {
  while (true) {
    yield take(mutations.REQUEST_SESSION_FETCH);
    try {
      const { data } = yield axios.get(`${url}/api/data`);
      yield put(mutations.setState(data.state));
      yield put(
        mutations.processAuth(data.auth ? mutations.AUTHENTICATED : null)
      );

      // register server side messages, if any
      if (Object.keys(data.message || {}).length > 0) {
        yield put(mutations.addMessage(data.message));
      }
      context.routerHistory.push("/");
    } catch (e) {
      // no conncetion to backend
    }
  }
}

export function* logoutSaga() {
  while (true) {
    yield take(mutations.REQUEST_LOGOUT);
    try {
      yield axios.post(`${url}/api/logout`);
      yield put(mutations.clearState());
      yield put(mutations.processAuth(null));
      context.routerHistory.push("/");
    } catch (e) {}
  }
}
