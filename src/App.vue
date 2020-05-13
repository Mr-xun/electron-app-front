<template>
    <div id="app">
        <ul>
            <li v-for="(item,index) in userList" :key="index">
                用户：{{item.name}}
                <hr/>
                密码：{{item.password}}
            </li>
        </ul>
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import api from '@/api'
@Component({
    components: {
        HelloWorld
    }
})
export default class App extends Vue {
    private userList = []
    mounted() {
        let params = {
            name:'荀潇'
        }
        api.test(params).then(res => {
            console.log(res);
            let {list} = res.data
            this.userList = list
        });
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
