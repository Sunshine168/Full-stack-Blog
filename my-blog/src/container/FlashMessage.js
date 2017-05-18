import React, { Component } from 'react';
import {connect} from 'react-redux';
import FlashMessage from '../component/FlashMessage';
import {showFlashMessage,removeFlashMessage} from '../reducer/index';
import Radium from 'radium';
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

export default connect(mapStateToProps,mapDispatchToProps)(Radium(FlashMessage));
