<template>
  <div class="c-container">
    <top-header title="开店前相应资料提交" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <div class="fs30 mt20 mb20">
        <span class="p10 bg-green color-fff mr15">1</span> 门店详情
        <div class="border-red ml15 p30">必填</div>
      </div>
      <div class="bg-fff border-gray p20 pr">
        <router-link :to="'/dataUploadingInfo/'+storeID">
          <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
        </router-link>
        <div class="c-flex mb15">
          <div class="label">预估开店时间：</div>
          <div class="c-box-flex ml15">
            {{storeListView.PlanDate}}
          </div>
        </div>
        <div class="c-flex mb15">
          <div class="label">营业执照负责人：</div>
          <div class="c-box-flex ml15">
            {{storeListView.BusinessLicenseLeader}}
          </div>
        </div>
      </div>
      <div class="fs30 mt20 mb20">
        <span class="p10 bg-green color-fff mr15">2</span> 图片上传
        <div class="border-red ml15 p30">必填</div>
      </div>
      <div class="bg-fff border-gray p20 pr tc" v-if="!hasImg">
        <router-link :to="'/dataUploadingDetail/'+storeID">
          <div class="add-wrap c-flex c-aj-c">
            <img src="../../assets/images/add.svg" alt="">
            <span class="ml15 green fs30">添加图片</span>
          </div>
          <div class="gray mt15">请上传营业执照、食品经营许可证等</div>
        </router-link>
      </div>
      <div v-else class="bg-fff p20 pr">
        <router-link :to="'/dataUploadingDetail/'+storeID">
          <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
        </router-link>
        <label v-for="(img, index) in Pic" :key="index">
          <div class="c-flex mt20" v-if="index <= 1">
            <div class="label">{{dateTxt[index]}}</div>
            <div class="c-box-flex ml15">
              {{expiryDate[index]}}
            </div>
          </div>
          <div v-if="showFoodLicense != index">
            <div class="bg-fff mt20 c-flex c-aj-c">
              <img :class="img.FilePath!=null?haveImg:noImg" :src="img.FilePath!=null?getImgSrc(img.AttachedID):'src/assets/images/nopic.svg'">
            </div>
            <div class="imgTitle" v-if="img.FilePath==null">请上传{{img.Title}}</div>
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
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      btnTxt: "",
      dataUploading: JSON.parse(localStorage.getItem("initData"))[5],
      Pic: [],
      checkFileLst: [],
      hasImg: false,
      dateTxt: ["营业执照到期时间：", "食品经营许可证到期时间："],
      expiryDate: [],
      storeListView: {},
      storeID: this.$route.params.storeID,
      haveImg: "img-card",
      noImg: "img-tip",
      showFoodLicense: null
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getdocumentTransferView();
    this.documentTransferInit();
    this.btnTxt = this.$showSaveBtn(5, "提交");
  },
  methods: {
    //保存
    submit() {
      var picIsOK = true;
      for (var i = 0; i < 6; ) {
        if (!this.Pic[i].FilePath) {
          picIsOK = false;
          break;
        } else {
          i++;
        }
      }
      if (
        picIsOK &&
        this.checkFileLst[0].Def5 &&
        this.checkFileLst[1].Def5 &&
        this.storeListView.PlanDate &&
        this.storeListView.BusinessLicenseLeader &&
        this.haveFoodLicense()
      ) {
        this.$ajax
          .autoSubmit({
            type: "get",
            data: {
              functionID: this.dataUploading.Function_ID,
              itemID:
                this.storeID || JSON.parse(localStorage.getItem("storeID")),
              keyID: this.dataUploading.taskID ? this.dataUploading.taskID : "",
              actionID: "btnSubmit",
              flag: "",
              positionID: JSON.parse(localStorage.getItem("userInfo"))
                .PositionID
            }
          })
          .then(res => {
            if (res.Status == 1) {
              this.$moduleStatus();
              this.btnTxt = this.$showSaveBtn(5, "提交");
              Toast("提交成功");
              this.$router.push("/home");
            }
          });
      } else {
        Toast("请填写完毕");
      }
    },
    //附件日期初始化
    getdocumentTransferView() {
      this.$ajax
        .getdocumentTransferView({
          type: "get",
          data: {
            PageID: this.dataUploading.Function_ID,
            StoreId: this.storeID || localStorage.getItem("storeID")
          }
        })
        .then(res => {
          this.checkFileLst = res.Data.CheckFileLst;
          this.haveFoodLicense();
          this.expiryDate[0] = this.checkFileLst[0].Def5;
          this.expiryDate[1] = this.checkFileLst[1].Def5;
          this.Pic = this.checkFileLst;
          this.hasImg = this.Pic[0].FilePath ? true : false;
        });
    },
    //门店详情初始化
    documentTransferInit() {
      this.$ajax
        .documentTransferInit({
          type: "get",
          data: {
            StoreId: this.storeID || localStorage.getItem("storeID")
          }
        })
        .then(res => {
          this.storeListView = res.Data.storeListView;
        });
    },
    //获取图片
    getImgSrc(attachedID) {
      return (
        "http://" +
        location.host +
        "/Pmt/Api/APP/Account/Avatorupload?AttachedID=" +
        attachedID
      );
    },
    //食品经营许可证&政府回执单+承诺书是二选一，如果已经上传食品经营许可证，则不需要上传政府回执单+承诺书；若上传政府回执单+承诺书则后续需要补传食品经营许可证
    haveFoodLicense() {
      if (!!this.checkFileLst[1].FilePath) {
        //已上传食品许可证
        if (!!this.checkFileLst[2].FilePath) {
          //已上传食品许可证,已上传政府回执单+承诺书
          return true;
        } else {
          //已上传食品许可证,未上传政府回执单+承诺书
          this.showFoodLicense = 2;
          return true;
        }
      } else {
        //未上传食品许可证
        if (!!this.checkFileLst[2].FilePath) {
          //未上传食品许可证,已上传政府回执单+承诺书
          this.showFoodLicense = 1
          return true;
        } else {
          //未上传食品许可证,未上传政府回执单+承诺书
          return false;
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
.img-card {
  width: 100%;
  height: 150px;
}
.btn {
  position: absolute;
  top: 0.2rem;
  right: 0.3rem;
  padding: 0.05rem 0.2rem;
  border-radius: 0.06rem;
}
.img-tip {
  width: 30%;
}
.imgTitle {
  width: 100%;
  text-align: center;
  margin-bottom: 0.2rem;
}
</style>
