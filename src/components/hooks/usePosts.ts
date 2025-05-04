import {useMemo} from 'react'
import { Post, UseSortedPostsProps } from '../../types';

// // Интерфейс для поста
// interface Post {
//     title: string;
//     [key: string]: string; // Для динамических ключей, используемых в sort
// }

// Интерфейс для параметров useSortedPosts
// interface UseSortedPostsProps {
//     posts: Post[];
//     sort: keyof Post | null | undefined; // sort может быть строкой или отсутствовать
//     query?: string | null | undefined;
// }

export const useSortedPosts = ({ posts, sort }: UseSortedPostsProps): Post[] => {

    const sortedPosts = useMemo(() => {
        if (!sort) {
            return posts;
        }

        return [...posts].sort((a, b) => {

            const aValue = a[sort as keyof Post];
            const bValue = b[sort as keyof Post];

            console.log(aValue, "<--- aValue в хуке usePosts")
            console.log(bValue, "<--- bValue в хуке usePosts")

            // Если значения — строки, используем localeCompare
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.localeCompare(bValue);
            }

            // Если значения — числа, сравниваем как числа
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return aValue - bValue; // Сортировка по возрастанию
            }

            return 0; // Если типы не совпадают или неизвестны, не меняем порядок
        });
    }, [sort, posts]);

    return sortedPosts
}


// // Интерфейс для параметров usePosts. Я добавил в UseSortedPostsProps query с вопросиком. И всё заработало. 
// interface UsePostsProps {
//     posts: Post[];
//     sort: string | null | undefined;
//     query: string | null | undefined;
// }

// я не понимаю почему когда мы ипользуем filter это не считается что мы "отрисовываем" заново массив с постами. А когда мы выбираем в селекте способ сортировки то мы "отрисовываем"
export const usePosts = ({ posts, sort, query }: UseSortedPostsProps): Post[] => {
    
    const sortedPosts = useSortedPosts({ posts, sort });
    
    const sortedAndSearchedPosts = useMemo(() => {
        if (!query) {
            return sortedPosts; // Если query пустое, возвращаем все посты
        }

        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(query))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}