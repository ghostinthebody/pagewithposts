import React, {useState} from "react"
// import Counter from "./components/Counter"
// import ClassCounter from "./components/ClassCounter"
// import PostItem from "./components/PostItem"
import PostList from "./components/PostList"
import './styles/App.css'

export const App = () => {
    const [posts, setPost] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
        {id: 3, title: 'Javascript 3', body: 'Description'}
    ])
    const [posts2, setPost2] = useState([
        {id: 1, title: 'Python', body: 'Description'},
        {id: 2, title: 'Python 2', body: 'Description'},
        {id: 3, title: 'Python 3', body: 'Description'}
    ])
    
    return (
        <div className="App">
            <PostList posts={posts} title={'Список постов по JS'}/>
            <PostList posts={posts2} title={'Список постов по Python'}/>
        </div>
    )
}