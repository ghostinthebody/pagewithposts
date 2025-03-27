import React, {useEffect, useMemo, useState} from "react"
import MyModal from "./components/UI/modal/MyModal"
import MyButton from "./components/UI/button/MyButton"
import Loader from "./components/UI/Loader/Loader"
import PostList from "./components/PostList"
import PostForm from "./components/PostForm"
import PostFilter from "./components/PostFilter"
import './styles/App.css'
import { usePosts } from "./components/hooks/usePosts"
import PostService from "./API/PostService"

export const App = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    // свой хук:
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostsLoading, setIsPostsLoading] = useState(false)
    
    // сработает единожды т.к. массив зависимостей пустой
    useEffect(() => {
        fetchPosts()
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // чисто что б отработать крутилку добавили:
    async function fetchPosts() {
        setIsPostsLoading(true)
        setTimeout( async () => {
            const posts = await PostService.getAll()
            setPosts(posts)
            setIsPostsLoading(false)
        }, 1000)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    
    return (
        <div className="App">
            <button onClick={fetchPosts}>GET POSTS</button>
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
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов по JS'}/> 
            }
        </div>
    )
}