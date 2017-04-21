import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Switch extends Component {

    render() {
        const { className, ...others } = this.props;
        const cls = classNames({
            mfui_switch: true,
            [className]: className
        });

        return (
            <input className={cls} type="checkbox" {...others}/>
        );
    }
};
