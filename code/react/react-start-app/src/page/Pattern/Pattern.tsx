import React, {memo} from 'react';
import SingletonPattern from "./Singleton/SingletonPattern";

function DisplayPart({title, children}) {
    return (
        <>
            <h2 className={'part-color'}>{title}</h2>
            {children}
            <hr/>
        </>
    );
}

export default function Pattern() {
    return (
        <div style={{margin: '20px 60px'}}>
            <DisplayPart title='Singleton Pattern'>
                <SingletonPattern />
            </DisplayPart>
        </div>
    );
}