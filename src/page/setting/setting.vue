<template>
  <div class="c-container">
    <top-header title="用户管理" btn="" :callback="submit"></top-header>
    <div class="c-page">
      <div class="user-setting">
        <div class=" bg-fff user-item">用户名：
          <span class="user-name">{{userName}}</span>
        </div>
        <div class="user-list">
          <router-link to="/modifyPwd">
            <div class="user-item bg-fff">修改密码
              <img src="../../assets/images/arrow.svg" alt="" class="icon">
            </div>
          </router-link>
        </div>
        <div class="user-logout bg-fff" @click="mask=true">退出登录</div>
      </div>
      <div class="mask c-fixed" v-if="mask" @click="mask=false">
        <div class="msg-box">
          <div class="msg-title fs32 black  fw">退出登录</div>
          <div class="mb15 pb20">点击确认后退出登录</div>
          <div class="c-flex msg-btn br-t">
            <div class="c-box-flex fs30 gray br-r">取消</div>
            <div class="c-box-flex fs30 green" @click="confirm">确认</div>
          </div>
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
      userName: "",
      mask: false
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.userName = JSON.parse(localStorage.getItem("userInfo")).UserEnName;
  },
  methods: {
    //保存
    submit() {},
    confirm() {
      window['localStorage'].clear();
      window['sessionStorage'].clear();
      this.$router.push("/login");
    },
    
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.bg-fff {
  background-color: #fff;
}
.mask {
  background: rgba(3, 3, 3, 0.25);
  z-index: 20;
  top: 0;
  width: 100%;
  height: 100%;
}
.user-setting {
  .user-name {
    float: right;
    padding-right: 0.2rem;
  }
  .user-item {
    border-bottom: 1px solid #ddd;
    font-size: 0.26rem;
    padding-left: 0.3rem;
    line-height: 0.8rem;
  }
  .user-list{
    margin-top: .5rem;
  }
  .user-logout {
    margin-top: 0.5rem;
    line-height: 0.8rem;
    text-align: center;
  }
}
.icon {
  transform: rotate(180deg);
  width: 0.32rem;
  height: 0.32rem;
  float: right;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
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
    // line-height: 1rem;
    text-align: center;
    font-size: 0.3rem;
    padding: 0.3rem 0.2rem 0.1rem 0.2rem;
    // border-bottom: 1px solid #ddd;
  }
  .msg-date {
    font-size: 0.2rem;
  }
  .msg-detail {
    padding: 0.2rem;
    text-indent: 0.5rem;
    height: 2rem;
    overflow-y: scroll;
    word-wrap: break-word;
    text-align: left;
  }
  .msg-btn {
    line-height: 0.88rem;
    text-align: center;
    padding: 0.06rem 0;
  }
}
</style>
