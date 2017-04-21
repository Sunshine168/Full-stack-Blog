import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Select extends Component {
    static propTypes = {
        data: PropTypes.array
    };

    static defaultProps = {
        data: []
    };

    renderData(data) {
        return data.map((item, i) => {
            return <option
                    key={i}
                    value={item.value}
                    {...item}
                    >
                        {item.label}
                   </option>;
        });
    }

    render() {
        const { className, data, children, ...others } = this.props;
        const cls = classNames({
            mfui_select: true,
            [className]: className
        });

        return (
            <div className="mfui_select_arrow">
                <select className={cls} {...others}>
                    {data.length > 0 ? this.renderData(data) : children}
                </select>
            </div>
        );
    }
};
