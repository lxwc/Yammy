<!-- 问卷调查 -->
<template>
  <div class="c-container">
    <top-header title="问卷调查" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <div class="mt15 q-list" v-for="obj in Lst" :key="obj.QuestionID">
        <mt-radio :title="obj.Title" v-model="obj.AnswerSelect" :options="obj.options">
        </mt-radio>
        <input type="text" class="remark" placeholder="若有其他答案可在此输入" v-model="obj.Remark">
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
      Lst: [],
      value: "",
      lst: [], //初始化数据
      btnTxt: "",
      qList: document.getElementsByClassName("q-list"),
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
    //保存
    submit() {
      // let qList = document.getElementsByClassName("q-list");
      for (var i = 0; i < this.Lst.length; i++) {
        this.qList[i].setAttribute("class", "q-list mt-5");
        if (!!!this.Lst[i].AnswerSelect) {
          let total = this.qList[i].offsetTop;
          console.log("total ====", total);
          this.jump(i);
          this.qList[i].setAttribute("class", "q-list mt-5 b-red");

          Toast("请填选完整问卷");
          return false;
        }
      }
      var list = [];
      this.Lst.map((v, i) => {
        list.push({});
        list[i].AnswerSelect = v.AnswerSelect;
        list[i].QuestionID = v.QuestionID;
        list[i].Remark = v.Remark;
        list[i].AnswerScore = v.AnswerScore;
        list[i].AnswerNumber = v.AnswerNumber;
      });

      this.$ajax
        .franchiseQuestionnaireSave({
          type: "post",
          data: {
            User_ID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            Lst: list,
            FranchiseQuestionScore: {
              User_ID: JSON.parse(localStorage.getItem("userInfo")).UserID,
              BrandCode: "suoya724002"
            }
          }
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/intentional/"+this.storeID);
          }
          //this.getInformation();
        });
    },
    jump(index) {
      let total = this.qList[index].offsetTop;
      let distance = document.getElementsByClassName("c-container")[0].scrollTop; // 获取到顶部的距离(this.container便是.cate-list,为了方便存起来了)
      let step = total / 50;
      this.isActive = index; // 菜单列表显示当前样式
      const _this = this;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }
      function smoothDown() {
        if (distance < total) {
          distance += step;
          _this.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          _this.scrollTop = total;
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          _this.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          _this.scrollTop = total;
        }
      }
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
          var list = [];
          this.lst = res.Data.Lst;
          res.Data.Lst.map((v, i) => {
            list.push({
              QuestionID: "",
              Title: "",
              options: [],
              AnswerSelect: "",
              Remark: ""
            });
            list[i].QuestionID = res.Data.Lst[i].QuestionID;
            list[i].AnswerSelect = res.Data.Lst[i].AnswerSelect;
            list[i].Remark = res.Data.Lst[i].Remark;
            list[i].AnswerScore = res.Data.Lst[i].AnswerScore;
            list[i].AnswerNumber = res.Data.Lst[i].AnswerNumber;

            list[i].Title =
              res.Data.Lst[i].QuestionID + "、" + res.Data.Lst[i].Title;
            res.Data.Lst[i].children.map((k, n) => {
              if (!!k.SerialNumber) {
                var obj = {
                  value: k.SerialNumber,
                  label: k.SerialNumber + k.Content
                };

                list[i].options.push(obj);
              }
            });
          });
          this.Lst = list;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.b-red {
  border: 0.1rem solid red;
}
</style>
