import {useRef} from "react";

export const useFirstMount = () => {
    const isFirst = useRef(true);

    // 初始化为true 所以初次渲染就会进入这个条件判断
    if (isFirst.current) {
        // 设置为false 后面渲染进不了这里
        isFirst.current = false;
        return true;
    }

    return isFirst.current;
}