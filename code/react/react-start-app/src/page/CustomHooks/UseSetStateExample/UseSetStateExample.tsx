import {useSetState} from "./useSetState";
import React from 'react';

export const UseSetStateExample = () => {
    const [tablePage, setTablePage] = useSetState({
        page: 1,
        pageSize: 10,
    });

    return (
        <div>
            <div>{JSON.stringify(tablePage)}</div>
            <button onClick={() => setTablePage(({ page }) => ({ page: page + 1 }))}>
                setTablePage
            </button>
            <button onClick={() => {
                tablePage.page += 1;
                setTablePage(tablePage)
            }}>
                setTablePage
            </button>
        </div>
    );
};