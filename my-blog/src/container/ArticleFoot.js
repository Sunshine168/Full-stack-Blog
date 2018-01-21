import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ArticleFoot from "../component/ArticleFoot";
import { deletePost } from "../service/fetch";
import { toast } from 'react-toastify';

const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: ({sucCb,...params}) => {
      return deletePost(params).then(res => {
      const { data } = res
      if(data){
        toast.success("删除成功", {
          position: toast.POSITION.TOP_RIGHT
        });
        sucCb()
      }
      });
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ArticleFoot));
