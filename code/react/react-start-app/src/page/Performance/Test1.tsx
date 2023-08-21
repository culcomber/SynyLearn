import {Component} from "react";
import React from 'react';

export default class Test1 extends Component {
    state = {
        num: 1,
        times: 1,
    }

    onClick = () => {
        console.log('state 1', this.state.times);
        this.setState({
            num: this.state.num + 1,
        });

        console.log('state 2', this.state.times);
        this.setState({
            times: this.state.times + 1,
        });

        console.log('state 3', this.state.times);
    }

    onClicksetTimeout = () => {
        setTimeout(() => {
            console.log('state 1', this.state.times);
            this.setState({
                num: this.state.num + 1,
            });
            console.log('state 2', this.state.times);
            this.setState({
                times: this.state.times +1,
            });
            console.log('state 3', this.state.times);
        }, 0);
    }

    render() {
        console.log('render');
        const { num, times } = this.state
        return (
            <div>
                组件1
                <button onClick={this.onClick}>更新</button>
                <button onClick={this.onClicksetTimeout}>更新setTimeout</button>
                <div>
                    num:{num}
                </div>
                <div>
                    times:{times}
                </div>
            </div>
        );
    }
}