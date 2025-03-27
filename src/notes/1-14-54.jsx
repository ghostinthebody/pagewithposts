import React, {useState} from "react"
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

    function getSortedPosts() {
        console.log("СРАБОТАЛО!")
        if(selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts;
    }

    const sortedPosts = getSortedPosts()

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort)
        setPosts()
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
            {posts.length != 0
                ? 
                <PostList remove={removePost} posts={sortedPosts} title={'Список постов по JS'}/>
                : 
                <h1 style={{textAlign: 'center'}}>
                    Посты не были найдены
                </h1>
            }
            
        </div>
    )
}

// почему когда я создаю новый пост срабатывает функция "getSortedPosts"? Нет же на ней onChange 


// так же. Какого хуя в MySelect творится? Я написал value. Ну окей предположим в value инпута я вписываю selectedSort а selectedSort в свою очередь либо '' либо sortPosts.  
// sortPosts запускается только если в MySelector сработал onChange. Этот onChange одновременно запускает и MySelektor и В MySelektor. 
// Потом мы возвращаем в onChange event.target.value (title/body). onChange магическим образом отдаёт event.target.value в руки sortPosts. И уже sortPosts с помощью setSelectedSort перезаписывает selectedSort. И записывает в value title/body