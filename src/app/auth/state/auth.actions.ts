import { Action } from '@ngrx/store';
import { Credentials, User } from '../models';

export enum ActionTypes {
  Login = '[AUTH] LOGIN',
  LoginSuccess = '[AUTH] LOGIN_SUCCESS',
  LoginFailure = '[AUTH] LOGIN_FAILURE',
  CheckAuth = '[AUTH] CHECK_AUTH',
  Signup = '[AUTH] SIGNUP',
  Logout = '[AUTH] LOGOUT',
}

export class Login implements Action {
  readonly type: ActionTypes.Login = ActionTypes.Login;
  constructor(public payload: { credentials: Credentials }) {}
}

export class LoginSuccess implements Action {
  readonly type: ActionTypes.LoginSuccess = ActionTypes.LoginSuccess;
  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type: ActionTypes.LoginFailure = ActionTypes.LoginFailure;
  constructor(public payload: { error: string }) {}
}

export class CheckAuth implements Action {
  readonly type: ActionTypes.CheckAuth = ActionTypes.CheckAuth;
}

export class Signup implements Action {
  readonly type: ActionTypes.Signup = ActionTypes.Signup;
  constructor(public payload: { credentials: Credentials }) {}
}

export class Logout implements Action {
  readonly type: ActionTypes.Logout = ActionTypes.Logout;
}

export type ActionsUnion =
  | Login
  | LoginSuccess
  | LoginFailure
  | CheckAuth
  | Signup
  | Logout;
