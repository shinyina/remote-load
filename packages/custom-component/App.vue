<script setup>
import { ref } from 'vue';
import Counter from './components/Counter';
import Show from './components/Show';
import Editor from './components/Editor';
const text=ref('')
</script>

<template>
  <Counter :msg="123"/>
  <Show>
    <span>自定义插槽内容</span>
  </Show>
  <Editor v-model="text"/>
</template>

<style scoped>

</style>
