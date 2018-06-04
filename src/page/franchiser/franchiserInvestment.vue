<template>
  <div class="c-container">
    <top-header title="投入资金" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="Lst.InvestMoney" placeholder="请输入可投入资金RMB（万元）" data-tip="请输入数字，最多两位小数" data-type='validateAmount' name="InvestMoney">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" id="remark" v-model="Contributions" @focus="(e)=>{investPopUP=true;e.target.blur();}" placeholder="请输入出资人数" data-tip="请输入出资人数" data-type='required' name="Remark">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="Lst.LargestShareholder" placeholder="请输入最大股东" data-tip="请输入最大股东" data-type='required' name="LargestShareholder">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="Lst.ShareholderInvestment" placeholder="请输入最大股东占比" data-tip="请输入最大股东占比" data-type='validateAmount' name="ShareholderInvestment">
          <i></i>
        </div>

      </form>
    </div>
    <div class="mask c-fixed" v-if="investPopUP" @click="investPopUP=false"></div>
    <div class="city-wrap c-fixed bg-fff" v-if="investPopUP">
      <div class="fs30 btn f-left" @click="investPopUP = false">取消</div>
      <div class="green fs30 btn f-right" @click="confirmBtn">确认</div>
      <div class="page-picker-wrapper c-flex">
        <div class="c-box-flex">
          <mt-picker :slots="dateSlots" @change="onInvestChange" :visible-item-count="5"></mt-picker>
        </div>
      </div>
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
      investmentSheet: false,
      Lst: {},
      Contributions: null,
      investPopUP: false,
      dateSlots: [{ flex: 1, values: ["1", "2", "3"] }],
      selectInvest: null,
      btnTxt: "",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getFranchise();
    this.btnTxt = this.$showSaveBtn(1, "保存");
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      this.Lst.User_ID = JSON.parse(localStorage.getItem("userInfo")).UserID;
      var model = {
        User_ID: JSON.parse(localStorage.getItem("userInfo")).UserID,
       Contributions: this.Contributions,
        Lst: [
          {
            User_ID: this.Lst.User_ID,
            InvestMoney: this.Lst.InvestMoney,
            Remark: this.Lst.Remark,
            LargestShareholder: this.Lst.LargestShareholder,
            ShareholderInvestment: this.Lst.ShareholderInvestment,
            InformationID: this.Lst.InformationID
          }
        ]
      };
      this.$ajax
        .investInFundsSave({
          type: "post",
          data: model
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/franchiser/"+this.storeID);
          }
        });
    },
    //加盟商资料初始化
    getFranchise() {
      this.$ajax
        .getFranchise({
          type: "get",
          data: {
            User_ID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            LoginUser_ID: JSON.parse(localStorage.getItem("userInfo")).UserID
          }
        })
        .then(res => {
          this.Lst = res.Data.Lst[0];
          this.Contributions = res.Data.Contributions;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if(this.Lst[v.name]){
              v.previousElementSibling.setAttribute("class", "icon w");
            } else {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
          });
          if(this.Contributions){
            document.getElementById('remark').previousElementSibling.setAttribute('class','icon w');
          } else {
            document.getElementById('remark').previousElementSibling.setAttribute('class','icon add');
          }
        });
    },
    investment(v) {
      this.Lst.Remark = v.name;
    },
    onInvestChange(picker, value) {
      this.selectInvest = value[0];
    },
    confirmBtn() {
      this.investPopUP = false;
      this.Lst.Remark = this.selectInvest;
     this.Contributions = this.selectInvest;
      this.changeSelect("remark");
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.city-wrap {
  left: 0;
  bottom: 0;
  z-index: 10;
  .f-left {
    float: left;
    padding-left: 0.3rem;
  }
  .f-right{
    float: right;
  }
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
