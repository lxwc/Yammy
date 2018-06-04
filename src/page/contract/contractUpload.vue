<template>
  <div class="c-container">
    <top-header title="图片上传" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <label for="idCard1">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <img class="img-card" v-show="showIdCard" :src="imgSrc1">
          <div v-show="!showIdCard">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard1" accept="image/*" @change="$imgUpload($event,getLeaseFile)" />
            <span class="ml15 green fs30">请上传产证信息图片</span>
          </div>
        </div>
      </label>

      <label for="idCard2">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c" v-for="(img,index) in uploadList" v-if="img.Title=='租赁合同(拍照)'" :key="index">
          <img class="img-card" v-show="showIdCardReverse" :src="imgSrc2[index]" @click="getIndex(index)">
          <div v-show="!showIdCardReverse">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard2" accept="image/*" @change="$imgUpload($event,getProduceFile,index)" />
            <span class="ml15 green fs30">请上传租赁合同图片</span>
          </div>
        </div>
      </label>
      <label for="idCard3">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <div>
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard3" accept="image/*" @change="$imgUpload($event,getProduceFile,-1)" />
            <span class="ml15 green fs30">增加租赁合同图片</span>
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
export default {
  data() {
    return {
      menuInfo: {},
      uploadList: [],
      showIdCard: false,
      showIdCardReverse: false,
      imgSrc1: "",
      imgSrc2: [],
      host: location.host,
      apiPath: "/Pmt/Api/APP/Account/Avatorupload?AttachedID=",
      btnTxt: "",
      storeID: this.$route.params.storeID,
      clickImg: 1
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.franchiseePotarlInit();
    this.btnTxt = this.$showSaveBtn(3, "保存");
  },
  methods: {
    //保存
    submit() {
      if (this.imgSrc1 == "") {
        Toast("请上传产证信息图片");
        return false;
      }
      if (this.imgSrc2.length <= 0) {
        Toast("请上传租赁合同图片");
        return false;
      }
      this.$router.push("/contract/" + this.storeID);
    },

    //获取产证信息文件对象
    getLeaseFile(file, name) {
      this.$getFile(file, name, 0, res => {
        this.imgSrc1 = "";
        this.showIdCard = false;
        this.avatorUpload(0);
      });
    },
    //获取租赁合同文件对象
    getProduceFile(file, name, index) {
      if (index < 0) {
        // index = 1;
        this.uploadList[1].AttachedID = 0;
        this.clickImg = 1;
      }
      this.$getFile(file, name, this.clickImg, res => {
        this.uploadList[this.clickImg] = "";
        this.imgSrc2[this.clickImg] = "";
        this.showIdCardReverse = false;
        this.imgSrcLst(this.uploadList[this.clickImg], this.clickImg);
        this.getSysCommonAttached();
      });
    },
    //获取点击图片的index下表
    getIndex(index){
      this.clickImg = index;
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
            StoreID:
              this.storeID || JSON.parse(localStorage.getItem("storeID")) || 0
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
            ItemID:
              this.storeID || JSON.parse(localStorage.getItem("storeID")),
            KeyID: 0,
            ReadOnly: false
          }
        })
        .then(res => {
          this.uploadList = res.Data;
          this.uploadList.map((item, index) => {
            this.avatorUpload(index);
            this.imgSrcLst(item, index);
          });
        });
    },
    //获取图片列表
    imgSrcLst(img, index) {
      this.imgSrc2[index] =
        "http://" +
        this.host +
        this.apiPath +
        this.uploadList[index].AttachedID;
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
            } else if (i > 0) {
              this.showIdCardReverse = true;
              this.imgSrcLst(this.uploadList[i], i);
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
