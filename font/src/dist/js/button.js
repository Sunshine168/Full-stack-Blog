import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import button from '../plugins/components/button/';
import icon from '../plugins/components/icon/';

const { Button, ButtonArea } = button;
const { Icon } = icon;

class FormDemo extends Component {
    render() {
        return (
            <div>
                {/*表单输入框*/}
                <ButtonArea>
                     <Button>按钮</Button>
                    <Button disabled>按钮</Button>
                    <Button type="warn">按钮</Button>
                    <Button type="warn" disabled>按钮</Button>
                    <Button type="default">按钮</Button>
                    <Button type="default" disabled>按钮</Button>
                    <Button type="default"><Icon value="info_circle" />按钮</Button>
                </ButtonArea>

                <div className="button_sp_area">
                    <Button type="primary" plain>按钮</Button>
                    <Button type="default" plain>按钮</Button>
                    <Button size="small">按钮</Button>
                    <Button type="default" size="small">按钮</Button>
                    <Button size="small"><Icon value="cancel" />按钮</Button>
                    <Button type="default" size="small"><Icon value="cancel" />按钮</Button>
                </div>
            </div>

        );
    }
}

render(<FormDemo/>, document.getElementById('demo'));
