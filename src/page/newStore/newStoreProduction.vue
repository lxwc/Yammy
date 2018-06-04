<template>
  <div class="c-container">
    <top-header title="产证信息" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.Lessor" data-type='required' placeholder="请输入出租人" data-tip="请输入出租人" name="Lessor">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.PropertyOwner" placeholder="请输入产权人" data-type='required' data-tip="请输入产权人" name="PropertyOwner">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.Area" placeholder="请输入面积（㎡）" data-type='validateAmount' data-tip="请输入面积（㎡）" name="Area">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.Floor" placeholder="请输入楼层" data-type='validateAmount' data-tip="请输入楼层" name="Floor">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.UsageArea" placeholder="请输入使用面积（㎡）" data-type='validateAmount' data-tip="请输入使用面积（㎡）" name="UsageArea">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.RentalWarehouse" placeholder="请输外租仓库面积（㎡）（非必填）"  data-tip="请输外租仓库面积（㎡）（非必填）" name="RentalWarehouse" @input="enterOrNot($event,'validateAmount')">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.NearbyResidentialPrices" placeholder="请输入附近住宅房价（㎡）（非必填）" data-tip="请输入附近住宅房价（㎡）（非必填）" name="NearbyResidentialPrices" @input="enterOrNot($event,'validateAmount')">
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
      positionID: null,
      userID: null,
      btnTxt: "",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.positionID = JSON.parse(localStorage.getItem("userInfo")).PositionID;
    this.userID = JSON.parse(localStorage.getItem("userInfo")).UserID;
    this.storeSiteEvaluationInit();
    this.btnTxt = this.$showSaveBtn(2, "保存");
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      var model = {
        UserName: "",
        PositionID: this.positionID,
        KeyID: 0,
        IsDCZL: "",
        YM_StoreBasicInfo: "",
        YM_StoretInfo: this.YM_StoretInfo
      };
      this.$ajax
        .SaveSiteProductionInfos({
          type: "post",
          data: model
        })
        .then(res => {
          // console.log(res);
          if(res.Status === 1){
            this.$router.push("/newStore/"+this.storeID);
          } else {
            Toast("保存失败");
          }
        });
    },
    //新店加盟初始化
    storeSiteEvaluationInit() {
      this.$ajax
        .storeSiteEvaluationInit({
          type: "get",
          data: {
            StoreID: localStorage.getItem("storeID") || 0,
            UserID: this.userID,
            PositionID: this.positionID
          }
        })
        .then(res => {
          //初始化页面数据
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
    },
    //非必要项输入验证
    enterOrNot(e, dataType) {
      if (e.target.value) {
        e.target.setAttribute("data-type", dataType);
      } else {
        e.target.removeAttribute("data-type");
        e.target.nextElementSibling.removeAttribute("class");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
</style>
