import React, { Component } from 'react';
import ProgressBars from '../component/ProgressBars';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import redirect from '../hight-order-component/redirect';
// import {startProgress,removeFlashMessage} from '../reducer/progress';
const mapStateToProps = (state)=>{
  return {
    progress:state.progress,
  }
}
export default withRouter(connect(mapStateToProps)(redirect(ProgressBars)));
