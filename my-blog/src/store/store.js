import {createStore, combineReducers, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import comment from '../reducer/comment';
import flashMessage from '../reducer/flashMessage';
import article from '../reducer/article';
import login from '../reducer/user'
import progress from '../reducer/progress';
const reducer = combineReducers({
  login,
  comment,
  flashMessage,
  article,
  progress
})
//暂时还不明白如何使用redux-detool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,{},compose(applyMiddleware(thunk)))

// const store = createStore(login);
export default store;
