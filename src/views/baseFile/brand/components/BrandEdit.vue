<template>
    <el-dialog :title="editBrandTitle" :visible="editBrandVisible" class="editbrand-dialog"
        :before-close="closeEditBrand" :close-on-click-modal="false">
        <el-form :model="editBrandForm" label-width="80px" :rules="editBrandRules" ref="editBrandForm">
            <el-form-item label="品牌名称" prop='brand_name'>
                <el-input v-model="editBrandForm.brand_name"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeEditBrand">取 消</el-button>
            <el-button type="primary" @click="submitBrand()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { BaseDataModule } from "@/store/modules/base";
import api from "@/api";
interface IeditBrandForm {
    brand_id?: string;
    brand_name: string;
}
@Component({
    name: "MerchantEdit"
})
export default class MerchantEdit extends Vue {
    @Prop() editBrandForm!: IeditBrandForm;
    @Prop({ default: false, type: Boolean }) editBrandVisible!: boolean;
    @Prop({ default: "新增品牌", type: String }) editBrandTitle!: string;
    @Prop({ default: null, type: String }) editBrandId!: any;
    private switch: boolean = false;
    private editBrandRules: object = {
        brand_name: [
            { required: true, message: "请输入品牌名称", trigger: "blur" }
        ]
    };
    @Watch("switch")
    private changeSwitch() {
        this.changeVisiable();
    }
    @Emit("update:editBrandVisible")
    private changeVisiable() {
        return false;
    }
    @Emit("initList")
    private sendEmit() {
        return;
    }
    private closeEditBrand() {
        this.$nextTick(() => {
            const ref: any = this.$refs["editBrandForm"];
            ref.resetFields();
            this.switch = !this.switch;
        });
    }
    private submitBrand() {
        let params: any = this.editBrandForm;
        (this.$refs["editBrandForm"] as any).validate(
            async (valid: boolean) => {
                if (valid) {
                    try {
                        if (this.editBrandId) {
                            params.brand_id = this.editBrandId;
                            await api.brand_update(params);
                            this.$message({
                                type: "success",
                                message: "品牌编辑完成"
                            });
                            this.switch = !this.switch;
                            this.sendEmit();
                        } else {
                            await api.brand_create(params);
                            this.$message({
                                type: "success",
                                message: "品牌新增完成"
                            });
                            this.switch = !this.switch;
                            this.sendEmit();
                        }
                        BaseDataModule.getBrandType();
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    return false;
                }
            }
        );
    }
    mounted() {}
}
</script>

<style lang='scss'>
.editbrand-dialog {
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