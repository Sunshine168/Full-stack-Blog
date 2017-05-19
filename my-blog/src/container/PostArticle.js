import React, { Component } from 'react';
import PostArticle from '../component/PostArticle';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import redirect from '../hight-order-component/redirect';
import {showFlashMessage,
  removeFlashMessage} from '../reducer/index';
const mapStateToProps = (state)=>{
  return {
    user:state.login.user,
  }
}
const mapDispatchToProps = (dispatch)=>{
	return {
		showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		},
		removeFlashMessage:()=>{
			dispatch(removeFlashMessage());
		},
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(redirect(PostArticle)));
