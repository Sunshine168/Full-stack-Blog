import React, {
	Component
} from 'react';
import {SplitButton,MenuItem} from'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import PropTypes from 'prop-types'
/*
evenKey
1 : 编辑
2 ：删除
 */
/*
   index
   articleId
   currentUser
   visit
   time
   commentsCount
   deleteArticle
*/
 export default class ArticleFoot extends Component {
	 static propTypes=({
	 	deleteArticle:PropTypes.func
	 })
	async controlHandle(eventKey){
		 let {articleId,index,deleteArticle}= this.props;
		 console.log(index);
		 if(eventKey == "2"){
			 await deleteArticle({
 				postId:articleId,
 				user_id:this.props.currentUser,
 		 })
		 }
	 }
	 render(){
		 const {props} = this;
		 return (<div className="article_foot">
			 <div className="foot_left">
				 <a href="#" className="foot_item">
					 {props.time}
				 </a>
			 </div>
			 <div className="foot_right">
				 <a href="#" className="foot_item">
					 浏览({props.visit})
				 </a>
				 <LinkContainer key="1" to={`/article/${props.articleId}`}>
					 <a href="#" className="foot_item">
						 详情({props.commentsCount})
					 </a>
         </LinkContainer>
         {props.currentUser?(
           <SplitButton
             bsStyle="link"
             title="操作"
             className="foot_dropDown"
             id="article-action"
             pullRight={true}
             onSelect={(eventKey)=>{this.controlHandle(eventKey)}}
					 >
             <LinkContainer key="2" to={`/edit/article/${props.articleId}`}>
							 <MenuItem eventKey="1">编辑</MenuItem>
						 </LinkContainer>
						 <MenuItem divider />
						 <MenuItem eventKey="2">删除</MenuItem>
						 </SplitButton>
						 ):null}

			 </div>
		 </div>)
	 }
 }
