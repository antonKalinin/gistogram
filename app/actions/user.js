import {AsyncStorage} from 'react-native';
import OAuthManager from 'react-native-oauth';
import API from '../API';

const api = new API();
const oAuthManager = new OAuthManager('notegist');
const oAuthConfig = {
    github: {
        client_id: 'e6278c4a9b27f40a1f5d',
        client_secret: '07d3c167afb7ffecb689c44b89481451f68d2769',
    },
}; // TODO: Move to config

const STORAGE_USER = '@Gistogram:user';
const STORAGE_TOKEN = '@Gistogram:token';

oAuthManager.configure(oAuthConfig);

function removeAccess() {
    API.accessToken = null;

    return {
        type: 'REMOVE_ACCESS',
    };
}

function receiveAccess(accessToken) {
    API.accessToken = accessToken;
    AsyncStorage.setItem(STORAGE_TOKEN, accessToken);

    return {
        type: 'RECEIVE_ACCESS',
        accessToken,
    };
}

function receiveUser(user) {
    AsyncStorage.setItem(STORAGE_USER, JSON.stringify(user));

    return {
        type: 'RECEIVE_CURRENT_USER',
        user,
    };
}

export function fetchAccessToken() {
    return (dispatch) => new Promise((resolve, reject) => {
        AsyncStorage.getItem(STORAGE_TOKEN)
            .then(
                (token) => {
                    if (token) {
                        dispatch(receiveAccess(token));
                        resolve(token);
                    } else {
                        reject('No token');
                    }
                },
                (error) => {
                    reject(error);
                }
            );
    });
}

export function authorize() {
    return (dispatch) => {
        const oAuth = () => {
            oAuthManager.authorize('github', {scopes: 'user gist'})
                .then((data) => {
                    if (data.status === 'ok') {
                        const accessToken = data.response &&
                            data.response.credentials &&
                            data.response.credentials.accessToken;

                        if (accessToken) {
                            dispatch(receiveAccess(accessToken));
                        }
                    }
                })
                .catch(err => console.log('There was an error', err));
        };

        dispatch(fetchAccessToken()).catch(oAuth);
    };
}

export function fetchUser() {
    return (dispatch) => {
        const fetchUserFromGitHub = () => {
            api.get('user').then((user) => {
                dispatch(receiveUser(user));
            });
        };

        AsyncStorage.getItem(STORAGE_USER)
            .then(
                (serializedUser) => {
                    let user = null;

                    try {
                        user = JSON.parse(serializedUser);
                        if (user && user.id) {
                            dispatch(receiveUser(user));
                        } else {
                            fetchUserFromGitHub();
                        }
                    } catch (error) {
                        fetchUserFromGitHub();
                    }
                },
                fetchUserFromGitHub
            );
    };
}

export function deauthorize() {
    return dispatch => AsyncStorage.removeItem(STORAGE_TOKEN).then(
        () => {
            dispatch(removeAccess());
            oAuthManager.deauthorize('github');
        },
        (error) => { console.log(error); }
    );
}
