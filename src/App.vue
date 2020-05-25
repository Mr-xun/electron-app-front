<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouteRecord, Route } from "vue-router";
declare const document: any;
@Component({
    components: {}
})
export default class App extends Vue {
    private userList = [];
    mounted() {
        try {
            document.body.removeChild(document.getElementById('appLoading'))
            setTimeout(function () {
                document.getElementById('app').style.display = "block";
            }, 1000)
        } catch (e) {
            console.log(e)
        }
    }
    @Watch("$route")
    private changeRoute(route: Route) {}
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
