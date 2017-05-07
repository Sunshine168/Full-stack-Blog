import React, { Component } from 'react';
import Login from '../component/Login';
import '../css/login.css';
import { loginIn,showFlashMessage,removeFlashMessage } from '../reducer/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
const mapStateToProps = (state)=>{
	  console.log(state)
	return {
		login:state.login
	}
}
const mapDispatchToProps = (dispatch)=>{
	return {
		loginIn:(user)=>{
			dispatch(loginIn(user));
		},
		showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		},
		removeFlashMessage:()=>{
			dispatch(removeFlashMessage());
		}
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
