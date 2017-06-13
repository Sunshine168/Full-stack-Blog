import React, {
	Component
} from 'react';
import PropTypes from 'prop-types'
import {fetchPosts} from '../service/fetch';
import ArticleApp from '../container/ArticleApp'
export default class AriticleList extends Component{
	static propTypes=({
		article:PropTypes.object,
		user:PropTypes.object,
		showFlashMessage:PropTypes.func,
		initArticles:PropTypes.func,
		startProgress:PropTypes.func,
		finishProgress:PropTypes.func,
		redirect:PropTypes.func,
	})
constructor(props){
  super(props);
	this.state={
		isCurrent:null,
	}


}
_avaterHandle(){
	var myPicture = document.getElementById('avater');
	console.log(myPicture.src)
      if(myPicture.src=="avatar"){
				   myPicture.src="/avatar/loading.gif";
			}
}
render(){
	let {articles} = this.props,
	{isCurrent}=this.state,
	user;
	if(isCurrent){
		 user = this.props.user;
	}else{
	   user = this.props.author;
	}
  return(
		<div className="article_container">
			<div className="author_intro">
				<img className="author_logo" src={user?user.avatar:""} id="avater"/>
				<h3>{user?user.name:"loading"}</h3>
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
	 var userId = this.props.match.params.userId,
		id=this.props.user._id;
    await this.props.initArticles(id)
		let {author} = this.props;
		//处理获取文章结果
		if(author){
			if(userId){
				this.setState({
			 isCurrent:id==userId?id:null
			 })
		 }else{
			 this.setState({
				 isCurrent:id
			 })
		 }
		}else{
			//获取失败
		  var pathname = '/';
			let redirectState = { from: this.props.location };
			this.props.redirect(pathname,redirectState)
			this.props.showFlashMessage({
			 msg:"用户不存在",
			 msgType:"danger",
		 })
		}
	}.bind(this)
	)()

}
 }
