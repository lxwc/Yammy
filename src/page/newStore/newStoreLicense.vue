<template>
  <div class="c-container">
    <top-header title="营业执照办理" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.BusinessLicenseName" @focus="(e)=>{licenseSheet=true;e.target.blur();}" placeholder="营业执照办理" data-type="required" name="BusinessLicenseName" data-tip="请选择营业执照办理" id="BusinessLicenseName">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" id="businessLicenseRemark" class="c-box-flex" v-model="YM_StoretInfo.BusinessLicenseRemark" placeholder="若选择其他请填写（非必填）" data-type="required" name="BusinessLicenseRemark" @change="otherSelectInput($event)">
          <i></i>
        </div>
      </form>
    </div>
    <mt-actionsheet :actions="actions" v-model="licenseSheet" cancel-text="">
    </mt-actionsheet>
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
      licenseSheet: false,
      YM_StoretInfo: {},
      actions: [],
      btnTxt: "",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.storeSiteEvaluationInit();
    this.btnTxt = this.$showSaveBtn(2, "保存");
  },
  methods: {
    //保存
    submit() {
      if (
        this.YM_StoretInfo.BusinessLicenseName == "其他" &&
        !this.YM_StoretInfo.BusinessLicenseRemark
      ) {
        Toast("若选择其他请填写");
        document
        .getElementById("businessLicenseRemark")
        .nextElementSibling.setAttribute("class", "error");
      document
        .getElementById("businessLicenseRemark")
        .previousElementSibling.setAttribute("class", "icon add");
        return false;
      }
      if (
        this.YM_StoretInfo.BusinessLicenseName == "其他" &&
        this.YM_StoretInfo.BusinessLicenseRemark
      ) {
        this.changeSelect("businessLicenseRemark");
      }
      var model = {
        PositionID: JSON.parse(localStorage.getItem("userInfo")).PositionID,
        KeyID: 0,
        IsDCZL: "",
        YM_StoreBasicInfo: "",
        YM_StoretInfo: this.YM_StoretInfo
      };
      this.$ajax
        .SaveBusinessLicense({
          type: "post",
          data: model
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/newStore/" + this.storeID);
          }
        });
    },
    licenseSelect(v) {
      this.YM_StoretInfo.BusinessLicenseName = v.name;
      this.YM_StoretInfo.BusinessLicenseCode = v.code;
      this.changeSelect("BusinessLicenseName");
    },
    //选项样式调整
    changeSelect(id) {
      document
        .getElementById(id)
        .nextElementSibling.setAttribute("class", "right");
      document
        .getElementById(id)
        .previousElementSibling.setAttribute("class", "icon w");
    },
    otherSelectInput(e){
      console.log(">>>>>>>==",e);
    },
    storeSiteEvaluationInit() {
      this.$ajax
        .storeSiteEvaluationInit({
          type: "get",
          data: {
            StoreID: localStorage.getItem("storeID") || 0,
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            PositionID: JSON.parse(localStorage.getItem("userInfo"))
              .PositionID
          }
        })
        .then(res => {
          this.YM_StoretInfo = res.Data.YM_StoretInfo;
          //初始化时，获取营业执照的办理方法列表
          var lst = res.Data.BusinessLicenselst;
          for (var i = 0; i < lst.length; i++) {
            var obj = {
              name: lst[i].Type_Name,
              code: lst[i].Dict_Code,
              method: this.licenseSelect
            };
            this.actions.push(obj);
          }
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if (this.YM_StoretInfo[v.name]) {
              v.previousElementSibling.setAttribute("class", "icon w");
            } else {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
</style>
