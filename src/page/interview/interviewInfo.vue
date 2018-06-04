<template>
  <div class="c-container">
    <top-header title="基本资料" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.userName" data-type='required' placeholder="请输入姓名" data-tip="请输入姓名" name="userName">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.birth" data-type='required' placeholder="请输入出生地" data-tip="请输入出生地" name="birth">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.ToLive" data-type='required' placeholder="请输入居住地" data-tip="请输入居住地" name="ToLive">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.SchoolCity" data-type='required' placeholder="请输入读书/工作城市" data-tip="请输入读书/工作城市" name="SchoolCity">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.SpouseCareer" data-type='required' placeholder="请输入配偶职业" data-tip="请输入配偶职业" name="SpouseCareer">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.FatherCareer" data-type='required' placeholder="请输入父亲职业" data-tip="请输入父亲职业" name="FatherCareer">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseMeetingInfo.MotherCareer" data-type='required' placeholder="请输入母亲职业" data-tip="请输入母亲职业" name="MotherCareer">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="joinMotivationInfo" data-type='required' placeholder="请输入加盟动机" data-tip="请输入加盟动机" name="JoinMotivation" @click="openJoinPicker($event)">
          <i></i>
        </div>
      </form>
    </div>
    <div class="mask c-fixed" v-if="showJoinPicker" @click="showJoinPicker=false"></div>
    <div class="city-wrap c-fixed bg-fff" v-if="showJoinPicker">
      <div class="fs30 btn f-left" @click="cancelBtn">取消</div>
      <div class="green fs30 btn f-right" @click="confirmBtn">确认</div>
      <div class="page-picker-wrapper c-flex">
        <div class="c-box-flex">
          <mt-picker :slots="dateSlots" @change="onJoinChange" :visible-item-count="5"></mt-picker>
          <input ref="remarkInfo" class="remark" type="text" placeholder="请输入其他动机" data-type="required" data-tip="请输入其他动机" v-if="isRemark" v-model="FranchiseMeetingInfo.JoinMotivationRemark">
        </div>
      </div>
    </div>
    <paletteButton></paletteButton>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      FranchiseMeetingInfo: {},
      btnTxt: "",
      JoinMotivationLst: [],
      showJoinPicker: false,
      dateSlots: [{ flex: 1, values: [] }],
      selectJoin: "",
      showJoinMotivation: "",
      isRemark: false,
      joinMotivationInfo: "",
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
      this.JoinMotivationLst.map((v, i) => {
        if (this.showJoinMotivation == v.Type_Name) {
          this.FranchiseMeetingInfo.JoinMotivation = v.Dict_Code;
        }
      });
      this.$ajax
        .meetingBasicInfoSave({
          type: "post",
          data: {
            FranchiseMeetingInfo: this.FranchiseMeetingInfo
          }
        })
        .then(res => {
          if (res.Status === 1) {
            Toast("保存成功");
            this.$router.push("/interview/"+this.isEdit+'/'+this.userID);
          } else {
            Toast("保存失败");
          }
        });
    },
    //面谈记录信息初始化
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
          this.JoinMotivationLst = res.Data.JoinMotivationLst;
          this.JoinMotivationLst.map((v, i) => {
            this.dateSlots[0].values.push(v.Type_Name);
          });
          this.codeSwitchName(this.FranchiseMeetingInfo.JoinMotivation);
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
    //将加盟动机code ，转化为name
    codeSwitchName(code) {
      this.JoinMotivationLst.map((v, i) => {
        if (code == v.Dict_Code) {
          this.showJoinMotivation = v.Type_Name;
        }
        if (this.showJoinMotivation == "其他") {
          this.joinMotivationInfo =
            this.showJoinMotivation +
            (this.FranchiseMeetingInfo.JoinMotivationRemark
              ? "(" + this.FranchiseMeetingInfo.JoinMotivationRemark + ")"
              : "");
        } else {
          this.joinMotivationInfo = this.showJoinMotivation;
        }
      });
    },
    openJoinPicker(e) {
      this.showJoinPicker = true;
      e.target.blur();
    },
    confirmBtn() {
      if (this.isRemark) {
        if (this.FranchiseMeetingInfo.JoinMotivationRemark) {
          this.showJoinPicker = false;
          this.showJoinMotivation = this.selectJoin;
          if (this.showJoinMotivation == "其他") {
            this.joinMotivationInfo =
              this.showJoinMotivation +
              (this.FranchiseMeetingInfo.JoinMotivationRemark
                ? "(" + this.FranchiseMeetingInfo.JoinMotivationRemark + ")"
                : "");
          } else {
            this.joinMotivationInfo = this.showJoinMotivation;
          }
        } else {
          this.showJoinPicker = true;
          Toast("请输入其他加盟动机原因");
        }
      } else {
        this.showJoinPicker = false;
        this.showJoinMotivation = this.selectJoin;
        this.joinMotivationInfo = this.showJoinMotivation;
      }
    },
    cancelBtn() {
      this.showJoinPicker = true;
    },
    onJoinChange(picker, value) {
      this.selectJoin = value[0];
      if (this.selectJoin == "其他") {
        this.isRemark = true;
      } else {
        this.isRemark = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
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
