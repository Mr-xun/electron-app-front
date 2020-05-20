<template>
    <div class="login-container">
        <div class="login-wrap">
            <div class="top-box">
                鲁丰冷食管存系统
                <span class="bg1"></span>
                <span class="bg2"></span>
            </div>
            <div class="top-bottom">
                <div class="login-form">
                    <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
                        <el-form-item label prop="username">
                            <el-input v-model="loginForm.username" placeholder="请输入用户名">
                                <i slot="prepend" class="el-icon-user"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item label prop="password">
                            <el-input v-model="loginForm.password" placeholder="请输入用密码" type="password"
                                @keyup.enter.native="handleLogin">
                                <i slot="prepend" class="el-icon-goods"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="tip">
                    <el-checkbox v-model="checkedPwd" checked class="remember">记住密码</el-checkbox>
                    <span class="forget-pwd" @click="resetPwd">忘记密码？</span>
                </div>
                <div class="login-btn">
                    <el-button :loading="singining" type="primary" style="width:100%; margin-bottom:30px;"
                        @click.native.prevent="handleLogin">登录</el-button>
                </div>
            </div>
        </div>
        <reset-pwd :resetPwdVisible.sync="resetPwdVisible"></reset-pwd>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import { encrypt, decrypt, setCookie, delCookie, getCookie } from "@/utils";
import ResetPwd from "@/components/ResetPwd/index.vue";
import api from "@/api";

@Component({
    name: "login",
    components: {
        ResetPwd
    }
})
export default class Login extends Vue {
    private resetPwdVisible: boolean = false;

    private loginForm = {
        username: "",
        password: ""
    };
    private loginRules: object = {
        username: [
            { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    };
    private singining: boolean = false;
    private checkedPwd: boolean = true;
    private resetPwd() {
        this.resetPwdVisible = true;
    }
    private handleLogin() {
        let params: { username: string; password: string } = {
            username: this.loginForm.username,
            password: this.loginForm.password
        };
        (this.$refs["loginForm"] as any).validate(async (valid: boolean) => {
            if (valid) {
                const result = await UserModule.Login(params);
                if (this.checkedPwd == true) {
                    let encrypt_pwd = encrypt(
                        this.loginForm.password,
                        "hAw6eqnFLKxpsDv3"
                    );
                    setCookie("USER_NAME", this.loginForm.username, 7);
                    setCookie("USER_PWD", encrypt_pwd, 7);
                } else {
                    delCookie("USER_NAME");
                    delCookie("USER_PWD");
                }
                if (result) {
                    this.$router.push({ path: "/" });
                }
            } else {
                return false;
            }
        });
    }
    //获取记住用户信息
    private getRememberUser() {
        let username = getCookie("USER_NAME");
        let password = getCookie("USER_PWD")
            ? decrypt(getCookie("USER_PWD"), "hAw6eqnFLKxpsDv3")
            : "";
        if (username && password) {
            this.loginForm.username = username;
            this.loginForm.password = password;
        }
    }
    mounted() {
        this.getRememberUser();
    }
}
</script>
<style lang="scss" scoped>
.login-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #2d3a4b;
    background: url("../../assets/images/login_bg.png") 0% 0% / cover no-repeat;
    .login-wrap {
        width: 428px;
        position: relative;
        float: left;
        height: 576px;
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        overflow: hidden;
        .top-box {
            width: 428px;
            height: 117px;
            background-color: #0371d1;
            border-radius: 12px 12px 0 0;
            font-family: SourceHanSansCN-Regular;
            font-size: 24px;
            font-weight: 400;
            font-stretch: normal;
            letter-spacing: 0;
            color: #fff;
            line-height: 117px;
            text-align: center;
            overflow: hidden;
            transform: rotate(0);
            .bg1 {
                display: inline-block;
                width: 74px;
                height: 74px;
                background: #fff;
                opacity: 0.1;
                border-radius: 0 74px 0 0;
                position: absolute;
                left: 0;
                top: 43px;
            }
            .bg2 {
                display: inline-block;
                width: 94px;
                height: 94px;
                background: #fff;
                opacity: 0.1;
                border-radius: 50%;
                position: absolute;
                right: -16px;
                top: -16px;
            }
        }
        .top-bottom {
            width: 428px;
            background: #fff;
            border-radius: 0 0 12px 12px;
            padding-bottom: 53px;
            .login-form {
                width: 288px;
                margin: 0 auto;
                padding-top: 40px;
                padding-bottom: 15px;
                position: relative;
            }
            .tip {
                clear: both;
                height: 16px;
                line-height: 16px;
                width: 288px;
                margin: 0 auto;
                .forget-pwd {
                    font-stretch: normal;
                    letter-spacing: 0;
                    color: #1a2935;
                    text-decoration: none;
                    position: absolute;
                    right: 62px;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
            .login-btn {
                width: 288px;
                height: 40px;
                background-color: #0371d1;
                border-radius: 16px;
                margin: 24px auto 0;
                text-align: center;
                line-height: 40px;
                color: #fff;
                font-size: 14px;
                letter-spacing: 0;
                overflow: hidden;
                cursor: pointer;
            }
        }
    }
}
</style>