import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resetToDefault } from '../Reset/reset-action';

export const createTodo = createAsyncThunk(
  '@@todos/create-todo',
  async (title, { dispatch }) => {
    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, completed: false }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  }
);

export const todosSlice = createSlice({
  name: '@@todos',
  initialState: {
    entities: [],
    loading: 'idle', // loading
    error: null,
  },
  reducers: {
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
    builder
      .addCase(resetToDefault, () => {
        return [];
      })
      .addCase(createTodo.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(createTodo.rejected, (state) => {
        state.loading = 'idle';
        state.error = 'Something want wrong!';
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.entities.push(action.payload);
      });
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
