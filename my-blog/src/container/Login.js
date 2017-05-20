import React, { Component } from 'react';
import Login from '../component/Login';
import '../css/login.css';
import {loginIn} from '../reducer/user';
import {showFlashMessage,removeFlashMessage } from '../reducer/flashMessage';
import redirect from '../hight-order-component/redirect';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
const mapStateToProps = (state)=>(
	state.login
)
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(redirect(Login)));
