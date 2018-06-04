<template>
  <div class="c-container">
    <top-header title="图片上传" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <label for="idCard1">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <img class="img-card" v-show="showIdCard" :src="imgSrc1">
          <div v-show="!showIdCard">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard1" accept="image/*" @change="$imgUpload($event,getBondFile)" />
            <span class="ml15 green fs30">请上传加盟金/保证金/迁址费付款凭证</span>
          </div>
        </div>
      </label>

      <label for="idCard2">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <img class="img-card" v-show="showIdCardReverse" :src="imgSrc2">
          <div v-show="!showIdCardReverse">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard2" accept="image/*" @change="$imgUpload($event,getPosFile)" />
            <span class="ml15 green fs30">请上POS机付款凭证</span>
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
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      menuInfo: {},
      uploadList: [],
      showIdCard: false,
      showIdCardReverse: false,
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
    this.btnTxt = this.$showSaveBtn(4,"保存");
  },
  methods: {
    //保存
    submit() {
      this.getSysCommonAttached();
      if(this.uploadList[0].FilePath && this.uploadList[1].FilePath){
        Toast("保存成功");
        this.$router.push("/payment/"+this.storeID);
      }else{
        Toast("请上传图片");
      }
    },
    //获取产证信息文件对象
    getPosFile(file, name) {
      this.$getFile(file, name, 1, res => {
        this.imgSrc2 = "";
        this.showIdCardReverse = false;
        this.avatorUpload(1);
        // location.reload();
      });
    },

    //获取保证金文件对象
    getBondFile(file, name) {
      this.$getFile(file, name, 0, res => {
        this.imgSrc1 = "";
        this.showIdCard= false;
        this.avatorUpload(0);
        // location.reload();
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
          this.menuInfo = res.Data[4];
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
          this.avatorUpload(0);
          this.avatorUpload(1);
        });
    },
    //获取上传图片,在页面展示
    avatorUpload(i) {
      this.$ajax
        .avatorUpload({
          type: "get",
          data: {
            AttachedID: this.uploadList[i].AttachedID
          }
        })
        .then(res => {
          if (res) {
            if (i == 0) {
              this.showIdCard = true;
              this.imgSrc1 = 
                "http://" +
                this.host +
                this.apiPath +
                this.uploadList[i].AttachedID;
            } else if (i == 1) {
              this.showIdCardReverse = true;
              this.imgSrc2 =
                "http://" +
                this.host +
                this.apiPath +
                this.uploadList[i].AttachedID;
            }
         }
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
