<template>
  <div class="c-container">
    <top-header title="编辑工作经历" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="workInfo.Department" name="Department" data-tip="请输入公司名称及部门" data-type='required' placeholder="请输入公司名称及部门">
          <i></i>
        </div>
        <!-- <div class="c-flex list-cell c-a-c p30 bg-fff">
					<div class="icon add"></div>
					<input type="text" class="c-box-flex" placeholder="请输入部门">
					<i></i>
				</div> -->
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="workInfo.Position" name="Position" data-tip="请输入职位" data-type='required' placeholder="请输入职位">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" id="startDate" v-model="workInfo.WorkStartDate" name="WorkStartDate" data-tip="请选择入职时间" data-type='required' @focus="(e)=>{$refs.date1.open();e.target.blur();}" class="c-box-flex" placeholder="请选择入职时间">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" id="endDate" v-model="workInfo.WorkEndDate" name="WorkEndDate" data-tip="请选择离职时间"  @focus="(e)=>{$refs.date2.open();e.target.blur();enterOrNot(e,'required')}" class="c-box-flex" placeholder="请选择离职时间(不填表示至今)">
          <i></i>
        </div>
      </form>
      <div class="p30" v-if="!!btnTxt">
        <div class="btn bg-red fs36" @click="deleteWork">删除</div>
      </div>
    </div>
    <mt-datetime-picker ref="date1" class="date" :startDate="startDate" :endDate="endDate" v-model="pickerVisible" @confirm="WorkStartDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <mt-datetime-picker ref="date2" :startDate="startDate" :endDate="endDate" class="date" v-model="pickerVisible" @confirm="WorkEndDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value}日">
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
      endDate: new Date(),
      pickerVisible: new Date(),
      Lst: {},
      workInfo: {},
      informationID: null,
      ID: this.$route.params.id,
      btnTxt: "",
      storeID: this.$route.params.storeID,
      isToDay: false
    };
  },
  components: {
    topHeader,
    paletteButton
  },
  mounted() {
    this.ID = this.$route.params.id;
    this.informationID = this.$route.params.informationID;
    this.informationFranchiseeDetail();

    this.btnTxt = this.$showSaveBtn(1, "保存");
    //this.$today();
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      // if(this.workInfo.WorkEndDate=="至今"){
      //   this.workInfo.WorkEndDate = "";
      // }
      this.$ajax
        .workExperienceSave({
          type: "post",
          data: {
            ID: this.ID,
            InformationID: this.informationID,
            Department: this.workInfo.Department,
            Position: this.workInfo.Position,
            WorkStartDate: this.workInfo.WorkStartDate,
            WorkEndDate: this.workInfo.WorkEndDate
          }
        })
        .then(res => {
          this.ID = res.Data.ID;
          if (res.Status === 1) {
            this.$router.push("/franchiserWork/" + this.storeID);
          }
        });
    },
    WorkStartDate(v) {
      this.$set(this.workInfo, "WorkStartDate", this.$formatDate(v));
      this.changeSelect("startDate");
    },
    WorkEndDate(v) {
      if (this.isToDay) {
        this.$set(this.workInfo, "WorkEndDate", "至今");
      } else {
        this.$set(this.workInfo, "WorkEndDate", this.$formatDate(v));
      }
      this.changeSelect("endDate");
    },
    //工作经历详情
    informationFranchiseeDetail() {
      this.$ajax
        .informationFranchiseeDetail({
          type: "get",
          data: {
            ID: this.ID
          }
        })
        .then(res => {
          this.workInfo = res.Data;
          // if (this.workInfo.WorkEndDate == "至今") {
          //   this.isToDay = true;
          // } else {
          //   this.isToDay = false;
          // }
          // if (!this.isToDay) {
          //   document.getElementsByClassName("picker-today")[0].style.color =
          //     "#333";
          //   document.getElementsByClassName(
          //     "picker-today"
          //   )[0].style.borderColor =
          //     "#333";
          // } else {
          //   document.getElementsByClassName("picker-today")[0].style.color =
          //     "#5d7c33";
          //   document.getElementsByClassName(
          //     "picker-today"
          //   )[0].style.borderColor =
          //     "#5d7c33";
          // }
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
    //删除工作经历
    deleteWork() {
      this.$ajax
        .deleteWorkInformation({
          type: "get",
          data: {
            ID: this.ID
          }
        })
        .then(res => {
          if (res.Status == 1) {
            this.workInfo = {};
          }
        });
    },
    //非必要项输入验证
    enterOrNot(e, dataType) {
      if (e.target.value) {
        e.target.setAttribute("data-type", dataType);
      } else {
        e.target.removeAttribute("data-type");
        e.target.nextElementSibling.removeAttribute("class");
      }
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
    margin-left: 0.1rem;
    width: 1rem;
    padding-left: 0.2rem;
  }
  span.mint-datetime-action.mint-datetime-cancel {
    color: #333;
  }
}
</style>