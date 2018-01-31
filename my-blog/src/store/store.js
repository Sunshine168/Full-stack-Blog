import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";

import comment from "../reducer/comment";
import flashMessage from "../reducer/flashMessage";
import article from "../reducer/article";
import login from "../reducer/user";
import progress from "../reducer/progress";
import postArticle from "../reducer/postArticle";
import loadArticle from "../reducer/loadArticle";
import { persistStore, autoRehydrate } from "redux-persist";

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const reducer = combineReducers({
  login,
  comment,
  flashMessage,
  article,
  progress,
  postArticle,
  loadArticle,
  router: routerReducer
});

//加载redux-detool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  {},
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(logger),
    applyMiddleware(middleware),
    autoRehydrate()
  )
);

function configureStore(callBack) {
  persistStore(store, { whitelist: ["login"] }, callBack);
  return store;
}

export default configureStore;
