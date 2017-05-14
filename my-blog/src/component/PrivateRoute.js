import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
// export const PrivateRoute = ({ component: Component, ...rest }) => {
//
// return (  <Route {...rest} render={props => (
//   this.props.login.user? (
//     <Component {...props}/>
//   ) : (
//     <Redirect to={{
//         pathname: '/login',
//       state: { from: props.location }
//     }}/>
//   )
// )}/>)
// }

export default class PrivateRoute extends Component {
  // static propTypes=({
  //   login:PropTypes.object,
  //   loginIn:PropTypes.func,
  //   showFlashMessage:PropTypes.func,
  //   removeFlashMessage:PropTypes.func,
  // })
  //
componentWillReceiveProps(nextProps){

}
  render(){
    console.log(this.props)
    //取出路由所需要的参数
    let {component:ToComponent,location,history} = this.props,
    //取出redux 共享的用户状态
   loginStatus = this.props.login.user;
    return (<Route
      location={location}
      history={history}
      render={props => (
        this.props.login.user? (
          <ToComponent {...this.props}/>
        ) : (
          <Redirect to={{
              pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>)
  }
}
