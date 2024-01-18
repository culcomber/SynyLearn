import {useRef} from "react";

export const useLatestState = <T>(value: T): { current: T } => {
    const ref = useRef(null);
    ref.current = value;
    return ref;
};