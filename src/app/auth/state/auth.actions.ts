import { Action } from '@ngrx/store';
import { Credentials } from '../models';

export enum AuthActionTypes {
  Login = '[AUTH] Login',
  LoginSuccess = '[AUTH] Login Success',
  LoginFailure = '[AUTH] Login Failure',
  CheckLogin = '[AUTH] Check Login',
  Logout = '[AUTH] Confirm Logout',
}

export class Login implements Action {
  readonly type: AuthActionTypes.Login = AuthActionTypes.Login;
  constructor(public payload: { credentials: Credentials | null }) {}
}

export class LoginSuccess implements Action {
  readonly type: AuthActionTypes.LoginSuccess = AuthActionTypes.LoginSuccess;
  constructor(public payload: { token: string }) {}
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
