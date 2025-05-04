
// Создали файл с декларацией типов:
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

// конкретно у нас он работает глобально