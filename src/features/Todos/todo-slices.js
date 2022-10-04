import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resetToDefault } from '../Reset/reset-action';

export const loadTodos = createAsyncThunk(
  '@@todos/load-todo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3005/todos');
      const data = await res.json();

      return data;
    } catch (err) {
      return rejectWithValue('Failed to fetch all todos.');
    }
  }
);

export const createTodo = createAsyncThunk(
  '@@todos/create-todo',
  async (title) => {
    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, completed: false }),
    });
    const data = await res.json();

    return data;
  }
);

export const toggleTodo = createAsyncThunk(
  '@@todos/toggle-todo',
  async (id, { getState }) => {
    const todo = getState().todos.entities.find((todo) => todo.id === id);

    const res = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const data = await res.json();

    return data;
  }
);

export const removeTodo = createAsyncThunk(
  '@@todos/remove-todo',
  async (id) => {
    const res = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await res.json();
    return id;
  }
);

const initialState = {
  entities: [],
  loading: 'idle', // loading
  error: null,
};

export const todosSlice = createSlice({
  name: '@@todos',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      // .addCase(resetToDefault, () => {
      //   return initialState;
      // })
      // .addCase(loadTodos.pending, (state) => {
      //   state.loading = 'loading';
      //   state.error = null;
      // })
      // .addCase(loadTodos.rejected, (state) => {
      //   state.loading = 'idle';
      //   state.error = 'Something want wrong!';
      // })
      .addCase(loadTodos.fulfilled, (state, action) => {
        // state.loading = 'idle';
        state.entities = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.entities.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const id = action.payload.id;
        const todo = state.entities.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.entities = state.entities.filter(
          (todo) => todo.id !== action.payload
        );
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = 'idle';
          state.error = action.payload || action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = 'idle';
        }
      );
  },
});

export const todosReducer = todosSlice.reducer;
