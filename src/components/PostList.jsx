import React from 'react';
import PostItem from './PostItem';
// import {TransitionGroup, CSSTransition} from 'react-transition-group'            // ниииииииииииииииииииии работаааааааааааааааааааает!

// нужно для разных key Потому что у меня Post и OLDPosts вместе отрисовывают посты
import { useMatch } from 'react-router-dom';

// {posts} сделали деструктуризацию (т.к. наши пропсы это объект)
const PostList = ({posts, title, remove}) => {
    const match = useMatch('/OLDposts');

    if(!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не были найдены
            </h1>
        )
    }

    return (
        <div className="App">
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {/* массив обычных объектов нужно преобразовать в массив реакт элементов (используем map) */}
            {posts.map((post, index) => {

                // нужно для разных key Потому что у меня Post и OLDPosts вместе отрисовывают посты
                if (match) {
                    return <PostItem remove={remove} number={index + 1} key={post.id * 200} post={post}/>
                }   
                return <PostItem remove={remove} number={index + 1} key={post.id} post={post}/>
            })}
            {/* key=... Нужен реакту что бы эффективнее отрисовывать элементы */}
        </div>
    );
};

export default PostList;