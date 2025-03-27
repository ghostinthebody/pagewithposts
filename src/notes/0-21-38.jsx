import React, {useState} from "react"

// App это компонент
export const App = () => {
    // деструктуризировали и тем самым вытащили из массива И 1ое (заданное) состояние и 2ое функцию которое это состояние изменяет
    const [count, setCount] = useState(0);
    console.log(count);
    console.log(setCount);
    

    return (
        <div className="App">
            {/* <h1>{likes}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button> */}
        </div>
        // тухлое без JSXовое говно (создали кнопку. Он клик повесили. 3ем аргументом передали содержимое кнопки)
        // React.createElement('button', {
        //     onClick: () => console.log('IDIDID')
        // }, 'ZHMI na MENIA')
    )
}