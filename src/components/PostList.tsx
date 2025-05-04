import React from 'react';
import { PostItem } from './PostItem';

import { useMatch } from 'react-router-dom';
import { PostListProps } from '../types';


const PostList: React.FC<PostListProps> = ({posts, title, remove}) => {
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
            {posts.map((post, index) => {

                if (match) {
                    return <PostItem remove={remove} number={index + 1} key={post.id * 200} post={post}/>
                }   
                return <PostItem remove={remove} number={index + 1} key={post.id} post={post}/>
            })}
        </div>
    );
};

export { PostList };