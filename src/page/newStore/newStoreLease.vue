<template>
  <div class="c-container">
    <top-header title="租赁条件" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.LeasePeriodBegins" @focus="dateOpen($event)" placeholder="请输入租赁期（开始时间）" data-tip="请输入租赁期（开始时间）" data-type="required" name="LeasePeriodBegins" id="startDate">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.LeasePeriodOver" @focus="dateClose($event)" placeholder="请输入租赁期（结束时间）" data-tip="请输入租赁期（结束时间）" data-type="required" name="LeasePeriodOver" id="endDate">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.RentFreePeriod" placeholder="请输入免租期（单位：天）" data-tip="请输入免租期（单位：天）" data-type="required" name="RentFreePeriod">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.TermMonth" placeholder="请输入租期（含免租期）（单位：月）" data-tip="请输入租期（含免租期）（单位：月）" data-type="required" name="TermMonth">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.RentalDeposit" placeholder="请输入租金保证金（单位：元）" data-tip="请输入租金保证金（单位：元）" data-type="validateAmount" name="RentalDeposit">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.DownPaymentRent" placeholder="请输入首付租金（单位：元）" data-tip="请输入首付租金（单位：元）" data-type="validateAmount" name="DownPaymentRent">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.RentPaymentMethod" placeholder="请输入租金支付方式" data-tip="请输入租金支付方式" data-type="required" name="RentPaymentMethod">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.RentAdjustmentMethod" placeholder="请输入租金调整方式" data-tip="请输入租金调整方式" data-type="required" name="RentAdjustmentMethod">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.TotalRent" placeholder="请输入租金总额" data-tip="请输入租金总额" data-type="validateAmount" name="TotalRent">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.TransferCosts" placeholder="请输入转让费用（非必填）" data-tip="请输入转让费用（非必填）" @focus="enterOrNot($event,'validateAmount')" name="TransferCosts" >
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_LeaseRecap.AgencyFees" placeholder="请输入中介费用（非必填）" data-tip="请输入中介费用（非必填）" @focus="enterOrNot($event,'validateAmount')" name="AgencyFees">
          <i></i>
        </div>
      </form>
    </div>
    <mt-datetime-picker ref="date" class="date" v-model="pickerVisible" @confirm="handleChange" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <div class="mask c-fixed" v-if="city" @click="city=false"></div>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
export default {
  data() {
    return {
      isOpenDate: true, //true: 开始时间，false：结束时间
      city: false,
      endDate: new Date(),
      pickerVisible: new Date(),
      numberSlot: [
        {
          flex: 1,
          defaultIndex: 0,
          values: ["安徽省", "江苏省", "南京市"]
        }
      ],
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
      var model = {
        PositionID: JSON.parse(localStorage.getItem("userInfo")).PositionID,
        KeyID: 0,
        IsDCZL: "",
        YM_StoreBasicInfo: "",
        YM_LeaseRecap: this.YM_LeaseRecap
      };
      this.$ajax
        .SaveLeaseholdconditions({
          type: "post",
          data: model
        })
        .then(res => {
          this.$router.push("/newStore/"+this.storeID);
        });
    },
    //选项样式调整
    changeSelect(id) {
      document
        .getElementById(id)
        .nextElementSibling.setAttribute("class", "right");
      document
        .getElementById(id)
        .previousElementSibling.setAttribute("class", "icon w");
    },
    //调整非必填项样式

    dateOpen(e) {
      this.$refs.date.open();
      this.isOpenDate = true;
      e.target.blur();
    },
    dateClose(e) {
      this.$refs.date.open();
      this.isOpenDate = false;
      e.target.blur();
    },
    handleChange(v) {
      if (this.isOpenDate) {
        this.YM_LeaseRecap.LeasePeriodBegins = this.$formatDate(v);
        this.changeSelect("startDate");
      } else {
        this.YM_LeaseRecap.LeasePeriodOver = this.$formatDate(v);
        this.changeSelect("endDate");
      }
    },
    cityBtn() {
      this.city = false;
    },
    //数据初始化
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
    getCityName() {},
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
    validateAmount: {
      handler(curVal, oldVal){
        this.$nonMandatory(curVal.TransferCosts,this.inputElem[9],"validateAmount");
        this.$nonMandatory(curVal.AgencyFees,this.inputElem[10],"validateAmount");
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
.city {
  width: 100%;
  height: 200px;
}
.city-wrap {
  left: 0;
  bottom: 0;
  z-index: 10;
  .btn {
    position: relative;
    z-index: 11;
    line-height: 0.8rem;
    text-align: right;
    padding-right: 0.3rem;
  }
}
.mask {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.3;
}
</style>
<style lang="less">
.date {
  .mint-datetime-action {
    color: #5d7c33;
    font-size: 0.3rem;
    text-align: left;
    margin-left: .1rem;
    width: 1rem;
    padding-left: .2rem
  }
  span.mint-datetime-action.mint-datetime-cancel {
    color: #333;
  }
}
</style>
