import React, { Component } from 'react';
import {connect} from 'react-redux';
import CommentList from '../component/CommentList';
import {showFlashMessage} from '../reducer/index';
import {deleteComment} from '../reducer/comment';
const mapStateToProps=(state)=>(
  state.comment,
  state.login
)

const mapDispatchToProps = (dispath)=>{
  return {
    showFlashMessage:(message)=>{
      dispath(showFlashMessage(message))
    },
    deleteComment:(index)=>{
      dispath(deleteComment(index))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentList)
