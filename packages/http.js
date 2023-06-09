import Axios from 'axios';
import Qs from 'qs';

/**
 * 响应format
 * @param response
 * @param format
 * @returns
 */
 function responseFormat(response, format = false) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304)) {
        if (format) {
            return response.data
        } else {
            if (streamType(response.config)) { // 流类型直接返回
                return response;
            }
            return response.data;
        }
    }
    // 异常状态下
    return response
}

const defaultOpts = {
    timeout: 30000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseFormat,
};


export let instance = null;

export function defineConfig(config) {
    Object.assign(defaultOpts, config)
}


function streamType(config) {
    return ['blob', 'arraybuffer', 'stream'].includes(config.responseType);
}

export async function get({ url, data, options = {} }, { instance }) {
    const send = {
        timeout: options.timeout ?? instance.defaults.timeout,
        method: 'get',
        url,
        params: data,
        headers: options.headers ?? instance.defaults.headers,
        signal: options.signal,
        responseType: options.responseType || 'json',
    };
    return instance(send).then(
        (response) => {
            return defaultOpts.responseFormat(response, true);
        },
    );
}

export async function post({ url, data, options = {} }, { instance }) {
    if (data && /urlencoded/.test(options.headers['Content-Type'])) {
        data = Qs.stringify(data);
    }
    const send = {
        timeout: options.timeout ?? instance.defaults.timeout,
        method: 'post',
        url,
        data,
        headers: options.headers ?? instance.defaults.headers,
        signal: options.signal,
        responseType: options.responseType || 'json',
    };
    return instance(send).then(
        (response) => {
            return defaultOpts.responseFormat(response, true);
        },
    );
}

export async function upload({ url, data, options = {} }, { instance }) {
    const send = {
        timeout: options.timeout ?? instance.defaults.timeout,
        method: 'post',
        url,
        data,
        headers: Object.assign({}, options.headers ?? {}, { 'Content-Type': 'multipart/form-data' }),
        onUploadProgress: function (progressEvent) {
            typeof options.onUploadProgress === 'function' && options.onUploadProgress(progressEvent);
        },
        onDownloadProgress: function (progressEvent) {
            typeof options.onUploadProgress === 'function' && options.onUploadProgress(progressEvent);
        },
        signal: options.signal,
    };
    return instance(send).then(
        (response) => {
            return defaultOpts.responseFormat(response);
        },
    );
}

export async function commonFetch({ url, method, params = null, data = null, options = {} }, { instance }) {
    const send = {
        timeout: options.timeout ?? instance.defaults.timeout,
        method,
        url,
        params,
        data,
        headers: options.headers ?? instance.defaults.headers,
        signal: options.signal,
        responseType: options.responseType || 'json',
    };
    return instance(send).then(
        (response) => {
            return defaultOpts.responseFormat(response, true);
        },
    );
}

const methodMap = {
    'get': get,
    'post': post,
    'upload': upload,
} 

export function createRequest(params) {
    const cancelList = []
    instance = instance || createInstance();

    const request = (payload, custom) => {
        if (custom) {
            const { url = params.url, method = params.method, options = params.options } = custom
            Object.assign(params.options, options)
            Object.assign(params, { url, method }, { data: payload });
        } else {
            Object.assign(params, { data: payload });
        }

        const controller = new AbortController();
        params.options.signal = controller.signal;

        cancelList.push(() => controller.abort())

        const method = methodMap[`${params.method}`.toLowerCase()] ?? commonFetch

        return method({ url: params.url, data: params.data, options: params.options }, { instance });
    }
    request.cancel = (i) => cancelList.forEach((func, idx) => {
        if (typeof i !== 'number' || isNaN(i)) { // cancel all
            func()
        } else {
            if (i === idx) func()
        }
    });

    return request;
}

export function createInstance(config = defaultOpts) {
    return instance || (instance = Axios.create(config))
}

export function createApis(config = {}, { baseUrl = '' } = {}) {
    const apis = {}

    for (let [key, val] of Object.entries(config)) {
        val = val || {}
        const url = (!/^http/.test(val.url) && !/^ws/.test(val.url)) ? baseUrl + val.url : val.url;
        const params = {
            url,
            method: val.method,
            options: Object.assign({ headers: defaultOpts.headers, timeout: defaultOpts.timeout }, val.options ?? {}),
        };

        apis[key] = createRequest(params);
    }

    return apis
}


