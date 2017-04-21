import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Radio extends Component {
    render() {
        const { className, ...others } = this.props;
        console.log(...others);
        const cls = classNames({
            mfui_radio: true,
            [className]: className
        });
        return (
            <div>
                <input className={cls} type="radio" {...others}/>
                <span className="mfui_icon_radiobox"></span>
            </div>
        );
    }
};
