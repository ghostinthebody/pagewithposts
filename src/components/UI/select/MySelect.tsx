import React from 'react';

// Определяем тип для объекта опции
interface Option {
    value: string | number;
    name: string;
}

// Определяем тип для пропсов компонента
interface MySelectProps {
    options: Option[];
    defaultValue: string;
    value: string | number;
    onChange: (value: number) => void;
}
  
// передаём некоторый массив (option)
const MySelect: React.FC<MySelectProps> = ({ options, defaultValue, value, onChange }) => {
    return (
        // тут onChange функция callback которая с помощью аргумента сделает 2х стороннее связывание
        <select 
            value={value}
            onChange={event => onChange(Number(event.target.value))}
        >
            <option disabled={true} value="">{defaultValue}</option>
            {options.map((option) => 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export { MySelect };