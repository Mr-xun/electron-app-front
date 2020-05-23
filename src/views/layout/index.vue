<template>
  <div class="app-container">
    <el-container style="height:100%">
      <el-aside width="200px" class="aside-container">
        <vuescroll :ops="slideOps" class="side-scroll" style="height:100%;">
          <Sidebar />
        </vuescroll>
      </el-aside>
      <el-container>
        <el-header class="app-header" height="50px">
          <NavBar />
        </el-header>
        <el-main class="layout-main">
          <vuescroll :ops="ops">
            <transition name="fade-transform" mode="out-in">
              <router-view @changeVal="changeValues" />
            </transition>
          </vuescroll>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang='ts'>
import NavBar from "./compontents/Navbar/index.vue";
import Sidebar from "./compontents/Sidebar/index.vue";
import { Component, Vue } from "vue-property-decorator";
import vuescroll from "vuescroll";
import { Config } from "vuescroll";
const slideOps: Config = {
  scrollPanel: {
    scrollingX: false,
    easing: "easeInOutQuint",
    speed: 0
  },
  rail: {
    background: "#01a99a",
    opacity: 0,
    size: "5px",
    specifyBorderRadius: false,
    gutterOfEnds: "0", //轨道距 x 和 y 轴两端的距离
    gutterOfSide: "0", //距离容器的距离
    keepShow: false, //是否即使 bar 不存在的情况下也保持显示
    border: "none" //边框
  },
  bar: {
    onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
    background: "#617284" //颜色
  }
};
const ops: Config = {
  vuescroll: {},
  scrollPanel: {
    easing: "easeInOutQuint",
    speed: 0
  },
  rail: {
    background: "#01a99a",
    opacity: 0,
    size: "10px",
    specifyBorderRadius: false,
    gutterOfEnds: "0", //轨道距 x 和 y 轴两端的距离
    gutterOfSide: "0", //距离容器的距离
    keepShow: false, //是否即使 bar 不存在的情况下也保持显示
    border: "none" //边框
  },
  bar: {
    onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
    background: "#bbbbbb" //颜色
  }
};
@Component({
  name: "Layout",
  components: {
    NavBar,
    Sidebar,
    vuescroll
  }
})
export default class Layout extends Vue {
  private ops = ops;
  private slideOps = slideOps;
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
  .app-header {
    padding: 0;
  }
  .layout-main {
    overflow: hidden;
    background-color: #f0f2f5;
    padding: 5px;
  }
  .aside-container {
    .el-submenu {
      overflow: hidden;
    }
    .side-scroll {
      height: 100%;
      .__view {
        height: 100%;
      }
    }
  }
}
</style>