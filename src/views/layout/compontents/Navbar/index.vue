<template>
    <div class="navbar">
        <Breadcrumb />
        <Navtitle />
        <div class="right-menu">
            <el-dropdown trigger="click">
                <div class="avatar-wrapper">
                    <img src="@/assets/images/user-avatar.png" class="user-avatar" />
                    <span class="user-name">{{$store.state.user.userInfo.username }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item icon="el-icon-s-home">首页</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item icon="el-icon-user" divided>{{$store.state.user.userInfo.role ==1?'管理员':'平民' }}</el-dropdown-item>
                    <el-dropdown-item icon="lf-icon-tuichu" divided @click.native="goLogin">
                        <span >退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang="ts">
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Navtitle from "@/components/Navtitle/index.vue";
import { Vue, Component,Watch } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
@Component({
    name: "NavBar",
    components: {
        Breadcrumb,
        Navtitle
    }
})
export default class NavBar extends Vue {
    private async goLogin() {
       const result =  await UserModule.logOut()
       if(result){
           this.$router.push({path:'/login'})
       }
    }
    mounted() {
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
    box-shadow: 0px 3px 3px -5px rgba(0, 0, 0, 0.8);

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
            .user-name {
                margin: 0 5px;
            }
        }
    }
}
</style>