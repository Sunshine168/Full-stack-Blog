import React, { Component } from 'react';
import ArticleList from '../component/ArticleList'
import { initArticles,showFlashMessage,removeFlashMessage } from '../reducer/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
const mapStateToProps = (state)=>{
  return {
    article:state.article
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    initArticles:(article)=>{
      dispatch(initArticles(article));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ArticleList);
