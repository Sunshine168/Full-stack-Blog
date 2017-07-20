# react-singleton

## Demo
You can find example in folder [example](https://github.com/Caesor/react-singleton/tree/master/example)

## Usage with React

### 1、Install the package
`npm install react-singleton --save`

### 2、Import component
```
// ES6
import Singleton from 'react-singleton'
// ES5
var Singleton = require('react-singleton').default
```

###3、Decorate the target component
```
class Alert extends Component {...}

export default new Singleton(Alert)
```

###4、Using as your need
```
// Example 1:

import Alert from 'component/Alert'

Alert.show();
// you can pass the props with a object in show method
Alert.show({
    title: xxx,
    content: xxx
})
// destroy the DOM node
Alert.hide();

// Example 2:

import Tips from 'components/Tips'

// Tips will disappear in 2 second on default.
Tips.popup();
// You can change the timer as you need
Tips.popup({
    text: xxx
}, 3000);
```
