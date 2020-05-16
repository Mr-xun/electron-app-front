<template>
  <div class="navbar">
    <Breadcrumb />
    <Navtitle />
    <div class="right-menu">
      <el-dropdown trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/images/user-avatar.png" class="user-avatar" />
          <span class="user-name">荀潇</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item icon="el-icon-s-home">首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item icon="el-icon-user" divided>荀潇</el-dropdown-item>
          <el-dropdown-item icon="el-icon-close" divided>
            <span @click="goLogin">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Navtitle from "@/components/Navtitle/index.vue";
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "NavBar",
  components: {
    Breadcrumb,
    Navtitle
  }
})
export default class NavBar extends Vue {
  private goLogin() {
    console.log(11);
    this.$router.push({ path: "/login" });
  }
}
</script>
<style lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0px 3px 4px -4px rgba(0, 0, 0, 0.5);
  .right-menu {
    .avatar-wrapper {
      display: flex;
      align-items: center;
      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #efe8e8;
      }
      .user-name{
        margin: 0 5px;
      }
    }
  }
}
</style>