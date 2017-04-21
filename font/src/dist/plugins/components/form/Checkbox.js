import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Checkbox extends Component {
    render() {
        const { className, ...others } = this.props;
        const cls = classNames({
            mfui_check: true,
            [className]: className
        });
        return (
            <div>
                <input className={cls} type="checkbox" {...others}/>
                <i className="mfui_icon_checked"></i>
            </div>
        );
    }
};
