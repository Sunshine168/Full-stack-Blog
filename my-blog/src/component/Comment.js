import React, {
	Component
} from 'react';
import {Panel,FormGroup,FormControl,Button,ControlLabel} from 'react-bootstrap';
import {addComment,deleteComment} from '../service/fetch';
import PropTypes from 'prop-types';
import redirect from '../hight-order-component/redirect';
import { withRouter } from 'react-router'
export default class Comment extends Component {
	/*
并不理想组件之间耦合性太高了
感觉组件应该显示和操作分开
	 */
 async _deleteComment(){
	  let {comment,index,isCurrent} = this.props
	  let result =await deleteComment({
        articleId:comment.postId,
				commentId:comment._id,
				user_id:isCurrent
		})
	   if(result.code==1){
			  let temp =  this.props.deleteComment&&this.props.deleteComment(index);
				// this.props.showFlashMessage({
				// 	msgType:"success",
				// 	msg:"评论删除成功",
				// })
		 }else{
			//  this.props.showFlashMessage({
			// 	 msgType:"danger",
			// 	 msg:"评论删除失败",
			//  })
		 }
 }
	render(){
		console.log(this.props);
		let {author,created_at,content,index}= this.props.comment;
		return(
					<div className="comment_wrap">
						<img src="" className="author_logo"/>
						<div className="comment_detail">
							<h5>{author.name}<span>{created_at}</span></h5>
							<div className="comment_context">
								<div dangerouslySetInnerHTML={{__html:content}}></div>
							</div>
						</div>
						{this.props.isCurrent?
							<div className="comment_control clearfix">
								<Button bsStyle="link" onClick={()=>this._deleteComment()}>删除</Button>
							</div>:null}
					</div>
			)
	}
}
