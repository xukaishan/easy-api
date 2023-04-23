import createApis from './index';
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
})

export default apis
