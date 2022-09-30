import { configureStore } from '@reduxjs/toolkit';

import { todosReducer } from './features/Todos/todo-slices';
import { filtersReducer } from './features/Filters/filter-slice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
  },
  devTools: true,
});
