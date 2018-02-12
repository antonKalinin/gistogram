/* global FormData fetch */
const host = 'https://api.github.com'; // TODO: Move to config

export const NO_INTERNET_CONNECTION_CODE = 1001;

export default class API {
    static get accessToken(): string {
        return API._accessToken;
    }

    static set accessToken(accessToken: string) {
        API._accessToken = accessToken;
        API.defaultHeaders.Authorization = `token ${accessToken}`;
    }

    static get connection(): {type: string} {
        return API._connection || {};
    }

    static set connection(connection: {type: string}) {
        API._connection = connection;
    }

    static get errorHandler() {
        return API._errorHandler || (() => {});
    }

    static set errorHandler(errorHandler: (error: Error) => {}) {
        if (typeof errorHandler !== 'function') {
            return;
        }

        API._errorHandler = errorHandler;
    }

    get(path: string, options: any): Promise<any> {
        return this.request(path, {...options, path, method: 'GET'});
    }

    post(path: string, body: any, options: any): Promise<any> {
        return this.request(path, {...options, method: 'POST', body});
    }

    patch(path: string, body: any, options: any): Promise<any> {
        return this.request(path, {...options, method: 'PATCH', body});
    }

    delete(path: string, options: any): Promise<any> {
        return this.request(path, {...options, method: 'DELETE'});
    }

    request(path: string, options: any): Promise<any> {
        const doRequest = (resolve, reject) => {
            const url = [host, path || ''].join('/');
            const headers = Object.assign({}, API.defaultHeaders, options.headers);
            let {body} = options;

            console.log(options.method, url);

            if (options.body) {
                if (options.body instanceof FormData && !options.headers['Content-Type']) {
                    headers['Content-Type'] = 'multipart/form-data';
                } else {
                    body = JSON.stringify(body);
                }
            }

            return fetch(url, {...options, body, headers})
                .then((response: any): any => {
                    const contentType = response.headers.get('content-type');

                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return response.json();
                    }

                    return {};
                })
                .then((json: any) => {
                    resolve(json);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        };

        return new Promise((resolve, reject) => {
            if (API.connection.type && API.connection.type.toUpperCase() === 'NONE') {
                API.errorHandler({
                    title: 'No internet connection',
                    message: 'Please try again later',
                    statusCode: NO_INTERNET_CONNECTION_CODE,
                });

                reject(new Error('No internet connection'));

                return;
            }

            if (API.accessToken) {
                doRequest(resolve, reject);
            }
        });
    }
}

API.defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    'Cache-Control': 'no-cache',
};
