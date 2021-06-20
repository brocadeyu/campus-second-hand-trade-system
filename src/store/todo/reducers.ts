import {
  ADD_TODO_SUC,
  DELETE_TODO_SUC,
  FETCH_ALL_Goods_Suc,
  FETCH_My_TODO_Suc,
  FETCH_TODO_SUC,
  ITodoState,
  SEARCH_TODO_SUC,
  TodoActionTypes,
  UPDATE_TODO_BUYERID_SUC,
  UPDATE_TODO_CONTENT_SUC,
  UPDATE_TODO_FIELD_SUC,
  UPDATE_TODO_STATUS_SUC,
  UPDATE_TODO_DESC_SUC,
  UPDATE_TODO_INFO2_SUC
} from './types';

const initialState: ITodoState[] = [];

export default function todoReducer(
  state = initialState,
  action: TodoActionTypes
) {
  switch (action.type) {
    case ADD_TODO_SUC:
      return [...state, action.payload];
    case FETCH_TODO_SUC:
      return [...action.payload];
    case FETCH_My_TODO_Suc:
      return [...action.payload];
    // case FETCH_ALL_Goods:
    //   return [...action.payload];
    case FETCH_ALL_Goods_Suc:
      return [...action.payload];
    case DELETE_TODO_SUC:
      return state.filter((v) => v._id !== action.payload.todoId);

    case UPDATE_TODO_STATUS_SUC:
      const value = action.payload.value
      return state.map((v) =>
        v._id === action.payload.todoId ? { ...v, status: value } : v
      );

    case UPDATE_TODO_DESC_SUC:
      const desc = action.payload.desc
      return state.map((v) =>
          v._id === action.payload.todoId ? { ...v, desc: desc } : v
      );
    case UPDATE_TODO_INFO2_SUC:
      const info2 = action.payload.info2
      return state.map((v) =>
          v._id === action.payload.todoId ? { ...v, info2: info2 } : v
      );
    case UPDATE_TODO_BUYERID_SUC:
      const bId = action.payload.bId
      return state.map((v) =>
          v._id === action.payload.todoId ? { ...v, buyerId: bId } : v
      );

    case SEARCH_TODO_SUC:
      return [...initialState, ...action.payload];
    case UPDATE_TODO_CONTENT_SUC:
      return state.map((v) =>
        v._id === action.payload.todoId
          ? { ...v, content: action.payload.content ,price:action.payload.price }
          : v
      );
    case UPDATE_TODO_FIELD_SUC:
      return state.map((v) =>
          v._id === action.payload.field
              ? { ...v, content: action.payload.field}
              : v
      );
    default:
      return state;
  }
}
