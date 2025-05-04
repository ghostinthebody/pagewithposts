import React, { useMemo } from 'react';
import { useGetPagesArray } from '../../hooks/useGetPagesArray';

// Определяем интерфейс для пропсов
interface PaginationProps {
    totalPages: number;
    page: number;
    changePage: (page: number) => void;
  }


// (´・＿・`) А хедеры в network (при запросе на сервер появляются) часто нужны? И вообще эта вкладка ******
const Pagination: React.FC<PaginationProps> = ({totalPages, page, changePage}) => {

    const pagesArray = useGetPagesArray(totalPages)


    return (
        <div className="page__wrapper">
            {pagesArray.map(p => 
                <span
                    onClick={() => changePage(p)} 
                    key={p} 
                    className={page === p ? 'page page__current' : 'page'}
                >
                    {p}
                </span>
            )}
        </div>
    );
};

export { Pagination };