import React from "react";
import {singletonCounter as Counter} from "./Counter";
import style from "./SingletonPattern"

export default function SingletonPattern() {
    return (
        <div className={style.main}>
            <button id="red" onClick={() => {
                Counter.increment();
                console.log("Counter total: ", Counter.getCount());
            }}>Red button</button>
            <button id="blue" onClick={() => {
                Counter.increment();
                console.log("Counter total: ", Counter.getCount());
            }}>Blue button</button>
            {/* p显示内容不会随着Counter变化而变化，不是state不会render */}
            <p>{Counter.getCount()}</p>
        </div>
    );
}