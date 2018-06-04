<template>
    <div class="c-container">
        <top-header title="投入资金" btn="保存" :callback="submit"></top-header>
        <div class="c-page">
            <form action="" ref="baseInfo" class="mt20">
                <div class="c-flex list-cell c-a-c p30 bg-fff">
                    <div class="icon add"></div>
                    <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.AvailableFunds" name="AvailableFunds" data-tip="请输入可投入资金" data-type='validateAmount' placeholder="请输入可投入资金">
                    <i></i>
                </div>
                <div class="c-flex list-cell c-a-c p30 bg-fff">
                    <div class="icon add"></div>
                    <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.SourcesFunding" name="SourcesFunding" data-tip="请输入资金来源" data-type='required' placeholder="请输入资金来源">
                    <i></i>
                </div>
                <div class="c-flex list-cell c-a-c p30 bg-fff">
                    <div class="icon add"></div>
                    <input type="text" id="remark" v-model="FranchiseMeetingInfo.Contributions" name="Contributions" data-tip="请选择出资人数" data-type='required' @focus="openPicker($event)" class="c-box-flex" placeholder="请选择出资人数">
                    <i></i>
                </div>
                <div class="c-flex list-cell c-a-c p30 bg-fff">
                    <div class="icon add"></div>
                    <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.LargestShareholder" name="LargestShareholder" data-tip="请输入最大股东" data-type='required' placeholder="请输入最大股东">
                    <i></i>
                </div>
                <div class="c-flex list-cell c-a-c p30 bg-fff">
                    <div class="icon add"></div>
                    <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.ShareholderInvestment" name="ShareholderInvestment" data-tip="请输入最大股东投资占比%" data-type='validateAmount' placeholder="请输入最大股东投资占比%">
                    <i></i>
                </div>
            </form>
            <div class="mask c-fixed" v-if="showPicker" @click="showPicker=false"></div>
            <div class="city-wrap c-fixed bg-fff" v-if="showPicker">
                <div class="fs30 btn f-left" @click="showPicker=false">取消</div>
                <div class="green fs30 btn f-right" @click="confirmBtn">确认</div>
                <div class="page-picker-wrapper c-flex">
                    <div class="c-box-flex">
                        <mt-picker :slots="dateSlots" @change="onInvestChange" :visible-item-count="5"></mt-picker>

                    </div>
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
      btnTxt: "",
      FranchiseMeetingInfo: {},
      dateSlots: [{ flex: 1, values: [1, 2, 3] }],
      showPicker: false,
      selectInvest: null,
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
        .meetingInvestfundSave({
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
    },
    confirmBtn() {
      this.showPicker = false;
      this.FranchiseMeetingInfo.Contributions = this.selectInvest;
      this.changeSelect("remark");
    },
    onInvestChange(picker, value) {
      this.selectInvest = value[0];
    },
    openPicker(e) {
      this.showPicker = true;
      e.target.blur();
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
  .f-right {
    float: right;
  }
  .btn {
    position: relative;
    z-index: 11;
    line-height: 0.8rem;
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