import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock
} from "react-bootstrap";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Markdown from "react-markdown";
/*
mode 1 代表发表文章
mode 2 代表编辑文章
 */
export default class PostArticle extends Component {
  static propTypes = {
    user: PropTypes.object,
    postingArticle: PropTypes.object,
    initEditArticle: PropTypes.func,
    updateArticle: PropTypes.func,
    postResult: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
      context: props.context || "",
      mode: 1,
      titleValid: null,
      titleHelp: "",
      contextValid: null,
      contextHelp: ""
    };
  }

  componentDidMount() {
    let { articleId } = this.props.match.params,
      { initEditArticle } = this.props;
    if (articleId) {
      this.setState({
        articleId
      });
      initEditArticle(articleId);
    }
  }
  componentWillReceiveProps(nextProps) {
    let { article } = nextProps.postArticle;
    if (article) {
      this.setState({
        aritcleId: article._id,
        mode: 2,
        title: article.title,
        context: article.content
      });
    }
  }
  //发表文章的网络请求
  _postArticle = () => {
    let { title, context, titleValid, contextValid } = this.state,
      valid,
      isRedirect = true;
    //检查数据有效性
    if (titleValid === "success" && contextValid === "success") {
      this.props.addArticle(
        {
          article: {
            title,
            context
          },
          user_id: this.props.user._id
        },
        () => {
          this.setState({ isRedirect });
        }
      );
    }
  };
  //更新文章的网络请求
  _updateArticle = () => {
    let { title, context, articleId } = this.state,
      result;
    if (title == "") {
    } else {
      if (context == "") {
      } else {
        this.props.updateArticle(
          {
            articleId,
            title,
            context
          },
          () => {
            this.setState({
              isRedirect: true
            });
          }
        );
      }
    }
  };

  /*检验标题*/
  _checkTitle(value) {
    this.setState({
      titleValid: null,
      titleHelp: ""
    });
    if (value.length == 0) {
      this.setState({
        titleValid: "error",
        titleHelp: "标题不能为空"
      });
    } else {
      this.setState({
        titleValid: "success"
      });
    }
  }
  /*检验内容*/
  _checkContext(value) {
    this.setState({
      contextValid: null,
      contextHelp: ""
    });
    if (value.length == 0) {
      this.setState({
        contextValid: "error",
        contextHelp: "内容不能为空"
      });
    } else {
      this.setState({
        contextValid: "success"
      });
    }
  }
  render() {
    /*比对user._id 和article.author._id*/
    if (this.state.isRedirect == true) {
      return (
        <Redirect
          to={{
            pathname: "/personal/index",
            state: { from: this.props.location }
          }}
        />
      );
    }
    let { title, context } = this.state;
    const { posting } = this.props;
    return (
      <div className="article_container">
        <img className="author_logo" />
        <div className="article_editing_wrap">
          <section className="article_context">
            <FieldGroup
              id="formControlsText"
              type="text"
              label="标题"
              placeholder="Enter text"
              value={title}
              onChange={event => this.setState({ title: event.target.value })}
              validationState={this.state.titleValid}
              help={this.state.titleHelp}
              onBlur={event => this._checkTitle(event.target.value)}
            />

            <FormGroup
              controlId="formControlsTextarea"
              validationState={this.state.contextValid}
            >
              <div className="article_markdown_wrapper">
                <ControlLabel>内容</ControlLabel>
                <div className="article_markdown_panel">
                  <FormControl
                    componentClass="textarea"
                    placeholder="textarea"
                    className="article_markdown_input"
                    onChange={event =>
                      this.setState({ context: event.target.value })
                    }
                    onBlur={event => this._checkContext(event.target.value)}
                    style={{ height: 200 }}
                    value={context}
                  />
                  <Markdown
                    className="article_markdown_result"
                    source={this.state.context}
                  />
                </div>
                {this.state.contextHelp && (
                  <HelpBlock>{this.state.contextHelp}</HelpBlock>
                )}
              </div>
            </FormGroup>
          </section>
          {this.state.mode === 1 ? (
            <Button
              disabled={posting == "loading"}
              componentClass="foot_btn"
              onClick={() => this._postArticle()}
            >
              发送
            </Button>
          ) : null}
          {this.state.mode == 2 ? (
            <Button
              componentClass="foot_btn"
              onClick={() => this._updateArticle()}
            >
              完成
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
}
//返回表单元素组
function FieldGroup({ id, label, validationState, help, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
