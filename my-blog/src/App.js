import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import logo from './logo.svg';
import Header from './containers/Header';
import Login from './containers/Login';
import Register from './containers/Register';
import ArticleList from './component/ArticleList'
import './css/common.css';
const fakeAuth = {
  isAuthenticated: false,
  user:"",
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}
const App = () => (
  <Router>
    <div className="container">
      <Header/>
      <Route exact path="/" component={TestScreen}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </div>
  </Router>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

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
export default App;
