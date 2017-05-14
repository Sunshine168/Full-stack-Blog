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
import PostArticle from './containers/PostArticle'
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

const mapStateToProps = (state)=>{
  return {
    login:state.login
  }
}
const PrivateRoute = ({ component: Component,auth, ...rest }) => (
  <Route {...rest} render={props => (
    auth.user ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

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
