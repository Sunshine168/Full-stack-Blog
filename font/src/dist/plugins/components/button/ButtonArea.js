import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class ButtonArea extends React.Component {
    static propTypes = {
        direction: React.PropTypes.string
    };

    static defaultProps = {
        direction: 'vertical'
    };

    render() {
        const { direction, children } = this.props;
        const className = classNames({
            mfui_btn_area: true,
            mfui_btn_area_inline: direction === 'horizontal'
        });

        return (
            <div className={className}>
                {children}
            </div>
        );
    }
};
