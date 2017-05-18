import React, {
	Component
} from 'react';
import {Panel,FormGroup,FormControl,Button,ControlLabel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {addComment} from '../service/fetch';
export default class Comment extends Component {
	render(){
		let {authorName,time,context}= this.props.comment;
		return(
					<div className="comment_wrap">
						<img src="" className="author_logo"/>
						<div className="comment_detail">
							<h5>{authorName}<span>{time}</span></h5>
							<div className="comment_context">
								{context}
							</div>
						</div>
						{this.props.isCurrent?	<div className="comment_control clearfix">
							<Button bsStyle="link">删除</Button>
						</div>:null}
					</div>
			)
	}
}

export class CommentInput extends Component {
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
			console.log(comment);
      let result =  await addComment({
				articleId:articleId,
				comment:comment,
				userId:user._id,
			})
			console.log(result);
		}

	}
	render(){
		return(
	    this.props.user?		<div className="commentInput">
				<FormGroup controlId="formControlsTextarea">
					<ControlLabel>Textarea</ControlLabel>
					<FormControl
						componentClass="textarea"
						placeholder="textarea"
						onChange={(event)=>this.setState({comment:event.target.value})}
					/>
				</FormGroup>
				<Button type="submit" onClick={()=>this._addComment()}>
					发表留言
				</Button>
			</div>
			:
			null
		)
	}
}
