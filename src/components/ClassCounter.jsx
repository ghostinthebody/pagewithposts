import React from "react";

// создали класс и унаследовали его   ¯\_(ツ)_/¯
class ClassCounter extends React.Component {

    // хуки создавать - нельзя поэтому конструктор:
    constructor(props) {
        super(props);
        // инициализируем состояние.  По факту зарезервировали свойство state в компоненте
        this.state = {
            count: 0
        }
        // из за потери контекста у компонента приходится явно биндить
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    // function не нужно т.к. мы работаем внутри класса
    increment() {
        this.setState({count: this.state.count + 1})
    }

    decrement() {
        this.setState({count: this.state.count - 1})
    }

    // необходима функция render() которая будет возвращать jsx (из за специфики классовых компонентов)
    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        )
    }
}

export default ClassCounter;