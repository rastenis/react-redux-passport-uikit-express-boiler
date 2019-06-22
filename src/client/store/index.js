import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();
import * as sagas from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(createLogger(), sagaMiddleware))
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
