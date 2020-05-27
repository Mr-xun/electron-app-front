<template>
    <el-dialog :title="editGoodsTitle" :visible="editGoodsVisible" class="editgoods-dialog"
        :before-close="closeEditGoods" :close-on-click-modal="false">
        <el-form :model="editGoodsForm" label-width="150px" :rules="editGoodsRules" ref="editGoodsForm">
            <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="editGoodsForm.goods_name" style="width:325px;"></el-input>
            </el-form-item>
            <el-form-item label="商品品牌" prop="goods_brandCode">
                <el-select clearable v-model="editGoodsForm.goods_brandCode" placeholder="品牌" style="width:325px;">
                    <el-option v-for="(item,index) in $store.state.baseData.brandTypes" :key="index"
                        :label="item.brand_name" :value="item.brand_code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="库存">
                <el-input-number controls-position="right" v-model="editGoodsForm.goods_inventory" style="width:325px;">
                </el-input-number>
            </el-form-item>
            <el-form-item label="规格">
                <div class="inventory-item">
                    <span>1</span>
                    <em>*</em>
                    <el-input-number controls-position="right" v-model="editGoodsForm.goods_specifica"
                        style="width:285px;"></el-input-number>
                </div>
            </el-form-item>
            <el-form-item label="进货价">
                <el-input-number controls-position="right" :min="0" v-model="editGoodsForm.goods_iptPrice"
                    style="width:325px;"></el-input-number>
            </el-form-item>
            <el-form-item label="零售价">
                <el-input-number controls-position="right" :min="0" v-model="editGoodsForm.goods_optPrice"
                    style="width:325px;"></el-input-number>
            </el-form-item>
            <el-form-item label="批发价(通用)">
                <el-input-number controls-position="right" :min="0" v-model="editGoodsForm.goods_pubTradePrice"
                    style="width:325px;"></el-input-number>
            </el-form-item>
            <el-form-item :label="'商户模板'+(index+1)" v-for="(item,index) in editGoodsForm.goods_tradePriceTemps"
                :prop="'goods_tradePriceTemps.' + index + '.template_code'" :rules="{
      required: true, message: '请选择商户不能为空', trigger: 'change'
    }" :key="index">
                <div class="tradePrices-item">
                    <el-select clearable v-model="item.template_code" @change="changeMerchant(item.template_code,item)"
                        placeholder="商户" style="width:160px">
                        <el-option v-for="(item,index) in $store.state.baseData.merchantTypes" :key="index"
                            :label="item.merchant_name" :value="item.merchant_code"></el-option>
                    </el-select>
                    <span>：</span>
                    <el-input-number style="width:150px;" controls-position="right" :min="0"
                        v-model="item.template_price"></el-input-number>
                    <div class="remove-template">
                        <el-button icon="el-icon-delete" size="small" @click="removeTemplate(index)" circle></el-button>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addTempalte">添加模板</el-button>
            <el-button @click="closeEditGoods">取 消</el-button>
            <el-button type="primary" @click="submitGoods()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { BaseDataModule } from "@/store/modules/base";
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
    name: "GoodsEdit"
})
export default class GoodsEdit extends Vue {
    @Prop() editGoodsForm!: IeditGoodsForm;
    @Prop({ default: false, type: Boolean }) editGoodsVisible!: boolean;
    @Prop({ default: "新增商品", type: String }) editGoodsTitle!: string;
    @Prop({ default: null, type: String }) editGoodsId!: any;
    private switch: boolean = false;
    private editGoodsRules: object = {
        goods_name: [
            { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_brandCode: [
            { required: true, message: "请选择商品品牌", trigger: "change" }
        ]
    };
    @Watch("switch")
    private changeSwitch() {
        this.changeVisiable();
    }
    @Emit("update:editGoodsVisible")
    private changeVisiable() {
        return false;
    }
    @Emit("initList")
    private sendEmit() {
        return;
    }
    private removeTemplate(index: number) {
        this.editGoodsForm.goods_tradePriceTemps.splice(index, 1);
    }
    private addTempalte() {
        if (!this.editGoodsForm.goods_tradePriceTemps) {
            this.editGoodsForm.goods_tradePriceTemps = [];
        }
        this.editGoodsForm.goods_tradePriceTemps.push({
            template_name: "",
            template_price: 0,
            template_code: ""
        });
    }
    private closeEditGoods() {
        this.$nextTick(() => {
            const ref: any = this.$refs["editGoodsForm"];
            ref.resetFields();
            this.switch = !this.switch;
        });
    }
    private changeMerchant(value: string, item: any) {
        let result = BaseDataModule.merchantTypes.filter(
            (merchant: { merchant_code: string }) =>
                merchant.merchant_code == value
        );
        item.template_name = result[0].merchant_name;
    }
    private submitGoods() {
        let params: any = this.editGoodsForm;
        (this.$refs["editGoodsForm"] as any).validate(
            async (valid: boolean) => {
                if (valid) {
                    try {
                        if (this.editGoodsId) {
                            params.goods_id = this.editGoodsId;
                            await api.goods_update(params);
                            this.$notify({
                                title: "成功",
                                message: "商品编辑完成",
                                position: "bottom-right",
                                type: "success"
                            });
                            this.closeEditGoods();
                            this.sendEmit();
                        } else {
                            await api.goods_create(params);
                            this.$notify({
                                title: "成功",
                                message: "商品新增完成",
                                position: "bottom-right",
                                type: "success"
                            });
                            this.closeEditGoods();
                            this.sendEmit();
                        }
                    } catch (error) {
                        console.log(error);
                        this.$notify({
                            title: "失败",
                            message: "系统异常，商品操作失败",
                            position: "bottom-right",
                            type: "error"
                        });
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
.editgoods-dialog {
    .el-dialog {
        width: 600px;
    }
    .inventory-item {
        display: flex;
        span {
            display: inline-block;
            width: 20px;
            text-align: center;
        }
        em {
            display: inline-block;
            text-align: center;
            margin-right: 15px;
        }
    }
    .tradePrices-item {
        display: flex;
        .remove-template {
            margin-left: 10px;
        }
    }
}
</style>