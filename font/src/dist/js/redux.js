import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import createLogger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { Provider } from 'react-redux';
import style from '../css/temp.css';

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter, devToolsEnhancer({ realtime: true }));

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
    console.log(store.getState())
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    clickAddHandler(event) {
        // 改变内部 state 惟一方法是 dispatch 一个 action。
        // action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
        store.dispatch({ type: 'INCREMENT' });
        this.setState({ count: (this.state.count + 1) });
    }
    clickDownHandler(event) {
        store.dispatch({ type: 'DECREMENT' });
        this.setState({ count: (this.state.count - 1) });
    }
    render() {
        let count = this.state.count;
        return (
            <div className={style.timeWrap}>
               <div className={style.timeNum}>{count}</div>
               <ul>
                  <li><button onClick={this.clickAddHandler.bind(this)}>+</button></li>
                  <li><button onClick={this.clickDownHandler.bind(this)}>-</button></li>
               </ul> 
            </div>
        );
    }
}

render(<App/>, document.getElementById('root'));
