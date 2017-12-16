import React, { Component } from "react";
import { connect } from "react-redux";
import { showFlashMessage } from "../reducer/flashMessage";
import { withRouter } from "react-router-dom";
import { deleteArticle, deleteMessage } from "../reducer/article";
import ArticleFoot from "../component/ArticleFoot";
import { deletePost } from "../service/fetch";
// const mapStateToProps = (state)=>(state.login)

const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: params => {
      return deletePost(params).then(result => {
        if (result.code == 1) {
          //删除成功
          dispatch(showFlashMessage({ msgType: "success", msg: "删除成功" }));
          //没有传index代表是查看单个页面——删除成功后需要跳转(重新加载列表)
          return true;
        } else {
          dispatch(showFlashMessage({ msgType: "warning", msg: "删除失败" }));
          return false;
        }
      });
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ArticleFoot));
