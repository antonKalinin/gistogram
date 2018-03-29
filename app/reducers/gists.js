/**
 * @flow
 */

const defaultState = {
    current: null,
    editingMode: false,
    list: [],
    listLoaded: false,
    filters: {
        public: false,
        secret: false,
        markdown: false,
    },
    isFetching: false,
};

export default function gists(state, action) {
    if (typeof state === 'undefined') {
        return defaultState;
    }

    switch (action.type) {
        case 'GIST_LIST_FETCH_REQUESTED':
            return {
                ...state,
                list: [],
                listLoaded: false,
            };
        case 'GIST_LIST_FETCH_SUCCEEDED':
            return {
                ...state,
                list: action.gists,
                listLoaded: true,
            };
        case 'GIST_FETCH_REQUESTED':
            return {
                ...state,
                isFetching: true,
                current: null,
            };
        case 'GIST_EDIT_SUCCEEDED':
        case 'GIST_FETCH_SUCCEEDED':
            return {
                ...state,
                isFetching: false,
                current: action.gist,
                list: state.list.map(
                    gist => (gist.id === action.gist.id ? action.gist : gist)
                ),
            };
        case 'GIST_CREATE_SUCCEEDED': {
            return {
                ...state,
                isFetching: false,
                current: action.gist,
                list: [action.gist].concat(state.list),
            };
        }
        case 'DELETE_GIST':
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.gistId),
            };
        case 'APPLY_FILTER':
            return {
                ...state,
                filters: action.filter,
            };
        case 'TOGGLE_EDITING_MODE':
            return {
                ...state,
                editingMode: action.editingMode,
            };
        default:
            return state;
    }
}
