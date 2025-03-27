import { useMemo } from 'react';

export function useGetPagesArray(totalPages) {
    return useMemo(() => {
        const result = [];
        for (let i = 0; i < totalPages; i++) {
            result.push(i + 1)        
        }
        return result
    }, [totalPages]);
}
