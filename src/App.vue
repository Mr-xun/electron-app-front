<template>
    <div id="app">

        <router-view></router-view>
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import { RouteRecord, Route } from "vue-router";
import api from "@/api";
import { watch } from "fs";
const { remote } = require("electron");
const { Menu, MenuItem } = remote;
@Component({
    components: {
        HelloWorld
    }
})
export default class App extends Vue {
    private userList = [];
    mounted() {
        const menu = new Menu();
        menu.append(
            new MenuItem({
                label: "MenuItem1",
                click() {
                    console.log("item 1 clicked");
                }
            })
        );
        menu.append(new MenuItem({ type: "separator" }));
        menu.append(
            new MenuItem({
                label: "MenuItem2",
                type: "checkbox",
                checked: true
            })
        );
        console.log(menu);
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
