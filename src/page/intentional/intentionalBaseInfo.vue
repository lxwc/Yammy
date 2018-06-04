<!-- 意向资料-基础信息 -->
<template>
  <div class="c-container">
    <top-header title="基本信息" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseBasic.User_Name" placeholder="请输入姓名" data-tip="请输入姓名" data-type='required' name="User_Name" @change="getIcon($event)">
          <i></i>
        </div>
        <!-- <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" id="sex" class="c-box-flex" @focus="(e)=>{sexSheet=true;e.target.blur();}" v-model="sexArr[FranchiseBasic.Sex]" placeholder="请选择性别" data-tip="请选择性别" data-type='required' name="Sex" @change="getIcon($event)">
          <i ref="sex"></i>
        </div> -->
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" id="birthday" @focus="dateOpen($event)" v-model="FranchiseBasic.Birthday" class="c-box-flex" placeholder="请选择出生日期" name="Birthday" @change="getIcon($event)">
          <i ref="time"></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="FranchiseBasic.Address" placeholder="请输入联系地址" data-tip="请输入联系地址" data-type='required' name="Address" @change="getIcon($event)">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入手机号码" v-model="FranchiseBasic.Mobile" data-tip="请输入手机号码" data-type='phone' name="Mobile" @change="getIcon($event)">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入电子邮箱" v-model="FranchiseBasic.Email" data-tip="请输入电子邮箱" data-type='email' name="Email" @change="getIcon($event)">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入从事行业" v-model="FranchiseBasic.Industry" name="Industry" @change="getIcon($event)">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入公司名称" v-model="FranchiseBasic.CompanyEntity" name="CompanyEntity" @change="getIcon($event)">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入部门" name="Department" v-model="FranchiseBasic.Department" @change="getIcon($event)">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入职位" name="Position" v-model="FranchiseBasic.Position" @change="getIcon($event)">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" placeholder="请输入公司地址" name="CompanyAddress" v-model="FranchiseBasic.CompanyAddress" @change="getIcon($event)">
          <i></i>
        </div>
      </form>
    </div>
    <mt-actionsheet :actions="actions" v-model="sexSheet" cancel-text="">
    </mt-actionsheet>
    <mt-datetime-picker ref="date" class="date" :startDate="startDate" :endDate="endDate" v-model="pickerVisible" @confirm="handleChange" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import w from "../../assets/images/w.svg";
import add from "../../assets/images/add.svg";
import paletteButton from "../../components/paletteButton";
export default {
  data() {
    return {
      btnTxt: "",
      FranchiseBasic: {},
      startDate: new Date("1900-01-01"),
      endDate: new Date(),
      sexArr: ["男", "女"],
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
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getInformation();

    this.btnTxt = this.$showSaveBtn(0, "保存");
  },
  methods: {
    //设置icon状态
    getIcon($event) {
      if (!!$event.target.value) {
        $event.target.previousElementSibling.setAttribute("class", "icon w");
      } else {
        $event.target.previousElementSibling.setAttribute("class", "icon add");
      }
    },
    //选择性别
    sexSelectMan() {
      this.FranchiseBasic.Sex = 0;
      this.changeSelect("sex");
    },
    sexSelectWan() {
      this.FranchiseBasic.Sex = 1;
      this.changeSelect("sex");
    },
    //选择日期
    dateOpen(e) {
      this.$refs.date.open();
      e.target.blur();
    },
    handleChange(v) {
      this.FranchiseBasic.Birthday = this.$formatDate(v);
      this.changeSelect("birthday");
      //   this.$refs.time.setAttribute("class", "right");
    },
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      this.$ajax
        .franchiseBasicSave({
          type: "post",
          data: {
            FranchiseBasic: this.FranchiseBasic
          }
        })
        .then(res => {
          console.log(res.Data);
          if (res.Status === 1) {
            this.$router.push("/intentional/"+this.storeID);
          }
          //this.getInformation();
        });
    },
    //获取初始化信息
    getInformation() {
      this.$ajax
        .getInformation({
          type: "get",
          data: {
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID
          }
        })
        .then(res => {
          console.log(res.Data);
          this.FranchiseBasic = res.Data.FranchiseBasic;
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if (this.FranchiseBasic[v.name]) {
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
<style lang="less">
.date {
  .mint-datetime-action {
    color: #5d7c33;
    font-size: 0.3rem;
    text-align: left;
    margin-left: 0.1rem;
    width: 1rem;
    padding-left: 0.2rem;
  }
  span.mint-datetime-action.mint-datetime-cancel {
    color: #333;
  }
}
</style>



