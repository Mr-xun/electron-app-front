<template>
    <div class="main-content-container">
        <router-view v-if="haveChildPage"></router-view>
        <MerchantList v-else />
    </div>
</template>
<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import MerchantList from "./list.vue";
import api from "@/api";
@Component({
    name: "GoodList",
    components: {
        MerchantList
    }
})
export default class Merchant extends Vue {
    private haveChildPage: boolean = false;
    @Watch("$route")
    private changeRoute(to: any, from: any) {
        this.juageRoute();
    }
    private juageRoute() {
        if (
            this.$route.name == "baseFile-merchant-add" ||
            this.$route.name == "baseFile-merchant-edit"
        ) {
            this.haveChildPage = true;
        } else {
            this.haveChildPage = false;
        }
    }
    mounted() {
        this.juageRoute();
    }
}
</script>
<style lang="scss" >
</style>