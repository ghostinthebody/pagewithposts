import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [classes.myModal]

    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        // join возвращает строку 
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export { MyModal };