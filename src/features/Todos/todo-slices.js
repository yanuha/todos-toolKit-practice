import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
// import { resetToDefault } from '../Reset/reset-action';

const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
});

export const loadTodos = createAsyncThunk(
  '@@todos/load-todo',
  async (_, { rejectWithValue, extra: api }) => {
    try {
      return api.loadTodos();
    } catch (err) {
      return rejectWithValue('Failed to fetch all todos.');
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { loading } = getState().todos;

      if (loading === 'loading') {
        return false;
      }
    },
  }
);

export const createTodo = createAsyncThunk(
  '@@todos/create-todo',
  async (title, { extra: api }) => {
    return api.createTodo(title);
  }
);

export const toggleTodo = createAsyncThunk(
  '@@todos/toggle-todo',
  async (id, { getState, extra: api }) => {
    const todo = getState().todos.entities[id];

    return api.toggleTodo(id, { completed: !todo.completed });
  }
);

export const removeTodo = createAsyncThunk(
  '@@todos/remove-todo',
  async (id, { extra: api }) => {
    return api.removeTodo(id);
  }
);

const initialState = todosAdapter.getInitialState({
  loading: 'idle', // loading
  error: null,
});

export const todosSlice = createSlice({
  name: '@@todos',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      // .addCase(resetToDefault, () => {
      //   return initialState;
      // })
      .addCase(loadTodos.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      // .addCase(loadTodos.rejected, (state) => {
      //   state.loading = 'idle';
      //   state.error = 'Something want wrong!';
      // })
      .addCase(loadTodos.fulfilled, (state, action) => {
        // state.loading = 'idle';
        // state.entities = action.payload;
        todosAdapter.addMany(state, action.payload);
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        // state.entities.push(action.payload);
        todosAdapter.addOne(state, action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        // const id = action.payload.id;
        // const todo = state.entities.find((todo) => todo.id === id);
        // todo.completed = !todo.completed;
        const updatedTodo = action.payload;
        todosAdapter.updateOne(state, {
          id: updatedTodo.id,
          changes: {
            completed: updatedTodo.completed,
          },
        });
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        // state.entities = state.entities.filter(
        //   (todo) => todo.id !== action.payload
        // );
        todosAdapter.removeOne(state, action.payload);
      })
      // .addMatcher(
      //   (action) => action.type.endsWith('/pending'),
      //   (state) => {
      //     state.loading = 'loading';
      //     state.error = null;
      //   }
      // )
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

export const todosSelectors = todosAdapter.getSelectors((state) => state.todos);
