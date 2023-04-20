<template>
  <el-form ref="ruleFormRef" :model="ruleForm" class="user-form">
    <el-form-item>
      <el-input
        v-model.number="ruleForm.username"
        size="large"
        :prefix-icon="UserFilled"
        placeholder="手机号"
      />
    </el-form-item>
    <el-form-item>
      <el-input
        :prefix-icon="Lock"
        v-model="ruleForm.password"
        show-password
        type="password"
        size="large"
        placeholder="验证码"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Lock, UserFilled } from '@element-plus/icons-vue';
import type { Login } from '@/api/interface/index';

// 表单数据
const ruleForm = reactive<Login.ReqLoginForm>({
  username: '',
  password: ''
});
</script>

<style scoped>
.user-form {
  width: 100%;
  margin-top: 20px;
}
</style>
