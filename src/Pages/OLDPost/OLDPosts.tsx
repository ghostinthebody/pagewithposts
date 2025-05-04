import React, { useEffect, useMemo, useState } from 'react';
import { MyModal } from '../../components/UI/modal/MyModal';
import { MyButton } from '../../components/UI/button/MyButton';
import { Loader } from '../../components/UI/Loader/Loader';
import { PostList } from '../../components/PostList';
import { PostForm } from '../../components/PostForm';
import { PostFilter } from '../../components/PostFilter';
import '../../styles/App.css';
import { usePosts } from '../../components/hooks/usePosts';
import PostService from '../../API/PostService';
import { getPagesArray, getPagesCount } from '../../utils/pages';
import { Pagination } from '../../components/UI/pagination/Pagination';
import { Filter, Post, RootState } from '../../types';

import { useDispatch, useSelector } from 'react-redux';
import { OLDPostsActions } from './slice/OLDPostsSlice';

const OLDPosts = () => {
  const dispatch = useDispatch();

  const { setPosts, addPosts, setFilter, setModal, setTotalPages, setPage, setLoading, setError } =
    OLDPostsActions;

  const { posts, filter, modal, totalPages, limit, page, isPostsLoading, postError } = useSelector(
    (state: RootState) => state.post
  );

  const sortedAndSearchedPosts = usePosts({
      posts: posts,
      sort: filter.sort,
      query: filter.query
  });

  const fetchPosts = async (limit: number, page: number) => {
    try {
      dispatch(setLoading(true));
      const response = await PostService.getAll(limit, page);
      dispatch(setPosts(response.data));
      const totalCount = response.headers['x-total-count'];
      dispatch(setTotalPages(getPagesCount(totalCount, limit)));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const createPost = (newPost: Post) => {
    dispatch(addPosts([newPost]));
    dispatch(setModal(false));
  };

  const removePost = (post: Post) => {
    dispatch(setPosts(posts.filter((p) => p.id !== post.id)));
  };

  const changePage = (page: number) => {
    dispatch(setPage(page));
    fetchPosts(limit, page);
  };

  return (
    <div className='App'>
      <MyButton style={{ marginTop: 30 }} onClick={() => dispatch(setModal(true))}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={(value) => dispatch(setModal(value))}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0 ' }} />
      <PostFilter filter={filter} setFilter={(newFilter: Filter) => dispatch(setFilter(newFilter))} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {isPostsLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <Loader />
        </div>
      ) : (
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов по JS'} />
      )}
      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
};

export { OLDPosts };
