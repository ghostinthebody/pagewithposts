import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useFetching } from '../components/hooks/useFetching';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, fetchCommentsByPostId } from '../store/PostIdPageSlice';
import Loader from '../components/UI/Loader/Loader';


const PostIdPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    post,
    comments,
    isPostLoading,
    postError,
    isCommentsLoading,
    commentsError,
  } = useSelector((state) => state.fetching);

  useEffect(() => {
    dispatch(fetchPostById(id));
    dispatch(fetchCommentsByPostId(id));
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
          {post.id}. {post.title}
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

export default PostIdPage;