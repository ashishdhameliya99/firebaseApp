import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../interfaces/type';

interface TodoState {
  todosByUid: { [uid: string]: Todo[] };
  todos: Todo[];
  drafts: Todo[];
  editItem: Todo | null;
}

const initialState: TodoState = {
  todosByUid: {},
  todos: [],
  drafts: [],
  editItem: null,
};

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ uid: string; todo: Todo }>) => {
      const { uid, todo } = action.payload;
      console.log('action.payload', action.payload);
      if (!state.todosByUid) {
        state.todosByUid = {};
      }
      if (!state.todosByUid[uid]) {
        state.todosByUid[uid] = [];
      }
      // console.log('state============', state.todosByUid);

      console.log('action todo', action.payload.todo);
      console.log('item', state.todos);
      const index = state.todosByUid[uid].findIndex(
        item => item.id === todo.id,
      );

      console.log('state.+++++++++++', state.todosByUid);
      if (index !== -1) {
        state.todosByUid[uid][index] = todo;
      } else {
        state.todosByUid[uid].push(todo);
      }
    },

    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    },

    deleteItem: (state, action: PayloadAction<Todo['id']>) => {
      state.todos = state.todos.filter(item => item.id !== action.payload);
      state.drafts = state.drafts.filter(item => item.id !== action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<Todo['id']>) => {
      state.todos = state.todos.map(item =>
        item.id === action.payload
          ? { ...item, favorite: !item.favorite }
          : item,
      );

      state.drafts = state.drafts.map(item =>
        item.id === action.payload
          ? { ...item, favorite: !item.favorite }
          : item,
      );
    },

    addDraft: (state, action: PayloadAction<Todo>) => {
      const index = state.drafts.findIndex(
        item => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.drafts[index] = action.payload;
      } else {
        state.drafts.push(action.payload);
      }
    },

    deleteDraft: (state, action: PayloadAction<Todo['id']>) => {
      state.drafts = state.drafts.filter(item => item.id !== action.payload);
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteItem,
  toggleFavorite,
  addDraft,
  deleteDraft,
} = slice.actions;

export default slice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   data: {},        // user-wise todos
//   draft: {},       // user-wise draft
// };

// const todoSlice = createSlice({
//   name: 'todo',
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       const { userId, item } = action.payload;

//       if (!state.data[userId]) {
//         state.data[userId] = [];
//       }

//       state.data[userId].push(item);
//     },

//     deleteTodo: (state, action) => {
//       const { userId, id } = action.payload;

//       state.data[userId] = state.data[userId].filter(
//         item => item.id !== id,
//       );
//     },

//     updateTodo: (state, action) => {
//       const { userId, item } = action.payload;

//       state.data[userId] = state.data[userId].map(t =>
//         t.id === item.id ? item : t,
//       );
//     },

//     toggleFavorite: (state, action) => {
//       const { userId, id } = action.payload;

//       state.data[userId] = state.data[userId].map(item =>
//         item.id === id
//           ? { ...item, favorite: !item.favorite }
//           : item,
//       );
//     },

//     saveDraft: (state, action) => {
//       const { userId, text } = action.payload;
//       state.draft[userId] = text;
//     },

//     clearDraft: (state, action) => {
//       const { userId } = action.payload;
//       state.draft[userId] = '';
//     },
//   },
// });

// export const {
//   addTodo,
//   deleteTodo,
//   updateTodo,
//   toggleFavorite,
//   saveDraft,
//   clearDraft,
// } = todoSlice.actions;

// export default todoSlice.reducer;
