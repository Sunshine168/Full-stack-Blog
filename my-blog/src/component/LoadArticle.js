import React , {Component}from 'react';
import Article from './Article';
import ArticleFoot from './ArticleFoot';
import CommentApp from '../container/CommentApp'
import PropTypes from 'prop-types';
import {fetchPost} from '../service/fetch';
// import
//加载单个文章
//通过redux 加载当前用户判断页面状态
export  default class LoadArticle extends Component {
  static propTypes = ({
    user:PropTypes.object,
    showFlashMessage:PropTypes.func,
    removeFlashMessage:PropTypes.func,
    redirect:PropTypes.func,
    initComments:PropTypes.func,
  })
	  constructor(props){
			super(props);
			this.state={
				user:props.user,
        isCurrent:null,
        article:null,
        comments:[],
			}
		}
	  async componentDidMount(){
      console.log(this.props.match)
			  let {articleId} = this.props.match.params,
            {user} = this.props;
      let result = await fetchPost(articleId);
      //通过结果码判断是否成功
      if(result.code==1){
        //判断用户状态以及是否本文章用户
        if(user&&(user._id==result.post.author._id)){
          //登录用户是本文章作者
          this.setState({
            article:result.post,
            comments:result.comments,
            isCurrent:user._id,
          })
          //初始化文章列表
          this.props.initComments(result.comments);
        }else{
          //登录用户不是本文章作者
          this.props.initComments(result.comments);
          this.setState({
            article:result.post,
            comments:result.comments,
          })
        }

      }else{
        //文章不存在
         this.props.showFlashMessage({
           msg:"该文章不存在",
           msgType:"danger"
         })
         /*
      处理文章不存在的逻辑
          */
        let pathname ='/404/',
         redirectState = { from: this.props.location };
         this.props.redirect(pathname,redirectState)
        }
      }
		render(){
  //  console.log(this.state.article);
   let {article,isCurrent,deleteArticle} = this.state;
			return (
				this.state.article?
  <div>
    <div className="article_container">
      <section  className="article_wrap">
        <Article
          article={article}
        />
        <ArticleFoot
          articleId={article._id}
          articleId={article._id}
          isCurrent={isCurrent}
          visit={article.pv}
          time = {article.created_at}
          commentsCount={this.state.comments.length}
        />
      </section>
    </div>
    <CommentApp
      isCurrent={isCurrent}
      // comments={this.state.comments}
    />
  </div>
        :null
			)
		}
}
