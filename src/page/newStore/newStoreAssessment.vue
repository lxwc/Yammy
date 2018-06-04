<template>
  <div class="c-container">
    <top-header title="获利评估" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_SalesEstimation.AnnualTurnover" placeholder="请输入年营业额（单位：元）" data-tip="请输入年营业额（单位：元）" data-type="validateAmount" name="AnnualTurnover">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_SalesEstimation.BeforetaxBenefits" placeholder="请输入年税后利益（单位：元）（非必填）" data-tip="请输入年税后利益（单位：元）（非必填）" @input="enterOrNot($event,'validateAmount')" name="BeforetaxBenefits">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_SalesEstimation.CashRecovery" placeholder="请输入年现金回收（单位：元）" data-tip="请输入年现金回收（单位：元）" data-type="validateAmount" name="CashRecovery">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_SalesEstimation.PaybackPeriod" placeholder="请输入回收期（单位：月）" data-tip="请输入回收期（单位：月）" data-type="required" name="PaybackPeriod">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_SalesEstimation.Investment" placeholder="请输入IRR投资报酬率（非必填）" data-tip="请输入IRR投资报酬率（非必填）" name="Investment" @input="enterOrNot($event,'required')" />
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
      YM_SalesEstimation: {},
      btnTxt: "",
      inputElem: document.getElementsByTagName("input"),
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
      if (!this.$getFormData(this.$refs.baseInfo)) {
        if (
          !(
            !this.$refs.baseInfo.PaybackPeriod.value ||
            !this.$refs.baseInfo.BeforetaxBenefits.value
          )
        ) {
          return false;
        }
      }
      var model = {
        PositionID: JSON.parse(localStorage.getItem("userInfo")).PositionID,
        KeyID: 0,
        IsDCZL: "",
        YM_StoreBasicInfo: "",
        YM_SalesEstimation: this.YM_SalesEstimation
      };
      this.$ajax
        .SaveProfitPrediction({
          type: "post",
          data: model
        })
        .then(res => {
          if(res.Status === 1) {
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
          this.YM_SalesEstimation = res.Data.YM_SalesEstimation;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if(this.YM_SalesEstimation[v.name]){
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
  },
  watch: {
    YM_SalesEstimation: {
      handler(curVal, oldVal) {
        if (!curVal.BeforetaxBenefits) {
          this.inputElem[1].removeAttribute("data-type");
          this.inputElem[1].nextElementSibling.removeAttribute("class");
          this.inputElem[1].previousElementSibling.setAttribute(
            "class",
            "icon add"
          );
        } else {
          this.inputElem[1].setAttribute("data-type", "validateAmount");
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
</style>
