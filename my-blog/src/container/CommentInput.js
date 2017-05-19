import React, { Component } from 'react';
import {connect} from 'react-redux';
import CommentInput from '../component/CommentInput';
import {showFlashMessage} from '../reducer/index';
import {addComment} from '../reducer/comment';
import { withRouter } from 'react-router-dom';
import redirect from '../hight-order-component/redirect';
const mapStateToProps= (state)=>(state.login)

const mapDispatchToProps = (dispath)=>{
  return {
    showFlashMessage:(message)=>{
      dispath(showFlashMessage(message))
    },
    addComment:(comment)=>{
      dispath(addComment(comment))
    }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(redirect(CommentInput))
)
