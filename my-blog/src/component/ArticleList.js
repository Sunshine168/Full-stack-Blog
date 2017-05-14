import React, {
	Component
} from 'react';
import PropTypes from 'prop-types'
import {SplitButton,MenuItem} from'react-bootstrap';
import {fetchPosts} from '../service/fetch';
/*
存在一些实践的问题
感觉可以直接把文章以对象传入到组件让组件自己按需取属性
 */
export default class AriticleList extends Component{
	static propTypes=({
		articles:PropTypes.object,
		showFlashMessage:PropTypes.func,
		removeFlashMessage:PropTypes.func,
		initArticles:PropTypes.func,
	})
constructor(props){
  super(props);


}
render(){
	let {articles} = this.props.article,
	isCurrent = true;
  return(
		<section>
			{
				articles.map((article,index)=>(
					<Article
						key={index}
						articleId={article._id}
						title={article.title}
						context={article.content}
						visitCount={article.pv}
						time={article.created_at}
						isCurrent={isCurrent}
					/>
				)
				)}
					</section>
				)
			}

async componentDidMount(){
   let result = await fetchPosts();
	 console.log(result);
		//处理登录结果
		if(result.code==1){
			console.log(result.posts);//debug
			this.props.initArticles(result.posts);//初始化文章列表
     //如果需要使用flashmessage则调用this.props.showFlashMessage方法
		}else{
			//获取失败
			this.props.showFlashMessage({
			 msg:result.message,
			 msgType:"danger",
		 })
		}

}
 }
 export const Article = (props)=>{
   return (<div className="article_container">
		 <div className="article_wrap">
			 <h3 className="article_title">
				 {props.title}
			 </h3>
			 <div className="article_context">
				 <div dangerouslySetInnerHTML={{__html:props.context}}></div>
			 </div>
			 <ArticleFoot
				 articleId={props.articleId}
 				isCurrent={props.isCurrent}
 				visit={props.visitCount}
 				message={props.messageCount}
 				time = {props.time}
 			/>
 		</div>
   </div>)
 }


 class ArticleFoot extends Component {
   constructor(props){
		 super(props)
		 let articleId = props.articleId;
		 this.state = {
			 id:articleId,
		 }
	 }
	 deleteArticle(){
		 fetch('http://localhost:3005/api/posts',{
			 method: 'GET',
			 headers: {
				 'Accept': 'application/json',
				 'Content-Type': 'application/json'
		}
		 })
		 .then((response) => {return response.json()})
		 .then((responseJson) => {
			 //处理登录结果
			 if(responseJson.code==1){
				 console.log(responseJson.posts);//debug
				 this.props.initArticles(responseJson.posts);//初始化文章列表
				 //如果需要使用flashmessage则调用this.props.showFlashMessage方法
			 }else{
				 //获取失败
				 this.props.showFlashMessage({
					msg:responseJson.message,
					msgType:"danger",
				})
			 }
		 })
		 .catch((e)=>{
			 //console.log输出错误信息用作调试
			 console.log(e);
		 })
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
				 {
					 props.message?
						 <a href="#" className="foot_item">
							 留言({props.message})
						 </a>
					 :null
				 }
				 {props.isCurrent?(
					 <SplitButton bsStyle="link" title="操作"  className="foot_dropDown" id="article-action" pullRight={true}>
						 <MenuItem eventKey="1">编辑</MenuItem>
						 <MenuItem divider />
						 <MenuItem eventKey="2">删除</MenuItem>


					 </SplitButton>
				 ):null}
			 </div>
		 </div>)
	 }
 }
