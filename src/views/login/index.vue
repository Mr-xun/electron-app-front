<template>
    <div class='login-container'>
        <el-form :model="loginFrom" :rules="rules" ref="loginFrom" class="login-form">
            <div class="title-container">
                <h3 class="title">Login</h3>
            </div>
            <el-form-item label="" prop="username">
                <el-input v-model="loginFrom.username" placeholder="username"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input v-model="loginFrom.password" placeholder="password" type="password"
                    @keyup.enter.native="handleLogin">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="singining" type="primary" style="width:100%; margin-bottom:30px;"
                    @click.native.prevent="handleLogin">Sign in</el-button>
            </el-form-item>
            <div style="position:relative">
                <div class="tips">
                    <span>username: 荀潇1</span>
                    <span>password: 123</span>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import api from "@/api";
@Component({
    name: "login"
})
export default class Login extends Vue {
    private loginFrom = {
        username: "",
        password: ""
    };
    private rules: object = {
        username: [
            { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    };
    private singining: boolean = false;
    private handleLogin() {
        let params: { username: string; password: string } = {
            username: this.loginFrom.username,
            password: this.loginFrom.password
        };
        (this.$refs["loginFrom"] as any).validate((valid: boolean) => {
            if (valid) {
                api.userLogin(params).then(res => {
                    let { code } = res.data;
                    if (code == 0) {
                        localStorage.setItem("token", res.data.token);
                        this.$router.push({ path: "/" });
                    }
                });
            } else {
                return false;
            }
        });
    }
    mounted() {}
}
</script>
<style lang="scss" scoped>
.login-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #2d3a4b;
    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }
    .title-container {
        position: relative;
        .title {
            font-size: 26px;
            color: #eee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }
}
</style>