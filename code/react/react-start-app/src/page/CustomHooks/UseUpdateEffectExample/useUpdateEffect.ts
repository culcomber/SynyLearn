import {useEffect, useRef} from "react";
import {useFirstMount} from "./useFirstMount";

export const useUpdateEffect = (effect: () => void, deps: Array<any>)=> {
    const isFirstMount = useFirstMount();

    // useEffect(callback, []) 与useMount不同，不是把回调函数直接传给useEffect
    // 初次渲染，isFirstMount为true，不会执行effect，后续渲染才会执行effect，并返回卸载的回调函数
    // 在下一次渲染之前，执行卸载函数
    useEffect(() => {
        if (!isFirstMount) {
            return effect();
        }
    }, deps)
}