<template>
  <div class="c-container">
    <top-header title="图片上传" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <form id="uploadPic" action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" id="businessDate" @focus="businessDate($event)" placeholder="请输入营业执照到期时间" data-tip="请输入营业执照到期时间" v-model="checkFileLst[0].Def5">
          <i></i>
        </div>
        <label for="idCard1">
          <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
            <img class="img-card" v-show="showIdCard0" :src="imgSrc0">
            <div v-show="!showIdCard0">
              <img src="../../assets/images/add.svg" alt="">
              <input type="file" style="display: none;" id="idCard1" accept="image/*" @change="$imgUpload($event,getLicenseFile)" />
              <span class="ml15 green fs30">请上传营业执照</span>
            </div>
          </div>
        </label>
        <div class="c-flex list-cell c-a-c p30 bg-fff mt20">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" id="foodDate" v-model="checkFileLst[1].Def5" @focus="foodDate($event)" placeholder="请输入食品经营许可证到期时间" data-tip="请输入食品经营许可证到期时间">
          <i></i>
        </div>
        <label for="idCard2">
          <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
            <img class="img-card" v-show="showIdCard1" :src="imgSrc1">
            <div v-show="!showIdCard1">
              <img src="../../assets/images/add.svg" alt="">
              <input type="file" style="display: none;" id="idCard2" accept="image/*" @change="$imgUpload($event,getFoodFile)" />
              <span class="ml15 green fs30">请上传食品经营许可证</span>
            </div>
          </div>
        </label>
        <label for="idCard3">
          <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
            <img class="img-card" v-show="showIdCard2" :src="imgSrc2">
            <div v-show="!showIdCard2">
              <img src="../../assets/images/add.svg" alt="">
              <input type="file" style="display: none;" id="idCard3" accept="image/*" @change="$imgUpload($event,getReceiptFile)" />
              <span class="ml15 green fs30">请上传政府回执单+承诺书（未取得食品经营许可证）</span>
            </div>
          </div>
        </label>
        <label for="idCard4">
          <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
            <img class="img-card" v-show="showIdCard3" :src="imgSrc3">
            <div v-show="!showIdCard3">
              <img src="../../assets/images/add.svg" alt="">
              <input type="file" style="display: none;" id="idCard4" accept="image/*" @change="$imgUpload($event,getIDcardFile)" />
              <span class="ml15 green fs30">请上传手持身份证（正面）</span>
            </div>
          </div>
        </label>
        <label for="idCard5">
          <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
            <img class="img-card" v-show="showIdCard4" :src="imgSrc4">
            <div v-show="!showIdCard4">
              <img src="../../assets/images/add.svg" alt="">
              <input type="file" style="display: none;" id="idCard5" accept="image/*" @change="$imgUpload($event,getIDcardReverseFile)" />
              <span class="ml15 green fs30">请上传手持身份证（反面）</span>
            </div>
          </div>
        </label>
        <label for="idCard6">
          <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
            <img class="img-card" v-show="showIdCard5" :src="imgSrc5">
            <div v-show="!showIdCard5">
              <img src="../../assets/images/add.svg" alt="">
              <input type="file" style="display: none;" id="idCard6" accept="image/*" @change="$imgUpload($event,getStoreFile)" />
              <span class="ml15 green fs30">请上传门店照片</span>
            </div>
          </div>
        </label>
        <label for="idCard7">
          <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
            <img class="img-card" v-show="showIdCard6" :src="imgSrc6">
            <div v-show="!showIdCard6">
              <img src="../../assets/images/add.svg" alt="">
              <input type="file" style="display: none;" id="idCard7" accept="image/*" @change="$imgUpload($event,getCommitment)" />
              <span class="ml15 green fs30">请实体经营主体承诺函</span>
            </div>
          </div>
        </label>
      </form>
    </div>
    <mt-datetime-picker ref="date" class="date" v-model="pickerVisible" @confirm="handleChange" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import { Toast } from "mint-ui";
import { Lazyload } from "mint-ui";
export default {
  data() {
    return {
      empty: "",
      pickerVisible: new Date(),
      uploadList: [],
      imgSrc0: "",
      imgSrc1: "",
      imgSrc2: "",
      imgSrc3: "",
      imgSrc4: "",
      imgSrc5: "",
      imgSrc6: "",
      showIdCard0: false,
      showIdCard1: false,
      showIdCard2: false,
      showIdCard3: false,
      showIdCard4: false,
      showIdCard5: false,
      showIdCard6: false,
      host: location.host,
      apiPath: "/Pmt/Api/APP/Account/Avatorupload?AttachedID=",
      btnTxt: "",
      isBusiness: true, //true: 获取营业许可证时间，false : 获取食品许可证时间
      CheckFileLst: [],
      dataUploading: JSON.parse(localStorage.getItem("initData"))[5],
      checkFileLst: [],
      expiryDate: [],
      BusinessLicenseLeader: "",   //营业许可证姓名
      Franchiser: JSON.parse(localStorage.getItem("userInfo")).UserEnName,  //加盟商姓名
      isCommitment: false,
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getdocumentTransferView();
    //this.getSysCommonAttached();
    this.documentTransferInit();
    this.btnTxt = this.$showSaveBtn(5, "保存");
  },
  methods: {
    //保存
    submit() {
      //判断实体经营主体承诺函 是否为必传项 ，加盟商姓名和营业许可证姓名一致时非必传，反则必传
      // var isCommitment = false; true：非必传，false-必传
      if(this.BusinessLicenseLeader == this.Franchiser){
        this.isCommitment = true; 
      } else {
        this.isCommitment = false;
      }
      if (
        !!(this.imgSrc0 &&
        (this.imgSrc1 || this.imgSrc2) &&
        this.imgSrc3 &&
        this.imgSrc4 &&
        this.imgSrc5 &&
        this.checkFileLst[0].Def5 && (this.isCommitment || this.imgSrc6))
      ) {
        this.uploadList[0].Def3 = 1;
        this.uploadList[1].Def3 = 1;
        this.$ajax
          .documentTransferSave({
            type: "post",
            data: {
              functionID: "documentTransfer", //页面id
              PositionID: JSON.parse(localStorage.getItem("userInfo"))
                .PositionID, //岗位idid
              storeListView: {
                StoreId: this.storeID || localStorage.getItem("storeID")
              },
              CheckFileLst: [this.checkFileLst[0], this.checkFileLst[1]]
            }
          })
          .then(res => {
            if (res.Status === 1) {
              Toast("保存成功");
              this.$router.push("/dataUploading/" + this.storeID);
            } else {
              Toast("保存失败");
            }
          });
      } else {
        Toast("请填写完毕");
      }
    },
    //获取营业执照负责人名称
    documentTransferInit() {
      this.$ajax
        .documentTransferInit({
          type: "get",
          data: {
            StoreId: this.storeID || localStorage.getItem("storeID")
          }
        })
        .then(res => {
          this.BusinessLicenseLeader =
            res.Data.storeListView.BusinessLicenseLeader;
        });
    },
    handleChange(v) {
      //选择的日期
      if (this.isBusiness) {
        this.checkFileLst[0].Def5 = this.$formatDate(v);
        this.expiryDate[0] = this.$formatDate(v);
        this.changeSelect("businessDate");
      } else {
        this.checkFileLst[1].Def5 = this.$formatDate(v);
        this.expiryDate[1] = this.$formatDate(v);
        this.changeSelect("foodDate");
      }
    },
    businessDate(e) {
      this.$refs.date.open();
      this.isBusiness = true;
      e.target.blur();
    },
    foodDate(e) {
      this.$refs.date.open();
      this.isBusiness = false;
      e.target.blur();
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
          this.expiryDate[0] = this.checkFileLst[0].Def5;
          this.expiryDate[1] = this.checkFileLst[1].Def5;
          this.uploadList = this.checkFileLst;
          // this.getdocumentTransferView();
          for (var i = 0; i <= 6; i++) {
            if (this.uploadList[i].FilePath) {
              this.avatorUpload(i);
            }
          }
        });
    },
    //获取营业执照文件对象
    getLicenseFile(file, name) {
      this.$getFile(file, name, 0, res => {
        this.imgSrc0 = "";
        this.showIdCard0 = false;
        this.avatorUpload(0);
        // location.reload();
      });
    },
    //获取食品经营许可证文件对象
    getFoodFile(file, name) {
      this.$getFile(file, name, 1, res => {
        this.imgSrc1 = "";
        this.showIdCard1 = false;
        this.avatorUpload(1);
        // location.reload();
      });
    },
    //获取政府回执单+承诺书文件对象
    getReceiptFile(file, name) {
      this.$getFile(file, name, 2, res => {
        this.imgSrc2 = "";
        this.showIdCard2 = false;
        this.avatorUpload(2);
        // location.reload();
      });
    },
    //获取身份证正面文件
    getIDcardFile(file, name) {
      this.$getFile(file, name, 3, res => {
        this.imgSrc3 = "";
        this.showIdCard3 = false;
        this.avatorUpload(3);
        // location.reload();
      });
    },
    //获取身份证反面文件
    getIDcardReverseFile(file, name) {
      this.$getFile(file, name, 4, res => {
        this.imgSrc4 = "";
        this.showIdCard4 = false;
        this.avatorUpload(4);
        // location.reload();
      });
    },
    //获取门店照片文件
    getStoreFile(file, name) {
      this.$getFile(file, name, 5, res => {
        this.imgSrc5 = "";
        this.showIdCard5 = false;
        this.avatorUpload(5);
        // location.reload();
      });
    },
    //实体经营主体承诺函
    getCommitment(file, name) {
      this.$getFile(file, name, 6, res => {
        this.imgSrc6 = "";
        this.showIdCard6 = false;
        this.avatorUpload(6);
        // location.reload();
      });
    },
    //附件初始化
    getSysCommonAttached() {
      this.$ajax
        .getSysCommonAttached({
          type: "get",
          data: {
            PageID: this.dataUploading.Function_ID,
            ItemID: this.storeID || JSON.parse(localStorage.getItem("storeID")),
            KeyID: 0,
            ReadOnly: false
          }
        })
        .then(res => {
          this.uploadList = res.Data;
          this.getdocumentTransferView();
          for (var i = 0; i < 6; i++) {
            if (this.uploadList[i].FilePath) {
              this.avatorUpload(i);
            }
          }
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
              this.showIdCard0 = true;
              this.imgSrc0 =
                "http://" +
                this.host +
                this.apiPath +
                this.uploadList[i].AttachedID;
            } else if (i == 1) {
              this.showIdCard1 = true;
              this.imgSrc1 =
                "http://" +
                this.host +
                this.apiPath +
                this.uploadList[i].AttachedID;
            } else if (i == 2) {
              this.showIdCard2 = true;
              this.imgSrc2 =
                "http://" +
                this.host +
                this.apiPath +
                this.uploadList[i].AttachedID;
            } else if (i == 3) {
              this.showIdCard3 = true;
              this.imgSrc3 =
                "http://" +
                this.host +
                this.apiPath +
                this.uploadList[i].AttachedID;
            } else if (i == 4) {
              this.showIdCard4 = true;
              this.imgSrc4 =
                "http://" +
                this.host +
                this.apiPath +
                this.uploadList[i].AttachedID;
            } else if (i == 5) {
              this.showIdCard5 = true;
              this.imgSrc5 =
                "http://" +
                this.host +
                this.apiPath +
                this.uploadList[i].AttachedID;
            } else if (i == 6) {
              this.showIdCard6 = true;
              this.imgSrc6 =
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
