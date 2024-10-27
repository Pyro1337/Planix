import { createRouterMiddleware } from "@lagunovsky/redux-react-router";
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { rootReducers } from "./rootReducers";
import { rootSagas } from "./rootSagas";

export const browserHistory = createBrowserHistory();

const routerMiddleware = createRouterMiddleware(browserHistory);
let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers(browserHistory),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(routerMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSagas);

export const rootStore = store;
