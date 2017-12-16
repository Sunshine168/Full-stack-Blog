import React, { Component } from "react";
import PropTypes from "prop-types";
import ArtilceList from "../component/ArticleList";
/*
 控制文章列表的加载
 */
export default class AccessArticles extends Component {
  static propTypes = {
    article: PropTypes.object,
    user: PropTypes.object,
    showFlashMessage: PropTypes.func,
    initArticles: PropTypes.func,
    startProgress: PropTypes.func,
    finishProgress: PropTypes.func,
    redirect: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }
  _avaterHandle() {
    var myPicture = document.getElementById("avater");
    if (myPicture.src == "avatar") {
      myPicture.src = "/avatar/loading.gif";
    }
  }
  componentDidMount() {
    (async function() {
      /*两种入口,一种入口是通过查看某个用户直接url跳转,另外一种是登录后跳转首页(参数里传递登录的用户id)*/
      var userId = this.props.match.params.userId,
        id = userId ? userId : this.props.user._id;
      await this.props.initArticles(id);
      let { author } = this.props;
      //处理获取文章结果
      if (author) {
        if (userId) {
          this.setState({
            currentUser: id == this.props.user._id ? this.props.user._id : null
          });
          console.log(this.state);
        } else {
          this.setState({
            currentUser: id
          });
        }
      } else {
        //获取失败
        var pathname = "/";
        let redirectState = { from: this.props.location };
        this.props.redirect(pathname, redirectState);
        this.props.showFlashMessage({
          msg: "用户不存在",
          msgType: "danger"
        });
      }
    }.bind(this)());
  }
  render() {
    let { articles, user } = this.props,
      currentUser = this.state.currentUser;
    return (
      <div className="article_container">
        <div className="author_intro">
          <img
            className="author_logo"
            src={user ? user.avatar : ""}
            id="avater"
          />
          <h3>{user ? user.name : "loading"}</h3>
        </div>
        <ArtilceList articles={articles} currentUser={currentUser} />
      </div>
    );
  }
}
