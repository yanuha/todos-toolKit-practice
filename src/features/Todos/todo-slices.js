import { createSlice, nanoid } from '@reduxjs/toolkit';
import { resetToDefault } from '../Reset/reset-action';

export const todosSlice = createSlice({
  name: '@@todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title) => ({
        payload: {
          title,
          id: nanoid(),
          completed: false,
        },
      }),
    },
    removeTodo: (state, action) => {
      const id = action.payload;
      return state.filter((todo) => todo.id !== id);
    },
    toggleTodo: (state, action) => {
      const id = action.payload;
      const todo = state.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetToDefault, () => {
      return [];
    });
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
