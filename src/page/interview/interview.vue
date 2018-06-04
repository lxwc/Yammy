<!-- 加盟商资料提交 -->
<template>
    <div class="c-container">
        <top-header id="btnSubmit" title="意向加盟商面谈记录" :btn="btnTxt" :callback="submit"></top-header>
        <div class="c-page p30">
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">1</span>基本信息
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/interviewInfo/'+isEdit+'/'+userID">
                    <div class="btn gray fs26 bg-green color-fff">{{isEdit==1?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">姓名：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.userName}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">出生地：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.birth}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">居住地：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.ToLive}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">读书/工作城市：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.SchoolCity}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">配偶职业：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.SpouseCareer}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">父亲职业：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.FatherCareer}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">母亲职业：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.MotherCareer}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">加盟动机：</div>
                    <div class="c-box-flex ml15">
                        {{showJoinMotivation}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">2</span>工作经历
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr tc" v-if="!hasWork">
                <router-link :to="'/interviewWork/'+isEdit+'/'+userID">
                    <div class="add-wrap c-flex c-aj-c">
                        <img src="../../assets/images/add.svg" alt="">
                        <span class="ml15 green fs30">添加工作经历</span>
                    </div>
                    <div class="gray mt15">请从最近的工作说起</div>
                </router-link>
            </div>
            <div v-else class="bg-fff border-gray p20 pr">
                <router-link :to="'/interviewWork/'+isEdit+'/'+userID">
                    <div class="btn gray fs26 bg-green color-fff">{{isEdit==1?'编辑':'查看'}}</div>
                </router-link>
                <ul class="ml30">
                    <li v-for="(obj,index) in MeetingworkExperienceLst" :key="index" class="mt15">
                        <div class="date mt15 d-inline">
                            {{obj.WorkStartDate + "~" +(obj.WorkEndDate?obj.WorkEndDate:"至今")}}
                        </div>
                        <div class="mt15">{{obj.Department}}</div>
                        <div class="mt15">{{obj.Position}}</div>
                    </li>
                </ul>

            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">3</span>政商关系
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr tc business" v-if="!hasBusiness">
                <router-link :to="'/interviewCommercialRelationse/'+isEdit+'/'+userID">
                    <div class="add-wrap c-flex c-aj-c">
                        <img src="../../assets/images/add.svg" alt="">
                        <span class="ml15 green fs30">添加政商关系</span>
                    </div>
                    <div class="mt15"></div>
                </router-link>
            </div>
            <div class="bg-fff border-gray p20 pr" v-else>
                <router-link :to="'/interviewCommercialRelationse/'+isEdit+'/'+userID">
                    <div class="btn gray fs26 bg-green color-fff">{{isEdit==1?'编辑':'查看'}}</div>
                </router-link>
                <ul class="ml30">
                    <li v-for="(obj, index) in BusinessRelationshipLst" :key="index" class="mt15">
                        <div class="date mt15 d-inline">
                            {{obj.Department}}
                        </div>
                        <div class="mb30">
                            <span class="mt15">{{obj.Position}}</span>
                            <span class="mt15 ml15">{{obj.UserName}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">4</span>选择原因
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/interviewReasons/'+isEdit+'/'+userID">
                    <div class="btn gray fs26 bg-green color-fff">{{isEdit==1?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15 mt55">
                    <div>为何选择HL/喝嘛：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.WhyChooseHL}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">自主经营管理：</div>
                    <div class="c-box-flex ml15">
                        {{managementLst[FranchiseMeetingInfo.AutonomousManagement]}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">可承担风险：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.RiskTolerance}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">5</span>投入资金
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/interviewInvestfund/'+isEdit+'/'+userID">
                    <div class="btn gray fs26 bg-green color-fff">{{isEdit==1?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">可投入资金（RMB）：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.AvailableFunds}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">资金来源：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.SourcesFunding}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">出资人数：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.Contributions}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">最大股东：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.LargestShareholder}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">最大股东投资占比%：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.ShareholderInvestment}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">6</span>开店区域
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/interviewOpenArea/'+isEdit+'/'+userID">
                    <div class="btn gray fs26 bg-green color-fff">{{isEdit==1?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">开店区域：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.Area}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">商圈：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.BusinessCircle}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">首选位置：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.preferredPosition}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">次选位置：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.secondaryPosition}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">7</span>区域竞品信息
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/interviewAreaInfo/'+isEdit+'/'+userID">
                    <div class="btn gray fs26 bg-green color-fff">{{isEdit==1?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">开店区域竞品：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.competitionBrand}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">竞品营业额：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.CompetitiveTurnover}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">开店区域商场租金等：</div>
                    <div class="c-box-flex ml15">
                        {{FranchiseMeetingInfo.StoreRent}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">8</span>综合评估
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/interviewComprehensive/'+isEdit+'/'+userID">
                    <div class="btn gray fs26 bg-green color-fff">{{isEdit==1?'编辑':'查看'}}</div>
                </router-link>
                <div class="mt15 q-list">
                    <mt-radio style="font-size:.26rem;color:#333" title="1、加盟声请人意愿：" v-model="FranchiseMeetingInfo.JoinApplicant" :options="JoinApplicantLst">
                    </mt-radio>
                </div>
                <div class="mt15 q-list">
                    <mt-radio title="2、相关经验：" v-model="FranchiseMeetingInfo.RelatedExperience" :options="RelatedExperienceLst">
                    </mt-radio>
                </div>
                <div class="mt15 q-list">
                    <mt-radio title="3、财务评估：" v-model="FranchiseMeetingInfo.FinancialAssessment" :options="FinancialAssessmentLst">
                    </mt-radio>
                </div>
                <div class="mt15">
                    <div class="mint-radiolist">
                        <label class="mint-radiolist-title">4、其他综合意见描述：</label>
                        <textarea name="Remark" cols="30" rows="10" class="txtArea" v-model="FranchiseMeetingInfo.Remark" disabled></textarea>
                    </div>
                </div>
                <div class="mt15 q-list">
                    <mt-radio title="5、负责人审核通过结果：" v-model="FranchiseMeetingInfo.InterviewResults" :options="InterviewResultsLst">
                    </mt-radio>
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
export default {
  data() {
    return {
      hasWork: false,
      hasBusiness: false,
      btnTxt: "",
      FranchiseMeetingInfo: {},
      BusinessRelationshipLst: [],
      MeetingworkExperienceLst: [],
      JoinMotivationLst: [],
      showJoinMotivation: "",
      JoinApplicantLst: [], //1
      RelatedExperienceLst: [], //2
      FinancialAssessmentLst: [], //3
      InterviewResultsLst: [
        { label: "通过", value: "1", disabled: true },
        { label: "不通过", value: "0", disabled: true }
      ], //5
      userID: this.$route.params.userID,
      isEdit: this.$route.params.isEdit, //0：不可编辑，1：可编辑
      resultData: {},
      managementLst: ['否','是']
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.meetingNegotiationInit();
    this.btnTxt = this.isEdit == 1 ? "保存" : "";
  },
  methods: {
    //提交
    submit() {
      if (
        !this.FranchiseMeetingInfo.birth ||
        !this.MeetingworkExperienceLst[0].Department ||
        !this.BusinessRelationshipLst[0].Department &&
        !this.FranchiseMeetingInfo.WhyChooseHL &&
        !this.FranchiseMeetingInfo.AvailableFunds &&
        !this.FranchiseMeetingInfo.Area &&
        !this.FranchiseMeetingInfo.competitionBrand &&
        !this.FranchiseMeetingInfo.RelatedExperience
      ) {
        Toast("请填写完整");
        return false;
      }
      this.$ajax
        .meetingNegotiationSave({
          type: "post",
          data: this.resultData
        })
        .then(res => {
            if(res.Status === 1){
                Toast("保存成功");
                this.$router.push("/home");
            } else {
                Toast("保存失败");
            }
        });
    },
    //意向加盟面谈初始化
    meetingNegotiationInit() {
      this.$ajax
        .meetingNegotiationInit({
          type: "get",
          data: {
            User_ID: this.userID
          }
        })
        .then(res => {
          this.resultData = res.Data;
          this.FranchiseMeetingInfo = res.Data.FranchiseMeetingInfo;
          this.BusinessRelationshipLst = res.Data.BusinessRelationshipLst;
          this.MeetingworkExperienceLst = res.Data.MeetingworkExperienceLst;
          this.JoinMotivationLst = res.Data.JoinMotivationLst;
          this.codeSwitchName(this.FranchiseMeetingInfo.JoinMotivation);
          if (this.MeetingworkExperienceLst[0].Department) {
            this.hasWork = true;
          } else {
            this.hasWork = false;
          }
          if (this.BusinessRelationshipLst[0].Department) {
            this.hasBusiness = true;
          } else {
            this.hasBusiness = false;
          }
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
        desArr.push({ label: v.Type_Name, value: v.Dict_Code, disabled: true });
      });
    },
    //将加盟动机code ，转化为name
    codeSwitchName(code) {
      this.JoinMotivationLst.map((v, i) => {
        if (code == v.Dict_Code) {
          this.showJoinMotivation = v.Type_Name;
        }
        if (this.showJoinMotivation == "其他") {
          this.showJoinMotivation =
            this.showJoinMotivation +
            (this.FranchiseMeetingInfo.JoinMotivationRemark
              ? "(" + this.FranchiseMeetingInfo.JoinMotivationRemark + ")"
              : "");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
  padding-bottom: 0.2rem;
}
.btn {
  position: absolute;
  top: 0.2rem;
  right: 0.3rem;
  padding: 0.05rem 0.2rem;
  border-radius: 0.06rem;
}
.btn-brand {
  top: 0.15rem;
}
label.mint-radiolist-title {
  font-size: 0.26rem;
  color: #333;
}
.txtArea {
  font-size: 0.26rem;
  width: 100%;
  text-indent: 0.5rem;
  overflow-y: scroll;
}
.header-img {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.2rem auto;
  position: relative;
  display: block;
  .icon {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 0.2rem;
    height: 0.2rem;
    background: url("../../assets/images/w.svg") no-repeat;
    background-size: 100%;
  }
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
}
.business {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.add-wrap {
  img {
    width: 0.32rem;
    height: 0.32rem;
  }
}
li:before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px #000000 solid;
  border-radius: 50%;
  margin-left: -0.3rem;
}
.d-inline {
  display: inline;
}
.img-card {
  width: 100%;
  height: 150px;
}
.mint-radiolist {
  .mint-radiolist-title {
    color: #333;
    font-size: 0.26rem;
  }
}
</style>
