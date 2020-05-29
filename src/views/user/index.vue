<template>
    <div class="user-list-container main-content-container">
        <div class="header-query">
            <el-form :inline="true" :model="queryForm" class="demo-form-inline" label-width="60px">
                <el-form-item label="用户名">
                    <el-input size="medium" clearable v-model="queryForm.username" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button size="medium" type="primary" @click="startSearch">查询</el-button>
                    <el-button size="medium" type="success" @click="registerUser">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="list-wrap">
            <el-table :data="userList" border stripe style="width: 100%" v-loading="userListLoading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.5)">
                <el-table-column align="center" prop="avator" label="头像">
                    <template slot-scope="scope">
                        <el-image fit="cover" class="table-img_icon" :src="scope.row.avatar">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="username" label="用户名"></el-table-column>
                <el-table-column align="center" prop="role_name" label="角色">
                    <template slot-scope="scope">
                        <span>{{scope.row.role_name || "未知"}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="phone" label="联系方式">
                    <template slot-scope="scope">
                        <span>{{scope.row.phone || "---"}}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="120" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editUser(scope.row)">编辑</el-button>
                        <el-button @click="delUser(scope.row)" type="text" style="color:#f56c6c;">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="bottom-pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 50]"
                    :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.totalSize"></el-pagination>
            </div>
            <user-edit :editUserVisible.sync="editUserVisible" :editUserForm="editUserForm"
                :editUserTitle="editUserTitle" :editUserId="editUserId" @initList="getUserList"></user-edit>
        </div>
    </div>
</template>
<script lang='ts'>
// @ is an alias to /src
import api from "@/api";
import { Component, Vue, Emit } from "vue-property-decorator";
import UserEdit from "./components/UserEdit.vue";
interface QueryJson {
    username?: string;
}
interface IeditUserForm {
    user_id?: string;
    username: string;
    password: string;
    avatar?: string;
    phone?: string;
    role?: string;
}
@Component({
    name: "Home",
    components: {
        UserEdit
    }
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
    private editUserForm: IeditUserForm = {
        username: "",
        password: ""
    };
    private editUserVisible: boolean = false;
    private editUserTitle: string = "注册用户";
    private editUserId: string = "";
    @Emit("changeVal")
    private changeValue() {
        return 10;
    }
    private startSearch() {
        this.pagination.currentPage = 1;
        this.getUserList();
    }
    private resetForm() {
        return {
            user_id: "",
            username: "",
            password: "",
            avatar: "",
            phone: "",
            role: ""
        };
    }
    private editUser(row: any) {
        this.editUserId = row._id;
        this.editUserVisible = true;
        this.editUserTitle = "编辑用户";
        this.editUserForm = JSON.parse(JSON.stringify(row));
    }
    private registerUser() {
        this.editUserId = "";
        this.editUserVisible = true;
        this.editUserTitle = "注册用户";
        this.editUserForm = this.resetForm();
    }
    private delUser(row: any) {
        this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(async () => {
                let params = {
                    user_id: row._id
                };
                api.user_del(params)
                    .then(res => {
                        this.getUserList();
                        this.$notify({
                            title: "成功",
                            message: "删除成功",
                            position: "bottom-right",
                            type: "success"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        this.$notify({
                            title: "成功",
                            message: "删除失败",
                            position: "bottom-right",
                            type: "warning"
                        });
                    });
            })
            .catch(err => {
                console.log(err);
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
    }

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
        .table-img_icon {
            width: 50px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: auto;
        }
    }
}
</style>
