import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Button extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        type: PropTypes.string,
        size: PropTypes.string
    };

    static defaultProps = {
        disabled: false,
        type: 'primary',
        size: 'normal'
    };

    render() {
        const { type, size, disabled, plain, className, children, ...others } = this.props;
        const Component = this.props.href ? 'a' : 'button';
        const cls = classNames({
            mfui_btn: true,

            mfui_btn_primary: type === 'primary' && !plain,
            mfui_btn_default: type === 'default' && !plain,
            mfui_btn_warn: type === 'warn',

            mfui_btn_plain_primary: type === 'primary' && plain,

            mfui_btn_plain_default: type === 'default' && plain,

            mfui_btn_mini: size === 'small',

            mfui_btn_disabled: disabled,

            [className]: className
        });

        return (
            <Component {...others} className={cls}>{children}</Component>
        );
    }
};
