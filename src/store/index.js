import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
const tab = {
  state: {
    isCollapse: false,
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首頁',
        icon: 's-home',
        url: 'Home/Home'
      }
    ]

  },
  mutations: {
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse
    },//側邊攔摺疊收起功能
    selectMenu(state, val) {
      if (val.name !== 'home') {
        if (!state.tabList.find(item => item.name === val.name)) {
          state.tabList.push(val)
        }
      }
    },
    removeMenu(state, val) {
      state.tabList = state.tabList.filter(item => item.name !== val.name)
    }
  }
}
export default new Vuex.Store({
  modules: {
    tab
  }
})