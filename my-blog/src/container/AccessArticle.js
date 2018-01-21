import { connect } from "react-redux";
import AccessArticle from "../component/AccessArticle";
import redirect from "../hight-order-component/redirect";
import { showFlashMessage, removeFlashMessage } from "../reducer/flashMessage";
import { initComments } from "../reducer/comment";
import {
  initLoadArticle,
  setCurrent,
  fetchArticleFail
} from "../reducer/loadArticle";
import { fetchPost } from "../service/fetch";

const mapStateToProps = state => (state.login, state.loadArticle);
const mapDispatchToProps = (dispatch, getState) => {
  return {
    showFlashMessage: message => {
      dispatch(showFlashMessage(message));
    },
    removeFlashMessage: () => {
      dispatch(removeFlashMessage);
    },
    initComments: comments => {
      dispatch(initComments(comments));
    },
    fetchArticle: articleId => {
      return fetchPost(articleId).then(result => {
        const { code, data } = result;
        //通过结果码以及结果判断是否本文章作者
          const { post, current, comments } = data;
          dispatch(initLoadArticle(post));
          //判断用户状态以及是否本文章用户
          if (current) {
            dispatch(setCurrent(current));
          }
          dispatch(initComments(comments));
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccessArticle);
