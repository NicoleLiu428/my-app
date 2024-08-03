<template>
  <div>
    <el-tag
      v-for="tag in tabList"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="tag.name === $route.name?'dark':'plain'"
      @click="changeMenu(tag)"
      @close="closeMenu(tag)"
      size="small">
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'CommonTag',
  data() {
    return {
    }
  },
  methods: {
    changeMenu(tag) {
      this.$router.push({ path: tag.path })
    },
    closeMenu(tag){
      this.$store.commit('removeMenu', tag)
      if (this.$route.name === tag.name) {
        this.$router.push({ name: this.tabList[this.tabList.length-1].name })
      }
    }
  },
  computed: {
    ...mapState({
      tabList:state=>state.tab.tabList
    })
  }
  
}
</script>

<style scoped lang="less">
  div{
    padding:20px 20px 0 20px;
    .el-tag {
      cursor: pointer;  
      margin-right:15px;
    }
  }
</style>