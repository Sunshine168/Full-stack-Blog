import {connect} from 'react-redux';
import AccessArticle from '../component/AccessArticle';
import redirect from '../hight-order-component/redirect'
import {showFlashMessage,removeFlashMessage} from '../reducer/flashMessage';
import {initComments} from '../reducer/comment';
import {initLoadArticle,setCurrent,fetchArticleFail} from  '../reducer/loadArticle';
import {fetchPost} from '../service/fetch';
const mapStateToProps = (state)=>(
  state.login,
  state.loadArticle
)
const mapDispatchToProps = (dispatch,getState)=>{
	return {
		showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		},
		removeFlashMessage:()=>{
			dispatch(removeFlashMessage);
		},
    initComments:(comments)=>{
      dispatch(initComments(comments))
    },
    fetchArticle:async(articleId)=>{

    let result = await fetchPost(articleId);
    //通过结果码以及结果判断是否本文章作者
    if(result.code==1){
      dispatch(initLoadArticle(result.post))
      //判断用户状态以及是否本文章用户
      if(result.current){
          dispatch(setCurrent(result.current))
      }
      dispatch(initComments(result.comments));
    }else{
      //文章不存在
       this.showFlashMessage(fetchArticleFail("文章不存在"))
    }
	}
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(AccessArticle);