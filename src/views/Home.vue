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

    getUserList() {
        let params = {
            pageSize: this.pagination.pageSize,
            pageNum: this.pagination.currentPage
        };
        api.getUserList(params)
            .then(res => {
                let { code, list, total } = res.data;
                this.userList = list;
                this.pagination.totalSize = total;
            })
            .catch(err => {
                console.log(err);
            });
    }
    handleSizeChange(val:number) {
        this.pagination.pageSize = val;
        this.getUserList();
    }
    handleCurrentChange(val:number) {
        this.pagination.currentPage = val;
        this.getUserList();
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
