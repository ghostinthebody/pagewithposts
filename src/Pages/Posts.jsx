import React, {useEffect, useMemo, useRef, useState} from "react"
import MyModal from "../components/UI/modal/MyModal"
import MyButton from "../components/UI/button/MyButton"
import Loader from "../components/UI/Loader/Loader"
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import PostFilter from "../components/PostFilter"
import '../styles/App.css'
import { usePosts } from "../components/hooks/usePosts"
import PostService from "../API/PostService"
import { useFetching } from "../components/hooks/useFetching"
import { getPagesArray, getPagesCount } from "../utils/pages"
import Pagination from "../components/UI/pagination/Pagination"
import { useObserver } from "../components/hooks/useObserver"
import MySelect from "../components/UI/select/MySelect"

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();
    const observer = useRef();

    // свой хук:
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })
    
    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        console.log(isPostsLoading, "WE ARE HERE!")
        setPage(page + 1);
    })

    
    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }
    
    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0 '}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {/* тут проблема с key в консоли. 10 раз если подгрузить сразу всё */}
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Колличество эллементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать всё'}

                ]}
            />
            {postError && 
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов по JS'}/> 
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isPostsLoading  && 
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}><Loader/></div>
            }
            
            <Pagination 
                page={page} 
                totalPages={totalPages} 
                changePage={changePage}
            />
        </div>
    )
}

export default Posts;