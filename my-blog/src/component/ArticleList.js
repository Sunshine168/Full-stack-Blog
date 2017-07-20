import React, {
	Component
} from 'react';
import PropTypes from 'prop-types'
import {fetchPosts} from '../service/fetch';
import Article from '../container/Article'
import ArticleFoot from '../container/ArticleFoot'
export default class AriticleList extends Component{
	static propTypes=({
		article:PropTypes.object,
		user:PropTypes.object,
		showFlashMessage:PropTypes.func,
		initArticles:PropTypes.func,
		redirect:PropTypes.func,
	})
render(){
	/*
  传入文章列表和current用户属性
	 */
	let {articles,currentUser} = this.props,user;
  return(
		<div>
			{
				articles.map((article,index)=>(
					<section  className="article_wrap" key={article._id}>
						<Article
							article={article}
							isDetail={(typeof index) !== undefined ? false:true}
						/>
						<ArticleFoot
							index={index}
							articleId={article._id}
							currentUser={currentUser}
							visit={article.pv}
							time={article.created_at}
							commentsCount={article.commentsCount}
						/>
					</section>
				)
				)}
		</div>
			)
			}
 }
