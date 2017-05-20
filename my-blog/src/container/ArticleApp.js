import React ,{Component} from 'react';
import Article from './Article';
import ArticleFoot from './ArticleFoot';
 class ArticleApp extends Component {
  render(){
    let {index,article,isCurrent} = this.props;
    return (
      <section  className="article_wrap">
        <Article
          article={article}
        />
        <ArticleFoot
          index={index}
          articleId={article._id}
          isCurrent={isCurrent}
          visit={article.pv}
          time = {article.created_at}
          commentsCount={article.commentsCount}
        />
      </section>
    )
  }
}



export default ArticleApp;
