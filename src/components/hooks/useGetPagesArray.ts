import { useMemo } from 'react';

export function useGetPagesArray(totalPages: number): number[] {
    return useMemo(() => {
        const result: number[] = [];
        for (let i = 0; i < totalPages; i++) {
            result.push(i + 1)        
        }
        return result
    }, [totalPages]);
}
