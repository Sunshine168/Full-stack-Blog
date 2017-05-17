import React, {
	Component
} from 'react';
import {SplitButton,MenuItem,FormGroup,ControlLabel,FormControl,Button,HelpBlock} from'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {deletePost} from '../service/fetch';
import redirect from '../hight-order-component/redirect';
import { withRouter } from 'react-router'
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
 export class ArticleFoot extends Component {
   constructor(props){
		 super(props)
     console.log(this.props);
		 let {articleId,index} = props;
		 this.state = {
			 id:articleId,
			 index:index,
		 }
	 }
	async controlHandle(eventKey){
		 let {id,index}= this.state;
		 if(eventKey==2){
			let result = await deletePost(id);
			   if(result.code==1){
					 if(!(typeof(index)===undefined)){
						 //传了index代表是列表渲染
						 this.props.deleteArticle(index);
					 }else{
						 //没有传index代表是查看单个页面——删除成功后需要跳转

					 }
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
				 <LinkContainer key="1" to={`/article/${this.state.id}`}>
					 <a href="#" className="foot_item">
						 留言({props.commentsCount})
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
             <LinkContainer key="2" to={`/article/edit/${this.state.id}`}>
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
export default withRouter(redirect(ArticleFoot))
