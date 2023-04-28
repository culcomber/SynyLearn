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

export default useWindowSize;