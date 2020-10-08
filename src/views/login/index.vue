<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      label-position="top"
    >
      <el-form-item>
        <div class="top"><h2># INFINITE GLORY</h2></div>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="isLoginLoading"
          class="login-btn"
          type="primary"
          @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        phone: '18201288771',
        password: '111111',
      },
      isLoginLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
          },
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, max: 18, message: '长度在6-18位' },
        ],
      },
    }
  },
  methods: {
    async onSubmit() {
      // 1: 表单验证
      await (this.$refs.form as Form).validate(async (valid: boolean) => {
        this.isLoginLoading = true
        if (valid) {
          // 2: 提交表单
          const { data } = await login(this.form)
          if (data.state !== 1) {
            return this.$message.error(data.message)
          } else {
            // 1.记录登录状态,状态需要能够全局访问
            // 2.在访问需要登录的页面的时候判断有没有登录状态
            this.$message.success('登录成功!')
            this.$store.commit('setUser', data.content)
            this.$router.push((this.$route.query.redirect as string) || '/')
            // this.$router.push({ name: 'home' })
          }
          this.isLoginLoading = false
        } else {
          this.isLoginLoading = false
        }
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.login {
  // background-image: linear-gradient(#ffd89b, #004e92);
  background-image: linear-gradient(#004e92, #ffd89b);
  // background-image: linear-gradient(#ffd89b, #19547b, #ffd89b, #bdc3c7);

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 380px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }

  .login-btn {
    width: 100%;
  }

  .top {
    text-align: center;
    color: #004e92;
  }
}
</style>
