import useIntervalAsync from "../../hooks/useIntervalAsync";
import {useEffect, useRef} from "react";
import React from 'react';

function Polling () {
    const timeRef = useRef(1);
    const doRequest = () => {
        return new Promise((resolve, reject) => {
            console.log('doRequest', timeRef.current)
            if (timeRef.current <= 5) {
                // @ts-ignore
                setTimeout(() => resolve(), 500);
            } else {
                setTimeout(() => reject(), 500);
            }
        }).then(() => {
            console.log('resolve');
            timeRef.current++;
        }).catch(() => {
            console.log('reject');
            end();
        })
    };
    const [start, flush, end] =  useIntervalAsync(doRequest, 2000);


    useEffect(() => {
        let target = document.getElementById('test')
        target.addEventListener('click',(e)=>{
            console.log('target clicked');
            e.stopPropagation()
        },false)
    }, [])

    return (<>
        <p onClick={start}>start</p>
        <p onClick={flush}>flush</p>
        <p onClick={end}>end</p>
        {/*合成事件不会被打印，阻止了原生事件，事件不会冒泡到根组件，不会触发react的合成事件*/}
        {/*React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因。*/}
        <div id="test">
            <div onClick={()=>{console.log("合成事件")}}>合成事件</div>
        </div>
    </>)
}

export default Polling;