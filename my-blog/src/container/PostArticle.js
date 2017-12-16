import PostArticle from "../component/PostArticle";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { showFlashMessage, removeFlashMessage } from "../reducer/flashMessage";
import {
  initEditArticle,
  postArticleStarted,
  postArticleSuccess,
  postArticleFailure,
  successPost,
  failurePost
} from "../reducer/postArticle";
import { addPost, fetchEditPost, updatePost } from "../service/fetch";

const mapStateToProps = state => {
  return {
    user: state.login.user,
    postArticle: state.postArticle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initEditArticle:articleId => {
      return fetchEditPost(articleId).then(result => {
        const {code,data} = result
        if (code === 1) {
          let post = data.post;
          dispatch(initEditArticle(post));
        } else {
          dispatch(showFlashMessage(failurePost("文章不存在")));
        }
      });
    },
    addArticle: (article, sucCb) => {
      return addPost(article).then(result => {
        if (result.code === 1) {
          dispatch(postArticleSuccess(result.post));
          dispatch(showFlashMessage(successPost("发表文章成功")));
          sucCb();
        } else {
          dispatch(showFlashMessage(failurePost("发表文章失败")));
          dispatch(postArticleFailure(result.message));
        }
      });
    },
    startPostArticle: () => {
      dispatch(postArticleStarted());
    },
    updateArticle: (params, sucCb) => {
      return updatePost(params).then(result => {
        if (result.code == 1) {
          dispatch(showFlashMessage(successPost("更新文章成功")));
          sucCb();
        } else {
          dispatch(postArticleFailure("更新文章失败稍后再试"));
        }
      });
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostArticle)
);
