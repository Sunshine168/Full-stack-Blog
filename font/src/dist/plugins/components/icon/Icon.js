import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Icon extends Component {
    static propTypes = {
        value: PropTypes.string,
        size: PropTypes.string
    };

    static defaultProps = {
        value: 'success',
        size: 'small'
    };

    render() {
        const { value, size, className, ...others } = this.props;
        const cls = classNames({
            ['mfui_icon_' + value]: true,
            mfui_icon_msg: size === 'large',
            [className]: className
        });

        if (value === 'loading') {
            return (
                <div className="mfui_loading">
                    {
                        [...Array(12)].map((x, i) => {
                            return (
                                <div key={i} className={`mfui_loading_leaf mfui_loading_leaf_${i}`}></div>
                            );
                        })
                    }
                </div>
            );
        } else {
            return (
                <i {...others} className={cls}/>
            );
        }
    }
};
