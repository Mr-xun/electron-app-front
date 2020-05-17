<template>
  <div class="merchant-container">
    <div class="header-query">
      <el-form :inline="true" :model="merchantForm" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="merchantForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="merchantForm.contact" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="startSearch">查询</el-button>
          <el-button type="success" @click="startSearch">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-wrap">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column align="center" prop="merchanname" label="商户名称"></el-table-column>
        <el-table-column align="center" prop="contact" label="联系人"></el-table-column>
        <el-table-column align="center" prop="contact_phone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="area" label="区域"></el-table-column>
        <el-table-column align="center" prop="adress" label="地址"></el-table-column>
        <el-table-column align="center" prop="merchan_code" label="编码"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text">编辑</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              style="color:#f56c6c;"
            >删除</el-button>
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
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "GoodList"
})
export default class GoodList extends Vue {
  private merchantForm: {} = {
    name: "",
    contact: ""
  };
  private tableData: Array<any> = [
    {
      merchanname: "三孔服务公司",
      adress: "三孔服务公司的位置",
      contact: "荀潇",
      area: "曲阜本地",
      contact_phone: "17810204418",
      merchan_code: "123455"
    },
    {
      merchanname: "曲阜服务区",
      adress: "曲阜服务区的位置",
      contact: "荀潇2",
      area: "曲阜本地",
      contact_phone: "17810204418",
      merchan_code: "123455"
    },
    {
      merchanname: "华翔超市",
      adress: "华翔超市的位置",
      contact: "荀潇2",
      area: "曲阜本地",
      contact_phone: "17810204418",
      merchan_code: "123455"
    },
    {
      merchanname: "美佳超市",
      adress: "美佳超市的位置",
      contact: "荀潇2",
      area: "曲阜本地",
      contact_phone: "17810204418",
      merchan_code: "123455"
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
  private deleteRow() {}
  handleSizeChange(val: number) {
    this.pagination.pageSize = val;
  }
  handleCurrentChange(val: number) {
    this.pagination.currentPage = val;
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