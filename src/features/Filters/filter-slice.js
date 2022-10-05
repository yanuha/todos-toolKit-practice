import { createSlice } from '@reduxjs/toolkit';
import { resetToDefault } from '../Reset/reset-action';

export const filtersSlice = createSlice({
  name: '@@filters',
  initialState: 'all',
  reducers: {
    setFilters: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetToDefault, () => {
      return 'all';
    });
  },
});

export const { setFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

export const selectActiveFilters = (state) => state.filters;

export const selectVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all': {
      return todos;
    }
    case 'active': {
      return todos.filter((todo) => !todo.completed);
    }
    case 'completed': {
      return todos.filter((todo) => todo.completed);
    }
    default: {
      return todos;
    }
  }
};
