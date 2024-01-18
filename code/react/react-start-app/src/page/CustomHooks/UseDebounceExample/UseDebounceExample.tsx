import { useState } from 'react';
import React from 'react';
import {useDebounceState} from "./useDebounceState";
import {useDebounceEffect} from "./useDebounceEffect";

export const UseDebounceExample = () => {
    // state example
    const [value, setValue] = useState("hello wrold");
    // 传递state，useDebounceState里面维护一个防抖后state，useEffect里面设置定时器更新防抖state
    const debounceValue = useDebounceState(value, 1000);

    // effect example
    const [number, setNumber] = useState(0);
    const [double, setDouble] = useState(0);
    /* 传递函数（副作用），useDebounceEffect维护变量refreshFlag，useEffect里面设置定时器更新refreshFlag
    refreshFlag更新触发函数，函数里面更新防抖state*/
    useDebounceEffect(
        () => {
            setDouble(number);

            return () => {
                console.log("销毁前num:", number);
            };
        },
        [number],
        1000
    );

    return (
        <div>
            <h1>State</h1>
            <input value={value} onChange={(e) => {
                setValue(e.target.value);
            }} />
            {/* 因为新建了一个state，这里展示防抖之后的数据 */}
            <span>debounceValue:{debounceValue}</span>
            <br/>
            <h1>Effect</h1>
            <input
                value={number}
                onChange={(e) => {
                    setNumber(Number(e.target.value));
                }}
            />
            <span>{double}</span>
        </div>
    );
};