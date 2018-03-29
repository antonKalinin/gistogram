/**
 * @flow
 */

const defaultState = {
    info: null,
    accessToken: null,
    authorized: false,
};

export default function user(state, action) {
    if (typeof state === 'undefined') {
        return defaultState;
    }

    switch (action.type) {
        case 'REQUEST_ACCESS':
            return {
                ...state,
                authorized: false,
            };
        case 'RECEIVE_ACCESS':
            return {
                ...state,
                authorized: true,
                accessToken: action.accessToken,
            };
        case 'REMOVE_ACCESS':
            return {
                info: null,
                authorized: false,
                accessToken: null,
            };
        case 'RECEIVE_CURRENT_USER':
            return {
                ...state,
                info: action.user,
            };
        default:
            return state;
    }
}
