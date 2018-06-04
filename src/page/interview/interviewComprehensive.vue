<!-- 意向资料-意向资料 -->
<template>
  <div class="c-container">
    <top-header title="综合评估" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <div class="q-list">
        <form action="" ref="lidt">
          <div class="mt15">
            <mt-radio title="1、加盟申请人意愿：" v-model="FranchiseMeetingInfo.JoinApplicant" :options="JoinApplicantLst">
            </mt-radio>
            <input class="remark" type="text" placeholder="其他描述说明" v-model="FranchiseMeetingInfo.JoinApplicantRemark">
          </div>
          <div class="mt15">
            <mt-radio title="2、相关经验：" v-model="FranchiseMeetingInfo.RelatedExperience" :options="RelatedExperienceLst">
            </mt-radio>
            <input class="remark" type="text"  v-model="FranchiseMeetingInfo.RelatedExperienceRemark" placeholder="其他描述说明">
          </div>
          <div class="mt15">
            <mt-radio title="3、财务评估：" v-model="FranchiseMeetingInfo.FinancialAssessment" :options="FinancialAssessmentLst">
            </mt-radio>
            <input class="remark" type="text"  v-model="FranchiseMeetingInfo.FinancialAssessmentRemark" placeholder="其他描述说明">
          </div>
          <div class="mt15">
            <div class="mint-radiolist">
              <label class="mint-radiolist-title">4、其他综合意见描述：</label>
              <textarea name="Remark" cols="30" rows="10" class="txtArea" v-model="FranchiseMeetingInfo.Remark"></textarea>
            </div>
          </div>
          <div class="mt15">
            <mt-radio title="5、负责人审核通过结果：" v-model="FranchiseMeetingInfo.InterviewResults" :options="InterviewResultsLst">
            </mt-radio>
          </div>
        </form>
      </div>
    </div>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import { Toast } from "mint-ui";
import { Checklist } from "mint-ui";
export default {
  data() {
    return {
      FranchiseMeetingInfo: {},
      JoinApplicantLst: [], //1
      RelatedExperienceLst: [], //2
      FinancialAssessmentLst: [], //3
      InterviewResultsLst: [
        { label: "通过", value: "1" },
        { label: "不通过", value: "0" }
      ], //5
      isEdit: this.$route.params.isEdit,
      userID: this.$route.params.userID,
      btnTxt: ''
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.meetingNegotiationInit();
    this.btnTxt = this.isEdit==1?"保存":"";
  },
  methods: {
    //保存
    submit() {
      this.$ajax.meetingComprehensiveSave({
        type: 'post',
        data: {
          FranchiseMeetingInfo: this.FranchiseMeetingInfo
        }
      }).then( res=> {
        if(res.Status === 1){
          Toast("保存成功");
          this.$router.push("/interview/"+this.isEdit+"/"+this.userID);
        }else{
          Toast("保存失败");
        }
      })
    },
    //获取初始化信息
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
          this.setOption(res.Data.JoinApplicantLst, this.JoinApplicantLst);
          this.setOption(
            res.Data.RelatedExperienceLst,
            this.RelatedExperienceLst
          );
          this.setOption(
            res.Data.FinancialAssessmentLst,
            this.FinancialAssessmentLst
          );
        });
    },
    //选项设置
    setOption(curArr, desArr) {
      curArr.map((v, i) => {
        desArr.push({ label: v.Type_Name, value: v.Dict_Code });
      });
    },
    //其他选择 隐藏输入框
    getLable(arr, v, str) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].label == str) {
          if (v == arr[i].value) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.pl-30 {
  padding-left: 0.3rem;
}
.color-222 {
  color: #222;
}
.txtArea {
  width: 100%;
  font-size: 0.26rem;
  padding: 0.3rem 0.2rem;
  overflow-y: scroll;
  background-attachment: fixed;
  background-repeat: no-repeat;
  border-style: solid;
  border-color: #f7f4f4;
  background: #fff;
}

.remark {
  &.p1 {
    border: 1px solid #f00;
  }
}
</style>
