<template>
  <el-menu :default-openeds="['1', '3']" router background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff" style="height:100%;">
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>首页
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-user-solid"></i>用户
      </template>
      <el-menu-item index="/user/list">列表</el-menu-item>
      <el-menu-item index="/user/about">关于</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Sidebar"
})
export default class Sidebar extends Vue {

}
</script>