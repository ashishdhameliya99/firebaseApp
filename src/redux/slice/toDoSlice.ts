import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo, UserTodoData } from '../../interfaces/type';

interface TodoState {
  users: UserTodoData[];
}

const initialState: TodoState = {
  users: [],
};

const todoSlice = createSlice({
  name: 'todo',

  initialState,

  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{
        uid: string;
        todo: Todo;
      }>,
    ) => {
      const { uid, todo } = action.payload;

      const userIndex = state.users.findIndex(item => item.uid === uid);

      if (userIndex === -1) {
        state.users.push({
          uid,
          todos: [todo],
          saveDraft: [],
        });

        return;
      }

      const user = state.users[userIndex];

      // remove to saveDraft
      user.saveDraft = user.saveDraft.filter(item => item.id !== todo.id);

      // check exist or not
      const todoIndex = user.todos.findIndex(item => item.id === todo.id);

      if (todoIndex >= 0) {
        user.todos[todoIndex] = todo;
      } else {
        user.todos.push(todo);
      }
    },

    addDraft: (
      state,
      action: PayloadAction<{
        uid: string;
        todo: Todo;
      }>,
    ) => {
      const { uid, todo } = action.payload;

      const userIndex = state.users.findIndex(item => item.uid === uid);

      if (userIndex === -1) {
        state.users.push({
          uid,
          todos: [],
          saveDraft: [todo],
        });

        return;
      }

      const user = state.users[userIndex];

      // remove to todo
      user.todos = user.todos.filter(item => item.id !== todo.id);

      // check exist or not
      const draftIndex = user.saveDraft.findIndex(item => item.id === todo.id);

      if (draftIndex >= 0) {
        user.saveDraft[draftIndex] = todo;
      } else {
        user.saveDraft.push(todo);
      }
    },

    deleteTodo: (
      state,
      action: PayloadAction<{
        uid: string;
        id: string;
      }>,
    ) => {
      const { uid, id } = action.payload;

      const user = state.users.find(item => item.uid === uid);

      if (!user) return;

      user.todos = user.todos.filter(item => item.id !== id);
    },

    deleteDraft: (
      state,
      action: PayloadAction<{
        uid: string;
        id: string;
      }>,
    ) => {
      const { uid, id } = action.payload;

      const user = state.users.find(item => item.uid === uid);

      if (!user) return;

      user.saveDraft = user.saveDraft.filter(item => item.id !== id);
    },

    toggleFavorite: (
      state,
      action: PayloadAction<{
        uid: string;
        id: string;
      }>,
    ) => {
      const { uid, id } = action.payload;

      const user = state.users.find(item => item.uid === uid);

      if (!user) return;

      user.todos = user.todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              favorite: !todo.favorite,
            }
          : todo,
      );

      user.saveDraft = user.saveDraft.map(todo =>
        todo.id === id
          ? {
              ...todo,
              favorite: !todo.favorite,
            }
          : todo,
      );
    },
    setUserData: (
      state,
      action: PayloadAction<{
        uid: string;
        todos: Todo[];
        saveDraft: Todo[];
      }>,
    ) => {
      const { uid, todos, saveDraft } = action.payload;

      const userIndex = state.users.findIndex(item => item.uid === uid);

      if (userIndex >= 0) {
        state.users[userIndex] = {
          uid,
          todos,
          saveDraft,
        };
      } else {
        state.users.push({
          uid,
          todos,
          saveDraft,
        });
      }
    },
  },
});

export const {
  addTodo,
  addDraft,
  deleteTodo,
  deleteDraft,
  toggleFavorite,
  setUserData,
} = todoSlice.actions;

export default todoSlice.reducer;
