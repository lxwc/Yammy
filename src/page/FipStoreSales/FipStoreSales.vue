<template>
  <div class="c-container">
    <top-header title="销售数据采集" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="ReasonName" data-type='required' @focus="(e)=>{ReasonSheet=true;e.target.blur();}" placeholder="原因" data-tip="请选择原因" name="ReasonName" id="ReasonName">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FipStoreSales.StoreName" placeholder="门店" readonly="readonly" disabled="disabled">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="CreateDate" placeholder="日期" readonly="readonly" disabled="disabled">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="number" class="c-box-flex" v-model="FipStoreSales.NetBusiness" placeholder="营业净额" data-type='validateAmount' data-tip="请输入营业净额" name="NetBusiness">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="number" class="c-box-flex" v-model="FipStoreSales.NetTakeAway" placeholder="外卖营业净额" data-type='validateAmount' data-tip="请输入外卖营业净额" name="NetTakeAway">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="number" class="c-box-flex" v-model="FipStoreSales.OrderQuantity" placeholder="订单数" data-type='validateAmount' data-tip="请输入订单数" name="OrderQuantity">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="number" class="c-box-flex" v-model="FipStoreSales.Cups" placeholder="杯数" data-tip="请输入杯数" data-type='validateAmount' name="Cups">
          <i></i>
        </div>
      </form>
    </div>
    <mt-actionsheet :actions="actions" v-model="ReasonSheet" cancel-text="">
    </mt-actionsheet>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      btnTxt: "保存",
      educationSheet: false,
      educationalPopUP: false,
      FipStoreSales: {},
      ReasonList: [],
      actions:[],
      ReasonName: "",
      ReasonSheet: false,
      TaskID:this.$route.params.TaskID,
      showJoinPicker: false,
      CreateDate:this.$route.params.CreateDate
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.FipStoreSalesInit();
    this.btnTxt = this.$showSaveBtn(-1, "提交");
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      var model = {
        ID: this.FipStoreSales.ID || 0,
        Creator: JSON.parse(localStorage.getItem("userInfo")).UserName || "",
        TaskID: this.FipStoreSales.TaskID || 0,
        FipStoreSales: this.FipStoreSales
      };
      this.$ajax
        .SaveFipStoreSales({
          type: "post",
          data: model
        })
        .then(res => {
          console.log(res);
          if(res.Status === 1){
            this.$router.push("/home");
          } else {
            Toast("提交失败");
          }
        });
    },
    FipStoreSalesInit() {
      this.$ajax
        .FipStoreSalesInit({
          type: "get",
          data: {
            taskID: this.TaskID || 0
          }
        })
        .then(res => {
          this.FipStoreSales = res.Data.FipStoreSales;
          this.Reasonlst = res.Data.Reasonlst;
          for(var i = 0; i < this.Reasonlst.length; i++){
            var temp = {
              name: this.Reasonlst[i].Type_Name,
              value: this.Reasonlst[i].Dict_Code,
              method: this.ReasonSelect
            }
            this.actions.push(temp);
            if(this.Reasonlst[i].Dict_Code === this.FipStoreSales.Reason){
              this.ReasonName = this.Reasonlst[i].Type_Name;
            }
          }
        });
    },
    //选择店铺属性
    ReasonSelect(v) {
      console.log(v);
      this.FipStoreSales.Reason = v.value;
      this.ReasonName = v.name;
      this.changeSelect("ReasonName");
    }
    
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
</style>
