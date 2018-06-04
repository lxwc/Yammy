<template>
  <div class="c-container">
    <top-header title="合同审批申请" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <div class="fs30 mt20 mb20">
        <span class="p10 bg-green color-fff mr15">1</span> POS机购置与否
        <div class="border-red ml15 p30">必填</div>
      </div>
      <div class="bg-fff border-gray p20 pr">
        <router-link :to="'/pos/'+storeID">
          <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
        </router-link>
        <div class="c-flex mb15">
          <div>是否购置pos机：</div>
          <div class="c-box-flex ml15">
            {{posArr[model.IsBuyPOS]}}
          </div>
        </div>
      </div>
      <div class="fs30 mt20 mb20">
        <span class="p10 bg-green color-fff mr15">2</span> 图片上传
        <div class="border-red ml15 p30">必填</div>
      </div>
      <div class="bg-fff border-gray p20 pr tc" v-if="!hasImg">
        <router-link :to="'/contractUpload/'+storeID">
          <div class="add-wrap c-flex c-aj-c">
            <img src="../../assets/images/add.svg" alt="">
            <span class="ml15 green fs30">添加图片</span>
          </div>
          <div class="gray mt15">请上传租赁合同、产证信息</div>
        </router-link>
      </div>
      <div v-else class="bg-fff p20 pr" @click="goEdit">
        <label v-for="(img, index) in uploadList" :key="index">
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
      model: {},
      posArr: ["否", "是"],
      menuInfo: {},
      uploadList: [],
      isAllow: 0,
      btnTxt: "",
      hasImg: false,
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.franchiseContractApprovalInit();
    this.btnTxt = this.$showSaveBtn(3, "提交");
  },
  methods: {
    //提交
    submit() {
      var contract = JSON.parse(localStorage.getItem("initData"))[3];
      if (this.isAllow == 2) {
        this.$ajax
          .autoSubmit({
            type: "get",
            data: {
              functionID: contract.Function_ID,
              itemID: this.storeID || JSON.parse(localStorage.getItem("storeID")),
              keyID: contract.taskID ? contract.taskID : "",
              actionID: "btnSubmit",
              flag: "",
              positionID: JSON.parse(localStorage.getItem("userInfo"))
                .PositionID
            }
          })
          .then(res => {
            if (res.Status == 1) {
              this.$moduleStatus();
              this.btnTxt = this.$showSaveBtn(3, "提交");
              Toast("提交成功");
              this.$router.push("/home");
            }
          });
      } else {
        Toast("请填写完毕");
      }
    },
    //初始化
    franchiseContractApprovalInit() {
      this.$ajax
        .franchiseContractApprovalInit({
          type: "get",
          data: {
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            StoreId: this.storeID || JSON.parse(localStorage.getItem("storeID")) || 0
          }
        })
        .then(res => {
          this.model = res.Data.model;
          this.franchiseePotarlInit();
        });
    },
    //获取itemid
    franchiseePotarlInit() {
      this.$ajax
        .franchiseePotarlInit({
          type: "get",
          data: {
            CurrentUserPositionID: JSON.parse(
              localStorage.getItem("userInfo")
            ).PositionID,
            StoreID: this.storeID || JSON.parse(localStorage.getItem("storeID")) || 0
          }
        })
        .then(res => {
          this.menuInfo = res.Data[3];
          this.getSysCommonAttached();
        });
    },
    //附件初始化
    getSysCommonAttached() {
      this.$ajax
        .getSysCommonAttached({
          type: "get",
          data: {
            PageID: this.menuInfo.Function_ID,
            ItemID: this.storeID || JSON.parse(localStorage.getItem("storeID")),
            KeyID: 0,
            ReadOnly: false
          }
        })
        .then(res => {
          this.uploadList = res.Data;
          if(this.uploadList[0].FilePath){
            this.hasImg = true;
          }else{
            this.hasImg = false;
          }
          this.allowSubmit();
        });
    },
    //判断必填项是否填写完毕，是否允许提交数据
    allowSubmit() {
      this.model.IsBuyPOS ? this.isAllow++ : this.isAllow; //模块一：POS机购买
      this.uploadList[0].FilePath && this.uploadList[1].FilePath
        ? this.isAllow++
        : this.isAllow; //模块二：图片上传
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
      if (JSON.parse(localStorage.getItem("initData"))[3].CurrentStatus == 0) {
        this.$router.push("/contractUpload/"+this.storeID);
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
