<template>
    <div class="c-container">
        <top-header id="btnSumbit" title="修改密码" btn="确定" :callback="submit"></top-header>
        <div class="c-page">
            <form action="" ref="baseInfo" class="mt120">
                <div class="c-flex list-cell c-a-c p30 bg-fff">
                    <img src="../../assets/images/ic_login_password@2x.png" alt="" class="ml20 mr20">
                    <input class="c-box-flex" type="password" placeholder="请输入当前密码(6-16位字母、数字)" data-tip="请输入当前密码(6-16位字母、数字)" data-type='password' name="Password" v-model="oldPwd">
                    <i></i>
                </div>
                <div class="c-flex list-cell c-a-c p30 bg-fff">
                    <img src="../../assets/images/ic_login_password@2x.png" alt="" class="ml20 mr20">
                    <input class="c-box-flex" type="password" placeholder="请输入新密码(6-16位字母、数字)" data-tip="请输入新密码(6-16位字母、数字)" data-type='password' name="Password" v-model="newPwd">
                    <i></i>
                </div>
                <div class="c-flex list-cell c-a-c p30 bg-fff">
                    <img src="../../assets/images/ic_login_password@2x.png" alt="" class="ml20 mr20">
                    <input class="c-box-flex" type="password" placeholder="请确认密码(6-16位字母、数字)" data-tip="两次密码输入不一致" data-type='equals' name="ConfirmPassword" v-model="confirmPwd">
                    <i></i>
                </div>
            </form>
        </div>
        <!-- 弹出密码修改确认框 -->
        <div class="mask c-fixed" v-if="mask" @click="mask=false">
            <div class="msg-box">
                <div class="msg-title fs32 black  fw">修改密码</div>
                <div class="mb15 pb20">我已经确认修改密码</div>
                <div class="c-flex msg-btn br-t">
                    <div class="c-box-flex fs30 gray br-r">取消</div>
                    <div class="c-box-flex fs30 green" @click="confirm">确认</div>
                </div>
            </div>
        </div>
        <palette-button></palette-button>
    </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
      mask: false
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.initChangePwd();
  },
  methods: {
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      this.mask = true;
    },
    //重置密码 初始化
    initChangePwd() {
      this.$ajax
        .initChangePwd({
          type: "get",
          data: {
            UserId: JSON.parse(localStorage.getItem("userInfo")).UserID
          }
        })
        .then();
    },
    //保存修改密码
    saveChangePwd() {
      this.$ajax
        .saveChangePwd({
          type: "post",
          data: {
            Forget: 0,
            UserId: JSON.parse(localStorage.getItem("userInfo")).UserID,
            psw_old: this.oldPwd,
            psw: this.newPwd,
            psw_ack: this.confirmPwd
          }
        })
        .then(res => {
          if (res.Status === 1) {
            Toast("修改成功");
            this.$router.push("/home");
          } else {
            this.oldPwd = "";
            this.newPwd = "";
            this.confirmPwd = "";
            var elems = document.getElementsByTagName("i");
            for(var i = 0; i < elems.length; i++){
                elems[i].removeAttribute("class");
            }
            Toast("修改失败,请重试");
          }
        });
    },
    confirm() {
      this.saveChangePwd();
    }
  }
};
</script>
<style lang="less" scoped>
img {
  width: 0.4rem;
}
.mt120 {
  margin-top: 1.2rem;
}
.mask {
  background: rgba(3, 3, 3, 0.25);
  z-index: 20;
  top: 0;
  width: 100%;
  height: 100%;
}
.msg-box {
  position: absolute;
  text-align: center;
  width: 6rem;
  background-color: #fff;
  border-radius: 0.06rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0.08rem rgba(0, 0, 0, 0.2);
  .msg-title {
    line-height: 1rem;
    text-align: center;
  }
  .msg-btn {
    line-height: 0.88rem;
    text-align: center;
    padding: 0.06rem 0;
  }
}
</style>