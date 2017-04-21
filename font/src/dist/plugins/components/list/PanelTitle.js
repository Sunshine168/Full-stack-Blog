import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class PanelTitle extends Component {
    render() {
        const { className, children, ...others } = this.props;
        const style = classNames({
            mfui_panel_title: true,
            [className]: className
        });
        return (
            <div className={style} {...others}>{children}</div>
        );
    }
}
