<template>
  <el-dialog
    :title="editUserTitle"
    :visible="editUserVisible"
    class="edituser-dialog"
    :before-close="closeEditUser"
    :close-on-click-modal="false"
  >
    <el-form :model="editUserForm" label-width="80px" :rules="editUserRules" ref="editUserForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="editUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="editUserForm.password" :disabled="editUserId?true:false"></el-input>
      </el-form-item>
      <el-form-item label="用户图标">
        <el-upload
          class="avatar-uploader"
          :headers="{authorization: `Bearer ${$store.state.user.token}`}"
          :action="`http://192.168.0.127:3001/file/upload`"
          :show-file-list="false"
          accept="image/png, image/gif, image/jpg, image/jpeg"
          :on-success="handleAvatarSuccess"
        >
          <el-image
            v-if="editUserForm.avatar"
            class="avatar"
            style="width: 100px; height: 100px"
            :src="editUserForm.avatar"
            fit="cover"
          ></el-image>
          <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          <div v-if="!editUserForm.avatar" class="avatar-uploader-text">上传照片</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="editUserForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select v-model="editUserForm.role" placeholder="请选择用户角色">
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeEditUser">取 消</el-button>
      <el-button type="primary" @click="submitUser()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { BaseDataModule } from "@/store/modules/base";
import api from "@/api";
interface IeditUserForm {
  user_id?: string;
  username: string;
  password: string;
  avatar?: string;
  phone?: string;
  role?: string;
}
let devBaseUrl = "http://192.168.13.241:3001";
let proBaseUrl = "http://49.233.16.84:3001";
let homeBaseUrl = "http://192.168.0.127:3001";
let baseUrl = process.env.NODE_ENV == "product" ? proBaseUrl : devBaseUrl;
@Component({
  name: "UserEdit"
})
export default class UserEdit extends Vue {
  @Prop() editUserForm!: IeditUserForm;
  @Prop({ default: false, type: Boolean }) editUserVisible!: boolean;
  @Prop({ default: "注册用户", type: String }) editUserTitle!: string;
  @Prop({ default: null, type: String }) editUserId!: any;
  private switch: boolean = false;
  private editUserRules: object = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    role: [{ required: true, message: "请选择用户角色", trigger: "change" }]
  };
  @Watch("switch")
  private changeSwitch() {
    this.changeVisiable();
  }
  @Emit("update:editUserVisible")
  private changeVisiable() {
    return false;
  }
  @Emit("initList")
  private sendEmit() {
    return;
  }
  handleAvatarSuccess(res: any, file: any) {
    if (res.code == 0) {
      this.editUserForm.avatar = res.result.data;
    } else {
      this.editUserForm.avatar = "";
    }
  }
  private closeEditUser() {
    this.$nextTick(() => {
      const ref: any = this.$refs["editUserForm"];
      ref.resetFields();
    });
      this.switch = !this.switch;

  }
  private submitUser() {
    let params: any = this.editUserForm;
    (this.$refs["editUserForm"] as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          if (this.editUserId) {
            params.user_id = this.editUserId;
            await api.user_update(params);
            this.$message({
              type: "success",
              message: "用户编辑完成"
            });
            this.closeEditUser();
            this.sendEmit();
          } else {
            await api.user_register(params);
            this.$message({
              type: "success",
              message: "用户新增完成"
            });
            this.closeEditUser();
            this.sendEmit();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return false;
      }
    });
  }
  mounted() {}
}
</script>

<style lang='scss'>
.edituser-dialog {
  .el-dialog {
    width: 600px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>