import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import list from '../plugins/components/list/';
import form from '../plugins/components/form/';

import vsCode from './../img/vcode.jpg';

const { ListTitle, Lists, List, ListContent, ListOther, ListIcon } = list;
const { Label, Input, Select, Textarea } = form;

class FormDemo extends Component {
    render() {
        return (
            <div>
                {/*表单输入框*/}
                <ListTitle >表单输入框</ListTitle>
                <Lists>
                    <List>
                        <ListIcon>
                            <Label>qq</Label>
                        </ListIcon>
                        <ListContent>
                            <Input type="tel" placeholder="请输入qq号"/>
                        </ListContent>
                    </List>
                    <List vcode={true}>
                        <ListIcon>
                            <Label>验证码</Label>
                        </ListIcon>
                        <ListContent>
                            <Input type="tel" placeholder="请输入验证码"/>
                        </ListContent>
                        <ListOther>
                           <img src={vsCode} />
                        </ListOther>
                    </List>
                    <List vcode={true} warn={true}>
                        <ListIcon>
                            <Label>验证码</Label>
                        </ListIcon>
                        <ListContent>
                            <Input type="tel" placeholder="请输入验证码"/>
                        </ListContent>
                        <ListOther>
                           <img src={vsCode} />
                        </ListOther>
                    </List>
                </Lists>
                {/*带选择的表单输入框*/}
                <ListTitle >带选择的表单输入框</ListTitle>
                <Lists>
                    <List>
                        <ListIcon>
                            <Select>
                                <option value="1">+86</option>
                                <option value="2">+80</option>
                                <option value="3">+84</option>
                                <option value="4">+87</option>
                            </Select>
                        </ListIcon>
                        <ListContent>
                            <Input type="tel" placeholder="请输入手机号码"/>
                        </ListContent>
                    </List>
                    <List>
                        <ListIcon>
                            国家/地区
                        </ListIcon>
                        <ListContent>
                            <Select>
                                <option value="1">中国</option>
                                <option value="2">美国</option>
                            </Select>
                        </ListContent>
                    </List>
                    <List>
                        <ListContent>
                            <Select>
                                <option value="1">身份证</option>
                                <option value="2">老年证</option>
                            </Select>
                        </ListContent>
                    </List>
                </Lists>
                {/*文本域*/}
                <ListTitle >文本域</ListTitle>
                <Lists>
                    <List>
                        <ListContent>
                            <Textarea placeholder="请输入评论" rows="3" maxlength="200" />
                        </ListContent>
                    </List>
                </Lists>
            </div>

        );
    }
}

render(<FormDemo/>, document.getElementById('demo'));
