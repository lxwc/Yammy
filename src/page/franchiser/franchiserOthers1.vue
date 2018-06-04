<!-- 加盟资料- 基本信息 -->
<template>
  <div class="c-container">
    <top-header title="其他出资人1" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="Lst.User_Name" placeholder="请输入姓名" data-tip="请输入姓名" data-type='required' name="User_Name">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" id="sex" @focus="(e)=>{sexSheet=true;e.target.blur();}" v-model="sexArr[Lst.Sex]" placeholder="请选择性别" data-tip="请选择性别" data-type='required' name="Sex">
          <i ref="sex"></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" id="birthday" @focus="dateOpen($event)" v-model="Lst.Birthday" class="c-box-flex" data-tip="请选择出生日期" data-type='required' placeholder="请选择出生日期" name="Birthday">
          <i ref="time"></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="Lst.Native" placeholder="请输入籍贯" data-tip="请输入籍贯" data-type='required' name="Native">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="Lst.IDCard" placeholder="请输身份证号码" data-tip="请输身份证号码" data-type='validateIdentityCardNo' name="IDCard">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="Lst.Address" placeholder="请输入联系地址" data-tip="请输入联系地址" data-type='required' name="Address">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入手机号码" v-model="Lst.Mobile" data-tip="请输入手机号码" data-type='phone' name="Mobile">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入电子邮箱" v-model="Lst.Mail" data-tip="请输入电子邮箱" data-type='email' name="Mail">
          <i></i>
        </div>
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
    <mt-actionsheet :actions="actions" v-model="sexSheet" cancel-text="">
    </mt-actionsheet>
    <mt-datetime-picker ref="date" class="date" :startDate="startDate" :endDate="endDate" v-model="pickerVisible" @confirm="handleChange" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
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
import w from "../../assets/images/w.svg";
import add from "../../assets/images/add.svg";
export default {
  data() {
    return {
      startDate: new Date("1900-01-01"),
      endDate: new Date(),
      actions: [
        {
          name: "男",
          method: this.sexSelectMan
        },
        {
          name: "女",
          method: this.sexSelectWan
        }
      ],
      sexSheet: false,
      pickerVisible: new Date(),
      Lst: {},
      sexArr: ["男", "女"],
      Remark: null,
      btnTxt: "",
      storeID: this.$route.params.storeID,
      dateSlots: [
        {
          flex: 1,
          values: ["大专", "本科", "硕士", "博士", "其他"]
        }
      ],
      educationalPopUP: false,
      eduVal: "",
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getFranchise();
    Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
      this.$form(v);
    });
    this.btnTxt = this.$showSaveBtn(1,"保存");
  },
  methods: {
    //选择性别
    sexSelectMan() {
      this.Lst.Sex = 0;
      this.changeSelect("sex");
    },
    sexSelectWan() {
      this.Lst.Sex = 1;
      this.changeSelect("sex");
    },
    //选择日期
    dateOpen(e) {
      this.$refs.date.open();
      e.target.blur();
    },
    handleChange(v) {
      this.Lst.Birthday = this.$formatDate(v);
      this.changeSelect("birthday");
    },
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      this.Lst.User_ID = JSON.parse(localStorage.getItem("userInfo")).UserID;
      console.log("+++++++",this.Lst);
      this.$ajax
        .franchiseeSave({
          type: "post",
          data: {
            User_ID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            Lst: [this.Lst]
          }
        })
        .then(res => {
          if(res.Status === 1) {
            this.$router.push("/franchiser/"+this.storeID);
          }
        });
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
          this.Lst = res.Data.Lst[1];
          this.Lst.Remark = res.Data.Lst[0].Remark;
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
    },
    onEducationChange(picker, values) {
      this.eduVal = values[0];
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.mask {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.3;
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