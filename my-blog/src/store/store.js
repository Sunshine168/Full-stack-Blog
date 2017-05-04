import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {login,comment} from '../reducer/index'
const reducer = combineReducers({
  login,
  comment
})
const store = createStore(reducer,{},applyMiddleware(thunk))

// const store = createStore(login);
export default store;
