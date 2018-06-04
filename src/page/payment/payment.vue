<template>
  <div class="c-container">
    <top-header title="付款凭证上传" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <div class="fs30 mt20 mb20">
        <span class="p10 bg-green color-fff mr15">1</span> 图片上传
        <div class="border-red ml15 p30">必填</div>
      </div>
      <div class="bg-fff border-gray p20 pr tc" v-if="!hasImg">
        <router-link :to="'/paymentVoucher/'+storeID">
          <div class="add-wrap c-flex c-aj-c">
            <img src="../../assets/images/add.svg" alt="">
            <span class="ml15 green fs30">添加图片</span>
          </div>
          <div class="gray mt15">请上传付款凭证</div>
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
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      btnTxt: "",
      Pic: [],
      hasImg: false,
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.paymentVoucherInit();
    this.getSysCommonAttached();
    this.btnTxt = this.$showSaveBtn(4, "提交");
  },
  methods: {
    //保存
    submit() {
      var payment = JSON.parse(localStorage.getItem("initData"))[4];
      console.log(
        "this.Pic[0].FilePath = === ",
        this.Pic[0].FilePath,
        this.Pic[1].FilePath
      );
      if (this.Pic[0].FilePath && this.Pic[1].FilePath) {
        this.$ajax
          .autoSubmit({
            type: "get",
            data: {
              functionID: payment.Function_ID,
              itemID: this.storeID || JSON.parse(localStorage.getItem("storeID")),
              keyID: payment.taskID ? payment.taskID : "",
              actionID: "btnSubmit",
              flag: "",
              PositionID: JSON.parse(localStorage.getItem("userInfo"))
                .PositionID
            }
          })
          .then(res => {
            if (res.Status == 1) {
              this.btnTxt = this.$showSaveBtn(4, "提交");
              Toast("提交成功");
              this.$router.push("/home");
            } else {
              Toast("提交失败");
            }
          });
      } else {
        Toast("请填写完毕");
      }
    },
    paymentVoucherInit() {
      this.$ajax
        .paymentVoucherInit({
          type: "get",
          data: {
            StoreId: this.storeID || localStorage.getItem("storeID") || 0
          }
        })
        .then(res => {});
    },
    //获取图片数据
    getSysCommonAttached() {
      this.$ajax
        .getSysCommonAttached({
          type: "get",
          data: {
            PageID: JSON.parse(localStorage.getItem("initData"))[4]
              .Function_ID,
            ItemID: this.storeID || localStorage.getItem("storeID"),
            KeyID: 0,
            ReadOnly: false
          }
        })
        .then(res => {
          this.Pic = res.Data;
          this.hasImg = this.Pic[0].FilePath ? true : false;
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
    //前往编辑图片页面
    goEdit() {
      if (JSON.parse(localStorage.getItem("initData"))[4].CurrentStatus == 0) {
        this.$router.push("/paymentVoucher/"+this.storeID);
      }
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
</style>
