import React, {
	Component
} from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import Comment from './Comment'
import PropTypes from 'prop-types'
export default class CommentList extends Component {
   static propTypes=({
		 deleteComment:PropTypes.func,
		 showFlashMessage:PropTypes.func,
		 comments:PropTypes.array,
	 })
	render(){
		let {comments,isCurrent,deleteComment} = this.props;
   return (
		 <ListGroup>
			 {comments.map((comment,index)=>(
				 <ListGroupItem key={index}>
					 <Comment
						 index = {index}
						 comment={comment}
						 isCurrent={isCurrent}
						 deleteComment={deleteComment}
					 />
				 </ListGroupItem>
			 )
			 )}
		 </ListGroup>
	 )
	}
}
