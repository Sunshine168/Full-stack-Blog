import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Header} from '../component/Header';
import { withRouter } from 'react-router-dom';
import {loginOut,showFlashMessage,removeFlashMessage} from '../reducer/index';
const mapStateToProps = (state)=>(
  state.login
)
const mapDispatchToProps= (dispatch)=>{
  return{
    loginOut:()=>{dispatch(loginOut())},
    showFlashMessage:(message)=>{
      dispatch(showFlashMessage(message))
    },
    removeFlashMessage:()=>{
      dispatch(removeFlashMessage());
    }
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));
