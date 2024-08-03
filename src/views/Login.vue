<template>
  <el-card class="box-card">
    <h2>系統登陸</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用戶名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="帳號:nicole"></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="ruleForm.password" type="password"  placeholder="密碼:nicole"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('ruleForm',ruleForm)">登陸</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import Mock from "mockjs"
import Cookie from 'js-cookie'
export default {
  name:'Login',
  data() {
    return {
      ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用戶名稱', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密碼', trigger: 'blur' }
          ],
          
        }
    }
  },
  methods: {
    submit(formName, ruleForm) {
      this.$refs[formName].validate((valid) => { 
        if (valid) {
          const { username, password } = JSON.parse(localStorage.getItem('userList'))
          if (username === ruleForm.username && password === ruleForm.password) {
            const token = Mock.Random.guid()
            Cookie.set('token', token)
            this.$refs[formName].resetFields();
            this.$router.push('/home')
          } else {
            this.$refs[formName].resetFields();
            this.$message({
              showClose: true,
              message: '用戶名或密碼錯誤!',
              type: 'error'
            })
          }
        }
      })
    }
  },
  mounted(){
    localStorage.setItem('userList',JSON.stringify(
      {
        username:'nicole',
        password:'nicole'
      }
    ))
  }
}
</script>

<style lang="less" scope>
  .box-card {
    h2 {
      text-align: center;
      margin-bottom: 40px;
    }
    width: 500px;
    margin: 120px auto;
    .el-input {
      width: 300px;
    }
  }
</style>