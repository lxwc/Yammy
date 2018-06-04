<template>
  <div class="c-container">
    <top-header title="编辑合同详情" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" id="pos" class="c-box-flex" v-model="posArr[model.IsBuyPOS]" @focus="(e)=>{posSheet=true;e.target.blur();}" placeholder="是否购置pos机" name="IsBuyPOS" data-type="required" data-tip="请选择是否购置POS机">
          <i></i>
        </div>
      </form>
    </div>
    <mt-actionsheet :actions="actions" v-model="posSheet" cancel-text="">
    </mt-actionsheet>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
export default {
  data() {
    return {
      posSheet: false,
      actions: [
        {
          name: "是",
          method: this.pos
        },
        {
          name: "否",
          method: this.pos
        }
      ],
      posArr: ["否", "是"],
      model: {},
      ISDCZL: false,
      UserID: null,
      UserName: "",
      btnTxt: "",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.franchiseContractApprovalInit();
    this.btnTxt = this.$showSaveBtn(3, "保存");
  },
  methods: {
    //保存
    submit() {
      console.log(
        JSON.stringify({
          UserName: JSON.parse(localStorage.getItem("userInfo")).UserName,
          UserID: JSON.parse(localStorage.getItem("userInfo")).UserID,
          ISDCZL: this.ISDCZL,
          model: this.model
        })
      );
      this.$ajax
        .franchiseContractApprovalSave({
          type: "post",
          data: {
            UserName: JSON.parse(localStorage.getItem("userInfo")).UserName,
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            ISDCZL: this.ISDCZL,
            model: this.model
          }
        })
        .then(res => {
          if(res.Status === 1){
            this.$router.push("/contract/" + this.storeID);
          }
        });
    },
    pos(v) {
      if (v.name == "是") {
        this.model.IsBuyPOS = 1;
      } else {
        this.model.IsBuyPOS = 0;
      }
      this.changeSelect("pos");
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
          this.model.StoreId = this.storeID || JSON.parse(localStorage.getItem("storeID"));
          this.UserName = res.Data.UserName;
          this.UserID = res.Data.UserID;
          this.ISDCZL = res.Data.ISDCZL;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if(this.model[v.name]){
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
