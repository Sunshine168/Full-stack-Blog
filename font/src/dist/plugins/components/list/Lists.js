import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Lists extends Component {
    static propTypes = {
        radio: React.PropTypes.bool,
        checkbox: React.PropTypes.bool
    };

    static defaultProps = {
        radio: false,
        checkbox: false
    };

    render() {
        const { children, className, link, radio, checkbox, ...others } = this.props;
        const cls = classNames({
            mfui_lists: true,
            mfui_lists_access: link,
            [className]: className
        });

        return (
            <div className={cls} {...others}>{children}</div>
        );
    }
}
