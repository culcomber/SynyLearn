const Total  = (props) => {
    return (
        /*<p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>*/
        /* reduce(callbackFn, initialValue)
        第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。
        否则，数组索引为 0 的元素将被作为初始值 initialValue，迭代器将从第二个元素开始执行（索引为 1 而不是 0）。*/
        <p>Number of exercises {props.parts.reduce((total, item) => total + item.exercises, 0)}</p>
    );
}

export default Total ;