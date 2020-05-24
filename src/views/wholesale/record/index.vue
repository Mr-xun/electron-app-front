<template>
  <div class="record-container">
    <div class="header-query">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="订单编号">
          <el-input size="medium" clearable v-model="queryForm.name" placeholder="订单编号"></el-input>
        </el-form-item>
        <el-form-item label="商户">
          <el-input size="medium" clearable v-model="queryForm.contact" placeholder="商户"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            v-model="queryForm.create_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label=" " label-width="15px">
          <el-button size="medium" type="primary" @click="startSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-wrap">
      <el-timeline :reverse="true"> 
        <el-timeline-item
          :timestamp="item.create_time"
          placement="top"
          color="#0bbd87"
          v-for="(item,index) in orderData"
          :key="index"
        >
          <el-card>
            <h4>
              <span class="merchant-title">商户：{{item.merchant_name||'---'}}</span>
              创建者：{{item.create_user}}
            </h4>
            <el-table
              :data="item.order_content"
              border
              show-summary
              :summary-method="getSummaries"
              style="width: 100%"
            >
              <el-table-column type="index" width="80" align="center"></el-table-column>
              <el-table-column align="center" prop="goods_num" label="货号">
                <template slot-scope="scope">
                  <span>{{scope.row.goods_num?scope.row.goods_num:'--'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="goods_name" label="商品名称">
                <template slot-scope="scope">
                  <span>{{scope.row.goods_name?scope.row.goods_name:'--'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="goods_specifica" label="商品规格">
                <template slot-scope="scope">
                  <span>1 *</span>
                  <span>{{scope.row.goods_specifica?scope.row.goods_specifica:'0'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="buy_counter" label="数量">
                <template slot-scope="scope">
                  <span>{{scope.row.buy_counter?scope.row.buy_counter:Number(0).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="goods_unitprice" label="单价">
                <template slot-scope="scope">
                  <span>{{scope.row.goods_unitprice?scope.row.goods_unitprice:Number(0).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="sum_money" label="金额">
                <template slot-scope="scope">
                  <span>{{scope.row.sum_money?scope.row.sum_money.toFixed(2):Number(0).toFixed(2)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import api from "@/api";
import { BaseDataModule } from "@/store/modules/base";
interface IQueryForm {
  name?: string;
  contact?: string;
  create_time?: string;
}
@Component({
  name: "OrderList"
})
export default class OrderList extends Vue {
  private queryForm: IQueryForm = {
    name: "",
    contact: "",
    create_time: ""
  };

  private tableLoading: boolean = false;
  private orderData: Array<any> = [];
  private pagination: {
    totalSize: number;
    currentPage: number;
    pageSize: number;
  } = {
    totalSize: 0,
    currentPage: 1,
    pageSize: 10
  };
  private getSummaries(param) {
    const { columns, data } = param;
    const sums = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      if (index === 1) {
        sums[index] = "";
        return;
      }
      if (index === 2) {
        sums[index] = "";
        return;
      }
      if (index === 3) {
        sums[index] = "";
        return;
      }
      if (index === 5) {
        sums[index] = "";
        return;
      }
      const values = data.map(item => Number(item[column.property]));
      if (!values.every(value => isNaN(value))) {
        sums[index] = values
          .reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0)
          .toFixed(2);
        sums[index] += " ";
      } else {
        sums[index] = "N/A";
      }
    });
    return sums;
  }
  private startSearch() {
    this.pagination.currentPage = 1;
    this.getOrderList();
  }
  private getOrderList() {
    this.tableLoading = true;
    let params = JSON.parse(JSON.stringify(this.queryForm));
    params.pageSize = this.pagination.pageSize;
    params.pageNum = this.pagination.currentPage;
    api
      .wholesaleOrder_getOrder(params)
      .then(res => {
        let { code, list, total } = res.data;
        console.log(res);
        if (code == 0) {
          this.orderData = list;
          this.pagination.totalSize = total;
        } else {
          this.orderData = [];
          this.pagination.totalSize = 0;
        }
        this.tableLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.orderData = [];
        this.pagination.totalSize = 0;
        this.tableLoading = false;
      });
  }
  handleSizeChange(val: number) {
    this.pagination.pageSize = val;
    this.getOrderList();
  }
  handleCurrentChange(val: number) {
    this.pagination.currentPage = val;
    this.getOrderList();
  }
  mounted() {
    this.getOrderList();
  }
}
</script>
<style lang="scss" >
.record-container {
  .list-wrap {
    padding: 5px;
    background: #fff;
    border-radius: 3px;
    .merchant-title {
      display: inline-block;
      width: 300px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
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