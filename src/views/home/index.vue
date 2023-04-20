<template>
  <div class="home card">
    <el-input v-model="input" placeholder="Please input" />
  </div>
</template>

<script setup lang="ts" name="home">
import { ref } from 'vue';
const input = ref('');
</script>

<style lang="scss" scoped>
.home {
  height: 2000px;
}
</style>
