// https://blog.devgenius.io/how-to-better-poll-apis-in-react-312bddc604a4
import { useCallback, useRef } from 'react';

export default function useIntervalAsync <R = unknown>(fn: () => Promise<R>, ms: number = 2000) {
    const runningCount = useRef(0);
    const timeout = useRef<number>();
    const mountedRef = useRef(false);

    const counter = useRef(1);
    const startTime = useRef<number>();

    const next = useCallback(
        (handler: TimerHandler) => {
            if (mountedRef.current && runningCount.current === 0) {
                const nowTime = Date.now();
                const nextTime = startTime.current + counter.current * ms;
                timeout.current = window.setTimeout(handler, ms - (nowTime - nextTime));
                counter.current += 1;
            }
        },
        [ms],
    );

    // @ts-ignore
    const run = useCallback(async () => {
        runningCount.current += 1;
        await fn();
        runningCount.current -= 1;

        next(run);
    }, [fn, next]);

    const start = useCallback(() => {
        startTime.current = Date.now();
        mountedRef.current = true;
        run();
    }, [run]);

    const flush = useCallback(() => {
        window.clearTimeout(timeout.current);
        return run();
    }, [run]);

    const end = useCallback(() => {
        mountedRef.current = false;
        window.clearTimeout(timeout.current);
    }, [run]);

    return [start, flush, end];
};