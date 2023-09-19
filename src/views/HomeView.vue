<template>
  <div class="home">
    <div class="login">
      <h1>积云后台</h1>
      <br />
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> 登录 </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { loginApi } from '../utils/api';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';

const router = useRouter();
interface RuleForm {
  username: string;
  password: string;
}
const ruleFormRef = ref<FormInstance>();
const formSize = ref('default');
const ruleForm = reactive({
  username: 'admin',
  password: 'admin',
});
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log(111);

  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginApi(ruleForm).then((res: any) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        ElMessage.success('恭喜登录成功');
        router.push('/about');
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login {
  width: 40%;

  h1 {
    color: #fff;
    background-color: #6471e6;
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
}
</style>
