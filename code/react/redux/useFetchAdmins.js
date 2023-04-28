export function useFetchAdmins() {
    const dispatch = useDispatch();
    const { admins, fetchAdminsPending, fetchAdminsError } = useSelector(
        state => ({
            admins: state.pluginPluginManager.home.admins,
            fetchAdminsPending: state.pluginPluginManager.home.fetchAdminsPending,
            fetchAdminsError: state.pluginPluginManager.home.fetchAdminsError,
        }),
        shallowEqual,
    );

    const boundAction = useCallback(
        (...args) => {
            return dispatch(fetchAdmins(...args));
        },
        [dispatch],
    );

    useEffect(() => {
        if (!admins && !fetchAdminsPending && !fetchAdminsError) boundAction();
    }, [admins, fetchAdminsPending, fetchAdminsError, boundAction]);

    return {
        admins,
        fetchAdmins: boundAction,
        fetchAdminsPending,
        fetchAdminsError,
    };
}