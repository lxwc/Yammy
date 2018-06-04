<template>
  <div class="c-container">
    <top-header title="选择原因" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div id="editIcon" class="icon" :class="{ 'add': inputLen == 0, 'w': inputLen > 0}"></div>
          <!-- <input type="text" class="c-box-flex" placeholder="为何选择快乐柠檬" readonly> -->
          <div class="c-box-flex">为何选择HL/喝嘛</div>
          <i id="chooseHL"></i>
        </div>
        <div class="textArea">
          <textarea name="WhyChooseHL" class="bg-fff t-width" cols="30" rows="10" v-model="FranchiseMeetingInfo.WhyChooseHL" data-tip="请输入选择选择HL/喝嘛的原因" @input="txtLength()" maxlength="50"></textarea>
          <span>{{inputLen}}/50</span>
        </div>
        <!-- <div id="plaintext" class="plaintext" contenteditable="true" name="WhyChooseHL" data-tip="请输入选择快乐柠檬的原因" @input="txtLength($event)" maxlength="50">{{FranchiseMeetingInfo.WhyChooseHL}}</div> -->
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" id="AutonomousManagement" v-model="arrManagement[FranchiseMeetingInfo.AutonomousManagement]" data-type='required' placeholder="是否自主经营管理" data-tip="请选择是否自主经营管理" name="AutonomousManagement" @click="openManagementPicker($event)">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" id="RiskTolerance" v-model="riskValue" data-type='required' placeholder="可承受风险度" data-tip="请选择可承受风险度" name="RiskTolerance" @click="openRiskPicker($event)">
          <i></i>
        </div>
      </form>
    </div>
    <div class="mask c-fixed" v-if="showManagementPicker||showRiskPicker" @click="showManagementPicker=false;showRiskPicker=false"></div>
    <div class="city-wrap c-fixed bg-fff" v-if="showManagementPicker">
      <div class="fs30 btn f-left" @click="cancelBtn">取消</div>
      <div class="green fs30 btn f-right" @click="managementBtn">确认</div>
      <div class="page-picker-wrapper c-flex">
        <div class="c-box-flex">
          <mt-picker :slots="managementSlots" @change="onManagementChange" :visible-item-count="5"></mt-picker>

        </div>
      </div>
    </div>
    <div class="city-wrap c-fixed bg-fff" v-if="showRiskPicker">
      <div class="fs30 btn f-left" @click="cancelBtn">取消</div>
      <div class="green fs30 btn f-right" @click="riskBtn">确认</div>
      <div class="page-picker-wrapper c-flex">
        <div class="c-box-flex">
          <mt-picker :slots="riskSlots" @change="onRiskChange" :visible-item-count="5"></mt-picker>

        </div>
      </div>
    </div>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import { Toast } from "mint-ui";
import $ from "jquery";
export default {
  data() {
    return {
      FranchiseMeetingInfo: {},
      btnTxt: "",
      showManagementPicker: false,
      showRiskPicker: false,
      managementSlots: [{ flex: 1, values: ["否", "是"] }],
      riskSlots: [{ flex: 1, values: ["一般", "较强", "较弱"] }],
      selectManagement: "",
      selectRisk: "",
      arrManagement: ["否", "是"], //0：否，1：是
      riskValue: "",
      managementValue: "",
      inputLen: 0,
      isEdit: this.$route.params.isEdit,
      userID: this.$route.params.userID
    };
  },
  components: {
    topHeader,
    paletteButton
  },
  mounted() {
    this.meetingNegotiationInit();
    this.btnTxt = this.isEdit == 1 ? "保存" : "";
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      if (!this.FranchiseMeetingInfo.WhyChooseHL) {
        document.getElementById("chooseHL").setAttribute("class", "icon error");
        Toast("请输入选择快乐柠檬的原因");
        return false;
      } else {
        document.getElementById("chooseHL").setAttribute("class", "icon right");
      }
      this.$ajax
        .meetingReasonsSave({
          type: "post",
          data: {
            FranchiseMeetingInfo: this.FranchiseMeetingInfo
          }
        })
        .then(res => {
          if (res.Status === 1) {
            Toast("保存成功");
            this.$router.push("/interview/" + this.isEdit + "/" + this.userID);
          } else {
            Toast("保存失败");
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
          this.riskValue = this.FranchiseMeetingInfo.RiskTolerance;
          this.managementValue =
            this.FranchiseMeetingInfo.AutonomousManagement == 1 ? "是" : "否";
          this.inputLen = this.FranchiseMeetingInfo.WhyChooseHL
            ? this.FranchiseMeetingInfo.WhyChooseHL.length
            : 0;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            // document.getElementById("chooseHL").setAttribute("class","icon error");
            if (this.FranchiseMeetingInfo.WhyChooseHL) {
              document
                .getElementById("editIcon")
                .setAttribute("class", "icon w");
            } else {
              document
                .getElementById("editIcon")
                .setAttribute("class", "icon add");
            }
            if (v.name != "WhyChooseHL" && this.FranchiseMeetingInfo[v.name]) {
              v.previousElementSibling.setAttribute("class", "icon w");
            } else if (
              v.name != "WhyChooseHL" &&
              !this.FranchiseMeetingInfo[v.name]
            ) {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
          });
        });
    },
    //打开经营管理框
    openManagementPicker(e) {
      this.showManagementPicker = true;
      this.showRiskPicker = false;
      e.target.blur();
    },
    //打开风险框
    openRiskPicker(e) {
      this.showRiskPicker = true;
      this.showManagementPicker = false;
      e.target.blur();
    },
    //确定经营管理方式
    managementBtn() {
      this.showManagementPicker = false;
      this.managementValue = this.selectManagement;
      this.FranchiseMeetingInfo.AutonomousManagement =
        this.managementValue == "否" ? 0 : 1;
      this.changeSelect("AutonomousManagement");
    },
    //确定风险度
    riskBtn() {
      this.showRiskPicker = false;
      this.riskValue = this.selectRisk;
      this.FranchiseMeetingInfo.RiskTolerance = this.riskValue;
      this.changeSelect("RiskTolerance");
    },
    //关闭弹框
    cancelBtn() {
      this.showManagementPicker = false;
      this.showRiskPicker = false;
    },
    //获取经营管理值
    onManagementChange(picker, value) {
      this.selectManagement = value[0];
    },
    //获取风险度值
    onRiskChange(picker, value) {
      this.selectRisk = value[0];
    },
    //文本框字数限制
    txtLength() {
      var len = this.FranchiseMeetingInfo.WhyChooseHL.length;
      this.inputLen = len;
    }
  }
};
</script>
<style lang="less" scoped>
.textArea {
  position: relative;
  span {
    position: absolute;
    bottom: 0.1rem;
    right: 0.2rem;
    color: rgb(190, 186, 186);
  }
  .t-width {
    width: 100%;
    font-size: 0.26rem;
    padding: 0.2rem 0.2rem;
    border-style: solid;
    border-color: #ffffff;
  }
}
.plaintext {
  font-size: 0.26rem;
  background-color: #fff;
  margin-bottom: 0.1rem;
  height: 2rem;
  color: #333;
  padding: 0.2rem 0.3rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-user-modify: read-write-plaintext-only;
  outline: 0;
  user-select: auto;
}
.remark {
  font-size: 0.35rem;
  padding-left: 1.5rem;
}
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
    margin-left: 0.1rem;
    width: 1rem;
    padding-left: 0.2rem;
  }
  span.mint-datetime-action.mint-datetime-cancel {
    color: #333;
  }
}
</style>
