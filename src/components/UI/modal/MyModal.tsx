import React, { ReactNode, MouseEvent } from 'react';
import classes from './MyModal.module.css'

// Определяем интерфейс для пропсов
interface MyModalProps {
    children: ReactNode; // Тип для дочерних элементов
    visible: boolean; // Модальное окно открыто или закрыто
    setVisible: (visible: boolean) => void; // Функция для управления видимостью
}


const MyModal: React.FC<MyModalProps> = ({children, visible, setVisible}) => {

    const rootClasses = [classes.myModal]

    if (visible) {
        rootClasses.push(classes.active)
    }

    // Типизируем событие клика
    const handleOverlayClick = () => setVisible(false);
    const handleContentClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

    return (
        // join возвращает строку 
        <div className={rootClasses.join(' ')} onClick={handleOverlayClick}>
            <div className={classes.myModalContent} onClick={handleContentClick}>
                {children}
            </div>
        </div>
    );
};

export { MyModal };