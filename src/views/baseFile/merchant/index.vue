<template>
    <div class="merchant-container main-content-container">
        <div class="header-query">
            <el-form :inline="true" :model="merchantForm" class="demo-form-inline" label-width="60px">
                <el-form-item label="名称">
                    <el-input size="medium" clearable v-model="merchantForm.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input size="medium" clearable v-model="merchantForm.contact" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button size="medium" type="primary" @click="startSearch">查询</el-button>
                    <el-button size="medium" type="success" @click="startSearch">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="list-wrap">
            <el-table :data="tableData" border style="width: 100%" stripe v-loading="tableLoading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.5)">
                <el-table-column min-width="120" align="center" prop="merchant_name" label="商户名称"></el-table-column>
                <el-table-column align="center" prop="merchant_concact" label="联系人"></el-table-column>
                <el-table-column min-width="120" align="center" prop="merchant_concactMethod" label="联系方式">
                </el-table-column>
                <el-table-column align="center" prop="merchant_area" label="区域"></el-table-column>
                <el-table-column min-width="160" align="center" prop="merchant_adress" label="地址"><template
                        slot-scope="scope">
                        <span>{{scope.row.merchant_adress || "---"}}</span>
                    </template></el-table-column>
                <el-table-column align="center" prop="merchant_code" label="编码"><template slot-scope="scope">
                        <span>{{scope.row.merchant_code || "---"}}</span>
                    </template></el-table-column>
                <el-table-column align="center" prop="merchant_note" label="备注">
                    <template slot-scope="scope">
                        <span>{{scope.row.merchant_note || "---"}}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="120" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text">编辑</el-button>
                        <el-button @click="delMerchant(scope.row)" type="text" style="color:#f56c6c;">删除</el-button>
                    </template>
                </el-table-column>
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
import { Vue, Component } from "vue-property-decorator";
import api from "@/api";
@Component({
    name: "GoodList"
})
export default class GoodList extends Vue {
    private merchantForm: {} = {
        name: "",
        contact: ""
    };
    private tableLoading: boolean = false;
    private tableData: Array<any> = [];
    private pagination: {
        totalSize: number;
        currentPage: number;
        pageSize: number;
    } = {
        totalSize: 0,
        currentPage: 1,
        pageSize: 10
    };
    private startSearch() {
        this.getMerchantList();
    }
    private delMerchant(row: any) {
        this.$confirm("此操作将永久删除该商户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(async () => {
                let params = {
                    id: row._id
                };
                api.merchant_del(params).then(res => {
                    this.getMerchantList();
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
    }
    private getMerchantList() {
        this.tableLoading = true;
        let params = JSON.parse(JSON.stringify(this.merchantForm));
        params.pageSize = this.pagination.pageSize;
        params.pageNum = this.pagination.currentPage;

        api.merchant_list(params)
            .then(res => {
                console.log(res);
                let { code, list, total } = res.data;
                if (code == 0) {
                    this.tableData = list;
                    this.pagination.totalSize = total;
                } else {
                    this.tableData = [];
                    this.pagination.totalSize = 0;
                }
                this.tableLoading = false;
            })
            .catch(err => {
                console.log(err);
                this.tableData = [];
                this.pagination.totalSize = 0;
                this.tableLoading = false;
            });
    }
    handleSizeChange(val: number) {
        this.pagination.pageSize = val;
        this.getMerchantList();
    }
    handleCurrentChange(val: number) {
        this.pagination.currentPage = val;
        this.getMerchantList();
    }
    mounted() {
        this.getMerchantList();
    }
}
</script>
<style lang="scss" >
.merchant-container {
    .list-wrap {
        padding: 5px;
        background: #fff;
        border-radius: 3px;
    }
}
</style>