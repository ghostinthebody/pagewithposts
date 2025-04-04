import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../Pages/TodoListPage/slice/TodosSlice';


// по факту типизировали базовый хук. Теперь они понимают что в нашем приложении есть.
export const useAppDispatch = () => useDispatch<AppDispatch>();
