<template>
    <el-menu
      :default-active="activeMenu"
      :unique-opened="false"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      style="height:100%;"
    >
      <MenuItem
        v-for="(route,index) in routes"
        :key="index"
        :route="route"
        :base-path="route.path"
      />
    </el-menu>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import MenuItem from "./MenuItem.vue";
import { routes } from "@/router";
import vuescroll from "vuescroll";
import { Config } from "vuescroll";
@Component({
  name: "Sidebar",
  components: {
    MenuItem
  }
})
export default class Sidebar extends Vue {
  get routes() {
    return routes;
  }
  get activeMenu() {
    const route = this.$route;
    const { meta, path } = route;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }
  mounted() {}
}
</script>