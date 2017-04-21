import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import classNames from 'classnames';
import Viewport from '../../lib/viewport.js';
import Style from '../../../css/components/style.css';

export default class Textarea extends Component {
    static propTypes = {
        showCounter: PropTypes.bool,
        defaultValue: PropTypes.string,
    };

    static defaultProps = {
        showCounter: true,
        defaultValue: undefined
    };

    state = {
        textCounter: this.props.defaultValue ? this.props.defaultValue.length : 0
    };

    handleChange(e) {
        this.setState({ textCounter: e.target.value.length });

        //forward event to props if any
        if (this.props.onChange) this.props.onChange(e);
    }

    render() {
        const { className, children, showCounter, maxlength, onChange, ...others } = this.props;
        const cls = classNames({
            mfui_textarea: true,
            [className]: className
        });

        return (
            <div>
                <textarea
                className={cls}
                maxLength={maxlength}
                onChange={this.handleChange.bind(this)}
                {...others}>
                    {children}
                </textarea>
                {
                    showCounter ?
                    <div className="mfui_textarea_counter">
                        <span>{this.state.textCounter}</span>{maxlength ? '/' + maxlength : false}
                    </div>
                    : false
                }
            </div>
        );
    }
};
