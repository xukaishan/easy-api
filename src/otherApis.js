import { createRequest } from 'easy-api';
const options = { headers: { 'Content-Type': 'application/json' } };

const apis = createRequest({
    getInfo: {
        url: '/api/get/info',
        method: 'get',
    },
    /** 获取菜单 */
    save: {
        url: '/api/post/save',
        method: 'post',
    },
})

export default apis
