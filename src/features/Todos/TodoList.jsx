import { useDispatch, useSelector } from 'react-redux';

import {
  selectVisibleTodos,
  selectActiveFilters,
} from '../Filters/filter-slice';
import { toggleTodo, removeTodo } from './todo-slices';

export const TodoList = () => {
  const activeFilter = useSelector(selectActiveFilters);
  const todos = useSelector((state) => selectVisibleTodos(state, activeFilter));
  const dispatch = useDispatch();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />{' '}
          {todo.title}{' '}
          <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
        </li>
      ))}
    </ul>
  );
};
