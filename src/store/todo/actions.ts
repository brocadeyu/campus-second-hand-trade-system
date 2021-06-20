import {
  ADD_TODO,
  DELETE_TODO,
  FETCH_TODO,
  FETCH_ALL_Goods,
  SEARCH_TODO,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,UPDATE_TODO_DESC,
  UPDATE_TODO_INFO2,
  UPDATE_TODO_FIELD,FETCH_My_TODO,FETCH_My_TODO_Suc,UPDATE_TODO_BUYERID
} from './types';

export const addTodo = (userId: string, content: string,field:string,url:string,position:string,price:number,info1:string,desc:string) => ({
  type: ADD_TODO,
  payload: { userId, content,field,url,position,price,info1,desc},
});

export const fetchTodo = (userId: string) => ({
  type: FETCH_TODO,
  payload: { userId },
});
export const fetchMyTodo = (userId: string) => ({
  type: FETCH_My_TODO,
  payload: { userId },
});


export const fetchALLGoods = (todoId:string) => ({
  type: FETCH_ALL_Goods,
  payload: { todoId},
});

export const searchTodo = (userId: string, query: string) => ({
  type: SEARCH_TODO,
  payload: { userId, query },
});

export const deleteTodo = (userId:string ,todoId: string) => ({
  type: DELETE_TODO,
  payload: {userId, todoId },
});
export const updateTodoStatus = (todoId: string,value:string) => ({
  type: UPDATE_TODO_STATUS,
  payload: { todoId,value },
});
export const updateTodoDesc = (todoId: string,desc:string) => ({
  type: UPDATE_TODO_DESC,
  payload: { todoId,desc },
});
export const updateTodoInfo2 = (todoId: string,info2:string) => ({
  type: UPDATE_TODO_INFO2,
  payload: { todoId,info2 },
});
export const updateTodoBuyerId = (todoId: string,bId:string) => ({
  type: UPDATE_TODO_BUYERID,
  payload: { todoId,bId },
});

export const updateTodoContent = (todoId: string, content: string,price:number) => ({
  type: UPDATE_TODO_CONTENT,
  payload: { todoId, content ,price},
});
export const updateTodoField = (todoId: string, field: string) => ({
  type: UPDATE_TODO_FIELD,
  payload: { todoId, field },
});
