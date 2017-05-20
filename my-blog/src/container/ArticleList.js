import React, { Component } from 'react';
import ArticleList from '../component/ArticleList'
import { initArticles,deleteArticle,} from '../reducer/article';
import {showFlashMessage,removeFlashMessage } from '../reducer/flashMessage'
import {startProgress,finishProgress} from '../reducer/progress';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
const mapStateToProps = (state)=>{
  return {
    article:state.article,
    user:state.login.user,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    initArticles:(article)=>{
      dispatch(initArticles(article));
    },
    deleteArticle:(article)=>{
      dispatch(deleteArticle(article));
    },
    startProgress:()=>{
        dispatch(startProgress())
    },
    finishProgress:()=>{
      dispatch(finishProgress())
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ArticleList);
