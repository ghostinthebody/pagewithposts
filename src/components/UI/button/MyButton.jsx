import React from 'react';
// благодаря css модулю название класса будет уникальным  => будет изолирован (например от такого же класса где то ещё)
import classes from './MyButton.module.css'

const MyButton = ({children, ...props}) => {
    return (
        // получили стиль как свойство объекта.            Вопрос. Это сделанно ради изоляции. А не должны мы к каждому объекту делать изоляцию?
        <button {...props} className={classes.myBtn}>
            {/* Я хз почему до этого момента React знал куда добавлять вложенные элементы а щас нет 45:15 */}
            {children}
        </button>            
    );
};

export { MyButton };