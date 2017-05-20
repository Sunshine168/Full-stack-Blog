import React, { Component } from 'react';
import PrivateRoute from '../component/PrivateRoute';
import '../css/login.css';
import { loginIn} from '../reducer/user';
import {showFlashMessage,removeFlashMessage } from '../reducer/flashMessage';
import {connect} from 'react-redux';
const mapStateToProps = (state)=>{
  return {
    login:state.login,

  }
}
const mapDispatchToProps = (dispatch)=>{
	return {
		showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		},
		removeFlashMessage:()=>{
			dispatch(removeFlashMessage());
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);
