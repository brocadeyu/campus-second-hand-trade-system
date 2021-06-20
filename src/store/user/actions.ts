import {
  IAuthState,
  LOGIN,
  REGISTER,
  LOGOUT,
  FETCH_USER,
  KEEP_LOGIN,
    UPDATE_POSITION,
  UPDATE_INFO1,
  IUserState,
} from './types';
import {FETCH_TODO, UPDATE_TODO_BUYERID} from "../todo/types";

export const login = (authState: IAuthState) => ({
  type: LOGIN,
  payload: authState,
});
export const fetchuser = (userId: string) => ({
  type: FETCH_USER,
  payload: { userId },
});
export const register = (authState: IAuthState) => ({
  type: REGISTER,
  payload: authState,
});
export const updateposition = (userId: string,position:string) => ({
  type: UPDATE_POSITION,
  payload: { userId,position },
});
export const updateinfo1 = (userId: string,info1:string) => ({
  type: UPDATE_INFO1,
  payload: { userId,info1 },
});
export const logout = () => ({
  type: LOGOUT,
});

export const keepLogin = (userState: IUserState) => ({
  type: KEEP_LOGIN,
  payload: userState,
});
