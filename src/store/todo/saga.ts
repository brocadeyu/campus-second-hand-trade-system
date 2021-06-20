import { call, put } from 'redux-saga/effects';
import TodoAPI from '../../api/todo';

import {
  ADD_TODO_SUC,
  DELETE_TODO_SUC, FETCH_ALL_Goods, FETCH_ALL_Goods_Suc, FETCH_My_TODO, FETCH_My_TODO_Suc,
  FETCH_TODO_SUC,
  IAddAction,
  IDeleteAction,
  IFetchAction, IFetchALLAction, IFetchMyAction, IFetchMySucAction,
  ISearchAction, IUpdateBuyerIdAction,
  IUpdateContentAction,
  IUpdateStatusAction,IUpdateInfo2Action,IUpdateDescAction,
  SEARCH_TODO_SUC, UPDATE_TODO_BUYERID_SUC,
  UPDATE_TODO_CONTENT_SUC,
  UPDATE_TODO_STATUS_SUC, UPDATE_TODO_DESC_SUC,
  UPDATE_TODO_INFO2_SUC,
} from './types';
import { IRes } from '../../common/interface';
import { message } from 'antd';

const todoAPI = new TodoAPI();

export function* fetchTodo(action: IFetchAction) {
  const { userId } = action.payload;
////////////////////////////////////////////
  const res: IRes = yield call(todoAPI.fetchTodo, userId);
  yield put({
    type: FETCH_TODO_SUC,
    payload: res.data,
  });
}
export function* fetchMyTodo(action: IFetchMyAction) {
  const { userId } = action.payload;
////////////////////////////////////////////
  const res: IRes = yield call(todoAPI.fetchMyTodo, userId);
  yield put({
    type: FETCH_My_TODO,
    payload: res.data,
  });
}



//
export function* fetchAllGoods(action: IFetchALLAction) {
  const { todoId} = action.payload;

  const res: IRes = yield call(todoAPI.fetchALLGoods,todoId);
  yield put({
    type: FETCH_ALL_Goods_Suc,
    payload: res.data,
  });
}





export function* addTodo(action: IAddAction) {
  const { userId, content,field ,url,position,price,info1,desc} = action.payload;

  const res: IRes = yield call(todoAPI.addTodo, userId, content,field,url,position,price,info1,desc);
  yield put({
    type: ADD_TODO_SUC,
    payload: res.data,
  });
  message.success('新增成功');
}
//////
export function* deleteTodo(action: IDeleteAction) {
  const { todoId,userId } = action.payload;
  yield call(todoAPI.deleteTodo, userId,todoId);
  yield put({
    type: DELETE_TODO_SUC,
    payload: { userId,todoId },
  });
  message.success('删除成功');
}






export function* searchTodo(action: ISearchAction) {
  const { userId, query } = action.payload;

  const res: IRes = yield call(todoAPI.searchTodo, userId, query);
  yield put({
    type: SEARCH_TODO_SUC,
    payload: res.data,
  });
}

export function* updateTodoStatus(action: IUpdateStatusAction) {
  const { todoId ,value } = action.payload;

  yield call(todoAPI.updateTodoStatus, todoId,value);
  yield put({
    type: UPDATE_TODO_STATUS_SUC,
    payload: { todoId ,value},
  });
}
export function* updateTodoDesc(action: IUpdateDescAction) {
  const { todoId ,desc } = action.payload;

  yield call(todoAPI.updateTodoDesc, todoId,desc);
  yield put({
    type: UPDATE_TODO_DESC_SUC,
    payload: { todoId ,desc},
  });
}
export function* updateTodoInfo2(action: IUpdateInfo2Action) {
  const { todoId ,info2 } = action.payload;

  yield call(todoAPI.updateTodoInfo2, todoId,info2);
  yield put({
    type: UPDATE_TODO_INFO2_SUC,
    payload: { todoId ,info2},
  });
}
export function* updateTodoBuyerId(action: IUpdateBuyerIdAction) {
  const { todoId ,bId } = action.payload;

  yield call(todoAPI.updateTodoBuyerId, todoId,bId);
  yield put({
    type: UPDATE_TODO_BUYERID_SUC,
    payload: { todoId ,bId},
  });
}
export function* updateTodoContent(action: IUpdateContentAction) {
  const { todoId, content,price } = action.payload;

  yield call(todoAPI.updateTodoContent, todoId, content,price);
  yield put({
    type: UPDATE_TODO_CONTENT_SUC,
    payload: { todoId, content,price },
  });
  message.success('编辑成功');
}
