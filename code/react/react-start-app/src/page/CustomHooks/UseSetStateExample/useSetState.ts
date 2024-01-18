import { useState } from 'react';

export const useSetState = (initialState: any | (() => any)) => {
    const [state, setState] = useState<any>(initialState);

    const set = (value: Partial<any> | ((preState: any) => Partial<any>)): void => {
        setState({
            ...state,
            ...(value instanceof Function ? value(state) : value),
        });
    };

    return [state, set];
};