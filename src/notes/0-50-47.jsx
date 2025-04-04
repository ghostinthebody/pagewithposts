import React, {useState} from "react"
// import { Counter } from "./components/Counter"
// import { ClassCounter } from "./components/ClassCounter"
// import PostItem from "./components/PostItem"
import PostList from "./components/PostList"
import './styles/App.css'
import MyButton from "./components/UI/button/MyButton"
import MyInput from "./components/UI/input/MyInput"

export const App = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
        {id: 3, title: 'Javascript 3', body: 'Description'}
    ])
    // для управляемого компонента(инпута)
    const [title, setTitle] = useState('dfsdfdsf')

    const addNewPost = (e) => {
        e.preventDefault();
        console.log(title);
    }
    
    return (
        <div className="App">
            <form>
                {/* Управляемый компонент */}
                <MyInput 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text" 
                    placeholder="Название поста"
                />
                <MyInput type="text" placeholder="Описание поста"/>
                {/* почему disabled применился(если его написать)? Потому что ...props всё туда(кроме children) закидывает */}
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
            </form>
            <PostList posts={posts} title={'Список постов по JS'}/>
        </div>
    )
}