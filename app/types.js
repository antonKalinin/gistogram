/* @flow */

export type NavigationType = {
    navigate: (string) => {},
    state: any,
};

/* Redux Types */

export type ActionType =
    // access
  | { type: 'REQUEST_ACCESS' }
  | { type: 'RECEIVE_ACCESS', accessToken: string }
  | { type: 'RECEIVE_CURRENT_USER' };

export type GetStateType = () => any;
export type ThunkActionType = (dispatch: DispatchType, getState: GetStateType) => any;
export type PromiseActionType = Promise<ActionType>;

export type DispatchType = (
    action: ActionType | ThunkActionType | PromiseActionType | Array<ActionType>
) => any;
