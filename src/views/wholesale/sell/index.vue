<template >
    <div class="sell-container main-content-container">
        <div class="header-contenet header-query">
            <el-form :inline="true" :model="orderForm" class="query-form-inline">
                <el-form-item label="单据号">
                    <el-input size="medium" v-model="orderForm.orderNum" placeholder="单据号" disabled></el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker size="medium" v-model="orderForm.date" type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期" disabled>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="客户">
                    <el-select size="medium" v-model="orderForm.merchant" placeholder="选择客户" @change="changeMerchant">
                        <el-option v-for="(item,index) in $store.state.baseData.merchantTypes" :key="index"
                            :label="item.merchant_name" :value="item.merchant_code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label label-width="15px">
                    <el-button size="medium" type="primary" @click="addGoods('max')">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="order-status">
            <h3>{{orderStatus?"已审核":"未审核"}}</h3>
        </div>
        <div class="list-wrap">
            <el-table :data="orderList" border show-summary :summary-method="getSummaries" style="width: 100%">
                <el-table-column type="index" width="80" align="center"></el-table-column>
                <el-table-column align="center" prop="goods_num" label="货号">
                    <template slot-scope="scope">
                        <el-autocomplete size="medium" style="width:80%;" v-model="scope.row.goods_num"
                            v-if="scope.$index == deviceChooseRow"
                            @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
                            :fetch-suggestions="querySearchGoods" placeholder="请输入货号或者标记" :trigger-on-focus="false"
                            @select="chooseGoods"></el-autocomplete>
                        <span v-else
                            @click.stop="changeCell(scope.$index, scope.row)">{{scope.row.goods_num?scope.row.goods_num:'--'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="goods_name" label="商品名称">
                    <template slot-scope="scope">
                        <el-input size="medium" style="width:80%;" v-model="scope.row.goods_name"
                            @change="changeGoodsName(scope.row)"
                            @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
                            v-if="scope.$index == deviceChooseRow" placeholder="编辑商品名称"></el-input>
                        <span v-else>{{scope.row.goods_name?scope.row.goods_name:'--'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="goods_specifica" label="商品规格">
                    <template slot-scope="scope">
                        <span>1 *</span>
                        <el-input-number style="width:70%;" :min="0" size="medium" v-model="scope.row.goods_specifica"
                            @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
                            @change="changeSpecifica(scope.row)" v-if="scope.$index == deviceChooseRow"
                            placeholder="编辑商品规格"></el-input-number>
                        <span v-else>{{scope.row.goods_specifica?scope.row.goods_specifica:'0'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="buy_counter" label="数量">
                    <template slot-scope="scope">
                        <el-input-number style="width:85%;" :min="0" size="medium" v-model="scope.row.buy_counter"
                            v-if="scope.$index == deviceChooseRow"
                            @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
                            @change="changeUnitPriceOrCounter(scope.row)" placeholder="编辑数量"></el-input-number>
                        <span v-else>{{scope.row.buy_counter?scope.row.buy_counter:Number(0).toFixed(2)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="goods_unitprice" label="单价">
                    <template slot-scope="scope">
                        <el-input-number style="width:85%;" :min="0" size="medium" v-model="scope.row.goods_unitprice"
                            v-if="scope.$index == deviceChooseRow"
                            @keyup.enter.native="addGoods('enter',scope.$index, scope.row)"
                            @change="changeUnitPriceOrCounter(scope.row)" placeholder="编辑单价"></el-input-number>
                        <span v-else>{{scope.row.goods_unitprice?scope.row.goods_unitprice:Number(0).toFixed(2)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="sum_money" label="金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.sum_money?scope.row.sum_money.toFixed(2):Number(0).toFixed(2)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="foot-operate">
            <el-button type="info" @click="clearGoodsAll">清空</el-button>
            <el-button type="success" @click="reviewedPass" v-if="!orderStatus">审核</el-button>
            <el-button type="warning" @click="rejectPass" v-if="orderStatus">驳回</el-button>
            <el-button type="success" @click="startPrint" v-if="orderStatus">打印</el-button>
        </div>
        <el-dialog title="预览" :visible.sync="dialogTableVisible" :before-close="()=>{dialogTableVisible =false}">
            <div id="printMe">
                <div class="header-content">
                    <h3 class="title">批发销售单</h3>
                    <h4 class="order-status">{{orderStatus?"已审核":"未审核"}}</h4>
                    <div class="print-info">
                        <p>订单编号:<span class="bottom_border">{{orderForm.orderNum}}</span>日期：<span
                                class="bottom_border">{{orderForm.date}}</span>客户：<span
                                class="bottom_border">{{orderForm.merchant}}</span></p>
                    </div>
                </div>
                <div class="table-content">
                    <el-table :data="orderList" border show-summary :summary-method="getSummaries" style="width: 100%">
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
                                <span>1 *&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button v-print="printObj" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseDataModule } from "@/store/modules/base";
import { UserModule } from "@/store/modules/user";
import api from "@/api";
import moment from "moment";
import print from "vue-print-nb";
interface IOrderForm {
    orderNum: string;
    date: string;
    merchant?: string;
}
@Component({
    name: "sell",
    directives: {
        print
    }
})
export default class Sell extends Vue {
    dialogTableVisible = false;
    private orderForm: IOrderForm = {
        orderNum: "",
        date: moment().format("YYYY-MM-DD"),
        merchant:
            BaseDataModule.merchantTypes && BaseDataModule.merchantTypes.length
                ? BaseDataModule.merchantTypes[0].merchant_code
                : ""
    };
    private orderStatus: boolean = false; //订单状态
    private deviceChooseRow = 0;
    private orderList: any[] = [
        {
            goods_name: "",
            goods_num: "",
            goods_specifica: "",
            buy_counter: 0,
            goods_unitprice: 0,
            sum_money: 0,
            endCallback: this.surePrint()
        }
    ];
    printObj = {
        id: "printMe",
        popTitle: "批发销售单",
        endCallback: () => {
            this.dialogTableVisible = false;
        }
    };
    private getSummaries(param: any) {
        const { columns, data } = param;
        const sums: any = [];
        columns.forEach((column: any, index: number) => {
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
            const values = data.map((item: any[]) =>
                Number(item[column.property])
            );
            if (!values.every((value: any) => isNaN(value))) {
                sums[index] = values
                    .reduce((prev: number, curr: number) => {
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
    private changeMerchant(value: string) {
        this.orderList.forEach((item: any, index) => {
            item.goods_unitprice = item.goods_pubTradePrice;
            item.goods_tradePriceTemps.forEach(
                (_v: {
                    template_code: string;
                    template_price: string | number;
                }) => {
                    if (value == _v.template_code) {
                        item.goods_unitprice = _v.template_price;
                    }
                }
            );
            this.changeUnitPriceOrCounter(item);
            this.$set(this.orderList, index, item);
        });
    }
    private changeGoodsName() {
        this.orderStatus = false;
    }
    private changeSpecifica() {
        this.orderStatus = false;
    }
    private changeUnitPriceOrCounter(item: any) {
        this.orderStatus = false;
        this.$set(item, "sum_money", item.buy_counter * item.goods_unitprice);
    }
    private addGoods(type: string, index: number) {
        this.orderStatus = false;
        let length = this.orderList.length;
        if (index == length - 1 || type == "max") {
            this.deviceChooseRow += 1;
            this.orderList.push({
                goods_name: "",
                goods_num: "",
                goods_specifica: "",
                buy_counter: 0,
                goods_unitprice: 0,
                sum_money: 0
            });
        }
    }
    private chooseGoods(item: any) {
        this.orderStatus = false;
        item.buy_counter = 0;
        item.goods_unitprice = 0;
        item.goods_unitprice = item.goods_pubTradePrice || 0;
        if (this.orderForm.merchant) {
            item.goods_tradePriceTemps.forEach(
                (_v: {
                    template_code: string;
                    template_price: string | number;
                }) => {
                    if (_v.template_code == this.orderForm.merchant) {
                        item.goods_unitprice = _v.template_price;
                    }
                }
            );
        }
        this.$set(this.orderList, this.deviceChooseRow, item);
    }
    async querySearchGoods(queryString: string, cb: any) {
        let params = {
            goods_sign: queryString
        };
        let results = [];
        let { data } = await api.goods_list(params);
        if (data.list && data.list.length) {
            data.list.forEach((item: { value: string; goods_name: string }) => {
                item.value = item.goods_name;
            });
            results = JSON.parse(JSON.stringify(data.list));
        }
        cb(results);
    }
    private changeCell(index: number) {
        //编辑
        this.deviceChooseRow = index;
    }
    private clearGoodsAll() {
        this.orderList = [];
    }
    private rejectPass() {
        this.orderStatus = false;
    }
    private reviewedPass() {
        let verify = this.orderList.every(
            item => item.goods_name && item.goods_num && item.sum_money
        );
        if (verify) {
            this.orderStatus = true;
        } else {
            this.$message({
                type: "warning",
                message: "订单信息必须完整，价值不能为0"
            });
        }
    }
    private async surePrint() {
        let parmas = {
            order_num: this.orderForm.orderNum,
            order_content: this.orderList,
            create_user: UserModule.userInfo.username,
            merchant_code: this.orderForm.merchant
        };
        try {
            await api.wholesaleOrder_createOrder(parmas);
            this.$notify({
                title: "成功",
                message: "订单打印提交完成",
                position: "bottom-right",
                type: "success"
            });
        } catch (error) {
            console.log(error);
        }
    }
    private async startPrint() {
        this.dialogTableVisible = true;
    }
    private getOrderNum() {
        let orderNumCatct = `S000${moment().format("YYMMDD")}`;
        api.wholesaleOrder_getNum()
            .then(res => {
                let { orderNum } = res.data;
                this.orderForm.orderNum = orderNum;
            })
            .catch(err => {
                console.log(err);
                this.orderForm.orderNum = orderNumCatct;
            });
    }
    created() {
        this.getOrderNum();
    }
    mounted() {}
}
</script>
<style lang="scss">
.sell-container {
    .query-form-inline {
        .el-input__inner {
            color: #000;
        }
    }

    .order-status {
        background: #fff;
        text-align: center;
        h3 {
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
    .foot-operate {
        padding: 20px;
        background: #fff;
        border-radius: 3px;
        text-align: right;
        padding-right: 50px;
    }
    #printMe {
        .header-content {
            .title {
                text-align: center;
                margin: auto;
                border-bottom: 1px solid #000;
                width: 200px;
            }
            .order-status {
                text-align: center;
                margin: 10px auto;
            }
            .print-info {
                .bottom_border {
                    display: inline-block;
                    width: 150px;
                    border-bottom: 1px solid #000;
                    margin-right: 20px;
                }
            }
        }
    }
}
</style>