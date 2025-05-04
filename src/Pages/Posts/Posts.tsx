import { useEffect, useRef } from 'react';
import PostService from '../../API/PostService';
import { useObserver } from '../../components/hooks/useObserver';
import { usePosts } from '../../components/hooks/usePosts';
import { PostFilter } from '../../components/PostFilter';
import { PostForm } from '../../components/PostForm';
import { PostList } from '../../components/PostList';
import { MyButton } from '../../components/UI/button/MyButton';
import { Loader } from '../../components/UI/Loader/Loader';
import { MyModal } from '../../components/UI/modal/MyModal';
import { Pagination } from '../../components/UI/pagination/Pagination';
import { MySelect } from '../../components/UI/select/MySelect';
import '../../styles/App.css';
import { getPagesCount } from '../../utils/pages';
import { Filter, Post, RootState } from '../../types';

import { useDispatch, useSelector } from 'react-redux';
import { PostActions } from './slice/PostSlice';
const { setPosts, addPosts, setFilter, setModal, setTotalPages, setLimit, setPage, setLoading, setError } = PostActions;


const Posts = () => {
    const dispatch = useDispatch();
    const { posts, filter, modal, totalPages, limit, page, isPostsLoading, postError } = useSelector(
        (state: RootState) => state.post
    );

    const lastElement = useRef<HTMLDivElement>(null);

    const sortedAndSearchedPosts = usePosts({
        posts: posts,
        sort: filter.sort,
        query: filter.query
    });

    // тут конкретно прописал типы для limit и page. ниже описана проблема почему не получается иначе
    const fetchPosts = async (limit: number, page: number) => {
        try {
            dispatch(setLoading(true));
            const response = await PostService.getAll(limit, page);
            dispatch(addPosts(response.data));
            const totalCount = response.headers['x-total-count'];
            dispatch(setTotalPages(getPagesCount(totalCount, limit)));
        } catch (error: any) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useObserver({
        ref: lastElement, // Передаем как объект
        canLoad: page < totalPages,
        isLoading: isPostsLoading,
        limit,
        callback: () => {
            console.log(isPostsLoading, 'WE ARE HERE!');
            dispatch(setPage(page + 1));
            // page + 1 потому что запрос нужен не с первой страницы а начиная со второй 
            fetchPosts(limit, page + 1);
            console.log("LIMIT:", limit)
            console.log("PAGE:", page)
        }
    });

    const isMounted = useRef(false);
    useEffect(() => {
        if (!isMounted.current) {
            fetchPosts(limit, page);
            isMounted.current = true;
        }
    }, [page, limit]);
    

    // Почему подчёркивает подчёркивает newPost, post, page, limit ниже я без идей. Казалось бы я прописал в PostSlice типы. И сюда через RootState импортировал. Но видимо я никак не привязал их. Поэтому они и не работают(прописал каждому свой тип)
    const createPost = (newPost: Post) => {
        dispatch(addPosts([newPost]));
        dispatch(setModal(false));
    };

    const removePost = (post: Post) => {
        dispatch(setPosts(posts.filter((p) => p.id !== post.id)));
    };

    // если тут сделать { page }: PostsState (казалось бы сделал number но нет). Когда я в Pagination через changePage передаю changePage: (page: number) => void. Пишет Тип "({ page }: PostsState) => void" не может быть назначен для типа "(page: number) => void" ...
    const changePage = (page: number) => {
        dispatch(setPage(page));
        fetchPosts(limit, page);
    };
    
    // если тут сделать { limit }: PostsState (казалось бы сделал number но нет). Когда я в MySelect через onChange передаю value: number. Пишет Аргумент типа "number" нельзя назначить параметру типа "PostsState" ...
    const changeLimit = (limit: number) => {
            setTimeout(() => {  
                dispatch(setPosts([]));
            }, 4000);
            dispatch(setLimit(limit));
            fetchPosts(limit, page);
            console.log("LIMIT _____ :", limit)
            console.log("PAGE _____ :", page)
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
        <MySelect
            value={limit}
            onChange={(value) => changeLimit(value)}
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

