import {useEffect, useRef} from "react";
import {useLatestState} from "./useLatestState";

export const useUnmount = (fn: () => void) => {
    console.log('useUnmount')
    // useEffect 闭包，fn是Child初始化时传入，后续不会更新，读取不到最新的state
    /* useEffect(() => () => fn(), []); */

    /*// 借助ref
    const fnRef = useRef(null);
    // 每次Child重新render，都会重新调用useUnmount，传入最新的fn
    fnRef.current = fn;*/

    const fnRef = useLatestState(fn);
    useEffect(() => () => fnRef.current(), []);
}