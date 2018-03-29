import {all, call, put, takeLatest} from 'redux-saga/effects';
import API from '../API';

const api = new API();

function* fetchUserGists(action) {
    const fetchGists = userName => api.get(`users/${userName}/gists`);

    try {
        const gists = yield call(fetchGists, action.payload.userName);
        yield put({type: 'GIST_LIST_FETCH_SUCCEEDED', gists});
    } catch (error) {
        yield put({type: 'GIST_LIST_FETCH_FAILED', message: error.message});
    }
}

function* fetchGist(action) {
    const fetchGist = id => api.get(`gists/${id}`);

    try {
        const gist = yield call(fetchGist, action.payload.gistId);
        yield put({type: 'GIST_FETCH_SUCCEEDED', gist});
    } catch (error) {
        yield put({type: 'GIST_FETCH_FAILED', message: error.message});
    }
}

function* editGist(action) {
    const {payload: {resolve, reject}} = action;
    const editGist = ({id, data}) => api.patch(`gists/${id}`, data);

    try {
        const gist = yield call(editGist, action.payload);
        yield put({type: 'GIST_EDIT_SUCCEEDED', gist});
        resolve(gist);
    } catch (error) {
        yield put({type: 'GIST_EDIT_FAILED', message: error.message});
        reject(error);
    }
}

function* createGist(action) {
    const {payload: {resolve, reject}} = action;
    const createGist = data => api.post('gists', data);

    try {
        const gist = yield call(createGist, action.payload.data);
        yield put({type: 'GIST_CREATE_SUCCEEDED', gist});
        resolve(gist);
    } catch (error) {
        yield put({type: 'GIST_CREATE_FAILED', message: error.message});
        reject(error);
    }
}

/* Sagas */

function* editGistSaga() {
    yield takeLatest('GIST_EDIT_REQUESTED', editGist);
}

function* createGistSaga() {
    yield takeLatest('GIST_CREATE_REQUESTED', createGist);
}

function* fetchGistSaga() {
    yield takeLatest('GIST_FETCH_REQUESTED', fetchGist);
}

function* fetchGistListSaga() {
    yield takeLatest('GIST_LIST_FETCH_REQUESTED', fetchUserGists);
}

export default function* rootSaga() {
    yield all([
        editGistSaga(),
        fetchGistSaga(),
        createGistSaga(),
        fetchGistListSaga(),
    ]);
}
