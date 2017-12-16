import React , {Component}from 'react';
import Article from './Article';
import ArticleFoot from '../container/ArticleFoot';
import CommentInput from '../container/CommentInput';
import CommentList from '../container/CommentList';
import PropTypes from 'prop-types';
import {fetchPost} from '../service/fetch';
import {Panel} from 'react-bootstrap';
// import
//加载单个文章
//通过redux 加载当前用户判断页面状态
export  default class LoadArticle extends Component {
  static propTypes = ({
    current:PropTypes.string,
    article:PropTypes.object,
  })
	  constructor(props){
			super(props);
		}
		render(){
   let {article,currentUser} = this.props;
			return (
  <div>
    <div className="article_container">
      <section  className="article_wrap">
        <Article
          article={article}
        />
        <ArticleFoot
          articleId={article._id}
          currentUser={currentUser}
          visit={article.pv}
          time={article.created_at}
          commentsCount={0}
        />
      </section>
    </div>
    <div className="comment_container">
      <Panel
        header="留言"
      >
        <CommentList
          currentUser={currentUser}
        />
        <CommentInput/>
      </Panel>
    </div>
  </div>
			)
		}
}
