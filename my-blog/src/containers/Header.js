import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Header} from '../component/Header';
import { withRouter } from 'react-router-dom';
import {loginOut} from '../reducer/index';
const mapStateToProps = (state)=>{
  return {
    login:state.login
  }
}
const mapDispatchToProps= (dispatch)=>{
  return{
    loginOut:()=>{dispatch(loginOut())},
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));
