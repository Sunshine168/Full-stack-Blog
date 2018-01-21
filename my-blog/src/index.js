import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./css/common.css";
import "./css/article.css";
import "./css/comment.css";


class MyBlog extends React.Component {
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
  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<MyBlog />,document.getElementById("root"));
