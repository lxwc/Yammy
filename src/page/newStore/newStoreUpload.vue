<template>
  <div class="c-container">
    <top-header title="附件列表" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <label for="idCard1">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <img class="img-card" v-show="showImg1" :src="imgSrc1">
          <div v-show="!showImg1">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard1" accept="image/*" @change="$imgUpload($event,StoreFront)" />
            <span class="ml15 green fs30">请上传店铺正面</span>
          </div>
        </div>
        <div class="mt20">店铺正面参考范例：</div>
        <div class="img-cell border-gray bg-fff  c-flex c-aj-c">
          <img class="img-card" src="../../assets/images/template/StoreFront.jpg">
        </div>
      </label>

      <label for="idCard2">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <img class="img-card" v-show="showImg2" :src="imgSrc2">
          <div v-show="!showImg2">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard2" accept="image/*" @change="$imgUpload($event,StoreProspect)" />
            <span class="ml15 green fs30">请上传店铺远景</span>
          </div>
        </div>
        <div class="mt20">店铺远景参考范例：</div>
        <div class="img-cell border-gray bg-fff  c-flex c-aj-c">
          <img class="img-card" src="../../assets/images/template/StoreProspect.jpg">
        </div>
      </label>
      <label for="idCard3">
        <div class="img-cell border-gray bg-fff mt30 c-flex c-aj-c">
          <img class="img-card" v-show="showImg3" :src="imgSrc3">
          <div v-show="!showImg3">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard3" accept="image/*" @change="$imgUpload($event,StoreCloseFront)" />
            <span class="ml15 green fs30">请上传近景正面</span>
          </div>
        </div>
        <div class="mt20">近景正面参考范例：</div>
        <div class="img-cell border-gray bg-fff  c-flex c-aj-c">
          <img class="img-card" src="../../assets/images/template/StoreCloseFront.jpg">
        </div>
      </label>
      <label for="idCard4">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <img class="img-card" v-show="showImg4" :src="imgSrc4">
          <div v-show="!showImg4">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard4" accept="image/*" @change="$imgUpload($event,StoreCloseLeft)" />
            <span class="ml15 green fs30">请上传近景左面</span>
          </div>
        </div>
        <div class="mt20">近景左面参考范例：</div>
        <div class="img-cell border-gray bg-fff  c-flex c-aj-c">
          <img class="img-card" src="../../assets/images/template/StoreCloseLeft.jpg">
        </div>
      </label>
      <label for="idCard5">
        <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
          <img class="img-card" v-show="showImg5" :src="imgSrc5">
          <div v-show="!showImg5">
            <img src="../../assets/images/add.svg" alt="">
            <input type="file" style="display: none;" id="idCard5" accept="image/*" @change="$imgUpload($event,StoreCloseRigth)" />
            <span class="ml15 green fs30">请上传近景右面</span>
          </div>
        </div>
        <div class="mt20">近景右面参考范例：</div>
        <div class="img-cell border-gray bg-fff  c-flex c-aj-c">
          <img class="img-card" src="../../assets/images/template/StoreCloseRigth.jpg">
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
      showImg1: false,
      showImg2: false,
      showImg3: false,
      showImg4: false,
      showImg5: false,
      attachedID: null,
      imgSrc1: "",
      imgSrc2: "",
      imgSrc3: "",
      imgSrc4: "",
      imgSrc5: "",
      host: location.host,
      apiPath: "/Pmt/Api/APP/Account/Avatorupload?AttachedID=",
      btnTxt: "",
      newStore: JSON.parse(localStorage.getItem("initData"))[2],
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getSysCommonAttached();
    this.btnTxt = this.$showSaveBtn(2, "保存");
    if (this.btnTxt == "") {
      //document.getElementsByTagName("input").removeAttrubute("change");
    }
  },
  methods: {
    //保存
    submit() {
      if (!this.imgSrc1) {
        Toast("请上传店铺正面");
        return false;
      }
      if (!this.imgSrc2) {
        Toast("请上传店铺远景");
        return false;
      }
      if (!this.imgSrc3) {
        Toast("请上传近景正面");
        return false;
      }
      if (!this.imgSrc4) {
        Toast("请上传近景左面");
        return false;
      }
      if (!this.imgSrc5) {
        Toast("请上传近景右面");
        return false;
      }
      this.$router.push("/newStore/"+this.storeID);
    },

    //附件初始化
    getSysCommonAttached() {
      this.$ajax
        .getSysCommonAttached({
          type: "get",
          data: {
            PageID: this.newStore.Function_ID,
            ItemID: this.storeID || 0,
            KeyID: 0,
            ReadOnly: false
          }
        })
        .then(res => {
          this.uploadList = res.Data;
          this.avatorUpload(0, this.uploadList[0].AttachedID);
          this.avatorUpload(1, this.uploadList[1].AttachedID);
          this.avatorUpload(2, this.uploadList[2].AttachedID);
          this.avatorUpload(3, this.uploadList[3].AttachedID);
          this.avatorUpload(4, this.uploadList[4].AttachedID);
        });
    },

    //获取上传图片,在页面展示
    avatorUpload(i, attachedID) {
      // alert("3、已在加载图片的方法里");
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
              this.imgSrc1 = "http://" + this.host + this.apiPath + attachedID;
              if (this.imgSrc1) {
                this.showImg1 = true;
              }
            } else if (i == 1) {
              this.imgSrc2 = "http://" + this.host + this.apiPath + attachedID;
              if (this.imgSrc2) {
                this.showImg2 = true;
              }
            } else if (i == 2) {
              this.imgSrc3 = "http://" + this.host + this.apiPath + attachedID;
              if (this.imgSrc3) {
                this.showImg3 = true;
              }
            } else if (i == 3) {
              this.imgSrc4 = "http://" + this.host + this.apiPath + attachedID;
              if (this.imgSrc4) {
                this.showImg4 = true;
              }
            } else if (i == 4) {
              this.imgSrc5 = "http://" + this.host + this.apiPath + attachedID;
              if (this.imgSrc5) {
                this.showImg5 = true;
              }
            }
          }
        });
    },

    //店铺正面正面
    StoreFront(file, name) {
      this.$getFile(file, name, 0, res => {
        this.imgSrc1 = "";
        this.showImg1 = false;
        this.avatorUpload(0, res.AttachedID);
        // location.reload();
      });
    },
    //店铺远景
    StoreProspect(file, name) {
      this.$getFile(file, name, 1, res => {
        this.imgSrc2 = "";
        this.showImg2 = false;
        this.avatorUpload(1, res.AttachedID);
        // location.reload();
      });
    },
    //近景正面
    StoreCloseFront(file, name) {
      this.$getFile(file, name, 2, res => {
        this.imgSrc3 = "";
        this.showImg3 = false;
        this.avatorUpload(2, res.AttachedID);
        // location.reload();
      });
    },
    //近景左面
    StoreCloseLeft(file, name) {
      this.$getFile(file, name, 3, res => {
        this.imgSrc4 = "";
        this.showImg4 = false;
        this.avatorUpload(3, res.AttachedID);
        // location.reload();
      });
    },
    //近景右面
    StoreCloseRigth(file, name) {
      this.$getFile(file, name, 4, res => {
        this.imgSrc5 = "";
        this.showImg5 = false;
        this.avatorUpload(4, res.AttachedID);
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
