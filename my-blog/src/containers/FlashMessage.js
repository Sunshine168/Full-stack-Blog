import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {FlashMessage} from '../component/MyComponent';
const mapStateToProps = (state)=>{
  return {
    flashMessage:state.flashMessage
  }
}
export default withRouter(connect(mapStateToProps)(FlashMessage));
