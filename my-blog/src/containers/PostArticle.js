import React, { Component } from 'react';
import PostArticle from '../component/Article';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';


export default withRouter(connect()(PostArticle));
