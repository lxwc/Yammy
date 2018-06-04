<template>
    <div class="c-header-con c-fixed c-flex p30">
        <div class="c-box-flex"></div>
        <div class="color-fff fs30"  @click="submit(callback)">{{userName}}</div>
    </div>
</template>
<script>
export default {
  props: ["callback"],
  data() {
    return {
      userName: ""
    };
  },
  mounted() {
    this.userName = JSON.parse(localStorage.getItem("userInfo")).UserEnName
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
  background: url("../assets/images/H5_logo_01.png") no-repeat center center #252525;
  background-size:2rem 0.52rem;
}
</style>
