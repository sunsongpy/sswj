<template>
  <div class="login_container">
    <div class="login">
      <div class="avatar">
        <img src="../assets/logo.png" alt="登录头像">
      </div>
      <el-form ref="loginRef" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户"
            v-model="form.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
            prefix-icon="iconfont icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLogin">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 10, message: '用户名长度为4~10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 10, message: '密码长度为4~10之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLogin () {
      console.log(this)
      this.$refs.loginRef.resetFields()
    },

    login () {
      this.$refs.loginRef.validate(
        isValid => {
          if (!isValid) return
          // 验证通过, 发起登录请求
          let loadingInstance = this.$loading.service({
            text: '登录中...',
            fullscreen: false,
            background: 'transparent',
            lock: true
          })
          this.$nextTick(async () => {
            const { status } = await this.$request.post('login', this.form)
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close()
            if (status === 200) {
              this.$message.success('登录成功')
              localStorage['token'] = 1
              return this.$router.push('/home')
            } else {
              this.$message.error('登录失败')
            }
          })
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;;

    .login {
      position: relative;
      background-color: #fff;
      left: 50%;
      top: 50%;
      width: 500px;
      min-width: 380px;
      height: 320px;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      padding: 0 20px;

      .avatar {
        width: 130px;
        height: 130px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        padding: 10px;
        left: 50%;
        position: relative;
        transform: translate(-50%, -50%);

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #eee;
        }
      }
    }

    .el-form {
      >.el-form-item:last-child {
        display: flex;
        justify-content: flex-end;
      }

    }
  }
</style>
