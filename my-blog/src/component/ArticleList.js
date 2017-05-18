import React, {
	Component
} from 'react';
import PropTypes from 'prop-types'
import {SplitButton,MenuItem} from'react-bootstrap';
import {fetchPosts} from '../service/fetch';
import Article from './Article';
import ArticleFoot from './ArticleFoot';
export default class AriticleList extends Component{
	static propTypes=({
		articles:PropTypes.array,
		user:PropTypes.object,
		showFlashMessage:PropTypes.func,
		removeFlashMessage:PropTypes.func,
		initArticles:PropTypes.func,
		deleteArticle:PropTypes.func,
	})
constructor(props){
  super(props);
	this.state={
		isCurrent:false,
		user:null
	}
}

render(){
	let {articles} = this.props.article,
	{isCurrent}=this.state;
  return(
		<div className="article_container">
			<div className="author_intro">
				<img className="author_logo"/>
				<h3>{this.state.user?this.state.user.name:"loading"}</h3>
			</div>
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
							commentsCount={article.commentsCount}
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
			 id=this.props.user._id;
			 this.setState({
				 isCurrent:true
			 })
		 }
		 let result = await fetchPosts(id);
		//处理登录结果
		if(result.code==1){
			console.log(result);
			let user = result.user;
			this.setState({
				user
			})
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
