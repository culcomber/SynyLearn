import {EffectCallback, useEffect, useState} from "react";

export const useDebounceState = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    // 新建state延缓更新，停止点击后 delay后 才执行真正赋值
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    },[value, delay])

    return debouncedValue;
};