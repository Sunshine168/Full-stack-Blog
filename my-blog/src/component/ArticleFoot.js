import React, {
	Component
} from 'react';
import {SplitButton,MenuItem} from'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {deletePost} from '../service/fetch';
import PropTypes from 'prop-types'
/*
evenKey
1 : 编辑
2 ：删除
 */

/*
   index
   articleId
   isCurrent
   visit
   time
   commentsCount
   deleteArticle
*/
 export default class ArticleFoot extends Component {
	 static propTypes=({
	 	showFlashMessage:PropTypes.func,
	 	removeFlashMessage:PropTypes.func,
	 })
	async controlHandle(eventKey){
		 let {articleId,index}= this.props;
		 console.log(index);
		 if(eventKey==="2"){
			let result = await deletePost({
				 postId:articleId,
				 user_id:this.props.isCurrent,
			});
			   if(result.code===1){
					 //删除成功
					 this.props.showFlashMessage({
						 msgType:"success",
						 msg:"删除成功"
					 })
					 if(!(index===undefined)){
						 //传了index代表是列表渲染
						 this.props.deleteArticle(index);
					 }else{
						 //没有传index代表是查看单个页面——删除成功后需要跳转(重新加载列表)
						 let pathname ='/personal/index',
							redirectState = { from: this.props.location };
							this.props.redirect(pathname,redirectState)
					 }
				 }else{
					 this.props.showFlashMessage({
						msgType:"danger",
						msg:"删除失败"
					})
				 }
		 }
	 }

	 render(){
		 let {props} = this;
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
         {props.isCurrent?(
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
