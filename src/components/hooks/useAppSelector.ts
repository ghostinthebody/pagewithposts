import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../../Pages/TodoListPage/slice/TodosSlice';


// по факту типизировали базовый хук. Теперь они понимают что в нашем приложении есть.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 
