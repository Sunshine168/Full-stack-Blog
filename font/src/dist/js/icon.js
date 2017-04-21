import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import icon from '../plugins/components/icon/';

const { Icon } = icon;

class ListDemo extends Component {
    render() {
        return (
            <div>
                <Icon size="large" value="success" />
                <Icon size="large" value="info" />
                <Icon size="large" value="warn" />
                <Icon size="large" value="waiting" />
                <Icon size="large" value="safe_success" />
                <Icon size="large" value="safe_warn" />

                <div className="icon_sp_area">
                    <Icon value="success" />
                    <Icon value="success_circle" />
                    <Icon value="success_no_circle" />
                    <Icon value="info" />
                    <Icon value="waiting" />
                    <Icon value="waiting_circle" />
                    <Icon value="circle" />
                    <Icon value="warn" />
                    <Icon value="download" />
                    <Icon value="info_circle" />
                    <Icon value="cancel" />
                    <Icon value="clear" />
                </div>
            </div>

        );
    }
}

render(<ListDemo/>, document.getElementById('demo'));
