<template>
    <div class="brand-container">
        <div class="header-query">
            <el-form :inline="true" :model="queryForm" class="demo-form-inline">
                <el-form-item label="名称">
                    <el-input size="medium" clearable v-model="queryForm.brand_name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label=" " label-width="15px">
                    <el-button size="medium" type="primary" @click="startSearch">查询</el-button>
                    <el-button size="medium" type="success" @click="addBrand">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="list-wrap">
            <el-table :data="tableData" border style="width: 100%" stripe v-loading="tableLoading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.5)">
                <el-table-column min-width="120" align="center" prop="brand_name" label="品牌名称"></el-table-column>
                <el-table-column align="center" prop="brand_code" label="编码"><template slot-scope="scope">
                        <span>{{scope.row.brand_code || "---"}}</span>
                    </template></el-table-column>
                <el-table-column align="center" min-width="160" prop="create_time" label="创建时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.create_time || "---"}}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="120" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editBrand(scope.row)">编辑</el-button>
                        <el-button @click="delBrand(scope.row)" type="text" style="color:#f56c6c;">删除</el-button>
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
        <brand-edit :editBrandVisible.sync="editBrandVisible" :editBrandForm="editBrandForm"
            :editBrandTitle="editBrandTitle" :editBrandId="editBrandId" @initList="getBrandList">
        </brand-edit>
    </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import BrandEdit from "./components/BrandEdit.vue";
import api from "@/api";
import { BaseDataModule } from "@/store/modules/base";
interface IeditBrandForm {
    brand_id?: string;
    brand_name: string;
}
@Component({
    name: "MerchantList",
    components: {
        BrandEdit
    }
})
export default class MerchantList extends Vue {
    private queryForm: {} = {
        brand_name: ""
    };
    private editBrandForm: IeditBrandForm = {
        brand_name: ""
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
    private editBrandVisible: boolean = false;
    private editBrandTitle: string = "新增品牌";
    private editBrandId: string = "";
    private startSearch() {
        this.pagination.currentPage = 1;
        this.getBrandList();
    }
    private resetForm() {
        return {
            brand_name: ""
        };
    }
    private addBrand() {
        this.editBrandForm = this.resetForm();
        this.editBrandId = "";
        this.editBrandVisible = true;
        this.editBrandTitle = "新增品牌";
    }
    private editBrand(row: any) {
        this.editBrandId = row._id;
        this.editBrandVisible = true;
        this.editBrandTitle = "编辑品牌";
        console.log(row);
        this.editBrandForm = JSON.parse(JSON.stringify(row));
    }
    private delBrand(row: any) {
        this.$confirm(
            "此操作将永久删除该品牌并造成商品品牌丢失, 是否继续?",
            "提示",
            {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }
        )
            .then(async () => {
                let params = {
                    id: row._id,
                    brand_code: row.brand_code
                };
                api.brand_del(params).then(res => {
                    this.getBrandList();
                    BaseDataModule.getBrandType();
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
    private getBrandList() {
        this.tableLoading = true;
        let params = JSON.parse(JSON.stringify(this.queryForm));
        params.pageSize = this.pagination.pageSize;
        params.pageNum = this.pagination.currentPage;
        api.brand_list(params)
            .then(res => {
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
        this.getBrandList();
    }
    handleCurrentChange(val: number) {
        this.pagination.currentPage = val;
        this.getBrandList();
    }
    mounted() {
        this.getBrandList();
    }
}
</script>
<style lang="scss" >
.brand-container {
    .list-wrap {
        padding: 5px;
        background: #fff;
        border-radius: 3px;
        .table-img_icon {
            max-width: 100px;
            max-height: 80px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: auto;
        }
    }
}
</style>