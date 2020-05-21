<template>
    <el-dialog :title="editMctTitle" :visible="editMctVisible" class="editmct-dialog" :before-close="closeEditMct"
        :close-on-click-modal="false">
        <el-form :model="editMctForm" label-width="80px" :rules="editMctRules" ref="editMctForm">
            <el-form-item label="商户名称" prop='merchant_name'>
                <el-input v-model="editMctForm.merchant_name"></el-input>
            </el-form-item>
            <el-form-item label="商户图标">
                <el-upload class="avatar-uploader" :headers="{authorization: `Bearer ${$store.state.user.token}`}"
                    :action="`http://192.168.13.241:3001/file/upload`" :show-file-list="false"
                    accept="image/png,image/gif,image/jpg,image/jpeg" :on-success="handleAvatarSuccess">
                    <el-image v-if="editMctForm.merchant_icon" class="avatar" style="width: 100px; height: 100px"
                        :src="editMctForm.merchant_icon" fit="cover">
                    </el-image>
                    <i v-else class="el-icon-upload avatar-uploader-icon"></i>
                    <div v-if="!editMctForm.merchant_icon" class="avatar-uploader-text">上传照片</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="editMctForm.merchant_concact"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="editMctForm.merchant_concactMethod"></el-input>
            </el-form-item>
            <el-form-item label="所在区域">
                <el-select v-model="editMctForm.merchant_area" placeholder="请选择位置区域">
                    <el-option label="曲阜本地" value="曲阜本地"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商户地址">
                <el-input v-model="editMctForm.merchant_adress"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="editMctForm.merchant_note"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeEditMct">取 消</el-button>
            <el-button type="primary" @click="submitMct()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import api from "@/api";
interface IeditMctForm {
    merchant_id?: string;
    merchant_name: string;
    merchant_icon?: string;
    merchant_concact?: string;
    merchant_concactMethod?: string;
    merchant_area?: string;
    merchant_adress?: string;
    merchant_note?: string;
}
let devBaseUrl = "http://192.168.13.241:3001";
let proBaseUrl = "http://49.233.16.84:3001";
let homeBaseUrl = "http://192.168.0.127:3001";
let baseUrl = process.env.NODE_ENV == "product" ? proBaseUrl : devBaseUrl;
@Component({
    name: "ResetPwd"
})
export default class ResetPwd extends Vue {
    @Prop() editMctForm!: IeditMctForm;
    @Prop({ default: false, type: Boolean }) editMctVisible!: boolean;
    @Prop({ default: "新增商户", type: String }) editMctTitle!: string;
    @Prop({ default: null, type: String }) editMctId!: any;
    private switch: boolean = false;
    private editMctRules: object = {
        merchant_name: [
            { required: true, message: "请输入商户名称", trigger: "blur" }
        ]
    };
    @Watch("switch")
    private changeSwitch() {
        this.changeVisiable();
    }
    @Emit("update:editMctVisible")
    private changeVisiable() {
        return false;
    }
    @Emit("initList")
    private sendEmit() {
        return;
    }
    handleAvatarSuccess({ res, file }: { res: any; file: any }) {
        if (res.code == 0) {
            this.editMctForm.merchant_icon = res.result.data;
        } else {
            this.editMctForm.merchant_icon = "";
        }
    }
    private closeEditMct() {
        this.$nextTick(() => {
            const ref: any = this.$refs["editMctForm"];
            ref.resetFields();
            this.switch = !this.switch;
        });
    }
    private submitMct() {
        let params: any = this.editMctForm;
        (this.$refs["editMctForm"] as any).validate(async (valid: boolean) => {
            if (valid) {
                try {
                    if (this.editMctId) {
                        params.merchant_id = this.editMctId;
                        await api.merchant_update(params);
                        this.$message({
                            type: "success",
                            message: "商户编辑完成"
                        });
                        this.switch = !this.switch;
                        this.sendEmit();
                    } else {
                        await api.merchant_create(params);
                        this.$message({
                            type: "success",
                            message: "商户新增完成"
                        });
                        this.switch = !this.switch;
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
.editmct-dialog {
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