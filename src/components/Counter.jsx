import React, { useState } from "react";

// компонент называется так же как и файл и всегда с большой буквы
const Counter = function () {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }
    
    function decrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}

// в App закидываем компонент через импорт
// import Counter from "./components/Counter"

// можем сколько угодно и где угодно вставлять данный функционал (счётчики независимы друг от друга)
// вопрос. А если я хочу в 2х местах мочь изменять count? Я добавлю ещё 2е button но мне нужно будет их разместить в другом меске. А как?
// <Counter/>
// <Counter/>
// <Counter/>


export default Counter;