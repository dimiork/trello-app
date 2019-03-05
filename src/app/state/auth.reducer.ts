import { AuthActions, AuthActionTypes } from '../auth/state/auth.actions';
import { User } from '../auth/models';

export interface State {
  isLoggedIn: boolean;
  loading: boolean;
  user: User;
}

export const initialState: State = {
  isLoggedIn: false,
  loading: false,
  user: null,
};

export function reducer(
  state: State = initialState,
  action: AuthActions
): State {

  switch (action.type) {
    case AuthActionTypes.CheckAuth:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload.user,
      };

    case AuthActionTypes.Logout:
      return initialState;

    default:
      return state;
  }
}
// TODO: should be declared type definitions
export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
