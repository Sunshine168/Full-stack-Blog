import { connect } from "react-redux";
import CommentInput from "../component/CommentInput";
import { showFlashMessage } from "../reducer/flashMessage";
import { addComment } from "../reducer/comment";
import { withRouter } from "react-router-dom";
import redirect from "../hight-order-component/redirect";
import {
  addComment as addCommentFetch,
  deleteComment as deleteCommentFetch
} from "../service/fetch";

const mapStateToProps = state => state.login;

const mapDispatchToProps = dispatch => {
  return {
    showFlashMessage: message => {
      dispatch(showFlashMessage(message));
    },
    addComment: (comment, user, sucCb) => {
      return addCommentFetch(comment).then(result => {
        const { code, data } = result;
        if (code == 1) {
          dispatch(
            showFlashMessage({
              msgType: "success",
              msg: "评论发表成功"
            })
          );
          sucCb();
          dispatch(addComment(result.comment));
        } else {
          dispatch(
            showFlashMessage({
              msgType: "danger",
              msg: "评论发表失败"
            })
          );
        }
      });
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(redirect(CommentInput))
);
