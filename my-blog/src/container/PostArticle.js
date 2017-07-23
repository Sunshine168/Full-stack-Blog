import PostArticle from '../component/PostArticle';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  showFlashMessage,
  removeFlashMessage
} from '../reducer/flashMessage';
import {
  initEditArticle,
  postArticleStarted,
  postArticleSuccess,
  postArticleFailure,
  successPost,
  failurePost,
  setRedirect
}from '../reducer/postArticle'
import {
  addPost,
  fetchEditPost,
  updatePost,
} from '../service/fetch';
const mapStateToProps = (state)=>{
  return {
    user:state.login.user,
    postArticle:state.postArticle,
  }
}
const mapDispatchToProps = (dispatch)=>{
	return {
    initEditArticle:async(articleId)=>{
    let result = await fetchEditPost(articleId)
    if(result.code==1){
        let post = result.post;
        dispatch(initEditArticle(post))
    }
    else{
      dispatch(showFlashMessage(failurePost("文章不存在")))
    }
  },
    addArticle:async(article)=>{
      dispatch(postArticleStarted());
      let result = await addPost(article);
      if(result.code === 1){
        dispatch(postArticleSuccess(result.post));
        dispatch(showFlashMessage(successPost("发表文章成功")))
        return true;
      }else{
        dispatch(showFlashMessage(failurePost("发表文章失败")))
        dispatch(postArticleFailure(result.message))
        return false;
    }
  },
   updateArticle:async(params)=>{
    let result = await updatePost(params);
  if(result.code==1){
  dispatch(showFlashMessage(successPost("更新文章成功")))
   return true;
  }else{
      dispatch(postArticleFailure("更新文章失败稍后再试"))
      return false;
   }
  },
		showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		},
		removeFlashMessage:()=>{
			dispatch(removeFlashMessage());
		}
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostArticle));
