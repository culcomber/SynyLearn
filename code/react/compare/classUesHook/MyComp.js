import React from 'react';
import { withWindowSize } from './withWindowSize';
class MyComp {
    render() {
        const { windowSize } = this.props;
        if (windowSize === "small") return <SmallComponent />;
        else return <LargeComponent />;
    }
}
// 通过 withWindowSize 高阶组件给 MyComp 添加 windowSize 属性
export default withWindowSize(MyComp);