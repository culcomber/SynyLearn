function DataList() {
    const dispatch = useDispatch();
    // 在组件初次加载时发起请求
    useEffect(() => {
        // 请求发送时
        dispatch({ type: 'FETCH_DATA_BEGIN' });
        fetch('/some-url').then(res => {
            // 请求成功时
            dispatch({ type: 'FETCH_DATA_SUCCESS', data: res });
        }).catch(err => {
            // 请求失败时
            dispatch({ type: 'FETCH_DATA_FAILURE', error: err });
        })
    }, []);
    // 绑定到 state 的变化
    const data = useSelectore(state => state.data);
    const pending = useSelector(state => state.pending);
    const error = useSelector(state => state.error);
    // 根据 state 显示不同的状态
    if (error) return 'Error.';
    if (pending) return 'Loading...';
    return <Table data={data} />;
}

function fetchData() {
    return dispatch => {
        dispatch({ type: 'FETCH_DATA_BEGIN' });
        fetch('/some-url').then(res => {
            dispatch({ type: 'FETCH_DATA_SUCCESS', data: res });
        }).catch(err => {
            dispatch({ type: 'FETCH_DATA_FAILURE', error: err });
        })
    }
}

function DataList() {
    const dispatch = useDispatch();
// dispatch 了一个函数由 redux-thunk 中间件去执行
    dispatch(fetchData());
}