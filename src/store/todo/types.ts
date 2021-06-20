// Constant
export const FETCH_TODO = 'FETCH_TODO';
export const FETCH_My_TODO = 'FETCH_My_TODO';
export const FETCH_My_TODO_Suc = 'FETCH_My_TODO_Suc';
export const FETCH_ALL_Goods = 'FETCH_ALL_Goods';

export const FETCH_ALL_Goods_Suc = 'FETCH_ALL_Goods_Suc';

export const FETCH_TODO_SUC = 'FETCH_TODO_SUC';
export const ADD_TODO = 'ADD_TODO';
export const ADD_TODO_SUC = 'ADD_TODO_SUC';
export const SEARCH_TODO = 'SEARCH_TODO';
export const SEARCH_TODO_SUC = 'SEARCH_TODO_SUC';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_TODO_SUC = 'DELETE_TODO_SUC';
export const UPDATE_TODO_CONTENT = 'UPDATE_TODO_CONTENT';
export const UPDATE_TODO_CONTENT_SUC = 'UPDATE_TODO_CONTENT_SUC';
//
export const UPDATE_TODO_FIELD = 'UPDATE_TODO_FIELD';
export const UPDATE_TODO_FIELD_SUC = 'UPDATE_TODO_FIELD_SUC';
export const UPDATE_TODO_BUYERID = 'UPDATE_TODO_BUYERID';
export const UPDATE_TODO_BUYERID_SUC = 'UPDATE_TODO_BUYERID_SUC';

export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_TODO_STATUS_SUC = 'UPDATE_TODO_STATUS_SUC';
export const UPDATE_TODO_DESC = 'UPDATE_TODO_DESC';
export const UPDATE_TODO_DESC_SUC = 'UPDATE_TODO_DESC_SUC';
export const UPDATE_TODO_INFO2 = 'UPDATE_TODO_INFO2';
export const UPDATE_TODO_INFO2_SUC = 'UPDATE_TODO_INFO2_SUC';


// State
export interface ITodoState {
  _id: string;
field:string;
  todoId:string;
  content: string;
  url:string;
  userId: string;
  status: string;
  buyerId:string;
  position:string;
  startime:string;
  price:number;
  info1:string;
  info2:string;
  desc:string;
}

// Action
export interface IFetchAction {
  type: typeof FETCH_TODO;
  payload: { userId: string };
  ////////////////////////////////////////////////
}
export interface IFetchMyAction {
  type: typeof FETCH_My_TODO;
  payload: { userId: string };
  ////////////////////////////////////////////////
}
export interface IFetchMySucAction {
  type: typeof FETCH_My_TODO_Suc;
  payload: ITodoState[];
  ////////////////////////////////////////////////
}



export interface IFetchALLAction {
  type: typeof FETCH_ALL_Goods;
  payload: {todoId:string};
}
export interface IFetchALLSucAction {
  type: typeof FETCH_ALL_Goods_Suc;
  payload: ITodoState[];
}



export interface IFetchSucAction {
  type: typeof FETCH_TODO_SUC;
  payload: ITodoState[];
}
export interface IAddAction {
  type: typeof ADD_TODO;
  payload: {
    userId: string;
    content: string;
    field:string;
    url:string;
position:string;
price:number;
info1:string;
desc:string;
  };
}
export interface IAddSucAction {
  type: typeof ADD_TODO_SUC;
  payload: ITodoState;
}
export interface ISearchAction {
  type: typeof SEARCH_TODO;
  payload: { userId: string; query: string };
}
export interface ISearchSucAction {
  type: typeof SEARCH_TODO_SUC;
  payload: ITodoState[];
}
export interface IDeleteAction {
  type: typeof DELETE_TODO;
  payload: {
    userId:string;
    todoId: string;

  };
}
export interface IDeleteSucAction {
  type: typeof DELETE_TODO_SUC;
  payload: {
    todoId: string;
    userId:string;
  };
}
export interface IUpdateContentAction {
  type: typeof UPDATE_TODO_CONTENT;
  payload: {
    todoId: string;
    content: string;
    price:number;
  };
}
export interface IUpdateContentSucAction {
  type: typeof UPDATE_TODO_CONTENT_SUC;
  payload: {
    todoId: string;
    content: string;
    price:number;
  };
}
////////
export interface IUpdateFieldAction {
  type: typeof UPDATE_TODO_FIELD;
  payload: {
    todoId: string;
    field: string;
  };
}
export interface IUpdateFieldSucAction {
  type: typeof UPDATE_TODO_FIELD_SUC;
  payload: {
    todoId: string;
    field: string;
  };
}
////////


export interface IUpdateBuyerIdAction {
  type: typeof UPDATE_TODO_BUYERID;
  payload: {
    todoId: string;
    bId:string;

  };
}
export interface IUpdateBuyerIdSucAction {
  type: typeof UPDATE_TODO_BUYERID_SUC;
  payload: {
    todoId: string;
    bId:string;
  };
}


export interface IUpdateDescAction {
  type: typeof UPDATE_TODO_DESC;
  payload: {
    todoId: string;
    desc:string;

  };
}
export interface IUpdateDescSucAction {
  type: typeof UPDATE_TODO_DESC_SUC;
  payload: {
    todoId: string;
    desc:string;
  };
}




export interface IUpdateStatusAction {
  type: typeof UPDATE_TODO_STATUS;
  payload: {
    todoId: string;
    value:string;

  };
}
export interface IUpdateInfo2Action {
  type: typeof UPDATE_TODO_INFO2;
  payload: {
    todoId: string;
    info2:string;

  };
}
export interface IUpdateStatusSucAction {
  type: typeof UPDATE_TODO_STATUS_SUC;
  payload: {
    todoId: string;
    value:string;
  };
}
export interface IUpdateInfo2SucAction {
  type: typeof UPDATE_TODO_INFO2_SUC;
  payload: {
    todoId: string;
    info2:string;
  };
}
export type TodoActionTypes =
  | IFetchAction
    | IFetchMyAction
    | IFetchMySucAction
    | IFetchALLAction
    | IFetchALLSucAction
  | IFetchSucAction
  | IAddAction
  | IAddSucAction
  | IUpdateContentAction
  | IUpdateContentSucAction
    | IUpdateFieldAction
    | IUpdateFieldSucAction
  | IUpdateStatusAction
  | IUpdateStatusSucAction
    | IUpdateDescAction
    | IUpdateDescSucAction
    | IUpdateInfo2Action
    | IUpdateInfo2SucAction
    | IUpdateBuyerIdAction
    | IUpdateBuyerIdSucAction
  | ISearchAction
  | ISearchSucAction
  | IDeleteAction
  | IDeleteSucAction;
