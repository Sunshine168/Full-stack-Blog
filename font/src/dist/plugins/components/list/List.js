import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class List extends Component {
    static propTypes = {
        vcode: PropTypes.bool,
        warn: PropTypes.bool
    };

    static defaultProps = {
        vcode: false,
        warn: false
    };

    render() {
        const { className, children, ...others } = this.props;
        const Component = this.props.href ? 'a' : this.props.htmlFor ? 'label' : 'div';
        const style = classNames({
            mfui_list: true,
            mfui_vcode: this.props.vcode,
            mfui_cell_warn: this.props.warn,
            [className]: className
        });
        return (
            <Component className={style} {...others}>{children}</Component>
        );
    }
}
