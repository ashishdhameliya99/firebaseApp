import firestore from '@react-native-firebase/firestore';

import { Todo } from '../interfaces/type';

export const addTodoFirestore = async (uid: string, todo: Todo) => {
  try {
    const docRef = firestore()
      .collection('users')
      .doc(uid)
      .collection('todos')
      .doc();

    const newTodo: Todo = {
      ...todo,
      id: docRef.id,
    };

    await docRef.set(newTodo);

    console.log('Todo Added');

    return newTodo;
  } catch (error) {
    console.log('addTodoFirestore error', error);

    return null;
  }
};

export const addDraftFirestore = async (uid: string, todo: Todo) => {
  try {
    const docRef = firestore()
      .collection('users')
      .doc(uid)
      .collection('drafts')
      .doc();

    const newDraft: Todo = {
      ...todo,
      id: docRef.id,
    };

    await docRef.set(newDraft);

    console.log('Draft Added');

    return newDraft;
  } catch (error) {
    console.log('addDraftFirestore error', error);

    return null;
  }
};

export const updateTodoFirestore = async (uid: string, todo: Todo) => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('todos')
      .doc(todo.id)
      .update(todo);

    console.log('Todo Updated');
  } catch (error) {
    console.log('updateTodoFirestore error', error);
  }
};

export const updateDraftFirestore = async (uid: string, todo: Todo) => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('drafts')
      .doc(todo.id)
      .update(todo);

    console.log('Draft Updated');
  } catch (error) {
    console.log('updateDraftFirestore error', error);
  }
};

export const deleteTodoFirestore = async (uid: string, id: string) => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('todos')
      .doc(id)
      .delete();

    console.log('Todo Deleted');
  } catch (error) {
    console.log('deleteTodoFirestore error', error);
  }
};

export const deleteDraftFirestore = async (uid: string, id: string) => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('drafts')
      .doc(id)
      .delete();

    console.log('Draft Deleted');
  } catch (error) {
    console.log('deleteDraftFirestore error', error);
  }
};

export const getUserDataFirestore = async (uid: string) => {
  try {
    const todoSnapshot = await firestore()
      .collection('users')
      .doc(uid)
      .collection('todos')
      .get();

    const draftSnapshot = await firestore()
      .collection('users')
      .doc(uid)
      .collection('drafts')
      .get();

    const todos: Todo[] = todoSnapshot.docs.map(doc => doc.data() as Todo);

    const saveDraft: Todo[] = draftSnapshot.docs.map(doc => doc.data() as Todo);

    return {
      todos,
      saveDraft,
    };
  } catch (error) {
    console.log('getUserDataFirestore error', error);

    return {
      todos: [],
      saveDraft: [],
    };
  }
};

export const subscribeTodosFirestore = (
  uid: string,
  callback: (todos: Todo[]) => void,
) => {
  return firestore()
    .collection('users')
    .doc(uid)
    .collection('todos')
    .onSnapshot(snapshot => {
      const todos: Todo[] = snapshot.docs.map(doc => doc.data() as Todo);

      callback(todos);
    });
};

export const subscribeDraftsFirestore = (
  uid: string,
  callback: (drafts: Todo[]) => void,
) => {
  return firestore()
    .collection('users')
    .doc(uid)
    .collection('drafts')
    .onSnapshot(snapshot => {
      const drafts: Todo[] = snapshot.docs.map(doc => doc.data() as Todo);

      callback(drafts);
    });
};
