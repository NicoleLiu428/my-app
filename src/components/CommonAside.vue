
<template>
  <div>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <h3>{{isCollapse?'後台':'通用後台管理系統'}}</h3>
      <el-menu-item :index="item.name" v-for="item in noChildren" :key="item.name" @click='clickMenu(item)'>
          <i :class="`el-icon-${item.icon}`" ></i>
          <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.path" @click='clickMenu(subItem)'>{{subItem.label}}</el-menu-item>
        </el-menu-item-group> 
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang='less' scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100vh;
    border-right: none;
    h3 {
      color:#fff;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-weight: 400;
    }
  }
</style>

<script>
export default {
  name:'CommonAside',
  data() {
    return {
      menuData: [
        {
          path: '/',
          name: 'home',
          label: '首頁',
          icon: 's-home',
          url:'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url:'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用戶管理',
          icon: 'user',
          url:'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
            path: '/page1',
            name: 'page1',
            label: '業面1',
            icon: 'setting',
            url:'Other/PageOne'
            },
            {
            path: '/page2',
            name: 'page2',
            label: '業面2',
            icon: 'setting',
            url:'Other/PageTwo'
            }
          ]
        } ,
      ]
    };
  },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item) {
        this.$store.commit('selectMenu', item);
        this.$router.push(
          { path: item.path },
          ()=>{},
          ()=>{}
        )
        
      },
  },
  computed: {
    noChildren() {
      return this.menuData.filter(item => !item.children
        )
    },
    hasChildren() {
      return this.menuData.filter(item => item.children
        )
      },
    isCollapse() {
      return this.$store.state.tab.isCollapse
  } 
    }
  }
</script>