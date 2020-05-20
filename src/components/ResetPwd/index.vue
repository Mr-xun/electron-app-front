<template>
    <el-dialog title="修改密码" :visible="resetPwdVisible" class="resetPwd-dialog" :before-close="closeResetPwd"
        :close-on-click-modal="false">
        <el-form :model="resetPwdForm" label-width="70px" :rules="resetPwdRules" ref="resetPwdForm">
            <el-form-item label="用户名" prop="account">
                <el-input v-model="resetPwdForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="公司名" prop="verify_one">
                <el-input v-model="resetPwdForm.verify_one" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="男主名" prop="verify_two">
                <el-input v-model="resetPwdForm.verify_two" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="女主名" prop="verify_three">
                <el-input v-model="resetPwdForm.verify_three" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpwd">
                <el-input v-model="resetPwdForm.newpwd" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeResetPwd">取 消</el-button>
            <el-button type="primary" @click="sureResetPwd()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import api from "@/api";
interface ResetPwdForm {
    account: string;
    verify_one: string;
    verify_two: string;
    verify_three: string;
    newpwd: string;
}
@Component({
    name: "ResetPwd"
})
export default class ResetPwd extends Vue {
    private switch: boolean = false;
    private resetPwdForm: ResetPwdForm = {
        account: "",
        verify_one: "",
        verify_two: "",
        verify_three: "",
        newpwd: ""
    };
    private resetPwdRules: object = {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        verify_one: [
            { required: true, message: "请输入公司名", trigger: "blur" }
        ],
        verify_two: [
            { required: true, message: "请输入男主名", trigger: "blur" }
        ],
        verify_three: [
            { required: true, message: "请输入女主名", trigger: "blur" }
        ],
        newpwd: [{ required: true, message: "请输入新密码", trigger: "blur" }]
    };
    @Prop({ default: false, type: Boolean }) resetPwdVisible!: boolean;
    @Watch("switch")
    private changeSwitch() {
        this.$emit("update:resetPwdVisible", false);
    }
    closeResetPwd() {
        const ref: any = this.$refs["resetPwdForm"];
        ref.resetFields();
        this.switch = !this.switch;
    }
    sureResetPwd() {
        let params = this.resetPwdForm;
        (this.$refs["resetPwdForm"] as any).validate(async (valid: boolean) => {
            if (valid) {
                try {
                    await api.user_resetPwd(params);
                    this.$message({
                        type: "success",
                        message: "密码修改完成"
                    });
                    this.switch = !this.switch;
                } catch (error) {
                    console.log(error);
                }
            } else {
                return false;
            }
        });
    }
}
</script>
<style lang='scss'>
.resetPwd-dialog {
    .el-dialog {
        width: 600px;
    }
}
</style>