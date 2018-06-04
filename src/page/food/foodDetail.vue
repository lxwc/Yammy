<template>
  <div class="c-container">
    <top-header title="图片上传" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page p30">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="storeListView.Def5" @focus="dateOpen($event)" placeholder="请输入食品经营许可证到期时间" data-tip="请输入食品经营许可证到期时间">
          <i></i>
        </div>
        <label for="idCard1">
          <div class="img-cell border-gray bg-fff mt20 c-flex c-aj-c">
            <img class="img-card" v-show="showIdCard" :src="imgSrc1">
            <div v-show="!showIdCard">
              <img src="../../assets/images/add.svg" alt="">
              <input type="file" style="display: none;" id="idCard1" accept="image/*" @change="$imgUpload($event,getFoodFile)" />
              <span class="ml15 green fs30">请上传食品经营许可证</span>
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
export default {
  data() {
    return {
      pickerVisible: new Date(),
      storeListView: {},
      uploadList: [],
      showIdCard: false,
      imgSrc1: "",
      host: location.host,
      apiPath: "/Pmt/Api/APP/Account/Avatorupload?AttachedID=",
      btnTxt: "",
      food: JSON.parse(localStorage.getItem("initData"))[6],
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getSysCommonAttached();
    this.getdocumentTransferView();
    this.btnTxt = this.$showSaveBtn(6, "保存");
  },
  methods: {
    //提交
    submit() {
      var model = {
        functionID: JSON.parse(localStorage.getItem("initData"))[6]
          .Function_ID,
        PositionID: JSON.parse(localStorage.getItem("userInfo")).PositionID,
        storeListView: {
          StoreId: this.storeID || JSON.parse(localStorage.getItem("storeID"))
        },
        CheckFileLst: [this.storeListView]
      };
      if (this.storeListView.Def5 && this.imgSrc1) {
        this.$ajax
          .MakeUpFoodBusinessLicense({
            type: "post",
            data: model
          })
          .then(res => {
            if (res.Status == 1) {
              Toast("保存成功");
              this.$router.push("/food/" + this.storeID);
            }else{
              Toast("保存失败");
            }
          });
      } else {
        Toast("请填写完整");
      }
    },

    handleChange(v) {
      this.storeListView.Def5 = this.$formatDate(v);
    },
    //获取门店照片文件
    getFoodFile(file, name) {
      this.$getFile(file, name, 0, res => {
        this.imgSrc1 = "";
        this.showIdCard = false;
        this.avatorUpload(0);
        // location.reload();
      });
    },
    //附件日期初始化
    getdocumentTransferView(){
      this.$ajax.getdocumentTransferView({
        type: "get",
        data: {
          PageID: JSON.parse(localStorage.getItem("initData"))[6].Function_ID,
          StoreId: this.storeID || localStorage.getItem("storeID")
        }
      }).then( res => {
        this.storeListView = res.Data.CheckFileLst[0]; 
        this.storeListView.Def5 = this.storeListView.Def5? this.storeListView.Def5 : "";
      });
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
          this.avatorUpload(0);
        });
    },
    dateOpen(e) {
      this.$refs.date.open();
      e.target.blur();
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
