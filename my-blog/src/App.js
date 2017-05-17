import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import {StyleRoot} from 'radium';
import {connect} from 'react-redux';
import logo from './logo.svg';
import Header from './containers/Header';
import Login from './containers/Login';
import Register from './containers/Register';
import ArticleList from './containers/ArticleList'
import FlashMessage from './containers/FlashMessage'
import {PostArticle} from './containers/PostArticle'
import Article from './containers/Article'
import LoadArticle from './containers/LoadArticle'
import './css/common.css';
const TestScreen = ()=>(
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
)


//auth 处理需要登录的路由
const PrivateRoute = ({ component: Component,auth, ...rest }) => {
return (  <Route {...rest} render={props => (
  auth.user ? (
    <Component {...props}/>
  ) : (
    <Redirect to={{
        pathname: '/login',
      state: { from: props.location }
    }}/>
  )
)}/>)
}


//用户主页
const UserIndex = ({ match })=>(
  <Route
    path={`${match.url}/:userId`}
    component={ArticleList}/>
)
//编辑文章
const EditArticle = ({ match }) => (
    <Route path={`${match.url}/:articleId`} component={PostArticle}/>
)
//查看文章页面
const  ArticleDetail = ({match})=>(
  <Route path={`${match.url}/:articleId`} component={LoadArticle}/>
)
const mapStateToProps = (state)=>{
  return {
    login:state.login
  }
}

class App extends Component {
   constructor(props){
     super(props);

   }
   render(){
     let auth = this.props.login
     return (
       <StyleRoot>
         <Router>
           <div className="container">
             <Header/>
             <FlashMessage/>
             <Route exact path="/" component={TestScreen}/>
             <Route path="/login" component={Login}/>
             <Route path="/loginOut" component={Login}/>
             <Route path="/register" component={Register}/>
             <Route path="/user" component={UserIndex}/>
             <Route path="/article" component={ArticleDetail}/>
             <PrivateRoute path="/article/edit"
               component={EditArticle}
               auth ={auth}
             />
             <PrivateRoute
               path="/personal/index"
               component={ArticleList}
               auth ={auth}
             />
             <PrivateRoute
               path="/postArticle"
               component={PostArticle}
               auth ={auth}
             />
           </div>
         </Router>
       </StyleRoot>)
   }

}

export default connect(mapStateToProps)(App);
