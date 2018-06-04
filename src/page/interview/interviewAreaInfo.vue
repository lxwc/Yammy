<template>
  <div class="c-container">
    <top-header title="区域竞品信息" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.competitionBrand" name="competitionBrand" data-tip="请输入开店区域竞品" data-type='required' placeholder="请输入开店区域竞品">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.CompetitiveTurnover" name="CompetitiveTurnover" data-tip="请输入竞品营业额" data-type='required' placeholder="请输入竞品营业额">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.StoreRent" name="StoreRent" data-tip="请输入开店区域商场租金等" data-type='required' placeholder="请输入开店区域商场租金等">
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
      btnTxt: "",
      FranchiseMeetingInfo: {},
      isEdit: this.$route.params.isEdit,
      userID: this.$route.params.userID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.meetingNegotiationInit();

    this.btnTxt = this.isEdit==1?'保存':'';
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      //保存
      this.$ajax
        .meetingAreaInfoSave({
          type: "post",
          data: {
            FranchiseMeetingInfo: this.FranchiseMeetingInfo
          }
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/interview/"+this.isEdit+"/"+this.userID);
          }
        });
    },
    //初始化
    meetingNegotiationInit() {
      this.$ajax
        .meetingNegotiationInit({
          type: "get",
          data: {
            User_ID: this.userID
          }
        })
        .then(res => {
          this.FranchiseMeetingInfo = res.Data.FranchiseMeetingInfo;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if (this.FranchiseMeetingInfo[v.name]) {
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