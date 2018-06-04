<template>
  <div class="c-container">
    <top-header title="加盟品牌" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" id="brand" v-model="brand" @focus="(e)=> {brandSheet=true;e.target.blur();}" placeholder="选择品牌" name="BrandCode" data-type="required" data-tip="请选择品牌" >
          <i></i>
        </div>
      </form>
    </div>
    <mt-actionsheet :actions="actions" v-model="brandSheet" cancel-text="">
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
      brandSheet: false,
      actions: [],
      posArr: ["否", "是"],
      brandLst: [],
      brand: "",
      Lst: {},
      btnTxt: "",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getFranchise();
    this.btnTxt = this.$showSaveBtn(1, "保存");
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      var model = {
        User_ID: JSON.parse(localStorage.getItem("userInfo")).UserID,
        Lst: [
          {
            BrandCode: this.Lst.BrandCode,
            InformationID: this.Lst.InformationID
          }
        ]
      };
      this.$ajax
        .brandSave({
          type: "post",
          data: model
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/franchiser/"+this.storeID);
          } else {
            Toast("保存失败");
          }
        });
    },
    //设置icon状态
    // getIcon($event) {
    //   if (!!$event.target.value) {
    //     $event.target.previousElementSibling.setAttribute("class", "icon w");
    //   } else {
    //     $event.target.previousElementSibling.setAttribute("class", "icon add");
    //   }
    // },
    //初始化
    getFranchise() {
      this.$ajax
        .getFranchise({
          type: "get",
          data: {
            User_ID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            LoginUser_ID: JSON.parse(localStorage.getItem("userInfo")).UserID
          }
        })
        .then(res => {
          this.brandLst = res.Data.Brandlst;
          this.Lst.InformationID = res.Data.Lst[0].InformationID;

          //品牌的code码与name对照
          this.brandLst.forEach(item => {
            if (item.Dict_Code == res.Data.Lst[0].BrandCode) {
              this.brand = item.Type_Name;
            }
          });

          for (var i = 0; i < this.brandLst.length; i++) {
            var obj = {
              name: this.brandLst[i].Type_Name,
              code: this.brandLst[i].Dict_Code,
              method: this.brandName
            };
            this.actions.push(obj);
          }
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if(res.Data.Lst[0].BrandCode){
              v.previousElementSibling.setAttribute("class", "icon w");
            } else {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
          });
        });
    },
    brandName(v) {
      this.brand = v.name;
      this.Lst.BrandCode = v.code;
      this.changeSelect("brand");
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
</style>
