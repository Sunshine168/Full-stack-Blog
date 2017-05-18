import React, { Component } from 'react';
import ArticleList from '../component/ArticleList'
import { initArticles,deleteArticle,showFlashMessage,removeFlashMessage } from '../reducer/index';
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
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ArticleList);
