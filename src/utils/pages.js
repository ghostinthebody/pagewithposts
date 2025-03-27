export const getPagesCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

// тут можно было через useMemo. Мы бы сделали свой хук usePagination. (что бы массив не пересчитывался каждый раз)
export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)        
    }
    return result
}