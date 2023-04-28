import React, { useState } from "react";
export default function UserList() {
    // 使用三个 state 分别保存用户列表，loading 状态和错误状态
    /*const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);*/
    // 定义获取用户的回调函数
    /*const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://reqres.in/api/users/");
            const json = await res.json();
            // 请求成功后将用户数据放入 state
            setUsers(json.data);
        } catch (err) {
            // 请求失败将错误状态放入 state
            setError(err);
        }
        setLoading(false);
    };*/

    /* 处理请求时，模式都是类似的，可以抽成Hook
    1. 创建 data，loading，error 这 3 个 state；
    2. 请求发出后，设置 loading state 为 true；
    3. 请求成功后，将返回的数据放到某个 state 中，并将 loading state 设为 false；
    4. 请求失败后，设置 error state 为 true，并将 loading state 设为 false。
    */
    // 利用了 Hooks 能够管理 React 组件状态的能力，将一个组件中的某一部分状态独立出来，从而实现了通用逻辑的重用。
    // 通过 useAsync 这个函数，只需要提供异步逻辑的实现
    const {
        execute: fetchUsers,
        data: users,
        loading,
        error,
    } = useAsync(async () => {
        const res = await fetch("https://reqres.in/api/users/");
        const json = await res.json();
        return json.data;
    });

    return (
        <div className="user-list">
            <button onClick={fetchUsers} disabled={loading}>
                {loading ? "Loading..." : "Show Users"}
            </button>
            {error &&
                <div style={{ color: "red" }}>Failed: {String(error)}</div>
            }
            <br />
            <ul>
                {users && users.length > 0 &&
                    users.map((user) => {
                        return <li key={user.id}>{user.first_name}</li>;
                    })}
            </ul>
        </div>
    );
}

const useAsync = (asyncFunction) => {
    // 设置三个异步逻辑相关的 state
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 定义一个 callback 用于执行异步逻辑
    const execute = useCallback(() => {
        // 请求开始时，设置 loading 为 true，清除已有数据和 error 状态
        setLoading(true);
        setData(null);
        setError(null);
        return asyncFunction()
            .then((response) => {
                // 请求成功时，将数据写进 state，设置 loading 为 false
                setData(response);
                setLoading(false);
            })
            .catch((error) => {
                // 请求失败时，设置 loading 为 false，并设置错误状态
                setError(error);
                setLoading(false);
            });
    }, [asyncFunction]);
    return { execute, loading, data, error };
};