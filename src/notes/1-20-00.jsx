import React, {useMemo, useState} from "react"
import MySelect from "./components/UI/select/MySelect"
import PostList from "./components/PostList"
import PostForm from "./components/PostForm"
import MyInput from "./components/UI/input/MyInput"
import './styles/App.css'

export const App = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: 'AA', body: 'Zzzzzz'},
        {id: 2, title: 'BB', body: 'Xxxxxx'},
        {id: 3, title: 'CC', body: 'Wwwwww'}
    ])
    
    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setsearchQuery] = useState('')

    // callback + массив зависимостей
    // будет вызвана если какая то из зависимостей поменяет своё значение
    const sortedPosts = useMemo(() => {
        if(selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts;
    }, [selectedSort, posts])
    // теперь в константе sortedPosts ещё 1 массив (отсартированный). Оригинальный массив при этом никак не изменяется(а где он?о_0 В браузере пишет что в PostList лежит массив posts а не sortedPosts(теперь sortedAndSearchedPosts))

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(searchQuery))
    }, [searchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }
    
    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0 '}}/>
            <div>
                <MyInput
                    value={searchQuery}
                    onChange={event => setsearchQuery(event.target.value)}
                    placeholder="Поиск"
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка"
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'}
                    ]}
                />
            </div>
            {sortedAndSearchedPosts.length != 0
                ? 
                <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов по JS'}/>
                : 
                <h1 style={{textAlign: 'center'}}>
                    Посты не были найдены
                </h1>
            }
            
        </div>
    )
}