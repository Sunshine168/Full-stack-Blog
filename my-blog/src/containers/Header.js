import React, { Component } from 'react';
import {connect} from 'redux-redux';
import {Header} from './component/Header';

const mapStateToProps = (state)=>{
  return {
    user:state.user
  }
}

@component
class HeaderScreen {
  render (){
    return <Header/>
  }
}
export default connect(mapStateToProps)(Header)
