<template>
  <div class="goods-container main-content-container">
    <div class="header-query">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="货号">
          <el-input
            size="medium"
            clearable
            v-model="queryForm.goods_num"
            placeholder="货号"
            style="width:150px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input
            size="medium"
            clearable
            v-model="queryForm.goods_name"
            placeholder="商品名称"
            style="width:170px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select
            size="medium"
            clearable
            v-model="queryForm.goods_brand"
            placeholder="品牌"
            style="width:150px;"
          >
            <el-option
              v-for="(item,index) in $store.state.baseData.brandTypes"
              :key="index"
              :label="item.brand_name"
              :value="item.brand_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" " label-width="15px">
          <el-button size="medium" type="primary" @click="startSearch">查询</el-button>
          <el-button size="medium" type="success" @click="addGoods">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-wrap">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        stripe
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.5)"
      >
        <el-table-column min-width="80" align="center" prop="goods_num" label="货号"></el-table-column>
        <el-table-column min-width="160" align="center" prop="goods_name" label="名称"></el-table-column>
        <el-table-column min-width="120" align="center" prop="goods_brandName" label="品牌"></el-table-column>
        <el-table-column min-width="80" align="center" prop="goods_brandCode" label="品牌编码"></el-table-column>
        <el-table-column min-width="80" align="center" prop="goods_inventory" label="库存">
          <template slot-scope="scope">
            <span>{{scope.row.goods_inventory >=0? scope.row.goods_inventory: "---"}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goods_specifica" label="规格">
          <template slot-scope="scope">
            <span>{{scope.row.goods_specifica |specificaFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goods_iptPrice" label="进货价">
          <template slot-scope="scope">
            <span>{{scope.row.goods_iptPrice | monneyFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goods_optPrice" label="零售价">
          <template slot-scope="scope">
            <span>{{scope.row.goods_optPrice | monneyFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goods_pubTradePrice" label="批发价（通用）">
          <template slot-scope="scope">
            <span>{{scope.row.goods_pubTradePrice | monneyFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120" align="center" prop="goods_code" label="自编码"></el-table-column>
        <el-table-column min-width="160" align="center" prop="create_time" label="创建时间"></el-table-column>
        <el-table-column min-width="120" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editGoods(scope.row)">编辑</el-button>
            <el-button type="text" style="color:#f56c6c;" @click="delGoods(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[5, 10, 15, 50]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalSize"
        ></el-pagination>
      </div>
      <goods-edit
        :editGoodsVisible.sync="editGoodsVisible"
        :editGoodsForm="editGoodsForm"
        :editGoodsTitle="editGoodsTitle"
        :editGoodsId="editGoodsId"
        @initList="getGoodsList"
      ></goods-edit>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import GoodsEdit from "./components/GoodsEdit.vue";
import api from "@/api";
interface IeditGoodsForm {
  goods_id?: string;
  goods_name: string;
  goods_brandCode: string;
  goods_inventory?: number;
  goods_specifica?: number;
  goods_iptPrice?: number;
  goods_optPrice?: number;
  goods_pubTradePrice?: number;
  goods_tradePriceTemps?: any;
}
@Component({
  name: "GoodList",
  components: {
    GoodsEdit
  }
})
export default class GoodList extends Vue {
  private queryForm: {} = {
    goods_num: "",
    goods_name: "",
    goods_brand: ""
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
  private editGoodsVisible: boolean = false;
  private editGoodsForm: IeditGoodsForm = {
    goods_name: "",
    goods_brandCode: ""
  };
  private editGoodsTitle: string = "新建商品";
  private editGoodsId: string = "";
  private resetForm() {
    return {
      goods_id: "",
      goods_name: "",
      goods_brandCode: "",
      goods_inventory: 0,
      goods_specifica: 0,
      goods_iptPrice: 0,
      goods_optPrice: 0,
      goods_pubTradePrice: 0,
      goods_tradePriceTemps: []
    };
  }
  private startSearch() {
    this.pagination.currentPage = 1;
    this.getGoodsList();
  }
  private getGoodsList() {
    this.tableLoading = true;
    let params = JSON.parse(JSON.stringify(this.queryForm));
    params.pageSize = this.pagination.pageSize;
    params.pageNum = this.pagination.currentPage;
    api
      .goods_list(params)
      .then(res => {
        let { list, total } = res.data;
        this.tableData = list;
        this.pagination.totalSize = total;
        this.tableLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.tableData = [];
        this.pagination.totalSize = 0;
        this.tableLoading = false;
      });
  }
  private addGoods() {
    this.editGoodsForm = this.resetForm();
    this.editGoodsId = "";
    this.editGoodsVisible = true;
    this.editGoodsTitle = "新增商户";
  }
  private editGoods(row: any) {
    this.editGoodsId = row._id;
    this.editGoodsVisible = true;
    this.editGoodsTitle = "编辑商户";
    this.editGoodsForm = JSON.parse(JSON.stringify(row));
  }
  private delGoods(row: any) {
    this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        let params = {
          id: row._id
        };
        api
          .goods_del(params)
          .then(res => {
            this.getGoodsList();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(err => {
            console.log(err);
            this.$notify({
              title: "失败",
              message: "删除失败",
              position: "bottom-right",
              type: "error"
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
  handleSizeChange(val: number) {
    this.pagination.pageSize = val;
    this.getGoodsList();
  }
  handleCurrentChange(val: number) {
    this.pagination.currentPage = val;
    this.getGoodsList();
  }
  mounted() {
    this.getGoodsList();
  }
}
</script>
<style lang="scss" >
.goods-container {
  .list-wrap {
    padding: 5px;
    background: #fff;
    border-radius: 3px;
  }
}
</style>