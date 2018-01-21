import React, {
	Component
} from 'react';
import {Button} from 'react-bootstrap';
import {deleteComment} from '../service/fetch';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';

export default class Comment extends Component {
	constructor(args){
		super(args)
		this.state = {
			isRedirect:false
		}
	}
 async _deleteComment(){
	  let {comment,index,current} = this.props
	  let result =await deleteComment({
        articleId:comment.postId,
				commentId:comment._id,
				user_id:current
		})
		   if(result.data){
				this.props.deleteComment(index)
        toast.success("删除成功",{
					position:toast.position.TOP_RIGHT,
				})
			 }
 }
	render(){
		let {author,created_at,content}= this.props.comment;
		console.log(this.props.comment)
		return(
					<div className="comment_wrap">
						<img src="" className="author_logo" alt="avater"/>
						<div className="comment_detail">
							<h5>{author.name}<span>{created_at}</span></h5>
							<div className="comment_context">
								<div dangerouslySetInnerHTML={{__html:content}}></div>
							</div>
						</div>
						{this.props.currentUser?
							<div className="comment_control clearfix">
								<Button bsStyle="link" onClick={()=>this._deleteComment()}>删除</Button>
							</div>:null}
					</div>
			)
	}
}
