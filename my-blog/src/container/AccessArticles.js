import AccessArticles from "../component/AccessArticles";
import { initArticles, failurePost } from "../reducer/article";
import { startProgress, finishProgress } from "../reducer/progress";
import { showFlashMessage } from "../reducer/flashMessage";
import { connect } from "react-redux";
import redirect from "../hight-order-component/redirect";
import { fetchPosts } from "../service/fetch";

const mapStateToProps = state => {
  return {
    articles: state.article.articles,
    posting: state.article.posting,
    author: state.article.author,
    user: state.login.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initArticles: id => {
      dispatch(startProgress());
      return fetchPosts(id).then(res => {
        dispatch(finishProgress());
        const { data } = res;
        if(data){
          dispatch(
            initArticles({
              articles: data.posts,
              author: data.user
            })
          );
        }
      });
    },
  };
};

export default redirect(
  connect(mapStateToProps, mapDispatchToProps)(AccessArticles)
);
