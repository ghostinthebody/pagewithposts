import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { useObserver } from '../../components/hooks/useObserver';
import { MySelect } from '../../components/UI/select/MySelect';

import { useDispatch, useSelector } from 'react-redux';
import { PostActions } from './slice/PostSlice';
const { setPosts, addPosts, setFilter, setModal, setTotalPages, setLimit, setPage, setLoading, setError } =
  PostActions;

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, filter, modal, totalPages, limit, page, isPostsLoading, postError } = useSelector(
    (state) => state.post
  );

  const lastElement = useRef();

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const fetchPosts = async (limit, page) => {
    try {
      dispatch(setLoading(true));
      const response = await PostService.getAll(limit, page);
      dispatch(addPosts(response.data));
      const totalCount = response.headers['x-total-count'];
      dispatch(setTotalPages(getPagesCount(totalCount, limit)));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  //если limit изменился мы не просто делаем запрос. Нам нужно предыдущие посты удалить а новые запросить
  useEffect(() => {
    dispatch(setPosts([]));
  }, [limit]);

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    console.log(isPostsLoading, 'WE ARE HERE!');
    dispatch(setPage(page + 1));
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    dispatch(addPosts([newPost]));
    dispatch(setModal(false));
  };

  const removePost = (post) => {
    dispatch(setPosts(posts.filter((p) => p.id !== post.id)));
  };

  const changePage = (page) => {
    dispatch(setPage(page));
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
      <PostFilter filter={filter} setFilter={(newFilter) => dispatch(setFilter(newFilter))} />
      <MySelect
        value={limit}
        onChange={(value) => dispatch(setLimit(value))}
        defaultValue='Колличество эллементов на странице'
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать всё' },
        ]}
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов по JS'} />
      <div ref={lastElement} style={{ height: 20, background: 'red' }} />
      {isPostsLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <Loader />
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
};

export { Posts };
