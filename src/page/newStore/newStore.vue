<!-- 新店/迁址评估申请 -->
<template>
    <div class="c-container">
        <top-header title="新店/迁址评估申请" :btn="btnTxt" :callback="submit"></top-header>
        <div class="c-page p30">
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">1</span> 门店基本资料
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/newStoreInfo/'+storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">店铺属性：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.StoreStatusName}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">预计签约日：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.EstimatedSigningDate}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">预计开业日：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.EstimatedOpeningDate}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">店铺地址：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.NewStoreAddress}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">2</span>产证信息
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/newStoreProduction/'+storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">出租人：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.Lessor}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">产权人：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.PropertyOwner}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">面积：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.Area | FormattingData("㎡" ,1)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">楼层：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.Floor | FormattingData("楼" ,0)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">使用面积：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.UsageArea | FormattingData("㎡" ,1)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">外租仓库：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.RentalWarehouse | FormattingData("㎡" ,1)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div>附近住宅房价：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.NearbyResidentialPrices | FormattingData("元" ,2)}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">3</span>租赁条件
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/newStoreLease/'+storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">租赁期：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.LeasePeriodBegins? YM_LeaseRecap.LeasePeriodBegins + "~" + YM_LeaseRecap.LeasePeriodOver: ""}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">免租期：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.RentFreePeriod | FormattingData("天", 0)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div>租期（含免租期）：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.TermMonth | FormattingData("月", 0)}}
                    </div>

                </div>
                <div class="c-flex mb15">
                    <div class="label">租赁保证金：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.RentalDeposit | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">首付租金：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.DownPaymentRent | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div>租赁支付方式：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.RentPaymentMethod}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div>租金调整方式：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.RentAdjustmentMethod}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">租金总额：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.TotalRent | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">转让费用：</div>
                    <div class="c-box-flex ml15">
                        {{ YM_LeaseRecap.TransferCosts | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">中介费用：</div>
                    <div class="c-box-flex ml15">
                        {{ YM_LeaseRecap.AgencyFees | FormattingData("元" ,2)}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">4</span>每月租赁成本
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/newStoreLeaseholdCost/'+storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div>每月平均租金：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.AverageRentPerMonth | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div>每月转让费分摊：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.TransferFeeSharing | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div>每月中介费：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.AgencyFeesMonths | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div>每月物业管理费：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.PropertyManagementFee | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div>每月租赁成本：</div>
                    <div class="c-box-flex ml15">
                        {{YM_LeaseRecap.MonthlyRentalCosts | FormattingData("元" ,2)}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">5</span>人流量测算
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/newStorePeople/'+storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">平常日：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.TrafficCountOrdinaryDay | FormattingData("人", 0)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">周五：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.TrafficCountFriday | FormattingData("人", 0)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">节假日：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.TrafficCountHoliday | FormattingData("人", 0)}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">6</span>获利评估
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/newStoreAssessment/'+storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">年营业额：</div>
                    <div class="c-box-flex ml15">
                        {{ YM_SalesEstimation.AnnualTurnover | FormattingData("元", 2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">年税后利润：</div>
                    <div class="c-box-flex ml15">
                        {{YM_SalesEstimation.BeforetaxBenefits | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">年现金回收：</div>
                    <div class="c-box-flex ml15">
                        {{ YM_SalesEstimation.CashRecovery | FormattingData("元" ,2)}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">回收期：</div>
                    <div class="c-box-flex ml15">
                        {{ YM_SalesEstimation.PaybackPeriod }}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">IRR投资报酬率：</div>
                    <div class="c-box-flex ml15">
                        {{ YM_SalesEstimation.Investment }}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">7</span>营业执照
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/newStoreLicense/'+storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div>营业执照办理：</div>
                    <div class="c-box-flex ml15">
                        {{YM_StoretInfo.BusinessLicenseName}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">8</span>附件列表
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr tc" v-if="!hasImg">
                <router-link :to="'/newStoreUpload/'+ storeID">
                    <div class="add-wrap c-flex c-aj-c">
                        <img src="../../assets/images/add.svg" alt="">
                        <span class="ml15 green fs30">添加图片</span>
                    </div>
                    <div class="gray mt15">请上传店铺图片</div>
                </router-link>
            </div>
            <div v-else class="bg-fff p20 pr" @click="goEdit">
                <label v-for="(img, index) in Pic" :key="index">
                    <div class="bg-fff mt20 c-flex c-aj-c">
                        <img class="img-card" :src="getImgSrc(img.AttachedID)">
                    </div>
                </label>
            </div>
        </div>
        <palette-button></palette-button>
    </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import { Toast, Lazyload } from "mint-ui";
export default {
  data() {
    return {
      YM_StoretInfo: {},
      YM_LeaseRecap: {},
      YM_SalesEstimation: {},
      isAllow: 0,
      btnTxt: "",
      newStore: JSON.parse(localStorage.getItem("initData"))[2],
      Pic: [],
      hasImg: false,
      storeID: this.$route.params.storeID==null?0:this.$route.params.storeID
    };
  },
  filters: {
    FormattingData(val, txt, accuracy) {
      if (val) {
        return parseFloat(val).toFixed(accuracy) + txt;
      } else {
        return "";
      }
    }
  },
  components: {
    topHeader,
    paletteButton
  },
  mounted() {
    this.storeID = this.storeID || localStorage.getItem("storeID") || 0;
    this.storeSiteEvaluationInit();
    this.getSysCommonAttached();
    this.btnTxt = this.$showSaveBtn(2, "提交");
  },
  methods: {
    //提交
    submit() {
      if (this.isAllow == 8) {
        this.$ajax
          .autoSubmit({
            type: "get",
            data: {
              functionID: this.newStore.Function_ID,
              itemID:
                this.storeID || JSON.parse(localStorage.getItem("storeID")),
              keyID: this.newStore.taskID ? this.newStore.taskID : "",
              actionID: "btnSubmit",
              flag: "",
              positionID: JSON.parse(localStorage.getItem("userInfo"))
                .PositionID
            }
          })
          .then(res => {
            if (res.Status == 1) {
              this.$moduleStatus();
              this.btnTxt = this.$showSaveBtn(2, "提交");
              Toast("提交成功");
              this.$router.push("/home");
            }
          });
      } else {
        Toast("请填写完毕");
      }
    },
    //新店加盟初始化
    storeSiteEvaluationInit() {
      this.$ajax
        .storeSiteEvaluationInit({
          type: "get",
          data: {
            StoreID: this.storeID || localStorage.getItem("storeID") || 0,
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            PositionID: JSON.parse(localStorage.getItem("userInfo"))
              .PositionID
          }
        })
        .then(res => {
          this.YM_StoretInfo = res.Data.YM_StoretInfo;
          this.YM_LeaseRecap = res.Data.YM_LeaseRecap;
          this.YM_SalesEstimation = res.Data.YM_SalesEstimation;
          localStorage.setItem("storeID", this.YM_StoretInfo.StoreID);
          this.storeID = this.YM_StoretInfo.StoreID;
          this.allowSubmit();
        });
    },
    //附件初始化
    getSysCommonAttached() {
      this.storeID =
        this.storeID || JSON.parse(localStorage.getItem("userInfo")).UserID;
      if (this.storeID == 0) {
          this.Pic = [];
          this.hasImg = false;
      } else {
        this.$ajax
          .getSysCommonAttached({
            type: "get",
            data: {
              PageID: this.newStore.Function_ID,
              ItemID:
                this.storeID ||
                JSON.parse(localStorage.getItem("userInfo")).UserID,
              KeyID: 0,
              ReadOnly: false
            }
          })
          .then(res => {
            this.Pic = res.Data;
            if (this.Pic[0].FilePath) {
              this.hasImg = true;
            } else {
              this.hasImg = false;
            }
          });
      }
    },
    allowSubmit() {
      this.YM_StoretInfo.StoreStatusName ? this.isAllow++ : this.isAllow; //模块一：门店基本资料
      this.YM_StoretInfo.Lessor ? this.isAllow++ : this.isAllow; //模块二： 产证信息
      this.YM_LeaseRecap.LeasePeriodBegins ? this.isAllow++ : this.isAllow; //模块三： 租赁条件
      this.YM_LeaseRecap.AverageRentPerMonth ? this.isAllow++ : this.isAllow; //模块四： 每月租赁成本
      this.YM_StoretInfo.TrafficCountOrdinaryDay
        ? this.isAllow++
        : this.isAllow; //模块五： 人流量测算
      this.YM_SalesEstimation.AnnualTurnover ? this.isAllow++ : this.isAllow; //模块六： 获利评估
      this.YM_StoretInfo.BusinessLicenseName ? this.isAllow++ : this.isAllow; //模块七： 营业执照
      this.Pic[0].FilePath ? this.isAllow++ : this.isAllow; //模块八：附件图片上传
    },
    //获取图片
    getImgSrc(attachedID) {
      //   alert(attachedID);
      return (
        "http://" +
        location.host +
        "/Pmt/Api/APP/Account/Avatorupload?AttachedID=" +
        attachedID
      );
    },
    //前往编辑图片页面
    goEdit() {
      if (
        JSON.parse(localStorage.getItem("initData"))[2].CurrentStatus == 0
      ) {
        this.$router.push("/newStoreUpload/" + this.storeID);
      }
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

.img-card {
  width: 100%;
  height: 150px;
}
</style>
