import { useState, useEffect } from "react";
import apiClient from "./apiClient";

export default (id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 当 id 不存在，直接返回，不发送请求
        if (!id) return;
        // if后使用HOOK
        setLoading(true);
        setData(null);
        setError(null);
        apiClient
            .get(`/users/${id}`)
            .then((res) => {
                setLoading(false);
                setData(res.data);
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
            });
    }, [id]);
    return {
        loading,
        error,
        data
    };
};