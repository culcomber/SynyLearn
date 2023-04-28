import { useState } from "react";
import CommentList from "./CommentList";
import useArticle from "./useArticle";
import useUser from "./useUser";
import useComments from "./useComments";

const ArticleView = ({ id }) => {
    const { data: article, loading, error } = useArticle(id);
    const { data: comments } = useComments(id);
    const { data: user } = useUser(article?.userId);

    if (error) return "Failed.";
    if (!article || loading) return "Loading...";

    return (
        <div className="exp-09-article-view">
            <h1>
                {id}. {article.title}
            </h1>
            {user && (
                <div className="user-info">
                    <img src={user.avatar} height="40px" alt="user" />
                    <div>{user.name}</div>
                    <div>{article.createdAt}</div>
                </div>
            )}
            <p>{article.content}</p>
            <CommentList data={comments || []} />
        </div>
    );
};