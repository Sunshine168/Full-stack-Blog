import PostArticle from '../component/PostArticle';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import redirect from '../hight-order-component/redirect';
import {showFlashMessage,
  removeFlashMessage} from '../reducer/flashMessage';
import {addArticle}from '../reducer/article'
const mapStateToProps = (state)=>{
  return {
    user:state.login.user,
  }
}
const mapDispatchToProps = (dispatch)=>{
	return {
		showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		},
		removeFlashMessage:()=>{
			dispatch(removeFlashMessage());
		},
    addArticle:(article)=>{
      dispatch(addArticle(article))
    }
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(redirect(PostArticle)));
