<!-- 登录 -->
<template>
    <div class="c-container">
        <div class="c-page">
            <form action="" ref="reg">
                <div class="form-wrap p30">
                    <form action="" ref="login">
                        <div class="logo">
                            <img src="../assets/images/Group_12.png" alt="">
                        </div>
                        <div class="c-flex bg-eee cell c-a-c pr20">
                            <img src="../assets/images/ic_login_user@2x.png" alt="" class="ml20 mr20">
                            <input id="userId" class="c-box-flex" type="text" placeholder="请输入手机号" data-tip='请输入正确的手机号码' name="UserId">
                            <!-- <input id="userId" class="c-box-flex" type="text" placeholder="请输入手机号" data-tip='请输入正确的手机号码' data-type='phone' name="UserId"> -->
                            <i></i>
                        </div>
                        <div class="c-flex bg-eee cell c-a-c mt30 pr20">
                            <img src="../assets/images/ic_login_password@2x.png" alt="" class="ml20 mr20">
                            <input id="psd" class="c-box-flex" type="password" placeholder="请输入密码" data-tip="请输入6-16位字母、数字" name="psd">
                            <!-- <input id="psd" class="c-box-flex" type="password" placeholder="请输入密码" data-type='password' data-tip="请输入6-16位字母、数字" name="psd"> -->
                            <i></i>
                        </div>
                        <div class="btn p30 bg-green fs36" @click="login">
                            登 录
                        </div>
                        <div class="c-flex">
                            <div class="c-box-flex p20">
                                <span class="fw tc fs28 color-yellow">
                                    想要成为我们中的一员吗? 想成为快乐的老板吗?请点击我要加盟。
                                </span>
                            </div>
                        </div>
                        <div class="c-flex mt30 blue">
                            <div class="c-box-flex">
                                <router-link to="/register" class="fs36">我要加盟</router-link>
                            </div>
                            <div class="c-box-flex t-right">
                                <router-link to="/forget" class="fs36">忘记密码</router-link>
                            </div>
                        </div>

                    </form>
                </div>
            </form>
        </div>
        <!-- <div class="mask c-fixed"></div> -->
    </div>
</template>
<script>
import md5 from "js-md5";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      isPermissions: true
    };
  },
  mounted() {
    Array.prototype.slice.call(this.$refs.login).forEach((v, i) => {
      this.$form(v);
    });
  },
  methods: {
    login() {
      var obj = this.$getFormData(this.$refs.login);
      this.$ajax
        .login({
          type: "post",
          data: {
            UserId: obj.UserId,
            psd: md5(obj.psd)
          }
        })
        .then(res => {
          var psd = document.getElementById("psd");
          var userId = document.getElementById("userId");
          localStorage.userInfo = JSON.stringify(res.Data);
          if (res.Data) {
            this.loginPermissions();
            if (this.isPermissions) {
              this.$router.push("/home");
            } else {
              Toast(obj.UserId + "用户没有登录权限");
            }
          } else {
            if (res.ErrorResult.ErrCode == "01") {
              userId.nextElementSibling.setAttribute("class", "error");
              Toast(obj.UserId + res.ErrorResult.ErrMsg);
            } else {
              psd.nextElementSibling.setAttribute("class", "error");
              Toast(obj.UserId + res.ErrorResult.ErrMsg);
            }
          }
        });
    },
    //用户登录权限
    loginPermissions() {
      this.$ajax
        .loginPermissions({
          type: "get",
          data: {
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID
          }
        })
        .then(res => {
          this.isPermissions = res.Data;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  background: url("../assets/images/login-bg.png");
  background-size: 100%;
}
.mask {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(46, 53, 32, 0.8);
}
</style>
