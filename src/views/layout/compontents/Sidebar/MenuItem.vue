<template>
  <div v-if="!route.meta || !route.meta.hidden">
    <template v-if="route.meta.rootMenu">
      <el-menu-item
        v-for="rootChild in route.children"
        :key="rootChild.path"
        :index="resolvePath(rootChild.path)"
      >
        <i v-if="rootChild.meta.icon" :class="`lf-icon-${rootChild.meta.icon}`"></i>
        {{rootChild.meta.title}}
      </el-menu-item>
    </template>
    <template v-if="!route.children && !route.meta.rootMenu">
      <el-menu-item :index="resolvePath(route.path)">
        <i v-if="route.meta.icon" :class="`lf-icon-${route.meta.icon}`"></i>

        <!-- <i class="el-icon-s-home"></i> -->
        {{route.meta.title}}
      </el-menu-item>
    </template>
    <el-submenu
      v-if="route.children && !route.meta.rootMenu"
      :index="resolvePath(route.path)"
      popper-append-to-body
    >
      <template slot="title">
        <i v-if="route.meta.icon" :class="`lf-icon-${route.meta.icon}`"></i>
        <span v-if="route.meta && route.meta.title">{{route.meta.title}}</span>
      </template>
      <MenuItem
        v-for="child in route.children"
        :key="child.path"
        :route="child"
        :base-path="route.path"
      ></MenuItem>
    </el-submenu>
    <!-- <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>首页
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-user-solid"></i>用户
      </template>
      <el-menu-item index="/user/list">列表</el-menu-item>
      <el-menu-item index="/user/about">关于</el-menu-item>
    </el-submenu>-->
  </div>
</template>
<script lang="ts">
import path from "path";
import { Component, Vue, Prop } from "vue-property-decorator";
import { Route, RouteConfig } from "vue-router";
@Component({
  name: "MenuItem"
})
export default class MenuItem extends Vue {
  @Prop({ required: true }) private route!: RouteConfig;
  @Prop({ required: true }) private basePath!: string;
  private resolvePath(routePath: string) {
    return path.posix.join(this.basePath, routePath);
  }
  mounted() {
    
  }
}
</script>