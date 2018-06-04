<!-- 注册 -->
<template>
  <div class="c-container">
    <div class="c-page">
      <form ref="reg">
        <div class="form-wrap p30">
          <div class="logo"><img src="../assets/images/Group_12.png" alt=""></div>
          <div class="c-flex bg-eee cell c-a-c">
            <img src="../assets/images/ic_login_user@2x.png" alt="" class="ml20 mr20">
            <input id="phone" class="c-box-flex" type="text" @blur="checkPhone" placeholder="请输入手机号" date-tip="请输入正确的手机号" data-type="phone" v-model="phone" name="Mobile">
            <i></i>
          </div>
          <div class="c-flex bg-eee cell c-a-c mt30">
            <img src="../assets/images/ic_login_password@2x.png" alt="" class="ml20 mr20">
            <input class="c-box-flex" type="password" placeholder="请输入密码(6-16位字母、数字)" data-tip="请输入密码(6-16位字母、数字)" data-type='password' name="Password">
            <i></i>
          </div>
          <div class="c-flex bg-eee cell c-a-c mt30">
            <img src="../assets/images/ic_login_password@2x.png" alt="" class="ml20 mr20">
            <input class="c-box-flex" type="password" placeholder="确认密码(6-16位字母、数字)" data-tip="两次密码输入不一致" data-type='equals' name="ConfirmPassword">
            <i></i>
          </div>
          <div class="c-flex cell c-a-c mt30 p1">
            <div class="c-box-flex c-flex bg-eee c-a-c">
              <input id="SMSCode" class="c-box-flex bg-eee" placeholder="请输入验证码" data-tip="请输入验证码" @blur="inspect" v-model="code">
              <i></i>
            </div>
            <button ref="code" type="button" class="c-box-flex ml20 code-btn bg-green color-fff" @click="getCode">{{codeTxt}}</button>
          </div>
          <div class="btn p30 bg-green fs36" @click="btn">
            注 册
          </div>
          <div class="c-flex mt30 blue">
            <div class="c-box-flex t-right">
              <router-link to="/" class="fs36">登录</router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- <div class="mask c-fixed"></div> -->
  </div>
</template>
<script>
import { Field } from "mint-ui";
import md5 from "js-md5";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      confirm: "",
      codeTxt: "获取验证码",
      phone: "",
      code: "",
      checkcode: false,
      checkRegPhone: false,
      isRegSubmit: false
    };
  },
  mounted() {
    Array.prototype.slice.call(this.$refs.reg).forEach((v, i) => {
      this.$form(v);
    });
  },
  methods: {
    btn() {
      this.isRegSubmit = true;
      if (!this.checkcode || !this.checkRegPhone) {
        return false;
      }

      var obj = this.$getFormData(this.$refs.reg);
      obj.Sn = md5(obj.Password);
      obj.Password = md5(obj.Password);
      obj.ConfirmPassword = md5(obj.Password);
      this.$ajax
        .register({
          type: "post",
          data: obj
        })
        .then(res => {
          this.$router.push("/");
        });
    },
    //获取验证码
    getCode() {
      var sec = 60;
      var arr = this.$refs.reg;
      if (!this.checkRegPhone) {
        return false;
      }
      if (!this.$getFormData(arr)) {
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
            var itv = setInterval(function() {
              T.codeTxt = sec + "s";
              if (sec == 0) {
                clearInterval(itv);
                T.$refs.code.disabled = false;
                T.codeTxt = "获取验证码";
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
            SMSCode.nextElementSibling.setAttribute("class", "right");
            if(this.isRegSubmit == true){
              this.btn();
            }
          } else {
            this.checkcode = false;
            Toast("验证码错误");
            SMSCode.nextElementSibling.setAttribute("class","error");
          }
        });
    },
    //验证手机号是否注册过
    checkPhone() {
      var phone = document.getElementById("phone");
      if (this.$phone(this.phone)) {
        this.$ajax
          .checkPhone({
            type: "get",
            data: {
              Mobile: this.phone
            }
          })
          .then(res => {
              this.checkRegPhone = res.Data; //true:手机号未注册，false:已注册
            if (!!res.Data) {
              phone.nextElementSibling.setAttribute("class", "right");
              phone.nextElementSibling.setAttribute("data-type", "phone");
            } else {
              Toast("手机号已注册");
              phone.nextElementSibling.setAttribute("class", "error");
            }
          });
      } else {
        Toast("请输入正确的手机号");
        phone.nextElementSibling.setAttribute("class", "error");
      }
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
  line-height: 0.8rem;
  text-align: center;
  font-size: 0.3rem;
}
i {
  margin-right: 0.2rem;
  display: block;
  width: 0.32rem;
  height: 0.32rem;
  background-size: 100%;
}
</style>
