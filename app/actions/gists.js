import {AsyncStorage} from 'react-native';
import API from '../API';

const api = new API();
const STORAGE_FILTER = '@Gistogram:filter';

function requestGist() {
    return {
        type: 'REQUEST_GIST',
    };
}

function receiveGist(gist) {
    return {
        type: 'RECEIVE_GIST',
        gist,
    };
}

function receiveNewGist(gist) {
    return {
        type: 'RECEIVE_NEW_GIST',
        gist,
    };
}

function receiveGistList(gists) {
    return {
        type: 'RECEIVE_GIST_LIST',
        gists,
    };
}

export function fetchUserGists(userName) {
    return (dispatch) => {
        api.get(`users/${userName}/gists`).then((gists) => {
            dispatch(receiveGistList(gists));
        });
    };
}

export function fetchGist(id) {
    return (dispatch) => {
        dispatch(requestGist());
        api.get(`gists/${id}`).then((gist) => {
            if (gist && gist.id) {
                dispatch(receiveGist(gist));
            }
        });
    };
}

export function createGist(data) {
    return (dispatch) => new Promise((resolve, reject) => {
        api.post('gists', data).then(
            (gist) => {
                if (gist && gist.id) {
                    dispatch(receiveNewGist(gist));
                    resolve(gist);
                }
            },
            reject
        );
    });
}


export function editGist(id, data) {
    return (dispatch) => new Promise((resolve, reject) => {
        api.patch(`gists/${id}`, data).then(
            (gist) => {
                if (gist && gist.id) {
                    dispatch(receiveGist(gist));
                    resolve(gist);
                }
            },
            reject
        );
    });
}


export function deleteGist(id) {
    return (dispatch) => new Promise((resolve, reject) => {
        api.delete(`gists/${id}`).then(() => {
            // TODO: check status to be 204
            resolve();
            dispatch({
                type: 'DELETE_GIST',
                gistId: id,
            });
        });
    });
}

export function fetchFilter(filter) {
    return (dispatch) => new Promise((resolve, reject) => {
        AsyncStorage.getItem(STORAGE_FILTER).then((filter) => {
            if (filter) {
                dispatch({
                    type: 'APPLY_FILTER',
                    filter: JSON.parse(filter),
                });
            }

            resolve();
        });
    });
}

export function applyFilter(filter) {
    return (dispatch) => {
        AsyncStorage.setItem(STORAGE_FILTER, JSON.stringify(filter))
            .then(() => {
                dispatch({
                    type: 'APPLY_FILTER',
                    filter,
                });
            });
    };
}

export function toggleEditingMode(editingMode) {
    return {
        type: 'TOGGLE_EDITING_MODE',
        editingMode,
    };
}
