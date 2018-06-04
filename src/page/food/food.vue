<template>
  <div class="c-container">
    <top-header title="补传食品经营许可证" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <div class="fs30 mt20 mb20">
        <span class="p10 bg-green color-fff mr15">1</span> 图片上传
        <div class="border-red ml15 p30">必填</div>
      </div>
      <div class="bg-fff border-gray p20 pr tc" v-if="!hasImg">
        <router-link :to="'/foodDetail/'+storeID">
          <div class="add-wrap c-flex c-aj-c">
            <img src="../../assets/images/add.svg" alt="">
            <span class="ml15 green fs30">添加图片</span>
          </div>
          <div class="gray mt15">请上传食品经营许可证</div>
        </router-link>
      </div>
      <div v-else class="bg-fff p20 pr">
        <router-link :to="'/foodDetail/' + storeID">
          <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
        </router-link>
        <label v-for="(img, index) in uploadList" :key="index" class="mt45">
          <div class="c-flex mt20" v-if="index < 2">
            <div class="label">食品许可证到期时间：</div>
            <div class="c-box-flex ml15">
              {{checkFileLst.Def5}}
            </div>
          </div>
          <div class="bg-fff c-flex c-aj-c">
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
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      btnTxt: "",
      isAllow: 0,
      uploadList: [],
      food: JSON.parse(localStorage.getItem("initData"))[6],
      checkFileLst: {},
      hasImg: false,
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getSysCommonAttached();
    this.getdocumentTransferView();
    this.btnTxt = this.$showSaveBtn(6, "提交");
  },
  methods: {
    //保存
    submit() {
      if (this.uploadList[0].FilePath && this.checkFileLst.Def5) {
        this.$ajax
          .autoSubmit({
            type: "get",
            data: {
              functionID: this.food.Function_ID,
              itemID: this.storeID || JSON.parse(localStorage.getItem("storeID")),
              keyID: this.food.taskID ? this.food.taskID : "",
              actionID: "btnSubmit",
              flag: "",
              positionID: JSON.parse(localStorage.getItem("userInfo"))
                .PositionID
            }
          })
          .then(res => {
            if (res.Status == 1) {
              this.$moduleStatus();
              this.btnTxt = this.$showSaveBtn(6, "提交");
              this.$router.push("/home");
              Toast("提交成功");
            } else {
              Toast("提交失败");
            }
          });
      } else {
        Toast("请填写完毕");
      }
    },
    MakeUpFoodBusinessLicenseInit() {
      this.$ajax
        .MakeUpFoodBusinessLicenseInit({
          type: "get",
          data: {
            StoreId: this.storeID || localStorage.getItem("storeID") || 0
          }
        })
        .then(res => {});
    },
    //附件初始化
    getSysCommonAttached() {
      this.$ajax
        .getSysCommonAttached({
          type: "get",
          data: {
            PageID: this.food.Function_ID,
            ItemID: this.storeID || JSON.parse(localStorage.getItem("storeID")),
            KeyID: 0,
            ReadOnly: false
          }
        })
        .then(res => {
          this.uploadList = res.Data;
          this.hasImg = this.uploadList[0].FilePath ? true : false;
        });
    },
    //附件日期初始化
    getdocumentTransferView() {
      this.$ajax
        .getdocumentTransferView({
          type: "get",
          data: {
            PageID: this.food.Function_ID,
            StoreId: this.storeID || localStorage.getItem("storeID")
          }
        })
        .then(res => {
          this.checkFileLst = res.Data.CheckFileLst[0];
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
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
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
.mt45{
  margin-top: .45rem;
}
</style>
