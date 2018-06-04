<!-- 注册 -->
<template>
  <div class="c-container">
    <div class="c-page">
      <form action="" ref="reg">
        <div class="form-wrap p30">
          <div class="logo"><img src="../assets/images/Group_12.png" alt=""></div>
          <div class="c-flex bg-eee cell c-a-c mt30">
            <img src="../assets/images/ic_login_user@2x.png" alt="" class="ml20 mr20">
            <input id="phone_Num" class="c-box-flex" type="text" placeholder="请输入手机号" v-model="phone" data-tip="请输入正确的手机号" data-type="phone" name="phone_Num" @blur="checkPhone">
            <i></i>
          </div>
          <div class="c-flex cell c-a-c mt30 p1">
            <div class="c-box-flex c-flex bg-eee c-a-c">
              <input id="SMSCode" class="c-box-flex bg-eee" placeholder="请输入验证码" data-tip="请输入验证码" @blur="inspect" v-model="code">
              <i class="icon-SMSCode"></i>
            </div>
            <button ref="code" class="c-box-flex ml20 code-btn bg-green color-fff" @click="getCode($event)">{{codeTxt}}</button>
          </div>
          <div class="c-flex bg-eee cell c-a-c mt30">
            <img src="../assets/images/ic_login_password@2x.png" alt="" class="ml20 mr20">
            <input class="c-box-flex" type="password" placeholder="请输入密码(6-16位字母、数字)" name="newPassword" data-type="password" data-tip="请输入密码(6-16位字母、数字)" v-model="newPassword">
            <i></i>
          </div>
          <div class="c-flex bg-eee cell c-a-c mt30">
            <img src="../assets/images/ic_login_password@2x.png" alt="" class="ml20 mr20">
            <input class="c-box-flex" type="password" placeholder="确认密码" name="newConfirmPassword" data-type="equals" data-tip="两次密码输入不一致">
            <i></i>
          </div>
          <div class="btn p30 bg-green fs36" @click="btn">
            重置密码
          </div>
          <div class="c-flex mt30 blue">
            <div class="c-box-flex t-right">
              <router-link to="/" class="fs36">登录</router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { Field } from "mint-ui";
import md5 from "js-md5";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      codeTxt: "获取验证码",
      confirm: "",
      userInfo: null,
      phone: "",
      checkcode: false,
      newPassword: "",
      code: "",
      itv: null,
      checkRegPhone: false  //手机号是否已注册，true：已注册，false：未注册
    };
  },
  mounted() {
    
  },
  methods: {
    btn() {
      console.log("+++==+++",this.checkcode);
      if (!this.$getFormData(this.$refs.reg)) {
        return false;
      }
      var SMSCode = document.getElementById("SMSCode");
      SMSCode.setAttribute("name", "SMSCode");
      if (!this.checkcode) {
        return false;
      } 
        this.$ajax
          .passwordfind({
            type: "post",
            data: {
              oldMobile: this.phone,
              newPassword: this.newPassword,
              Code: this.code
            }
          })
          .then(res => {
            if (res.Status == 1) {
              this.$router.push("/");
            }
          });
      
    },
    //手机号是否存在
    checkPhone() {
      var phone = document.getElementById("phone_Num");
      if (this.$phone(this.phone)) {
        this.$ajax
          .checkPhone({
            type: "get",
            data: {
              Mobile: this.phone
            }
          })
          .then(res => {
            //res.Date    true:手机号未注册，false:已注册
            this.checkRegPhone = !res.Data;
            if (!res.Data) {
              phone.nextElementSibling.setAttribute("class", "right");
              phone.nextElementSibling.setAttribute("data-type", "phone");
            } else {
              Toast("手机号未注册");
              phone.nextElementSibling.setAttribute("class", "error");
            }
          });
      }
    },
    //获取验证码
    getCode(e) {
      e.preventDefault();
      var sec = 60;
      var arr = this.$refs.reg;
      this.checkPhone();
      if (!this.checkRegPhone) {
        return false;
      } else {
        this.$ajax
          .getCode({
            type: "get",
            data: {
              phone: this.phone
            }
          })
          .then(res => {
            var T = this;
            this.$refs.code.disabled = true;
            var SMSCode = document.getElementById("SMSCode");
            SMSCode.setAttribute("name", "SMSCode");
            SMSCode.setAttribute("data-type", "required");
            this.itv = setInterval(() => {
              this.codeTxt = sec + "s";
              if (sec == 0) {
                clearInterval(this.itv);
                this.itv = null;
                this.$refs.code.disabled = false;
                this.codeTxt = "获取验证码";
                SMSCode.removeAttribute("name");
                SMSCode.removeAttribute("data-type");
                SMSCode.nextElementSibling.removeAttribute("class");
              } else {
                sec--;
              }
            }, 1000);
          });
      }
    },
    //检查验证码是否正确
    inspect() {
      var SMSCode = document.getElementById("SMSCode");
      if (!this.code) {
        Toast("请输入验证码");
        return false;
      }
      this.$ajax
        .checkcode({
          type: "get",
          data: {
            SMSMobile: this.phone
          }
        })
        .then(res => {
          if (res.Data.code == this.code) {
            this.checkcode = true;
            clearInterval(this.itv);
            this.itv = null;
            this.codeTxt = "验证码通过";
            this.$refs.code.disabled = true;
            SMSCode.nextElementSibling.setAttribute("class", "right");
          } else {
            this.checkcode = false;
            Toast("验证码错误");
            SMSCode.nextElementSibling.setAttribute("class", "error");
          }
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

.code-btn {
  height: 0.8rem;
  border-radius: 0.05rem;
}
i {
  margin-right: 0.2rem;
  display: block;
  width: 0.32rem;
  height: 0.32rem;
  background-size: 100%;
}
</style>
