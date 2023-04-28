import React, { useCallback, useState, useEffect } from 'react';

function ScrollTop() {
    const { y } = useScroll();
    const goTop = useCallback(() => {
        document.body.scrollTop = 0;
    }, []);
    const style = {
        position: "fixed",
        right: "10px",
        bottom: "10px",
    };
    // 当滚动条位置纵向超过 300 时，显示返回顶部按钮
    if (y > 300) {
        return (
            <button onClick={goTop} style={style}>
                Back to Top
            </button>
        );
    }
    // 否则不 render 任何 UI
    return null;
}

// 获取横向，纵向滚动条位置
const getPosition = () => {
    return {
        x: document.body.scrollLeft,
        y: document.body.scrollTop,
    };
};

// 将浏览器状态变成可被 React 组件绑定的数据源，从而在使用上更加便捷和直观。
// 除了窗口大小、滚动条位置这些状态，还有其它一些数据也可以这样操作，比如 cookies，localStorage, URL，等等
const useScroll = () => {
    // 定一个 position 这个 state 保存滚动条位置
    const [position, setPosition] = useState(getPosition());
    useEffect(() => {
        const handler = () => {
            setPosition(getPosition(document));
        };
        // 监听 scroll 事件，更新滚动条位置
        document.addEventListener("scroll", handler);
        return () => {
            // 组件销毁时，取消事件监听
            document.removeEventListener("scroll", handler);
        };
    }, []);
    return position;
};