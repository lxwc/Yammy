<!-- 意向资料-意向资料-城市选择 -->
<template>
    <div class="c-container">
        <top-header title="城市选择" btn="保存" :callback="submit"></top-header>
        <div class="c-page">

        </div>
        <palette-button></palette-button>
    </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
export default {
  data() {
    return {};
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {},
  methods: {
      submit(){}
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
</style>
