import PostArticle from "../component/PostArticle";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { showFlashMessage, removeFlashMessage } from "../reducer/flashMessage";
import {
  initEditArticle,
  postArticleStarted,
  postArticleSuccess,
} from "../reducer/postArticle";
import { addPost, fetchEditPost, updatePost } from "../service/fetch";
import { toast } from 'react-toastify';

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
        const {data} = result
        if (data) {
          let post = data.post;
          dispatch(initEditArticle(post));
        } 
      });
    },
    addArticle: (article, sucCb) => {
      return addPost(article).then(result => {
        const {data} = result
        if (data) {
          dispatch(postArticleSuccess(result.post));
          toast("发表文章成功");
          sucCb();
        } 
      });
    },
    startPostArticle: () => {
      dispatch(postArticleStarted());
    },
    updateArticle: (params, sucCb) => {
      return updatePost(params).then(result => {
        const {data} = result
        if (data) {
          toast("文章更新成功")
          sucCb();
        }
      });
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostArticle)
);
