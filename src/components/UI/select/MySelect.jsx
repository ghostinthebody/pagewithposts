import React from 'react';

// передаём некоторый массив (option)
const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        // тут onChange функция callback которая с помощью аргумента сделает 2х стороннее связывание
        <select 
            value={value}
            onChange={event => onChange(event.target.value)}
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