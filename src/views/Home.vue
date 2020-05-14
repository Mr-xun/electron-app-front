<template>
    <div class="home">
        <ul>
            <li v-for="(item,index) in userList" :key="index">
                用户：{{item.username}}
                <hr />
                密码：{{item.password}}
            </li>
        </ul>
    </div>
</template>

<script lang='ts'>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import api from "@/api";
import { Component, Vue } from "vue-property-decorator";
@Component({
    name: "Home",
    components: { HelloWorld }
})
export default class Home extends Vue {
    private userList = [];
    mounted() {
        console.log("test");
        api.getUserList().then(res => {
            console.log(res);
            let { code, list } = res.data;
            this.userList = list;
        });
    }
}
</script>
