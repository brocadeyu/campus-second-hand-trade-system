import { takeEvery } from 'redux-saga/effects';

import {
  addTodo,
  deleteTodo,
  fetchTodo,
  fetchAllGoods,
  searchTodo,
  updateTodoContent,
  updateTodoStatus, updateTodoBuyerId, updateTodoInfo2, updateTodoDesc,
} from './store/todo/saga';
import {
  ADD_TODO,
  DELETE_TODO, FETCH_ALL_Goods_Suc,
  FETCH_TODO,
  SEARCH_TODO,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
    UPDATE_TODO_BUYERID,UPDATE_TODO_INFO2,UPDATE_TODO_DESC,
} from './store/todo/types';
import { login, register, logout ,updateposition,fetchuser,updateinfo1} from './store/user/saga';
import {LOGIN, REGISTER, LOGOUT, UPDATE_POSITION, FETCH_USER,UPDATE_INFO1} from './store/user/types';
import {fetchALLGoods} from "./store/todo/actions";

function* rootSaga() {
  yield takeEvery(LOGIN, login);
  yield takeEvery(FETCH_USER, fetchuser);
  yield takeEvery(UPDATE_POSITION, updateposition);
  yield takeEvery(UPDATE_INFO1, updateinfo1);
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(REGISTER, register);
  yield takeEvery(FETCH_TODO, fetchTodo);
  yield takeEvery(FETCH_ALL_Goods_Suc, fetchAllGoods);
  yield takeEvery(SEARCH_TODO, searchTodo);
  yield takeEvery(ADD_TODO, addTodo);
  yield takeEvery(DELETE_TODO, deleteTodo);
  yield takeEvery(UPDATE_TODO_STATUS, updateTodoStatus);
  yield takeEvery(UPDATE_TODO_DESC, updateTodoDesc);
  yield takeEvery(UPDATE_TODO_INFO2, updateTodoInfo2);
  yield takeEvery(UPDATE_TODO_CONTENT, updateTodoContent);
  yield takeEvery(UPDATE_TODO_BUYERID, updateTodoBuyerId);
}

export default rootSaga;
