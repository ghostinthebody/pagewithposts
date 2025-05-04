import {useState} from 'react'

// Тип для callback функции
type FetchCallback = (...args: any[]) => Promise<void>;

export const useFetching = (callback: FetchCallback) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // базовая отработка ошибок:
    const [error, setError] = useState<string>('');

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e: unknown) {
            // Предполагаем, что e — это Error с полем message
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('Неизвестная ошибка');
            }
        } finally {
            setIsLoading(false)
        }
    }
    

    // неизменяемы кортеж(tuple). Вещь НЕ ЗА МЕ НИ МА Я!!
    return [fetching, isLoading, error] as const;
}