// Constant
import {FETCH_TODO, FETCH_TODO_SUC, ITodoState, UPDATE_TODO_BUYERID, UPDATE_TODO_BUYERID_SUC} from "../todo/types";

export const REGISTER = 'REGISTER';
export const REGISTER_SUC = 'REGISTER_SUC';
export const LOGIN = 'LOGIN';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUC = 'FETCH_USER_SUC';
export const LOGIN_SUC = 'LOGIN_SUC';
export const LOGOUT = 'LOGOUT';
export const UPDATE_POSITION='UPDATE_POSITION';
export const UPDATE_INFO1='UPDATE_INFO1';
export const UPDATE_POSITION_SUC='UPDATE_POSITION_SUC';
export const UPDATE_INFO1_SUC='UPDATE_INFO1_SUC';
export const LOGOUT_SUC = 'LOGOUT_SUC';
export const KEEP_LOGIN = 'KEEP_LOGIN';

// State
export interface IAuthState {
  username: string;
  password: string;

}
export interface IUserState {
  userId: string;
  username: string;
  errMsg: string;
  position:string;
  info1:string;
}

// Action
export interface ILoginAction {
  type: typeof LOGIN;
  payload: IAuthState;
}
export interface IFetchuserAction {
  type: typeof FETCH_USER;
  payload: { userId: string };
  ////////////////////////////////////////////////
}
export interface IFetchuserSucAction {
  type: typeof FETCH_USER_SUC;
  payload: IUserState;
}
export interface ILoginSucAction {
  type: typeof LOGIN_SUC;
  payload: IUserState;
}
export interface ILogoutAction {
  type: typeof LOGOUT;
}
export interface ILogoutSucAction {
  type: typeof LOGOUT_SUC;
}
export interface IRegisterAction {
  type: typeof REGISTER;
  payload: IAuthState;
}
export interface IRegSucAction {
  type: typeof REGISTER_SUC;
  payload: IUserState;
}
export interface IKeepLogin {
  type: typeof KEEP_LOGIN;
  payload: IUserState;
}
export interface IUpdatePositionAction {
  type: typeof UPDATE_POSITION;
  payload: {
    userId: string;
    position:string;

  };
}
export interface IUpdatePositionSucAction {
  type: typeof UPDATE_POSITION_SUC;
  payload: {
    userId: string;
    position:string;
  };
}

export interface IUpdateInfo1Action {
  type: typeof UPDATE_INFO1;
  payload: {
    userId: string;
    info1:string;

  };
}
export interface IUpdateInfo1SucAction {
  type: typeof UPDATE_INFO1_SUC;
  payload: {
    userId: string;
    info1:string;
  };
}


export type UserActionTypes =
  | ILoginAction
  | ILoginSucAction
  | ILogoutAction
  | ILogoutSucAction
  | IKeepLogin
    | IFetchuserAction
    | IFetchuserSucAction
  | IRegisterAction
    | IUpdatePositionAction
    | IUpdatePositionSucAction
    |IUpdateInfo1Action
    |IUpdateInfo1SucAction
  | IRegSucAction;
