import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, Route, hashHistory, Link, browserHistory} from 'react-router';

class App extends Component {
    render() {
        return (
            <div>
                <ul role="nav">
                    <li>
                        <a href="../list.html">List列表页面(a链接)</a>
                    </li>
                    <li>
                        <a href="../icon.html">Icon列表页面(a链接)</a>
                    </li>
                    <li>
                        <a href="../button.html">Button(a链接)</a>
                    </li>
                    <li>
                        <a href="../form.html">Form(a链接)</a>
                    </li>
                    <li>
                        <Link to="/about">About(Router链接)</Link>
                    </li>
                    <li>
                        <Link to="/repos">Repos(Router链接)</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

class Repos extends Component {
    render() {
        return (
            <div>Repos</div>
        );
    }
}

class About extends Component {
    render() {
        return (
            <div>About</div>
        );
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/home/index.html" component={App}/>
        <Route path="/repos" component={Repos}/>
        <Route path="/about" component={About}/>
    </Router>
), document.getElementById('root'));
