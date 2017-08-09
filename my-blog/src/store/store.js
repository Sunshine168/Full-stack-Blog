import {createStore, combineReducers, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import comment from '../reducer/comment';
import flashMessage from '../reducer/flashMessage';
import article from '../reducer/article';
import login from '../reducer/user'
import progress from '../reducer/progress';
import postArticle from '../reducer/postArticle'
import loadArticle from '../reducer/loadArticle'
import {persistStore, autoRehydrate} from 'redux-persist'
import Cookie from 'js-cookie'
const reducer = combineReducers({
  login,
  comment,
  flashMessage,
  article,
  progress,
  postArticle,
  loadArticle
})
//加载redux-detool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,{},composeEnhancers(applyMiddleware(thunk),autoRehydrate()))
persistStore(store, {blacklist: ['progress','article']}, () => {
  //check cookie
})
export default store;
