import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Input extends Component {
    render() {
        const { className, ...others } = this.props;
        const cls = classNames({
            mfui_input: true,
            [className]: className
        });

        return (
            <input className={cls} {...others}/>
        );
    }
};
