<template>
  <div class="c-container">
    <top-header title="工作经历" :btn="btnTxt" :callback="submit"></top-header>

    <div class="c-page">
      <div class="p30 mt20">
        <div class="bg-fff border-gray cell pr mb20" v-for="obj in MeetingworkExperienceLst" :key="obj.ID" v-if="!!obj.WorkStartDate">
          <router-link :to="'/interviewEditorialWork/'+obj.ID+'/'+isEdit+'/'+userID">
            <div class="btn-samll gray fs26 bg-green color-fff">{{isEdit==1?'编辑':'查看'}}</div>
          </router-link>
          <div class="date mt15">
            {{obj.WorkStartDate + "~" +(obj.WorkEndDate?obj.WorkEndDate:"至今")}}
          </div>
          <div class="mt15">{{obj.Department}}</div>
          <div class="mt15">{{obj.Position}}</div>
        </div>
      </div>
      <div class="p30" v-if="MeetingworkExperienceLst.length<6 && isEdit==1">
        <router-link :to="'/interviewEditorialWork/0/'+isEdit+'/'+userID">
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
      btnTxt: "",
      MeetingworkExperienceLst: [],
      isEdit: this.$route.params.isEdit,
      userID: this.$route.params.userID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getWorkDetails();
   this.btnTxt = this.isEdit==1?'保存':'';
  },
  methods: {
    //保存
    submit() {
      this.$router.push("/interview/"+this.isEdit+'/'+this.userID);
    },
    //加盟商资料初始化
    getWorkDetails() {
       this.$ajax
        .meetingNegotiationInit({
          type: "get",
          data: {
            User_ID: this.userID
          }
        })
        .then(res => {
         this.MeetingworkExperienceLst = res.Data.MeetingworkExperienceLst;
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
