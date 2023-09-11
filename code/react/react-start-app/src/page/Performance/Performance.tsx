import React, {memo} from 'react';
import TestExample from "./TestExample";
import List from "./List";
import Greeting from "./Greeting";
import Test1 from "./Test1";

function DisplayPart({title, children}) {
    return (
        <>
            <h2 className={'part-color'}>{title}</h2>
            {children}
            <hr/>
        </>
    );
}

export default function Performance() {
    return (
        <div style={{margin: '20px 60px'}}>
            <DisplayPart title='List'>
                <List />
            </DisplayPart>
            <DisplayPart title='test'>
                <TestExample />
            </DisplayPart>
            <DisplayPart title='test'>
                <Test1 />
            </DisplayPart>
            <DisplayPart title='memo'>
                <Greeting />
            </DisplayPart>
        </div>
    );
}