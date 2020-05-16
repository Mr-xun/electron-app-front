<template>
  <div class="app-container">
    <el-container style="height:100%">
      <el-aside width="200px">
        <Sidebar/>
      </el-aside>
      <el-container>
        <el-header class="app-header" height="50px" ><NavBar/></el-header>
        <el-main class="layout-main">
          <transition name="fade-transform" mode="out-in">
            <router-view @changeVal="changeValues" />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang='ts'>
import NavBar from './compontents/Navbar/index.vue';
import Sidebar from './compontents/Sidebar/index.vue'
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Layout",
  components:{
    NavBar,
    Sidebar
  }
})
export default class Layout extends Vue {
  changeValues(val: any) {
    console.log("子向父传参", val);
  }
}
</script>
<style lang='scss'>
.app-container {
      border-top: 1px solid #ded7d7;
  overflow: hidden;
  height: 100%;
  .app-header{
    padding: 0;
  }
  .layout-main{
    overflow: hidden;
    background-color: #f0f2f5;
    padding: 5px;
  }
}
</style>