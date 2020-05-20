<template>
    <div class="nav-title-container">
        <!-- <h3>鲁丰冷食销售管理中心</h3> -->
    </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({
    name: "Navtitle"
})
export default class Navtitle extends Vue {}
</script>
<style lang="scss" >
.nav-title-container {
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
}
</style>