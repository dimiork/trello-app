import { Action } from '@ngrx/store';
import { Credentials } from '../models';

export enum AuthActionTypes {
  Login = '[AUTH] LOGIN',
  LoginSuccess = '[AUTH] LOGIN_SUCCESS',
  LoginFailure = '[AUTH] LOGIN_FAILURE',
  CheckLogin = '[AUTH] CHECK_LOGIN',
  Logout = '[AUTH] LOGOUT',
}

export class Login implements Action {
  readonly type: AuthActionTypes.Login = AuthActionTypes.Login;
  constructor(public payload: Credentials) {}
}

export class LoginSuccess implements Action {
  readonly type: AuthActionTypes.LoginSuccess = AuthActionTypes.LoginSuccess;
  constructor(public payload: boolean) {}
}

export class LoginFailure implements Action {
  readonly type: AuthActionTypes.LoginFailure = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class CheckLogin implements Action {
  readonly type: AuthActionTypes.CheckLogin = AuthActionTypes.CheckLogin;
}

export class Logout implements Action {
  readonly type: AuthActionTypes.Logout = AuthActionTypes.Logout;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | CheckLogin
  | Logout;
