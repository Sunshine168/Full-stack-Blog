import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

export default class Singleton {
    constructor(component){
        this.dom = null;
        this.component = component;
        this.instance = null;
    }

    show(option) {
        if(!this.dom) {
            this.dom = document.createElement('div');
            document.body.appendChild(this.dom);
        }else {
            this.dom.classList.remove('hide');
        }
        this.instance = render(<this.component {...option}/>, this.dom);
        this.instance.setState({
            show: true
        });
    }

    hide() {
        this.dom.classList.add('hide');

        if (this.instance) {
            this.instance.setState({
                show: false
            }, () => {
                setTimeout(() => {
                    unmountComponentAtNode(this.dom);
                }, 300);
            });
        }
    }
}
