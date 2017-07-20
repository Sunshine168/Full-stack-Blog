import AccessArticles from '../component/AccessArticles'
import { initArticles,
failurePost
} from '../reducer/article';
import {startProgress,finishProgress} from '../reducer/progress';
import {showFlashMessage} from '../reducer/flashMessage';
import {connect} from 'react-redux';
import redirect from '../hight-order-component/redirect';
import {fetchPosts} from '../service/fetch'

const mapStateToProps = (state)=>{
  return {
    articles:state.article.articles,
    posting:state.article.posting,
    author:state.article.author,
    user:state.login.user
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    initArticles:async(id)=>{
      dispatch(startProgress())
      let result = await fetchPosts(id);
      dispatch(finishProgress())
      if(result.code === 1){
          dispatch(initArticles({
            articles:result.posts,
            author :result.user,
          }));
      }else{
        dispatch(showFlashMessage(failurePost(result.message)))
      }
    },
    showFlashMessage:(message)=>{
      dispatch(showFlashMessage(message))
    }
  }
}

export default redirect(connect(mapStateToProps,mapDispatchToProps)(AccessArticles));
