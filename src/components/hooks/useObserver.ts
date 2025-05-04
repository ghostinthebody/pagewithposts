import {useEffect, useRef} from "react";


interface UseObserverProps<T extends HTMLElement | null>  {
    ref: React.RefObject<T>; // Тип для ref
    canLoad: boolean; // Тип для canLoad
    isLoading: boolean; // Тип для isLoading
    limit: number; // Тип для limit
    callback: () => void; // Тип для callback
}

// почему тут не React.FC<UseObserverProps> ?? )) Хз
export const useObserver = <T extends HTMLElement | null>({
    ref,
    canLoad,
    isLoading,
    limit,
    callback,
  }: UseObserverProps<T>) => {
    // canLoad нужен что бы скрипт отрабатывал только тогда когда номер текущей страницы меньше чем общее колличество страниц
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        

        // проверка нужна что бы не спамить обзёрвирами. Но я что то не понял как. Ведь isLoader это наш кружок загрузки(да?). Он на секунду у нас появляется...
        if(isLoading) return;
        // в поле карент. Что может находится в поле карент? (observer.current)
        if(observer.current) observer.current.disconnect();

        const cb = function(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        if (ref.current) {
            observer.current.observe(ref.current);
        }
        // Очистка при размонтировании
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [isLoading, limit])
}


















// import {useEffect, useRef} from "react";

// export const useObserver = (ref, canLoad, isLoading, callback) => {
//     // canLoad нужен что бы скрипт отрабатывал только тогда когда номер текущей страницы меньше чем общее колличество страниц
//     const observer = useRef();

//     useEffect(() => {
//         // проверка нужна что бы не спамить обзёрвирами. Но я что то не понял как. Ведь isLoader это наш кружок загрузки(да?). Он на секунду у нас появляется...
//         if(isLoading) return;
//         // в поле карент. Что может находится в поле карент? (observer.current)
//         if(observer.current) observer.current.disconnect();

//         var cb = function(entries, observer) {
//             if (entries[0].isIntersecting && canLoad) {
//                 callback()
//             }
//         };
//         observer.current = new IntersectionObserver(cb);
//         observer.current.observe(ref.current)
//     }, [isLoading])
// }