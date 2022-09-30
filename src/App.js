import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  removeTodo,
  selectVisibleTodos,
  selectActiveFilters,
  toggleTodo,
  setFilters,
} from './store';

export default function App() {
  return (
    <div className='App'>
      <h1>Hello Redux Todo</h1>
      <NewTodo />
      <FilterTodo />
      <TodoList />
    </div>
  );
}

const NewTodo = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTodo(event.target.title.value));
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='title' placeholder='new todo' />
      <input type='submit' value='Add Todo' />
    </form>
  );
};

const TodoList = () => {
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

const FilterTodo = () => {
  const activeFilter = useSelector(selectActiveFilters);
  const dispatch = useDispatch();

  const handleFilter = (val) => dispatch(setFilters(val));

  return (
    <div>
      <button
        onClick={() => handleFilter('all')}
        style={{ color: activeFilter === 'all' ? 'red' : null }}
      >
        all
      </button>
      <button
        onClick={() => handleFilter('active')}
        style={{ color: activeFilter === 'active' ? 'red' : null }}
      >
        active
      </button>
      <button
        onClick={() => handleFilter('completed')}
        style={{ color: activeFilter === 'completed' ? 'red' : null }}
      >
        completed
      </button>
    </div>
  );
};
