import { ActionsUnion, ActionTypes } from '../auth/state/auth.actions';
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
  action: ActionsUnion
): State {

  switch (action.type) {
    case ActionTypes.CheckAuth:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LoginSuccess:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload.user,
      };

    case ActionTypes.LoginFailure:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };

    case ActionTypes.Logout:
      return initialState;

    default:
      return state;
  }
}
// TODO: should be declared type definitions
export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
