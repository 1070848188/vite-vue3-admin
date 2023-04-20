<template>
  <el-form ref="loginFormRef" :model="loginForm" class="user-form" :rules="ruleForm">
    <el-form-item prop="username">
      <el-input
        v-model.number="loginForm.username"
        size="large"
        :prefix-icon="UserFilled"
        placeholder="admin/user 两个账号不同菜单"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        :prefix-icon="Lock"
        v-model="loginForm.password"
        show-password
        type="password"
        size="large"
        placeholder="123456"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Lock, UserFilled } from '@element-plus/icons-vue';
import type { Login } from '@/api/interface/index';
import type { FormInstance, FormRules } from 'element-plus';

const emit = defineEmits(['login']);

// 当前表单组件
const loginFormRef = ref<FormInstance>();
// 表单数据
const loginForm = reactive<Login.ReqLoginForm>({
  username: 'admin',
  password: '123456'
});

const ruleForm = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }]
});

// 点击登录后校验表单内容
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      emit('login', loginForm);
    }
  });
};

defineExpose({
  handleLogin
});
</script>

<style scoped>
.user-form {
  width: 100%;
  margin-top: 20px;
}
</style>
