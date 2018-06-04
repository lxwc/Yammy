<template>
  <div class="c-container">
    <top-header title="每月租赁成本" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.AverageRentPerMonth" placeholder="请输入每月平均租金（单位：元）" data-tip="请输入每月平均租金（单位：元）" data-type="validateAmount" name="AverageRentPerMonth">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.TransferFeeSharing" placeholder="请输入每月转让平摊费用（单位：元）（非必填）" data-tip="请输入每月转让平摊费用（单位：元）（非必填）" data-type="emptyOrAmount" name="TransferFeeSharing">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.AgencyFeesMonths" placeholder="请输入每月中介费（单位：元）（非必填）" data-tip="请输入每月中介费（单位：元）（非必填）" data-type="emptyOrAmount" name="AgencyFeesMonths">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.PropertyManagementFee" placeholder="请输入每月物业管理费（单位：元）" data-tip="请输入每月物业管理费（单位：元）" data-type="validateAmount" name="PropertyManagementFee">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.MonthlyRentalCosts" placeholder="请输入每月租赁成本（单位：元）" readonly name="MonthlyRentalCosts" data-type="required" data-tip="请输入每月租赁成本（单位：元）">
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
      YM_LeaseRecap: {},
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
        return false;
      }
      this.YM_LeaseRecap.MonthlyRentalCosts = parseFloat(this.YM_LeaseRecap.MonthlyRentalCosts);
      var model = {
        PositionID: JSON.parse(localStorage.getItem("userInfo")).PositionID,
        KeyID: 0,
        IsDCZL: "",
        YM_StoreBasicInfo: "",
        YM_LeaseRecap: this.YM_LeaseRecap
      };
      this.$ajax
        .SaveLeaseholdCost({
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
          this.YM_LeaseRecap = res.Data.YM_LeaseRecap;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if(this.YM_LeaseRecap[v.name]){
              v.previousElementSibling.setAttribute("class", "icon w");
            } else {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
          });
        });
    },
    formateData(val) {
      if (val == "" || val === null || isNaN(val)) {
        return 0;
      } else {
        return parseFloat(val);
      }
    }
  },
  watch: {
    YM_LeaseRecap: {
      handler(curVal, oldVal) {
        curVal.MonthlyRentalCosts =
          this.formateData(curVal.TransferFeeSharing) +
          this.formateData(curVal.AgencyFeesMonths) +
          this.formateData(curVal.AverageRentPerMonth) +
          this.formateData(curVal.PropertyManagementFee);
        if (!curVal.TransferFeeSharing) {
          this.inputElem[1].removeAttribute("data-type");
          this.inputElem[1].nextElementSibling.removeAttribute("class");
          this.inputElem[1].previousElementSibling.setAttribute(
            "class",
            "icon add"
          );
        } else {
          this.inputElem[1].setAttribute("data-type", "validateAmount");
        }
        if (!curVal.AgencyFeesMonths) {
          this.inputElem[2].removeAttribute("data-type");
          this.inputElem[2].nextElementSibling.removeAttribute("class");
          this.inputElem[2].previousElementSibling.setAttribute(
            "class",
            "icon add"
          );
        } else {
          this.inputElem[2].setAttribute("data-type", "validateAmount");
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
