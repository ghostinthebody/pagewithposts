import React from 'react';
import { MyButton } from './UI/button/MyButton';
import {useNavigate} from 'react-router-dom';
import { PostItemProps } from '../types';

// компонент может принемать в себя некоторые входные данные. (в контексте реакта - props)
const PostItem = (props: PostItemProps) => {
    const router = useNavigate();
    // console.log("dodododooddo")
    // ну тут не понятно что в консоли отображается. В useHistory должен был быть объект со свойствами. И нам нужна функция push.  (В useNavigate такого - нет)
    // console.log(router)
    return (
        <div>
            <div className="post">
                <div className="post__content">
                    <strong>{props.post.id}. {props.post.title}</strong>
                    <div>
                    {props.post.body}
                    </div>
                </div>
                <div className="post__btns">
                    <MyButton onClick={() => router(`/posts/${props.post.id}`)}>
                        Открыть
                    </MyButton>
                    <MyButton onClick={() => props.remove(props.post)}>
                        Удалить
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export { PostItem };