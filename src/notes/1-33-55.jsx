import React, {useMemo, useState} from "react"
import MyModal from "./components/UI/modal/MyModal"
import MyButton from "./components/UI/button/MyButton"
import PostList from "./components/PostList"
import PostForm from "./components/PostForm"
import PostFilter from "./components/PostFilter"
import './styles/App.css'

export const App = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: 'AA', body: 'Zzzzzz'},
        {id: 2, title: 'BB', body: 'Xxxxxx'},
        {id: 3, title: 'CC', body: 'Wwwwww'}
    ])
    
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)

    // callback + массив зависимостей
    // будет вызвана если какая то из зависимостей поменяет своё значение
    const sortedPosts = useMemo(() => {
        if(filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])
    // теперь в константе sortedPosts ещё 1 массив (отсартированный). Оригинальный массив при этом никак не изменяется(а где он?о_0 В браузере пишет что в PostList лежит массив posts а не sortedPosts(теперь sortedAndSearchedPosts))

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(filter.query))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
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
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов по JS'}/> 
        </div>
    )
}