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
		let {comments,currentUser,deleteComment,showFlashMessage} = this.props;
   return (
		 <ListGroup>
			 {comments.map((comment,index)=>{
				 return (
					<ListGroupItem key={comment._id}>
					<Comment
						index={index}
						comment={comment}
						currentUser={currentUser}
						deleteComment={deleteComment}
						showFlashMessage={showFlashMessage}
					/>
				</ListGroupItem>
				)
			 }
			 )}
		 </ListGroup>
	 )
	}
}
