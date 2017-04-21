import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Label extends Component {
    render() {
        const { className, children, ...others } = this.props;
        const cls = classNames({
            mfui_label: true,
            [className]: className
        });

        return (
            <label className={cls} {...others}>{children}</label>
        );
    }
};
