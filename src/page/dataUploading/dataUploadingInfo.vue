<template>
  <div class="c-container">
    <top-header title="门店详情" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" id="planDate" class="c-box-flex" v-model="storeListView.PlanDate" name="PlanDate" data-tip="请输入预计开业日期" data-type='required' placeholder="请输入预计开业日期" @focus="dateOpen($event)">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="storeListView.BusinessLicenseLeader" name="BusinessLicenseLeader" data-tip="请输入营业执照负责人" data-type='required' placeholder="请输入营业执照负责人">
          <i></i>
        </div>
      </form>
    </div>
    <mt-datetime-picker ref="date" class="date" v-model="pickerVisible" @confirm="handleChange" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :startDate="startDate" :endDate="endDate">
    </mt-datetime-picker>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
export default {
  data() {
    return {
      startDate: new Date("1900-01-01"),
      endDate: new Date("2800-12-12"),
      pickerVisible: new Date(),
      btnTxt: "",
      storeListView: {},
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.documentTransferInit();
    this.btnTxt = this.$showSaveBtn(5, "保存");
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      this.$ajax
        .saveStoreBasicInfoView({
          type: "post",
          data: {
            StoreId: this.storeID || localStorage.getItem("storeID"),
            PlanDate: this.storeListView.PlanDate,
            BusinessLicenseLeader: this.storeListView.BusinessLicenseLeader
          }
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/dataUploading/" + this.storeID);
          }
        });
    },
    //页面初始化
    documentTransferInit() {
      this.$ajax
        .documentTransferInit({
          type: "get",
          data: {
            StoreId: this.storeID || localStorage.getItem("storeID")
          }
        })
        .then(res => {
          this.storeListView = res.Data.storeListView;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if (this.storeListView[v.name]) {
              v.previousElementSibling.setAttribute("class", "icon w");
            } else {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
          });
        });
    },
    //选择日期
    dateOpen(e) {
      this.$refs.date.open();
      e.target.blur();
    },
    handleChange(v) {
      this.storeListView.PlanDate = this.$formatDate(v);
      this.changeSelect("planDate");
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.btn {
  line-height: 0.96rem;
  border-radius: 0.1rem;
  color: #fff;
  line-height: 0.96rem;
  margin-top: 0.3rem;
  text-align: center;
}
</style>
<style lang="less">
.date {
  .mint-datetime-action {
    color: #5d7c33;
    font-size: 0.3rem;
    text-align: left;
    margin-left: .1rem;
    width: 1rem;
    padding-left: .2rem
  }
  span.mint-datetime-action.mint-datetime-cancel {
    color: #333;
  }
}
</style>