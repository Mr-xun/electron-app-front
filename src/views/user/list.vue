<template>
  <div class="user-list-container main-content-container">
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
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
</template>
<script lang='ts'>
// @ is an alias to /src
import api from "@/api";
import { Component, Vue, Emit } from "vue-property-decorator";
@Component({
  name: "Home",
  components: {}
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
  @Emit("changeVal")
  private changeValue() {
    return 10;
  }

  getUserList() {
    let params = {
      pageSize: this.pagination.pageSize,
      pageNum: this.pagination.currentPage
    };
    api
      .user_list(params)
      .then(res => {
        let { code, list, total } = res.data;
        this.userList = list;
        this.pagination.totalSize = total;
      })
      .catch(err => {
        console.log(err);
      });
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
.bottom-pagination {
  padding: 15px 0;
  text-align: right;
}
</style>
