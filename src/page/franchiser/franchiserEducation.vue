<template>
  <div class="c-container">
    <top-header title="编辑教育经历" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="Lst.GraduatedSchool" name="GraduatedSchool" placeholder="请输入毕业院校名称" data-tip="请输入毕业院校名称" data-type='required'>
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="Lst.Profession" name="Profession" placeholder="请输入所学专业" data-tip="请输入所学专业" data-type='required'>
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" id="education" v-model="Lst.Education" name="Education" @focus="selectEducation($event)" placeholder="请选择学历" data-tip="请选择学历" data-type='required'>
          <i></i>
        </div>
      </form>
    </div>
    <div class="mask c-fixed" v-if="educationalPopUP" @click="educationalPopUP=false"></div>
    <div class="city-wrap c-fixed bg-fff" v-if="educationalPopUP">
      <div class="fs30 btn f-left" @click="cancelBtn">取消</div>
      <div class="green fs30 btn f-right" @click="confirmBtn">确认</div>
      <div class="page-picker-wrapper c-flex">
        <div class="c-box-flex">
          <mt-picker :slots="dateSlots" @change="onEducationChange" :visible-item-count="5"></mt-picker>
        </div>
      </div>
    </div>
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
      btnTxt: "",
      educationSheet: false,
      educationalPopUP: false,
      Lst: {},
      dateSlots: [
        {
          flex: 1,
          values: ["大专", "本科", "硕士", "博士", "其他"]
        }
      ],
      temporary: "",
      eduVal: "",
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
      this.Lst.User_ID = JSON.parse(localStorage.getItem("userInfo")).UserID;
      this.$ajax
        .educationalSave({
          type: "post",
          data: {
            User_ID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            Lst: [this.Lst]
          }
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/franchiser/"+this.storeID);
          } else {
            Toast("保存失败");
          }
        });
    },
    onEducationChange(picker, values) {
      //this.Lst.Education = values[0];
      this.eduVal = values[0];
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
          this.temporary = this.Lst.Education;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if (this.Lst[v.name]) {
              v.previousElementSibling.setAttribute("class", "icon w");
            } else {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
          });
        });
    },
    confirmBtn() {
      this.educationalPopUP = false;
      this.Lst.Education = this.eduVal;
      this.changeSelect("education");
    },
    cancelBtn() {
      this.educationalPopUP = false;
    },
    selectEducation(e) {
      this.educationalPopUP = true;
      e.target.blur();
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.city-wrap {
  left: 0;
  bottom: 0;
  z-index: 10;
  .f-left {
    float: left;
    padding-left: 0.3rem;
  }
  .f-right{
    float: right;
  }
  .btn {
    position: relative;
    z-index: 11;
    line-height: 0.8rem;
    text-align: right;
    padding-right: 0.3rem;
  }
}
.mask {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.3;
}
</style>
