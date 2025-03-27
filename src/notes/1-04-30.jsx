import React, {useState} from "react"
import PostList from "./components/PostList"
import PostForm from "./components/PostForm"
import './styles/App.css'

export const App = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
        {id: 3, title: 'Javascript 3', body: 'Description'}
    ])
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    
    return (
        <div className="App">
            {/* передали callback функцию для обратного захвата(получим post из PostForm сюда) */}
            <PostForm create={createPost}/>
            {posts.length != 0
                ? 
                <PostList remove={removePost} posts={posts} title={'Список постов по JS'}/>
                : 
                <h1 style={{textAlign: 'center'}}>
                    Посты не были найдены
                </h1>
            }
            
        </div>
    )
}