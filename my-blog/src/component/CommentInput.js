
import React, {
	Component
} from 'react';
import {Panel,FormGroup,FormControl,Button,ControlLabel} from 'react-bootstrap';
import {addComment,deleteComment} from '../service/fetch';
import PropTypes from 'prop-types';
import redirect from '../hight-order-component/redirect';
import { withRouter } from 'react-router'
export default class CommentInput extends Component {
	static propTypes=({
		addComment:PropTypes.func,
		articleId:PropTypes.string,
		user:PropTypes.object,
		showFlashMessage:PropTypes.func,
	})
	constructor(props){
		super(props)
		this.state={
			comment:"",
		}
	}
  async _addComment(){
		let {articleId}= this.props.match.params,
				{comment}  = this.state,
				{showFlashMessage} = this.props,
				{user}  =this.props;
		//检验评论是否为空
	  if(comment==""){

		}else{
      let result =  await addComment({
				articleId:articleId,
				comment:comment,
				userId:user._id,
			})
		   if(result.code==1){
				 this.props.showFlashMessage({
					 msgType:"success",
					 msg:"评论发表成功",
				 })
				 this.props.addComment(
					 {...result.comment,author:user}
				 )
				 this.setState({
					 comment:""
				 })
			 }else{
				 this.props.showFlashMessage({
					msgType:"danger",
					msg:"评论发表失败",
				})
			 }
		}

	}
	_login(){
		let pathname ='/login',
		redirectState = { from: this.props.location };
		this.props.redirect(pathname,redirectState)
	}
	render(){
		return(
	<div className="commentInput">
		<FormGroup controlId="formControlsTextarea">
			<ControlLabel>Textarea</ControlLabel>
			<FormControl
        value = {this.state.comment}
				componentClass="textarea"
				placeholder="textarea"
				onChange={(event)=>this.setState({comment:event.target.value})}
			/>
		</FormGroup>
		{this.props.user?
			<Button type="submit" onClick={()=>this._addComment()}>
				发表留言
			</Button>
			:
			<Button type="submit" onClick={()=>this._login()}>
				登录
			</Button>
		}
			</div>


		)
	}
}
