import React from 'react';
import PostItem from './PostItem';
// import {TransitionGroup, CSSTransition} from 'react-transition-group'            // ниииииииииииииииииииии работаааааааааааааааааааает!

// {posts} сделали деструктуризацию (т.к. наши пропсы это объект)
const PostList = ({posts, title, remove}) => {

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
            {posts.map((post, index) => 
                <PostItem remove={remove} number={index + 1} key={post.id} post={post}/>
            )}
            {/* key=... Нужен реакту что бы эффективнее отрисовывать элементы */}
        </div>
    );
};

export default PostList;