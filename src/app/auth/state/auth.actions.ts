import { Action } from '@ngrx/store';
import { Credentials, User } from '../models';

export enum AuthActionTypes {
  Login = '[AUTH] LOGIN',
  LoginSuccess = '[AUTH] LOGIN_SUCCESS',
  LoginFailure = '[AUTH] LOGIN_FAILURE',
  CheckAuth = '[AUTH] CHECK_AUTH',
  Signup = '[AUTH] SIGNUP',
  Logout = '[AUTH] LOGOUT',
}

export class Login implements Action {
  readonly type: AuthActionTypes.Login = AuthActionTypes.Login;
  constructor(public payload: { credentials: Credentials }) {}
}

export class LoginSuccess implements Action {
  readonly type: AuthActionTypes.LoginSuccess = AuthActionTypes.LoginSuccess;
  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type: AuthActionTypes.LoginFailure = AuthActionTypes.LoginFailure;
  constructor(public payload: { error: string }) {}
}

export class CheckAuth implements Action {
  readonly type: AuthActionTypes.CheckAuth = AuthActionTypes.CheckAuth;
}

export class Signup implements Action {
  readonly type: AuthActionTypes.Signup = AuthActionTypes.Signup;
  constructor(public payload: { credentials: Credentials }) {}
}

export class Logout implements Action {
  readonly type: AuthActionTypes.Logout = AuthActionTypes.Logout;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | CheckAuth
  | Signup
  | Logout;
