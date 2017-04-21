import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import list from '../plugins/components/list/';
import form from '../plugins/components/form/';

import iconSrc from './../img/icons/icon_right.png';

const {
    ListTitle,
    Lists,
    List,
    ListContent,
    ListOther,
    ListIcon,
    PanelTitle
} = list;
const {Radio, Checkbox, Switch} = form;

class ListDemo extends Component {
    render() {
        return (
            <div>
                {/*普通的标题文本列表*/}
                <ListTitle >普通的标题列表</ListTitle>
                <Lists>
                    <List>asdasd</List>
                    <List>asdasd</List>
                </Lists>
                {/*带链接跳转的文本列表*/}
                <ListTitle>普通的标题列表</ListTitle>
                <Lists link>
                    <List href="//baidu.com">
                        <ListContent>百度</ListContent>
                        <ListOther>更多</ListOther>
                    </List>
                    <List href="//qq.com">
                        <ListContent>QQ</ListContent>
                        <ListOther>更多</ListOther>
                    </List>
                </Lists>
                {/*左右两边列表标题文字*/}
                <ListTitle>左右两边列表标题文字</ListTitle>
                <Lists>
                    <List>
                        <ListContent>左侧文字</ListContent>
                        <ListOther>右侧文字</ListOther>
                    </List>
                    <List>
                        <ListContent>左侧文字</ListContent>
                        <ListOther>右侧文字</ListOther>
                    </List>
                </Lists>
                {/*带图表的列表标题文字*/}
                <ListTitle>左右两边列表标题文字</ListTitle>
                <Lists>
                    <List>
                        <ListIcon>
                            <img src={iconSrc} alt="" style={{
                                display: 'block',
                                width: '20px',
                                marginRight: '5px'
                            }}/>
                        </ListIcon>
                        <ListContent>左侧文字</ListContent>
                        <ListOther>右侧文字</ListOther>
                    </List>
                    <List>
                        <ListIcon>
                            <img src={iconSrc} alt="" style={{
                                display: 'block',
                                width: '20px',
                                marginRight: '5px'
                            }}/>
                        </ListIcon>
                        <ListContent>左侧文字</ListContent>
                        <ListOther>右侧文字</ListOther>
                    </List>
                </Lists>
                {/*单选列表*/}
                <ListTitle>单选列表</ListTitle>
                <Lists>
                    <List>
                        <ListContent>左侧文字</ListContent>
                        <ListOther>
                            <Radio name="radio1" value="1" defaultChecked/>
                        </ListOther>
                    </List>
                    <List>
                        <ListContent>左侧文字</ListContent>
                        <ListOther>
                            <Radio name="radio1" value="2"/>
                        </ListOther>
                    </List>
                </Lists>

                {/*多选列表*/}
                <ListTitle>多选列表</ListTitle>
                <Lists>
                    <List>
                        <ListIcon>
                            <Checkbox name="checkbox1" value="1"/>
                        </ListIcon>
                        <ListContent>左侧文字</ListContent>
                    </List>
                    <List>
                        <ListIcon>
                            <Checkbox name="checkbox1" value="1"/>
                        </ListIcon>
                        <ListContent>左侧文字</ListContent>
                    </List>
                </Lists>

                {/*开关*/}
                <ListTitle>开关</ListTitle>
                <Lists>
                    <List>
                        <ListContent>左侧文字</ListContent>
                        <ListOther>
                            <Switch/>
                        </ListOther>
                    </List>
                </Lists>

                {/*文字组合列表*/}
                <ListTitle>文字组合列表</ListTitle>
                <Lists>
                    <List>
                        <PanelTitle>左侧文字</PanelTitle>
                    </List>
                    <List>
                        <ListContent>
                            内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字
                        </ListContent>
                    </List>
                </Lists>

            </div>

        );
    }
}

render(
    <ListDemo/>, document.getElementById('demo'));
