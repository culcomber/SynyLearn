import {DependencyList, EffectCallback, useEffect, useRef, useState} from "react";
import {useUpdateEffect} from "../UseUpdateEffectExample/useUpdateEffect";
import {useUnmount} from "../UseUnmountExample/useUnmount";

export const useDebounceEffect = (effect: EffectCallback, deps: DependencyList, delay = 1000) => {
    // 记录定时器
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    // 是否执行更新标志
    const [refreshFlag, setRefreshFlag] = useState(true);
    // 防抖处理，只有不点击后，delay之后，refreshFlag改变，触发useUpdateEffect
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setRefreshFlag(!refreshFlag);
        }, delay);

        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }, [...deps, delay]);
    useUpdateEffect(effect, [refreshFlag]);
    // 卸载时清除定时器
    useUnmount(() => () => timeoutRef.current && clearTimeout(timeoutRef.current));
}