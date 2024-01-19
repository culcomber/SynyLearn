import {useRef, useState} from "react";
import {useUnmount} from "../UseUnmountExample/useUnmount";
import {useUpdateEffect} from "../UseUpdateEffectExample/useUpdateEffect";

export const useThrottleEffect = (fn: any, args: any, delay = 200) => {
    console.log('-----------useThrottleEffect-------------')
    const [state, setState] = useState<any>(null);
    const timeout11 = useRef<ReturnType<typeof setTimeout>>();
    const nextArgs = useRef<any>();

    useUpdateEffect(() => {
        if (timeout11.current) {
            nextArgs.current = args;
        } else {
            setState(fn(...args));
            const timeoutCallback = () => {
                if (nextArgs.current) {
                    setState(fn(...nextArgs.current));
                    nextArgs.current = undefined;
                }
                timeout11.current = undefined;
            }
            timeout11.current = setTimeout(timeoutCallback, delay);
        }
    }, [args]);

    useUnmount(() => {
        timeout11.current && clearTimeout(timeout11.current);
    });

    return state;
}