import { Dispatch } from '@reduxjs/toolkit';
import { deleteDraft, deleteItem } from '../slice/toDoSlice';

export const deleteTodoAndDraft = (id: string) => (dispatch: Dispatch) => {
  dispatch(deleteItem(id));
  dispatch(deleteDraft(id));
};
