import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {login,comment,flashMessage} from '../reducer/index'
const reducer = combineReducers({
  login,
  comment,
  flashMessage
})
const store = createStore(reducer,{},applyMiddleware(thunk))

// const store = createStore(login);
export default store;
