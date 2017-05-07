import React, { Component } from 'react';
import Login from '../component/Login';
import '../css/login.css';
import { loginIn } from '../reducer/index';
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
		}
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
