import React from "react";

export function DisplayPart({title, children}) {
    return (
        <>
            <h2 className={'part-color'}>{title}</h2>
            {children}
            <hr/>
        </>
    );
}