import React, { Component } from 'react';
import {connect} from 'react-redux';
import {CommentInput} from '../component/Comment';
import {showFlashMessage} from '../reducer/index';
import {addComment} from '../reducer/comment';
import { withRouter } from 'react-router-dom';
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CommentInput)
)
