import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
    // canLoad нужен что бы скрипт отрабатывал только тогда когда номер текущей страницы меньше чем общее колличество страниц
    const observer = useRef();

    useEffect(() => {
        // проверка нужна что бы не спамить обзёрвирами. Но я что то не понял как. Ведь isLoader это наш кружок загрузки(да?). Он на секунду у нас появляется...
        if(isLoading) return;
        // в поле карент. Что может находится в поле карент? (observer.current)
        if(observer.current) observer.current.disconnect();

        var cb = function(entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isLoading])
}