import React, { ReactNode } from 'react';
// благодаря css модулю название класса будет уникальным  => будет изолирован (например от такого же класса где то ещё)
import classes from './MyButton.module.css'


interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode; // Тип для дочерних элементов
}

const MyButton: React.FC<MyButtonProps> = ({children, ...props}) => {
    return (
        // получили стиль как свойство объекта.            Вопрос. Это сделанно ради изоляции. А не должны мы к каждому объекту делать изоляцию?
        <button {...props} className={classes.myBtn}>
            {children}
        </button>            
    );
};

export { MyButton };