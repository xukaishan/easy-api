<script setup>
import apis from './apis';
apis.getInfo().then(res => {
    console.log('res=>', res);
})
</script>

<template>
  <div>
    <button>按钮</button>
  </div>
</template>

<style scoped>

</style>
