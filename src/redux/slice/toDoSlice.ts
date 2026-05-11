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
      console.log('uid', uid);
      const userIndex = state.users.findIndex(item => item.uid === uid);

      if (userIndex === -1) {
        state.users.push({
          uid,
          todos: [todo],
          saveDraft: [],
        });

        return;
      }

      const todoIndex = state.users[userIndex].todos.findIndex(
        item => item.id === todo.id,
      );

      if (todoIndex >= 0) {
        state.users[userIndex].todos = state.users[userIndex].todos.map(item =>
          item.id === todo.id ? todo : item,
        );
      } else {
        state.users[userIndex].todos.push(todo);
      }
    },

    updateTodo: (
      state,
      action: PayloadAction<{
        uid: string;
        todo: Todo;
      }>,
    ) => {
      const { uid, todo } = action.payload;

      const user = state.users.find(item => item.uid === uid);

      if (!user) return;

      user.todos = user.todos.map(item => (item.id === todo.id ? todo : item));
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

    toggleFavorite: (
      state,
      action: PayloadAction<{
        uid: string;
        id: string;
      }>,
    ) => {
      const { uid, id } = action.payload;
      const userIndex = state.users.findIndex(item => item.uid === uid);

      if (userIndex === -1) {
        return;
      }
      state.users[userIndex].todos = state.users[userIndex].todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              favorite: !todo.favorite,
            }
          : todo,
      );

      state.users[userIndex].saveDraft = state.users[userIndex].saveDraft.map(
        todo =>
          todo.id === id
            ? {
                ...todo,
                favorite: !todo.favorite,
              }
            : todo,
      );
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

      const draftIndex = state.users[userIndex].saveDraft.findIndex(
        item => item.id === todo.id,
      );
      if (draftIndex >= 0) {
        state.users[userIndex].saveDraft = state.users[userIndex].saveDraft.map(
          item => (item.id === todo.id ? todo : item),
        );
      } else {
        state.users[userIndex].saveDraft.push(todo);
      }
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
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleFavorite,
  addDraft,
  deleteDraft,
} = todoSlice.actions;

export default todoSlice.reducer;
