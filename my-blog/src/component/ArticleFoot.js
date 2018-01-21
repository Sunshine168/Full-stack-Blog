import React, {
	Component
} from 'react';
import {SplitButton,MenuItem} from'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Redirect}  from 'react-router-dom'
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
	 constructor(args){
		 super(args)
		 this.state = {
			 isRedirect:false
		 }
	 }
    controlHandle(eventKey){
		 let {articleId,index,deleteArticle}= this.props
		 if(eventKey == "2"){
			 deleteArticle({
 				postId:articleId,
				user_id:this.props.currentUser,
				sucCb:()=>{
					this.setState({isRedirect:true})
				} 
 		  })
		 }
	 }
	 render(){
		 const {props} = this;
		 if(this.state.isRedirect==true){
			 return<Redirect to={{
				 pathname: '/personal/index',
				 state: { from: this.props.location }
			 }}/>
		 }

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
