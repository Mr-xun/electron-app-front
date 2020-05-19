<template>
    <div class="user-list-container main-content-container">
        <div class="header-query">
            <el-form :inline="true" :model="queryForm" class="demo-form-inline" label-width="60px">
                <el-form-item label="用户名">
                    <el-input size="medium" clearable v-model="queryForm.username" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button size="medium" type="primary" @click="startSearch">查询
                    </el-button>
                    <el-button size="medium" type="success" @click="registerUser">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="list-wrap">
            <el-table :data="userList" border stripe style="width: 100%" v-loading="userListLoading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.5)">
                <el-table-column align="center" prop="avator" label="头像"></el-table-column>
                <el-table-column align="center" prop="username" label="用户名"></el-table-column>
                <el-table-column align="center" prop="password" label="密码"></el-table-column>
                <el-table-column align="center" prop="sex" label="性别"></el-table-column>
                <el-table-column align="center" prop="age" label="年龄"></el-table-column>
                <el-table-column align="center" prop="role" label="角色"></el-table-column>

            </el-table>
            <div class="bottom-pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 50]"
                    :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.totalSize"></el-pagination>
            </div>
        </div>

    </div>
</template>
<script lang='ts'>
// @ is an alias to /src
import api from "@/api";
import { Component, Vue, Emit } from "vue-property-decorator";

interface QueryJson {
    username?: string;
}
@Component({
    name: "Home",
    components: {}
})
export default class Home extends Vue {
    private userListLoading: boolean = false;
    private userList: any = [];
    private queryForm: QueryJson = {};
    private pagination: {
        totalSize: number;
        currentPage: number;
        pageSize: number;
    } = {
        totalSize: 0,
        currentPage: 1,
        pageSize: 10
    };
    @Emit("changeVal")
    private changeValue() {
        return 10;
    }
    private startSearch() {
        this.getUserList();
    }
    private registerUser() {}
    private async getUserList() {
        let params = {
            pageSize: this.pagination.pageSize,
            pageNum: this.pagination.currentPage,
            username: this.queryForm.username
        };
        this.userListLoading = true;
        try {
            let { data } = await api.user_list(params);
            this.userList = data.list;
            this.pagination.totalSize = data.total;
        } catch (error) {
            console.log(error);
            this.userList = [];
            this.pagination.totalSize = 0;
        }
        this.userListLoading = false;
    }
    handleSizeChange(val: number) {
        this.pagination.pageSize = val;
        this.getUserList();
    }
    handleCurrentChange(val: number) {
        this.pagination.currentPage = val;
        this.getUserList();
    }
    mounted() {
        this.getUserList();
    }
}
</script>
<style lang='scss'>
.user-list-container {
    .list-wrap {
        padding: 5px;
        background: #fff;
        border-radius: 3px;
    }
}
</style>
