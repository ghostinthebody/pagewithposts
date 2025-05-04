import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../../components/hooks/useAppDispatch';
import { fetchPostById, fetchCommentsByPostId } from './slice/PostIdPageSlice';
import { Loader } from '../../components/UI/Loader/Loader';
import { Filter, Post, RootState } from '../../types';

const PostIdPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const {
        post,
        comments,
        isPostLoading,
        postError,
        isCommentsLoading,
        commentsError,
    } = useSelector((state: RootState) => state.postIdPage);

    // почему то жопа с useDispatch не типизированного сгорела. А с useSelector нет. )))))))
    useEffect(() => {
        if (id) { // проверка на undefined
            const postId = parseInt(id, 10); // Преобразуем строку в число
            dispatch(fetchPostById(postId));
            dispatch(fetchCommentsByPostId(postId));
        }
    }, [dispatch, id]);

    return (
        <div>
        <h1>Страница конкретного поста с ID = {id}</h1>
        {isPostLoading ? (
            <Loader />
        ) : postError ? (
            <div>Error: {postError}</div>
        ) : (
            <div>
            {post ? (
                <div>
                    {post.id}. {post.title}
                </div>
                ) : (
                <div>
                    Пост не найден...
                </div>
                )}
            </div>
        )}
        <h1>Комментарии</h1>
        {isCommentsLoading ? (
            <Loader />
        ) : commentsError ? (
            <div>Error: {commentsError}</div>
        ) : (
            <div>
            {comments.map((comm) => (
                <div key={comm.id} style={{ marginTop: 15 }}>
                <h5>{comm.email}</h5>
                <div>{comm.body}</div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export { PostIdPage };