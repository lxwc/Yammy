<template>
    <div class="c-header-con c-fixed c-flex p30">
        <div class="back fs30" @click="goBack">返回</div>
        <div class="c-box-flex fs36">{{title}}</div>
        <div class="btn fs30 green" @click="submit(callback)">{{btn}}</div>
    </div>
</template>
<script>
export default {
  props: ["title", "callback", "btn"],
  data() {
    return {
      userName: ""
    };
  },
  mounted() {
    // this.userName = localStorage.getItem("userName");
  },
  methods: {
    goBack() {
      window.history.go(-1);
    },
    out() {
      this.$emit("out", true);
    },
    submit(callback) {
      typeof callback === "function" ? callback() : "return false";
    }
  }
};
</script>
<style lang="less" scoped>
.c-header-con {
  height: 0.96rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.btn {
  position: absolute;
  height: 0.96rem;
  right: 0.3rem;
}
.back {
  position: absolute;
  height: 0.96rem;
  left: 0.3rem;
  background: url("../assets/images/arrow.svg") no-repeat;
  background-position: 0 center;
  background-size: .32rem 0.32rem;
  padding-left: .35rem;
}
</style>
