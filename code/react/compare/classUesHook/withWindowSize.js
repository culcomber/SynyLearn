// 利用高阶组件的模式，将Hooks 封装成高阶组件，从而让类组件使用
import React from 'react';
import { useWindowSize } from './useWindowSize';
export const withWindowSize = (Comp) => {
    return props => {
        const windowSize = useWindowSize();
        return <Comp windowSize={windowSize} {...props} />;
    };
};