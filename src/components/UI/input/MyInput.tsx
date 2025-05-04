import React, { ForwardedRef }  from 'react';
import classes from './MyInput.module.css';

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    placeholder?: string;
    // Тут можно доабвить ещё пропсты если они используются(почему пропсов type и placeholder нет в HTMLInputElement -- без идей)
}

// React.forwardRef нужен для useRef (неуправляемый компонент)
const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>(
    // React.InputHTMLAttributes<HTMLInputElement>. Это встроенный тип React, который включает все стандартные HTML-атрибуты для <input> (например, value, onChange, placeholder, type и т.д.)

    // всё никак не мог понять где мы передаём ref(и из за этого не мог понять зачем он нужен). Но всё таки понял. Мы не где его не передаём. И он нигде не нужен. Ура!
    ({ ...props }, ref: ForwardedRef<HTMLInputElement>) => {
      return <input ref={ref} className={classes.myInput} {...props} />;
    }
);

export { MyInput };