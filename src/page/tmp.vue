<template>
  <div class="c-container">
    <top-header title="问卷调查" btn="保存" :callback="submit"></top-header>

    <div class="c-page">

    </div>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
export default {
  data() {
    return {};
  },
  components: {
    topHeader
  },
  mounted() {},
  methods: {
    //保存
    submit() {}
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
</style>
