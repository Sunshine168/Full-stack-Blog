import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import FlashMessage from '../component/FlashMessage';
import {showFlashMessage,removeFlashMessage} from '../reducer/index';
const mapStateToProps = (state)=>{
  return {
    flashMessage:state.flashMessage
  }
}
const mapDispatchToProps = (dispatch)=>{
	return {
		showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		},
		removeFlashMessage:()=>{
			dispatch(removeFlashMessage);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(FlashMessage);
