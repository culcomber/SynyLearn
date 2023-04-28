/*需要展示一个博客文章的列表，并且有一列要显示文章的分类。同时，我们还需要提供表格过滤功能，以便能够只显示某个分类的文章。
后端提供了两个 API：一个用于获取文章的列表，另一个用于获取所有的分类。*/

/*function BlogList() {
    // 获取文章列表...
    // 获取分类列表...
    // 组合文章数据和分类数据...
    // 根据选择的分类过滤文章...
    // 渲染 UI ...
}*/

import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Select, Table } from "antd";
import _ from "lodash";
import useAsync from "./useAsync";
const endpoint = "https://myserver.com/api/";

// 使用上面创建的 useAsync 获取文章列表
const useArticles = () => {
    const { execute, data, loading, error } = useAsync(
        useCallback(async () => {
            const res = await fetch(`${endpoint}/posts`);
            return await res.json();
        }, []),
    );
    // 执行异步调用
    useEffect(() => execute(), [execute]);
    // 返回语义化的数据结构
    return {
        articles: data,
        articlesLoading: loading,
        articlesError: error,
    };
};

// 使用上面创建的 useAsync 获取分类列表
const useCategories = () => {
    const { execute, data, loading, error } = useAsync(
        useCallback(async () => {
            const res = await fetch(`${endpoint}/categories`);
            return await res.json();
        }, []),
    );
    // 执行异步调用
    useEffect(() => execute(), [execute]);
    // 返回语义化的数据结构
    return {
        categories: data,
        categoriesLoading: loading,
        categoriesError: error,
    };
};

// 将文章数据和分类数据组合到一起
const useCombinedArticles = (articles, categories) => {
    return useMemo(() => {
        // 如果没有文章或者分类数据则返回 null
        if (!articles || !categories) return null;
        return articles.map((article) => {
            return {
                ...article,
                category: categories.find(
                    (c) => String(c.id) === String(article.categoryId),
                ),
            };
        });
    }, [articles, categories]);
};

// 实现按照分类过滤
const useFilteredArticles = (articles, selectedCategory) => {
    return useMemo(() => {
        if (!articles) return null;
        if (!selectedCategory) return articles;
        return articles.filter((article) => {
            console.log("filter: ", article.categoryId, selectedCategory);
            return String(article?.category?.name) === String(selectedCategory);
        });
    }, [articles, selectedCategory]);
};

const columns = [
    { dataIndex: "title", title: "Title" },
    { dataIndex: ["category", "name"], title: "Category" },
];

export default function BlogList() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    // 获取文章列表
    const { articles, articlesError } = useArticles();
    // 获取分类列表
    const { categories, categoriesError } = useCategories();
    // 组合数据
    const combined = useCombinedArticles(articles, categories);
    // 实现过滤
    const result = useFilteredArticles(combined, selectedCategory);
    // 分类下拉框选项用于过滤
    const options = useMemo(() => {
        const arr = _.uniqBy(categories, (c) => c.name).map((c) => ({
            value: c.name,
            label: c.name,
        }));
        arr.unshift({ value: null, label: "All" });
        return arr;
    }, [categories]);
    // 如果出错，简单返回 Failed
    if (articlesError || categoriesError) return "Failed";
    // 如果没有结果，说明正在加载
    if (!result) return "Loading...";
    return (
        <div>
            <Select
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                options={options}
                style={{ width: "200px" }}
                placeholder="Select a category"
            />
            <Table dataSource={result} columns={columns} />
        </div>
    );
}