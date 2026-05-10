import { Dispatch } from '@reduxjs/toolkit';

import { deleteDraft, deleteTodo } from '../slice/toDoSlice';

export const deleteTodoAndDraft =
  (uid: string, id: string) => (dispatch: Dispatch) => {
    dispatch(
      deleteTodo({
        uid,
        id,
      }),
    );
    dispatch(
      deleteDraft({
        uid,
        id,
      }),
    );
  };
