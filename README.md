# easy-api
> Wrapper for Axios that allows to easily requests


## Installation

Before starting you need to install axios and qs, Because easy-api depends on axios and qs
### CDN
```js
<script src="https://cdn.jsdelivr.net/npm/axios@1.3.5/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/qs@6.11.1/dist/qs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/easy-api@1.0.0/dist/easy-api.umd.cjs"></script>
```
### Npm
```console
npm install axios
npm install qs
npm install easy-api
```
## Usage
```js
/* api/index.js */
import { defineConfig, createInstance, createApis } from 'easy-api';
// const { defineConfig, createInstance, createApis } = window.easyapi // usage by cdn

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
instance.interceptors.request.use(config => {}, error => {})
instance.interceptors.response.use(response => {}, error => {})

export default createApis;
```

```js
/* api/apis.js */
import createApis from 'api/index.js';
const options = { headers: { 'Content-Type': 'application/json' } };

const apis = createApis({
    getInfo: {
        url: '/api/get/info',
        method: 'get',
    },
    postList: null,
    save: {
        url: '/api/post/save',
        method: 'post',
        options: {
            headers: { 'Content-Type': 'application/json' },
            timeout: 8000 // 单独timeout; 未设置会采用默认配置的30000
        }
    },
    saveForm: {
        url: '/api/post/saveForm',
        method: 'post',
    },
    upload: {
        url: '/api/post/upload',
        method: 'upload',
    },
    other: {
        url: 'http://192.168.4.50:3000/api/post/xxx', // starts with http will miss proxy
        method: 'post',
    },
})

export default apis
```

```js
import apis from 'api/apis.js';

const getInfo = () => {
    apis.getInfo({ name: 'zs' }).then((res) => {
        console.log(res);
    });
};
const postList = () => {
    // This is the request configuration, you can override the configuration in apis file
    const config = { url: '/api/post/list', method: 'post', options: { timeout: 3000, headers: { 'Content-Type': 'application/json' } } };

    apis.postList({ id: '9527' }, config).then((res) => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
};
```
### Cancel Request

```js
const cancel = apis.getInfo.cancel; //this is cancel function
cancel && cancel(index); // The index is the order of requests to cancel the interface; if the index is not passed, it means to cancel all multiple calls of the apis.getInfo interface
```

### Cancel All Apis Request

```js
Object.keys(apis).forEach(key => {
    apis[key].cancel()
})
```

## Demo

```console
cd server
npm i
npm run start
```

```console
cd demo
npm i
npm run dev
```