import React, {
	Component
} from 'react';
import {FormGroup,FormControl,Button,ControlLabel,HelpBlock} from 'react-bootstrap';
import {addComment,deleteComment} from '../service/fetch';
import PropTypes from 'prop-types';
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
			commentValid:null,
			commentHelp:""
		}
	}
  async _addComment(){
		let {articleId}= this.props.match.params,
				{comment,commentValid}  = this.state,
				{showFlashMessage} = this.props,
				{user}  =this.props;
		//检验评论是否为空
	  if(commentValid=="success"){
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
	_checkComment(value){
		/*重设一次*/
		this.setState({
			accountVaild:null,
			accountHelp:"",
		})
      if(value.length==0){
				this.setState({
					commentValid:"error",
					commentHelp:"评论不能为空"
				})
			}else{
				this.setState({
					commentValid:"success",
				})
			}
	}
	render(){
		return(
	<div className="commentInput">
		<FormGroup
			controlId="formControlsTextarea"
			validationState={this.state.commentValid}
		>
			<ControlLabel>Textarea</ControlLabel>
			<FormControl
        value={this.state.comment}
				componentClass="textarea"
				placeholder="textarea"
				onChange={(event)=>this.setState({comment:event.target.value})}
				onBlur={(event)=>this._checkComment(event.target.value)}
			/>
			{this.state.commentHelp && <HelpBlock>{this.state.commentHelp}</HelpBlock>}
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
