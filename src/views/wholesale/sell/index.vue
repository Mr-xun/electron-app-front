<template >
  <div class="sell-container main-content-container">
    <div class="header-contenet header-query">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="单据号">
          <el-input size="medium" v-model="formInline.user" placeholder="单据号"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker size="medium" v-model="formInline.date" type="date" placeholder="选择日期" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="客户">
          <el-select size="medium" v-model="formInline.merchant" placeholder="选择客户">
            <el-option
              v-for="(item,index) in $store.state.baseData.merchantTypes"
              :key="index"
              :label="item.merchant_name"
              :value="item.merchant_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" label-width="15px">
          <el-button size="medium" type="primary" @click="addGoods('max')">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="order-status">
        <h3>未审核</h3>
    </div>
    <div class="list-wrap">
      <el-table :data="tableData" border show-summary style="width: 100%">
        <el-table-column type="index" width="80" align="center"></el-table-column>
        <el-table-column align="center" prop="goods_num" label="货号">
          <template slot-scope="scope">
            <el-input
              size="mini"
              style="width:80%;"
              @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
              v-model="scope.row.goods_num"
              v-if="scope.$index == deviceChooseRow"
              placeholder="请输入货号或者标记"
            ></el-input>
            <span
              v-else
              @click.stop="step3_changeFailCell(scope.$index, scope.row)"
            >{{scope.row.goods_num?scope.row.goods_num:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="商品名称">
          <template slot-scope="scope">
            <el-input
              size="mini"
              style="width:80%;"
              v-model="scope.row.name"
              @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
              v-if="scope.$index == deviceChooseRow"
              placeholder="编辑商品名称"
            ></el-input>
            <span v-else>{{scope.row.name?scope.row.name:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="商品规格">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.name"
              @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
              v-if="scope.$index == deviceChooseRow"
              placeholder="编辑商品规格"
            ></el-input-number>
            <span v-else>{{scope.row.name?scope.row.name:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="amount1" label="数量">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.amount1"
              v-if="scope.$index == deviceChooseRow"
              @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
              placeholder="编辑数量"
            ></el-input-number>
            <span v-else>{{scope.row.amount1?scope.row.amount1:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="amount2" label="单价">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.amount2"
              v-if="scope.$index == deviceChooseRow"
              @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
              placeholder="编辑单价"
            ></el-input-number>
            <span v-else>{{scope.row.amount2?scope.row.amount2:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="amount3" label="金额">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.amount3"
              v-if="scope.$index == deviceChooseRow"
              @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
              placeholder="编辑金额"
            ></el-input-number>
            <span v-else>{{scope.row.amount3?scope.row.amount3:'--'}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot-operate">
      <el-button type="info" @click="clearGoodsAll" >清空</el-button>

      <el-button type="success" >审核</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseDataModule } from "@/store/modules/base";
@Component({
  name: "sell"
})
export default class Sell extends Vue {
  private formInline: {} = {
    user: "",
    date: new Date(),
    region:  BaseDataModule.merchantTypes[0].merchant_code
  };
  private deviceChooseRow = null;
  tableData = [
    {
      id: "12987122",
      name: "雪糕",
      amount1: "234",
      amount2: "3.2",
      amount3: 10
    }
  ];
  addGoods(type,index, row) {
    let length = this.tableData.length
    if (index == length - 1 || type =='max') {
        this.deviceChooseRow +=1
      this.tableData.push({
        id: "12987122",
        name: "雪糕",
        amount1: "234",
        amount2: "3.2",
        amount3: 10
      });
    }
  }
  step3_changeFailCell(index, row) {
    console.log(index);
    //编辑
    this.deviceChooseRow = index;
  }
  clearGoodsAll(){
      this.tableData = []
  }
  clickCell(row, column, cell, event) {
    console.log(row, column, cell, event);
  }
}
</script>
<style lang="scss">
.sell-container {
.order-status{
    background: #fff;
    text-align: center;
    h3{
        height: 50px;
        line-height: 50px;
        margin: 0;
    }
}
  .list-wrap {
    padding: 5px;
    background: #fff;
    border-radius: 3px;
  }
  .foot-operate{
      padding: 20px;
    background: #fff;
    border-radius: 3px;
    text-align: right;
    padding-right: 50px;
  }
}
</style>