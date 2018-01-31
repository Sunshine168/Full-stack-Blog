import React, { Component } from "react";
import { StyleRoot } from "radium";
import { Provider } from "react-redux";
import { push } from 'react-router-redux'

import configureStore from "./store/store";
import AppRouter from "./router";
import emitter from './util/event-emitter'
import { loginOut } from './reducer/user'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      store:configureStore(()=>{
        this.setState({
          loading:false,
        },()=>{
          let loading = document.getElementById('loading');
          loading.style.display="none";
        })
      }),
    };
  }
  componentDidMount = () =>{
    emitter.on('USER_INVALID',()=>{
      this.state.store.dispatch(loginOut())
      this.state.store.dispatch(push('/login'))
    })
  }
  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <StyleRoot>
        <Provider store={this.state.store}>
          <AppRouter />
        </Provider>
      </StyleRoot>
    );
  }
}
