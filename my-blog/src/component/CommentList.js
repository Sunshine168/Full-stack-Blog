import React, {
	Component
} from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import Comment from './Comment'
let comment = {
  _id:"123",
	authorName:"mai",
	time:"2017-4-11",
	context:"板凳"
}




export default class CommentList extends Component {

	render(){
		let {comments} = this.props;
		console.log(this.props);
   return (
		 <ListGroup>
			 {comments.map((comment,index)=>(
				 <ListGroupItem key={index}>
					 <Comment
						 comment={comment}
						 isCurrent={true}
					 />
				 </ListGroupItem>
			 )
			 )}
		 </ListGroup>
	 )
	}
}
