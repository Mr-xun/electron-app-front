<template>
  <el-breadcrumb  class="app-breadcrumb" >
    <transition-group name="breadcrumb" key="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index">
        <span class="no-redirect" v-if="index == breadcrumbs.length -1">{{item.meta.title}}</span>
        <a v-else @click="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouteRecord } from "vue-router";
@Component({
  name: "Breadcrumb"
})
export default class Breadcrumb extends Vue {
  private breadcrumbs: RouteRecord[] = [];
  @Watch("$route")
  private watchRouteChange() {
    this.getBreadcrumb();
  }
  private getBreadcrumb() {
    let titlematched = this.$route.matched.filter(item => {
      return item.meta && item.meta.title;
    });
    let firstRoute = titlematched[0];
    if (!this.isHomePage(firstRoute)) {
      titlematched = [
        {
          path: "/home",
          meta: {
            title: "首页"
          }
        } as RouteRecord
      ].concat(titlematched);
    }
    this.breadcrumbs = titlematched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcurmb !== false;
    });
  }
  private isHomePage(route: RouteRecord) {
    const name = route && route.name;
    if (!name) {
      return false;
    }
    return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase();
  }
  private handleLink(item:any) {
    this.$router.push({path:item.path})
  }
  created() {
    this.getBreadcrumb();
  }
}
</script>
<style lang="scss" >
  .el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>