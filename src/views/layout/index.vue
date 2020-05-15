<template>
    <div class="app-container">
        <el-container>
            <el-header  style="background-color: rgb(238, 241, 246)">Header</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu :default-openeds="['1', '3']" router>
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>导航一</template>
                                <el-menu-item index='/home' >Home</el-menu-item>
                                <el-menu-item index='/about'>About</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <transition name="fade-transform" mode="out-in">
                        <router-view @changeVal='changeValues' />
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({
    name: "Layout"
})
export default class Layout extends Vue {
    changeValues(val:any){
        console.log('子向父传参',val)
    }
}
</script>
<style lang='scss'>
    .app-container{
        overflow: hidden;
    }
</style>