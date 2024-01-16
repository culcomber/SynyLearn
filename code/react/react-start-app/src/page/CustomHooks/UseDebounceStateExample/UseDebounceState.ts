import { EffectCallback, useEffect } from "react";

export const useDebounceState = (callback: EffectCallback) => {
    useEffect(callback, []);
};