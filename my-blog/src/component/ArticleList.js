import React, {
	Component
} from 'react';
import PropTypes from 'prop-types'
import {fetchPosts} from '../service/fetch';
import ArticleApp from '../container/ArticleApp'
export default class AriticleList extends Component{
	static propTypes=({
		articles:PropTypes.array,
		user:PropTypes.object,
		showFlashMessage:PropTypes.func,
		removeFlashMessage:PropTypes.func,
		initArticles:PropTypes.func,
		startProgress:PropTypes.func,
		finishProgress:PropTypes.func,
	})
constructor(props){
  super(props);
	console.log(props)
	this.state={
		isCurrent:null,
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
				<h3>{this.props.user?this.props.user.name:"loading"}</h3>
			</div>
			{
				articles.map((article,index)=>(
					<ArticleApp
						key={article._id}
						index={index}
						article={article}
						index = {index}
						isCurrent={isCurrent}

					/>
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
				 isCurrent:id
			 })
		 }
		 this.props.startProgress();
		 let result = await fetchPosts(id);
		  this.props.finishProgress();
		//处理获取文章结果
		if(result.code==1){
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
