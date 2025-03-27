import {useMemo} from 'react'

export const useSortedPosts = (posts, sort) => {

    const sortedPosts = useMemo(() => {
        if(sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
    }, [sort, posts])

    return sortedPosts
}

// я не понимаю почему когда мы ипользуем filter это не считается что мы "отрисовываем" заново массив с постами. А когда мы выбираем в селекте способ сортировки то мы "отрисовываем"
export const usePosts = (posts, sort, query) => {

    const sortedPosts = useSortedPosts(posts, sort);
    
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(query))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}