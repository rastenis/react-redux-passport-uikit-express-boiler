import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();
import * as sagas from "./sagas";

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
