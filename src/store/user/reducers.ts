import {
  FETCH_USER_SUC,
  IUserState,
  KEEP_LOGIN,
  LOGIN_SUC,
  LOGOUT_SUC,
  REGISTER_SUC,
  UPDATE_INFO1_SUC,
  UPDATE_POSITION_SUC,
  UserActionTypes,
} from './types';

const initialState: IUserState = {
  userId: '',
  username: '',
  errMsg: '',
 position:'',
  info1:'',
};

export default function userReducer(
  state = initialState,
  action: UserActionTypes
) {
  switch (action.type) {
    case REGISTER_SUC:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN_SUC:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT_SUC:
      return {
        ...state,
        userId: '',
        username: '',
        errMsg: '',
      };
    case KEEP_LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_POSITION_SUC:
      return {
        ...state,
        // position:'9999',
      }
    case UPDATE_INFO1_SUC:
      return {
        ...state,
        // position:'9999',
      }
    case FETCH_USER_SUC:
      return {
        ...state,
        ...action.payload



      };
    default:
      return state;
  }
}
