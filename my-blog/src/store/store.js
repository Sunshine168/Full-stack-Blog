import {createStore, combineReducers, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {login,flashMessage,article} from '../reducer/index'
import comment from '../reducer/comment';
const reducer = combineReducers({
  login,
  comment,
  flashMessage,
  article
})
//暂时还不明白如何使用redux-detool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,{},compose(applyMiddleware(thunk)))

// const store = createStore(login);
export default store;
