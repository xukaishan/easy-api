import { defineConfig, createInstance, createApis } from '@kscommon/easy-api';
// const { defineConfig, createInstance, createApis } = window.easyapi

function streamType(config) {
    return ['blob', 'arraybuffer', 'stream'].includes(config.responseType);
}
/* your responseFormat function */
function responseFormat(response, format = false) {
    if (response && (response.status === 200 || response.status === 304)) {
        if (format) {
            return response.data
        } else {
            if (streamType(response.config)) { // stream type
                return response;
            }
            return response.data;
        }
    }
    // error status
    return response
}

defineConfig({
    timeout: 30000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseFormat, // responseFormat is used to transform the request's response 
    // ...  your other axios config
})

export const instance = createInstance();

// axios instance
instance.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})
instance.interceptors.response.use(response => { 
    return Promise.resolve(response) 
}, error => {
    return Promise.reject(error)
})

export default createApis;