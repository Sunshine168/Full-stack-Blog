import ArticleList from '../component/ArticleList'
import { initArticles,deleteArticle,} from '../reducer/article';
import {startProgress,finishProgress} from '../reducer/progress';
import {showFlashMessage} from '../reducer/flashMessage';
import {connect} from 'react-redux';
import redirect from '../hight-order-component/redirect';
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
    },
    showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		},
  }
}


export default redirect(connect(mapStateToProps,mapDispatchToProps)(ArticleList));
