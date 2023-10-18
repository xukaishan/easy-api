import createApis from './index';
const options = { headers: { 'Content-Type': 'application/json' } };

const userApis = createApis({
    login: {
        url: '/api/login',
        method: 'get',
    },
})

const systemApis = createApis({
    login: {
        url: '/api/system/login',
        method: 'get',
    },
}, { baseUrl: 'http://xxx/xxx/xxx' }) // 不同的域名

export {
  userApis,
  systemApis
} 
