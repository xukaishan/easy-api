<script setup>
import apis from '@/api/apis.js';
let index = -1;

const getInfo = () => {
    index++;
    const data = { name: 'zs' }; // 这是请求数据
    const config = { options: { timeout: 15000 } }; // 这是请求配置 可在这里覆盖apis里面的配置
    apis.getInfo(data, config).then((res) => {
        console.log('res=>', res);
    });
};
const postList = () => {
    const config = { url: '/api/post/list', method: 'post', options: { timeout: 3000, headers: { 'Content-Type': 'application/json' } } };
    apis.postList({ id: 6666 }, config).then((res) => {
        console.log('res=>', res);
    });
};
const postSave = () => {
    apis.save()
        .then((res) => {
            console.log('res=>', res);
        })
        .catch((err) => {
            console.log('err=>', err);
        });
    setTimeout(() => {
        // 模拟取消
    }, 1000);
};

const saveForm = () => {
    const formdata = new FormData();
    formdata.append('msg', 'hh');
    apis.saveForm(formdata, { options: { timeout: 20000, headers: { 'Content-Type': 'multipart/form-data' } } })
        .then((res) => {
            console.log('res=>', res);
        })
        .catch((err) => {
            console.log('err=>', err);
        });
};
const postUpload = () => {
    apis.upload().then((res) => {
        console.log('res=>', res);
    });
};

const abortRequestGetInfo = () => {
    const cancel = apis.getInfo.cancel; // 这是请求取消函数
    cancel && cancel(index); // index 多次调用表示要取消该接口的第几个请求; 若index不传则表示取消该接口的所有多次调用
};
const abortRequestAllGetInfo = () => {
    apis.getInfo.cancel(); // 不传参表示取消getInfo的所有请求
};
</script>

<template>
    <div class="item">
        <button @click="getInfo">getInfo</button>
        <button @click="postList">postList</button>
        <button @click="postSave">postSave</button>
        <button @click="saveForm">saveForm</button>
        <button @click="postUpload">postUpload</button>
    </div>
    <div class="item">
        <button @click="abortRequestGetInfo">abortRequest getInfo</button>
        <button @click="abortRequestAllGetInfo">abortRequest all getInfo</button>
    </div>
</template>

<style scoped>
.item {
    margin: 15px auto;
}
</style>
