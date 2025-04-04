import React, { useMemo } from 'react';
import { useGetPagesArray } from '../../hooks/useGetPagesArray';

// (´・＿・`) А хедеры в network (при запросе на сервер появляются) часто нужны? И вообще эта вкладка ******
const Pagination = ({totalPages, page, changePage}) => {

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