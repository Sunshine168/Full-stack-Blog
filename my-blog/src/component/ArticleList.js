import React, {
	Component
} from 'react';
import PropTypes from 'prop-types'
import {SplitButton,MenuItem} from'react-bootstrap';
import {fetchPosts,deletePost} from '../service/fetch';
import redirect from '../hight-order-component/redirect';
import { LinkContainer } from 'react-router-bootstrap';
export default class AriticleList extends Component{
	static propTypes=({
		articles:PropTypes.object,
		login:PropTypes.object,
		showFlashMessage:PropTypes.func,
		removeFlashMessage:PropTypes.func,
		initArticles:PropTypes.func,
		deleteArticles:PropTypes.func,
	})
constructor(props){
  super(props);
	console.log(props);
	this.state={
		isCurrent:false
	}
}

render(){
	let {articles} = this.props.article,
	{isCurrent}=this.state;
  return(
		<div className="article_container">
			{
				articles.map((article,index)=>(
					<section  className="article_wrap" 	key={index}>
						<Article

							article={article}
							index={index}
						/>
						<ArticleFoot
							index={index}
							articleId={article._id}
							isCurrent={isCurrent}
							visit={article.pv}
							time = {article.created_at}
							deleteArticle={this.props.deleteArticle}
						/>
					</section>
				)
				)}
		</div>
				)
			}

componentDidMount(){
   (async function(){

		 let userId = this.props.match.params.userId,id="";
		 if(userId){
			 id=userId;
		 }else{
			 id=this.props.login.user._id;
			 this.setState({
				 isCurrent:true
			 })
		 }
		 let result = await fetchPosts(id);
		//处理登录结果
		if(result.code==1){
			console.log(result);
			this.props.initArticles(result.posts);//初始化文章列表
     //如果需要使用flashmessage则调用this.props.showFlashMessage方法
		}else{
			//获取失败
			this.props.showFlashMessage({
			 msg:result.message,
			 msgType:"danger",
		 })
		}
	}.bind(this)
	)()
}
 }
 export const Article = (props)=>{
	   let {index,article,deleteArticle} = props;
   return (
		 <div>
			 <h3 className="article_title">
				 {article.title}
			 </h3>
			 <div className="article_context">
				 <div dangerouslySetInnerHTML={{__html:article.content}}></div>
			 </div>

		 </div>)
 }

/*
evenKey
1 : 编辑
2 ：删除
 */
 class ArticleFoot extends Component {
   constructor(props){
		 super(props)
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
					 this.props.deleteArticle(index);
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
				 {
					 props.message?
						 <a href="#" className="foot_item">
							 留言({props.message})
						 </a>
					 :null
				 }
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
