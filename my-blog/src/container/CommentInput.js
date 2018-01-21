import { connect } from "react-redux";
import { toast } from 'react-toastify';

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
        const { data } = result;
        if (data) {
          sucCb();
          toast.success("发表评论成功",{position:toast.position.TOP_RIGHT})
          dispatch(addComment(data.comment));
        }
      });
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(redirect(CommentInput))
);
