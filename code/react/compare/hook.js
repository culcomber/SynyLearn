const getSize = () => {
    return window.innerWidth > 1000 ? "large" : "small";
}
const useWindowSize = () => {
    const [size, setSize] = useState(getSize());
    useEffect(() => {
        const handler = () => {
            setSize(getSize())
        };
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        };
    }, []);
    return size;
};

/* 窗口大小是外部的数据状态，通过 Hooks 的方式对其进行了封装，从而将其变成一个可绑定的数据源。
这样当窗口大小发生变化时，使用这个 Hook 的组件就都会重新渲染 */
const Demo = () => {
    const size = useWindowSize(); // 外部数据源
    if (size === "small") return <SmallComponent />;
    else return <LargeComponent />;
};