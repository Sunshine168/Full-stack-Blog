import React, {
	Component
} from 'react';
import {connect} from 'react-redux';
import {showFlashMessage} from '../reducer/flashMessage';
import { withRouter } from 'react-router-dom';
import {deleteArticle} from '../reducer/article';
import ArticleFoot from '../component/ArticleFoot'
// const mapStateToProps = (state)=>(state.login)
const mapDispatchToProps = (dispath)=>{
  return {
    showFlashMessage:(message)=>{
      dispath(showFlashMessage(message))
    },
  deleteArticle:(index)=>{
    dispath(deleteArticle(index));
  }
    }
}

export default withRouter(connect(null,mapDispatchToProps)(ArticleFoot))
