<template>
    <div class="home">
        <ul>
            <li v-for="(item,index) in userList" :key="index" @click="changeValue">
                用户：{{item.username}}
                <hr />
                密码：{{item.password}}
            </li>
        </ul>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 50]" :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalSize"></el-pagination>
    </div>
</template>
<script lang='ts'>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import api from "@/api";
import { Component, Vue,Emit } from "vue-property-decorator";
@Component({
    name: "Home",
    components: { HelloWorld }
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
        this.getUserList();
    }
}
</script>
<style lang='scss'>
    .home{
        overflow: hidden;
        width: calc(100% - 200px);
    }
</style>
