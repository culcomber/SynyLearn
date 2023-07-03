import {useRef, useState} from 'react';

export default function ValuesRefs() {
    let ref = useRef(0);
    const [count, setCount] = useState(0);

    // 多次点击不会更新到页面，只有重新render，ui才会更新
    function handleClickRef() {
        ref.current = ref.current + 1; // 立即生效，不会导致渲染
        console.log('ref ' + ref.current);
    }

    function handleClickState() {
        setCount(count + 1); // 导致渲染，render后更新
        console.log('state ' + count);
    }

    // render后重新执行函数，会执行下面语句
    console.log('render ' + ' ref:' + ref.current + ' state:' + count);

    return (
        <>
            <h4>ValuesRefs</h4>
            <button onClick={handleClickRef}>
                Click me! {ref.current}
            </button>
            <br/>
            <button onClick={handleClickState}>
                Click me! {count}
            </button>
        </>
    );
}
