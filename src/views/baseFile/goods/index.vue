<template>
  <div class="goods-container">
    <div class="header-query">
      <el-form :inline="true" :model="goodsForm" class="demo-form-inline">
        <el-form-item label="货号">
          <el-input v-model="goodsForm.code" placeholder="货号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="goodsForm.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="goodsForm.brand" placeholder="品牌">
            <el-option label="伊利" value="伊利"></el-option>
            <el-option label="蒙牛" value="蒙牛"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="startSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-wrap">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column align='center' prop="goods_code" label="货号" ></el-table-column>
        <el-table-column align='center' prop="name" label="名称" ></el-table-column>
        <el-table-column align='center' prop="brand" label="品牌"></el-table-column>
        <el-table-column align='center' prop="boxcount" label="支数"></el-table-column>
        <el-table-column align='center' prop="primecost" label="进货价"></el-table-column>
        <el-table-column align='center' prop="retail_price" label="零售价"></el-table-column>
        <el-table-column align='center' prop="trade_price" label="批发价"></el-table-column>
        <el-table-column align='center' prop="owncode" label="自编码"></el-table-column>

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
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "GoodList"
})
export default class GoodList extends Vue {
  private goodsForm: {} = {
    code: "",
    name: "",
    brand: ""
  };
  private tableData: Array<any> = [
    {
      goods_code: "001",
      name: "伊利小布丁",
      brand: "伊利",
      boxcount:'40',
      primecost:'44.00',
      retail_price:'48.00',
      trade_price:'46.00',
      owncode:'1001',
    },
    {
      goods_code: "002",
      name: "伊利梦工厂",
      brand: "伊利",
      boxcount:'40',
      primecost:'44.00',
      retail_price:'48.00',
      trade_price:'46.00',
      owncode:'1001',
    },
    {
      goods_code: "003",
      name: "蒙牛大布丁",
      brand: "蒙牛",
      boxcount:'40',
      primecost:'44.00',
      retail_price:'48.00',
      trade_price:'46.00',
      owncode:'1001',
    },
    {
      goods_code: "004",
      name: "华英迷你",
      brand: "华英",
      boxcount:'40',
      primecost:'44.00',
      retail_price:'48.00',
      trade_price:'46.00',
      owncode:'1001',
    }
  ];
  private pagination: {
    totalSize: number;
    currentPage: number;
    pageSize: number;
  } = {
    totalSize: 4,
    currentPage: 1,
    pageSize: 5
  };
  private startSearch() {}
  handleSizeChange(val: number) {
    this.pagination.pageSize = val;
  }
  handleCurrentChange(val: number) {
    this.pagination.currentPage = val;
  }
}
</script>
<style lang="scss" >
.goods-container {
  .header-query {
    background: #fff;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 5px;
  }
  .list-wrap {
    padding: 5px;
    background: #fff;
    border-radius: 3px;
    .bottom-pagination {
      padding: 15px 0;
      text-align: right;
    }
  }
}
</style>