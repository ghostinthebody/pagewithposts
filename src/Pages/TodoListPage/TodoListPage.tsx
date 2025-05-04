import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../components/hooks/useAppDispatch';
import { useAppSelector } from '../../components/hooks/useAppSelector';

import { fetchTodos, addNewTodo } from './slice/TodosSlice';
import { NewTodoForm } from '../../components/NewTodoForm';
import { TodoList } from '../../components/TodoList';

import classes from './TodoList.module.css'


function TodoListPage() {
  const rootClasses = [classes.TodoListPage]
  const [title, setTitle] = useState('');
  const {loading, error} = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleAction = () => {
    if(title.trim().length) {
      dispatch(addNewTodo(title));
      setTitle('');
    }
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  return (
    <div className={rootClasses.join(' ')}>
      <NewTodoForm
        value={title}
        updateText={setTitle}
        handleAction={handleAction}
      />
      {loading && <h2>Loading...</h2>}
      {error &&  <h2>An error occured: {error}</h2>}
      <TodoList />
    </div>
  );
}

export { TodoListPage };