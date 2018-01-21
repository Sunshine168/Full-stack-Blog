import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { StyleRoot } from "radium";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

import logo from "./logo.svg";
import Header from "./container/Header";
import Login from "./container/Login";
import Register from "./container/Register";
import AccessArticles from "./container/AccessArticles";
import PostArticle from "./container/PostArticle";
import AccessArticle from "./container/AccessArticle";
import NoMatch from "./component/NoMatch";
import ProgressBars from "./container/ProgressBars";
import Index from "./component/Index";
import "./css/common.css";

//auth 处理需要登录的路由
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

//用户主页
const UserIndex = ({ match }) => (
  <Route path={`${match.url}/:userId`} component={AccessArticles} />
);
//编辑文章
const EditArticle = ({ match }) => (
  <Route path={`${match.url}/:articleId`} component={PostArticle} />
);
//查看文章页面
const ArticleDetail = ({ match }) => (
  <Route path={`${match.url}/:articleId`} component={AccessArticle} />
);
const mapStateToProps = state => {
  return {
    login: state.login
  };
};
/*
处理服务器重定向问题与404
 */
const RedirectFromServer = ({ match }) => {
  //deal the sever redirect
  let url = window.location.search;
  return url.substring(1) ? (
    <Redirect
      to={{
        pathname: url.substring(1),
        state: { from: "/" }
      }}
    />
  ) : (
    <NoMatch />
  );
};
class App extends Component {
  render() {
    let auth = this.props.login;
    return (
      <StyleRoot>
        <Router>
          <div>
            <ProgressBars />
            <div className="container">
              <Header />
              <Switch>
                <Route exact path="/index" component={Index} />
                <Route path="/login" component={Login} />
                <Route path="/loginOut" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/user" component={UserIndex} />
                <Route path="/article" component={ArticleDetail} />
                <PrivateRoute
                  path="/edit/article"
                  component={EditArticle}
                  auth={auth}
                />
                <PrivateRoute
                  path="/personal/index"
                  component={AccessArticles}
                  auth={auth}
                />
                <PrivateRoute
                  path="/postArticle"
                  component={PostArticle}
                  auth={auth}
                />
                <Route path="/" component={RedirectFromServer} />
              </Switch>
            </div>
            <ToastContainer />
          </div>
        </Router>
      </StyleRoot>
    );
  }
}

export default connect(mapStateToProps)(App);
