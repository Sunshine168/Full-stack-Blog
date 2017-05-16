import React, { Component } from 'react';
import PostArticle from '../component/Article';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import redirect from '../hight-order-component/redirect';
import {showFlashMessage,
  removeFlashMessage} from '../reducer/index';
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
export default withRouter(connect(null,mapDispatchToProps)(redirect(PostArticle)));
