import React, {useState} from "react"

// App это компонент
export const App = () => {
    // деструктуризировали и тем самым вытащили из массива И 1ое (заданное) состояние и 2ое функцию которое это состояние изменяет
    // (можно убрать setLikes и вывести в консоль likes. Это будет массив с 2мя значениями)
    const [likes, setLikes] = useState(0);
    const [value, setValue] = useState('TEXT IN INPUT');
    
    function increment() {
        // не изменяем likes на прямую а вызываем функцию которая для этого предназначена
        setLikes(likes + 1);
    }
    
    function decrement() {
        setLikes(likes - 1);
    }

    return (
        <div className="App">
            <h1>{likes}</h1>
            <h1>{value}</h1>
            {/* onChange функция которая отслеживает изменения в инпуте */}
            <input 
                type="text" 
                value={value}
                // давай вот эту функцию распишим как для умолишённых:
                onChange={event => setValue(event.target.value)}    
            />
            {/*тут мы не вызываем функцию а передаём её как ссылку*/}
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}