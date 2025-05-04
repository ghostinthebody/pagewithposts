import React, {useState} from 'react';
import { MyInput } from './UI/input/MyInput';
import { MyButton } from './UI/button/MyButton';
import { Post } from '../types';

interface PostFormProps {
    create: (newPost: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newPost = {
            ...post, userId: 1, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''});
    }

    return (
        <form>
            <MyInput 
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text" 
                placeholder="Название поста"
            />
            <MyInput 
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text" 
                placeholder="Описание поста"
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export { PostForm };