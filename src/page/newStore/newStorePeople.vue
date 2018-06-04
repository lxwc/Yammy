<template>
  <div class="c-container">
    <top-header title="人流量测算" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.TrafficCountOrdinaryDay" placeholder="请输入平常日（单位：人）" data-tip="请输入平常日（单位：人）" data-type="validateAmount" name="TrafficCountOrdinaryDay">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.TrafficCountFriday" placeholder="请输入周五（单位：人）" data-tip="请输入周五（单位：人）" data-type="validateAmount" name="TrafficCountFriday">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.TrafficCountHoliday" placeholder="请输入假日（单位：人）" data-tip="请输入假日（单位：人）" data-type="validateAmount" name="TrafficCountHoliday">
          <i></i>
        </div>
      </form>
    </div>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
export default {
  data() {
    return {
      YM_StoretInfo: {},
      btnTxt: "",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.storeSiteEvaluationInit();
    this.btnTxt = this.$showSaveBtn(2, "保存");
  },
  methods: {
    //保存
    submit() {
      var model = {
        PositionID: JSON.parse(localStorage.getItem("userInfo")).PositionID,
        KeyID: 0,
        IsDCZL: "",
        YM_StoreBasicInfo: "",
        YM_StoretInfo: this.YM_StoretInfo
      };
      console.log(JSON.stringify(model));
      this.$ajax
        .SaveMeasurementHuman({
          type: "post",
          data: model
        })
        .then(res => {
          if(res.Status === 1){
            this.$router.push("/newStore/"+this.storeID);
          }
        });
    },
    storeSiteEvaluationInit() {
      this.$ajax
        .storeSiteEvaluationInit({
          type: "get",
          data: {
            StoreID: localStorage.getItem("storeID") || 0,
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            PositionID: JSON.parse(localStorage.getItem("userInfo"))
              .PositionID
          }
        })
        .then(res => {
          this.YM_StoretInfo = res.Data.YM_StoretInfo;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if(this.YM_StoretInfo[v.name]){
              v.previousElementSibling.setAttribute("class", "icon w");
            } else {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
</style>
