import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Main from '@/views/Main.vue'
import Mall from '@/views/Mall.vue'
import PageOne from '@/views/PageOne.vue'
import PageTwo from '@/views/PageTwo.vue'
import Cookie from 'js-cookie'
Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
}
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Main,
      redirect: 'login',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },//首頁
        {
          path: 'user',
          name: 'user',
          component: User
        },//用戶管理
        {
          path: 'mall',
          name: 'mall',
          component: Mall
        },//商品管理
        {
          path: 'page1',
          name: 'page1',
          component: PageOne
        },
        {
          path: 'page2',
          name: 'page2',
          component: PageTwo
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }

  ]

})

export default router
router.beforeEach((to, form, next) => {
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name == 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})
