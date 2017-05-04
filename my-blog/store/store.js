import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {login,comment} from './reducer/index'
import {combineReducers} from 'redux';

const reducer = combineReducers({
  login,
  comment,
})
const store = createStore(reducer,{},applyMiddleware(thunk))

export default store;
