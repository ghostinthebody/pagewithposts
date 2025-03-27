import React from 'react';
import classes from './MyInput.module.css';

// React.forwardRef нужен для useRef (неуправляемый компонент)
const MyInput = React.forwardRef((props, ref) => {
    return (
        // тут никаких children ов нет(как в кнопке)
        <input ref={ref} className={classes.myInput} {...props}/>
    );
});

export default MyInput;