<template>
  <div class="header-container">
    <div class="l-content">
      <el-button icon="el-icon-menu" size='mini' @click="changeCollapse"></el-button>
      <!-- 麵包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in $store.state.tab.tabList" :key="item.name" :to="{path:item.path}">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.jpg" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>個人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'Home',
  data() {
    return {
      label:''
    }
  },
  methods: {
    changeCollapse() {
      this.$store.commit('changeCollapse')
    },
    handleCommand(command) {
      
      if (command === 'cancel')
        localStorage.removeItem('userList')
        Cookie.remove('token')
        this.$router.push('/login')
      }
  },
}
</script>

<style lang="less">
.header-container {
  padding:0 20px;
  height: 60px;
  background-color: #333;
  display:flex;
  justify-content: space-between;
  align-items: center;
  .text {
    margin-left: 10px;
    font-size: 14px;
    color: #fff;
  }
  .r-content {
    .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding:0;
  }
  }
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
    .el-breadcrumb__item {
      .el-breadcrumb__inner{
        &.is-link {
          color:#666;
        }
      } 
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner{
      cursor: pointer;
    }
  }
  }
</style>