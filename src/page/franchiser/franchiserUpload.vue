<template>
  <div class="c-container">
    <top-header title="图片上传" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <label for="idCard1">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <img class="img-card" v-show="showIdCard" :src="imgSrc1">
          <div v-show="!showIdCard">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard1" accept="image/*" @change="$imgUpload($event,IDCard)" />
            <span class="ml15 green fs30">请上传身份证正面</span>
          </div>

        </div>
      </label>

      <label for="idCard2">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <img class="img-card" v-show="showIdCardReverse" :src="imgSrc2">
          <div v-show="!showIdCardReverse">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard2" accept="image/*" @change="$imgUpload($event,IDCardReverse)" />
            <span class="ml15 green fs30">请上传身份证反面</span>
          </div>
        </div>
      </label>
    </div>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      uploadList: [],
      showIdCard: false,
      showIdCardReverse: false,
      attachedID: null,
      imgSrc1: "",
      imgSrc2: "",
      host: location.host,
      apiPath: "/Pmt/Api/APP/Account/Avatorupload?AttachedID=",
      btnTxt: "",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.franchiseePotarlInit();
    this.btnTxt = this.$showSaveBtn(1, "保存");
    if (this.btnTxt == "") {
      //document.getElementsByTagName("input").removeAttrubute("change");
    }
  },
  methods: {
    //保存
    submit() {
      if (!this.imgSrc1) {
        Toast("请上传身份证正面");
        return false;
      }
      if (!this.imgSrc2) {
        Toast("请上传身份证反面");
        return false;
      }
      this.$router.push("/franchiser/" + this.storeID);
    },

    //附件初始化
    getSysCommonAttached() {
      this.$ajax
        .getSysCommonAttached({
          type: "get",
          data: {
            PageID: "InformationFranchisee",
            ItemID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            KeyID: 0,
            ReadOnly: false
          }
        })
        .then(res => {
          this.uploadList = res.Data;
          this.avatorUpload(0, this.uploadList[0].AttachedID);
          this.avatorUpload(1, this.uploadList[1].AttachedID);
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
    //获取上传图片,在页面展示
    avatorUpload(i, attachedID) {
      this.$ajax
        .avatorUpload({
          type: "get",
          data: {
            AttachedID: attachedID
          }
        })
        .then(res => {
          if (res) {
            if (i == 0) {
              this.imgSrc1 = "";
              this.imgSrc1 =
                //"http://47.104.84.80:8081/Pmt/Api/APP/Account/Avatorupload?AttachedID=" +
                "http://" + this.host + this.apiPath + attachedID;
              if (this.imgSrc1) {
                this.showIdCard = true;
              }
            } else if (i == 1) {
              this.showIdCardReverse = true;
              this.imgSrc2 =
                //"http://47.104.84.80:8081/Pmt/Api/APP/Account/Avatorupload?AttachedID=" +
                "http://" + this.host + this.apiPath + attachedID;
            }
          }
        });
    },

    //身份证正面
    IDCard(file, name) {
      this.$getFile(file, name, 0, res => {
        this.imgSrc1 = "";
        this.showIdCard = false;
        this.avatorUpload(0, res.AttachedID);
        // location.reload();
      });
    },
    //身份证反面
    IDCardReverse(file, name) {
      this.$getFile(file, name, 1, res => {
        this.imgSrc2 = "";
        this.showIdCardReverse = false;
        this.avatorUpload(1, res.AttachedID);
        // location.reload();
      });
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
  height: 100%;
}
.img-cell {
  width: 100%;
  height: 3rem;
  div img {
    width: 1rem;
    height: 1rem;
  }
}
</style>
