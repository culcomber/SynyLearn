import {useEffect, useRef, useState} from "react";
import {useUpdateEffect} from "../UseUpdateEffectExample/useUpdateEffect";
import {useUnmount} from "../UseUnmountExample/useUnmount";

export const useThrottle = <T>(initialState: T, delay = 5000) => {
    console.log('==============useThrottle============')
    const [state, setState] = useState(initialState);
    const timeout = useRef<ReturnType<typeof setTimeout>>();
    // 因为Effect存在闭包存在，需要保存最新值
    const nextValue = useRef<any>(null);
    const hasNextValue = useRef(false);

    // 不要使用useEffect，不然初始化后timeout.current有值，且不会被timeoutCallback清除
    useUpdateEffect(() => {
        console.log('==============useEffect============', timeout.current)
        // 倒计时还在，存储传入state
        if (timeout.current) {
            console.log('==============useUpdateEffect 缓存值============', initialState);
            nextValue.current = initialState;
            hasNextValue.current = true;
        } else {
            console.log('==============useUpdateEffect 设置setState============', initialState);
            // 改变state
            setState(initialState);
            // 定时器清空state，进入改变state
            const timeoutCallback = () => {
                console.log('==============useUpdateEffect 回调函数============', hasNextValue.current);
                // 设置state之后，timeout为空，新的一轮不会进入上面条件的赋值，此时nextValue.current还是旧值
                // 这里通过hasNextValue这个标志，判断是旧值就跳过
                if (hasNextValue.current) {
                    setState(nextValue.current);
                    hasNextValue.current = false;
                }
                timeout.current = undefined;
            };
            timeout.current = setTimeout(timeoutCallback, delay);
        }
    }, [initialState]);

    useUnmount(() => {
        timeout.current && clearTimeout(timeout.current);
    });

    return state;
}