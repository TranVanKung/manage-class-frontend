import {
  SET_VIEW_CLASS_MODAL,
  SET_VIEW_STUDENT_IN_CLASS,
  SAVE_GET_LIST_CLASS,
  SET_MODAL_CLASS_OPEN,
  SET_SELECTED_CLASS,
  SAVE_CREATE_CLASS
} from "../type";

export const actSaveGetListClass = (payload) => ({
  type: SAVE_GET_LIST_CLASS,
  payload,
});

export const actSetModalClassOpen = (payload) => ({
  type: SET_MODAL_CLASS_OPEN,
  payload
});

export const actSetSelectedClass = (payload) => ({
  type: SET_SELECTED_CLASS,
  payload
});

export const activeViewClassModal = (payload) => ({
  type: SET_VIEW_CLASS_MODAL,
  payload,
});

export const actSaveCreateClass = (payload) => ({
  type: SAVE_CREATE_CLASS,
  payload,
});

export const activeViewStudentClass = (payload) => ({
  type: SET_VIEW_STUDENT_IN_CLASS,
  payload,
});

