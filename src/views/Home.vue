<template>
    <div class="home">
       <h2>这是首页</h2>
    </div>
</template>
<script lang='ts'>
// @ is an alias to /src
import api from "@/api";
import { Component, Vue,Emit } from "vue-property-decorator";
@Component({
    name: "Home",
})
export default class Home extends Vue {
    private userList = [];
    private pagination: {
        totalSize: number;
        currentPage: number;
        pageSize: number;
    } = {
        totalSize: 0,
        currentPage: 1,
        pageSize: 5
    };
    @Emit('changeVal')
    private changeValue(){
        return 10
    }
    mounted() {
    }
}
</script>
<style lang='scss'>
    .home{
        overflow: hidden;
    }
</style>
