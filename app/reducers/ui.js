/**
 * @flow
 */
const defaultState = {
    notification: null,
};

export default function ui(state, action) {
    if (typeof state === 'undefined') {
        return defaultState;
    }

    switch (action.type) {
    case 'ADD_NOTIFICATION':
        return {
            ...state,
            notification: action.notification,
        };
    case 'REMOVE_NOTIFICATION':
        return {
            ...state,
            notification: null,
        };
    default:
        return state;
    }
}
