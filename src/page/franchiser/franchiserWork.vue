<template>
  <div class="c-container">
    <top-header title="工作经历" :btn="btnTxt" :callback="submit"></top-header>

    <div class="c-page">
      <div class="p30 mt20">
        <div class="bg-fff border-gray cell pr mb20" v-for="obj in Lst.children" :key="obj.ID" v-if="obj.WorkStartDate">
          <router-link :to="'/franchiserEditorialWork/'+obj.ID + '/'+obj.InformationID+'/'+storeID">
            <div class="btn-samll gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
          </router-link>
          <div class="date mt15">
            {{obj.WorkStartDate + "~" +(obj.WorkEndDate?obj.WorkEndDate:"至今")}}
          </div>
          <div class="mt15">{{obj.Department}}</div>
          <div class="mt15">{{obj.Position}}</div>
        </div>
      </div>
      <div class="p30" v-if="workLimit<6&&!!btnTxt">
        <router-link :to="'/franchiserEditorialWork/0/'+Lst.InformationID+'/'+storeID">
          <div class="btn bg-green fs36">添加工作经历</div>
        </router-link>
      </div>
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
      Lst: {},
      btnTxt: "",
      storeID: this.$route.params.storeID,
      workLimit: 0
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getFranchise();
    this.btnTxt = this.$showSaveBtn(1,"保存");
  },
  methods: {
    //保存
    submit() {
      this.$router.push("/franchiser/"+this.storeID);
    },
    //加盟商资料初始化
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
          this.Lst = res.Data.Lst[0];
          this.workLimit = this.Lst.children.length;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.cell {
  border: 1px solid #ddd;
  border-radius: 0.1rem;
  padding: 0.7rem 0.2rem 0.2rem 0.2rem;
}
.btn-samll {
  position: absolute;
  top: 0.2rem;
  right: 0.3rem;
  padding: 0.05rem 0.2rem;
  border-radius: 0.06rem;
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
