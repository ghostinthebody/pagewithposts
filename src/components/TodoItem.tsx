import { useAppDispatch } from './hooks/useAppDispatch';
import { toggleStatus, deleteTodo } from '../Pages/TodoListPage/slice/TodosSlice';

interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(deleteTodo(id))}>&times;</span>
    </li>
  );
};

export { TodoItem };