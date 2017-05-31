import ArticleList from '../component/ArticleList'
import { initArticles,deleteArticle,} from '../reducer/article';
import {startProgress,finishProgress} from '../reducer/progress';
import {connect} from 'react-redux';
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
