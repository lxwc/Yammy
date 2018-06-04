<template>
  <div class="c-container">
    <top-header title="开店区域" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.Area" name="Area" data-tip="请输入开店区域" data-type='required' placeholder="请输入开店区域">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.BusinessCircle" name="BusinessCircle" data-tip="请输入商圈" data-type='required' placeholder="请输入商圈">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.preferredPosition" name="preferredPosition" data-tip="请输入首选位置" data-type='required' placeholder="请输入首选位置">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.secondaryPosition" name="secondaryPosition" data-tip="请输入次选位置" data-type='required' placeholder="请输入次选位置">
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
      //保存投入资金
      this.$ajax
        .meetingOpenAreaSave({
          type: "post",
          data: {
            FranchiseMeetingInfo: this.FranchiseMeetingInfo
          }
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/interview/"+this.isEdit+'/'+this.userID);
          }
        });
    },
    //投入资金初始化
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