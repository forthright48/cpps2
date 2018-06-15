<template lang="pug">
  .login-container
    el-form.login-form(autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left")
      h3.title CPPS Register

      el-form-item(prop="username")
        span.svg-container.svg-container_login
          svg-icon(icon-class="user")
        el-input(name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username")

      el-form-item(prop="email")
        span.svg-container
          svg-icon(icon-class="email")
        el-input(name="email" type="email" v-model="loginForm.email" autoComplete="on" placeholder="email")

      el-form-item(prop="password")
        span.svg-container
          svg-icon(icon-class="password")
        el-input(name="password" :type="pwdType" @keyup.enter.native="handleRegister" v-model="loginForm.password" autoComplete="on" placeholder="password")
        span.show-pwd(@click="showPwd")
          svg-icon(icon-class="eye")

      el-form-item
        el-button(type="primary" style="width:100%" :loading="loading" @click.native.prevent="handleRegister") Register

      .tips
        el-row
          el-col(:span="12")
            router-link(to="/login") Login
          el-col.text-right(:span="12") Forgot Password?
</template>

<script>
import { isvalidUsername, validateEmail } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter correct username.'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('Password cannot be less than 5 characters long.'))
      } else {
        callback()
      }
    }

    const validateEmailRule = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('Please enter correct email address.'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        email: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        email: [{ required: true, trigger: 'blur', validator: validateEmailRule }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Register', this.loginForm).then((response) => {
            this.loading = false
            this.$router.push({ path: '/login' })
            this.$notify.success({ message: response.message })
          }).catch((err) => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
