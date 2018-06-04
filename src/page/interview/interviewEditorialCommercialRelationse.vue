<template>
  <div class="c-container">
    <top-header title="编辑政商关系" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="workInfo.Department" name="Department" data-tip="请输入公司名称及部门" data-type='required' placeholder="请输入公司名称及部门">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入姓名" v-model="workInfo.UserName" data-type="required" data-tip="请输入姓名" name="UserName">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="workInfo.Position" name="Position" data-tip="请输入职位" data-type='required' placeholder="请输入职位">
          <i></i>
        </div>
      </form>
      <div class="p30" v-if="isEdit==1">
        <div class="btn bg-red fs36" @click="deleteWork">删除</div>
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
      workInfo: {},
      ID: this.$route.params.id,
      btnTxt: "",
      FranchiseMeetingInfo: {},
      isEdit: this.$route.params.isEdit,
      userID: this.$route.params.userID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.commercialRelationseDetails();
    this.meetingNegotiationInit();
    this.btnTxt = this.isEdit==1?'保存':'';
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      //保存政商关系
      this.$ajax
        .commercialRelationseSave({
          type: "post",
          data: {
            FranchiseMeetingInfo: {
              MeetingID: this.FranchiseMeetingInfo.MeetingID
            },
            BusinessRelationshipLst: [
              {
                ID: this.ID,
                Department: this.workInfo.Department,
                Position: this.workInfo.Position,
                UserName: this.workInfo.UserName
              }
            ]
          }
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/interviewCommercialRelationse/"+this.isEdit+'/'+this.userID);
          }
        });
    },
    //MeetingID初始化
    meetingNegotiationInit() {
      this.$ajax
        .meetingNegotiationInit({
          type: "get",
          data: {
            User_ID: this.userID
          }
        })
        .then(res => {
          this.FranchiseMeetingInfo = res.Data.FranchiseMeetingInfo;
        });
    },
    //政商关系详情
    commercialRelationseDetails() {
      this.$ajax
        .commercialRelationseDetails({
          type: "get",
          data: {
            ID: this.ID
          }
        })
        .then(res => {
          this.workInfo = res.Data;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if (this.workInfo[v.name]) {
              v.previousElementSibling.setAttribute("class", "icon w");
            } else {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
          });
        });
    },
    //删除政商关系
    deleteWork() {
      this.$ajax
        .CommercialRelationseDelete({
          type: "get",
          data: {
            ID: this.ID
          }
        })
        .then(res => {
          if (res.Status == 1) {
            this.workInfo = {};
            this.$router.push("/interviewCommercialRelationse/"+this.isEdit+'/'+this.userID);
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