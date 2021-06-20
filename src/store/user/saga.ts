import { call, put } from 'redux-saga/effects';

import UserAPI from '../../api/user';
import { IRes } from '../../common/interface';
import { LocalStorage } from '../../utils';
import {
  ILoginAction,
  IRegisterAction,
  LOGIN_SUC,
  REGISTER_SUC,
  ILogoutAction,
  LOGOUT_SUC,
  FETCH_USER_SUC,
  IFetchuserAction,
  UPDATE_POSITION_SUC, IUpdatePositionAction, IUpdateInfo1Action, UPDATE_INFO1_SUC,
} from './types';
import { message } from 'antd';
import {FETCH_TODO_SUC, IFetchAction, IUpdateBuyerIdAction, UPDATE_TODO_BUYERID_SUC} from "../todo/types";

const userAPI = new UserAPI();

export function* login(action: ILoginAction) {
  const { username, password } = action.payload;

  try {
    const res: IRes = yield call(userAPI.login, username, password);
    yield call(LocalStorage.set, 'userId', res.data.userId);
    yield call(LocalStorage.set, 'username', res.data.username);
    yield call(LocalStorage.set, 'position', res.data.position);
    yield call(LocalStorage.set, 'info1', res.data.info1);
    //改动

    yield put({
      type: LOGIN_SUC,
      payload: { ...res.data, errMsg: res.msg },
    });
  } catch {}
}

export function* logout(action: ILogoutAction) {
  try {
    yield call(LocalStorage.remove, 'userId');
    yield call(LocalStorage.remove, 'username');
    // yield call(LocalStorage.remove, 'position');
    yield put({
      type: LOGOUT_SUC,
    });
  } catch {}
}

export function* register(action: IRegisterAction) {
  const { username, password } = action.payload;

  try {
    yield call(userAPI.register, username, password);
    yield put({
      type: REGISTER_SUC,
    });
    message.success('注册成功');
  } catch {}
}

export function* updateposition(action: IUpdatePositionAction) {
  const { userId ,position } = action.payload;
  // yield call(LocalStorage.remove, 'position');
  // yield call(LocalStorage.set, 'position',action.payload.position);
  yield call(userAPI.updateposition, userId,position);
  yield put({
    type: UPDATE_POSITION_SUC,
    payload: { userId ,position},
  });
}
export function* updateinfo1(action: IUpdateInfo1Action) {
  const { userId ,info1 } = action.payload;
  // yield call(LocalStorage.remove, 'position');
  // yield call(LocalStorage.set, 'position',action.payload.position);
  yield call(userAPI.updateinfo1, userId,info1);
  yield put({
    type: UPDATE_INFO1_SUC,
    payload: { userId ,info1},
  });
}
export function* fetchuser(action: IFetchuserAction) {
  const { userId } = action.payload;
////////////////////////////////////////////
  const res: IRes = yield call(userAPI.fetchuser, userId);
  yield put({
    type: FETCH_USER_SUC,
    payload: res.data,
  });
}
