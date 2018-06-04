<!-- 意向资料 -->
<template>
	<div class="c-container">
		<top-header id="btnSumbit" title="意向资料填写" :btn="btnTxt" :callback="submit"></top-header>
		<div class="c-page p30">
			<div class="fs30 mt20 mb20">
				<span class="p10 bg-green color-fff mr15">1</span> 基本信息
				<div class="border-red ml15 p30">必填</div>
			</div>
			<div class="bg-fff border-gray p20 pr">
				<router-link :to="'/intentionalBaseInfo/'+storeID">
					<div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
				</router-link>
				<div class="c-flex mb15">
					<div class="label">姓名：</div>
					<div class="c-box-flex ml15">
						{{FranchiseBasic.User_Name}}
					</div>
				</div>
				<!-- <div class="c-flex mb15">
					<div class="label">性别：</div>
					<div class="c-box-flex ml15">
						{{sexArr[FranchiseBasic.Sex]}}
					</div>
				</div> -->
				<div class="c-flex mb15">
          <div class="label">出生日期：</div>
          <div class="c-box-flex ml15">
            {{FranchiseBasic.Birthday}}
          </div>
        </div>
				<div class="c-flex mb15">
					<div class="label">手机号码：</div>
					<div class="c-box-flex ml15">
						{{FranchiseBasic.Mobile}}
					</div>
				</div>
				<div class="c-flex mb15">
					<div class="label">联系邮箱：</div>
					<div class="c-box-flex ml15">
						{{FranchiseBasic.Email}}
					</div>
				</div>
				<div class="c-flex">
					<div class="label">联系地址：</div>
					<div class="c-box-flex ml15">
						{{FranchiseBasic.Address}}
					</div>
				</div>
			</div>
			<div class="fs30 mt20 mb20">
				<span class="p10 bg-green color-fff mr15">2</span>意向资料
				<div class="border-red ml15 p30">必填</div>
			</div>
			<div class="bg-fff border-gray p20 pr">
				<router-link :to="'/intentionalInfo/'+storeID">
					<div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
				</router-link>
				<div class="mb15">
					<div class="option-list">
						<!-- <mt-radio title="1、请问您是从何处得知快乐柠檬加盟讯息【可多选】" v-model="FranchiseBasic.FrontFranchiseBasic" :options="FrontFranchiseLst">
						</mt-radio> -->
            <mt-checklist title="1、请问您是从何处得知快乐柠檬加盟讯息【可多选】" v-model="FrontFranchiseLstValue" :options="FrontFranchiseLst" >
						</mt-checklist>
					</div>
				</div>

			</div>
			<div class="fs30 mt20 mb20">
				<span class="p10 bg-green color-fff mr15">3</span>问卷调查
				<div class="border-red ml15 p30">必填</div>
			</div>
			<div class="bg-fff border-gray p20 pr">
				<router-link :to="'/intentionalQuestionnaire/'+storeID">
					<div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
				</router-link>
				<div class="mb15 mt30 pt20">
					谢谢！您能在百忙之中抽出时间来回答此问卷。 <br/>
          本试卷是用来测定加盟者是否适合成为仙踪林/快乐柠檬的加盟者，总部将参考此表的回答结果来决定是否同意加盟者加入，请务必仔细回答。<br/>
          以下各题采用单一选择项方式，请您依据您个人的看法选择最合适的答案在相应的答项前选择，如果您认为没有合适答案，请将您的答案写在题下文本框处。
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
      isAllow: 0,
      FranchiseBasic: {},
      resData: {},
      FrontFranchiseLst: [],
      sexArr: ["男", "女"],
      value: "",
      options: [
        {
          label: "disabled option",
          value: "valueF",
          disabled: true
        },
        {
          label: "optionA",
          value: "valueA"
        },
        {
          label: "optionB",
          value: "valueB"
        }
      ],
      btnTxt: "",
      FrontFranchiseLstValue: [],
    //  UserID: this.$router.params.UserID
    storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getInformation();
    this.btnTxt = this.$showSaveBtn(0,"提交");
  },
  methods: {
    submit() {
      var intentional = JSON.parse(localStorage.getItem("initData"))[0];
      if (this.isAllow == 3) {
        this.$ajax
          .basicSubmit({
            type: "get",
            data: {
              FunctionID: intentional.Function_ID,
              ItemID: JSON.parse(localStorage.getItem("userInfo")).UserID,
              ActionID: "btnSave",
              Status: 1,
              PositionID: JSON.parse(localStorage.getItem("userInfo"))
                .PositionID
            }
          })
          .then(res => {
            if (res.Status == 1) {
              this.$moduleStatus();
              this.btnTxt = this.$showSaveBtn(0,"提交");
              Toast("提交成功");
              this.$router.push("/home");
            } else {
              Toast("提交失败");
            }
          });
      } else {
        Toast("请填写完毕");
      }
    },
    allowSubmit() {
      this.FranchiseBasic.Email ? this.isAllow++ : this.isAllow; //模块一：基本信息
      this.FranchiseBasic.FrontFranchiseBasic ? this.isAllow++ : this.isAllow; //模块二：意向资料
      this.resData.Lst[0].AnswerSelect ? this.isAllow++ : this.isAllow;//模块三： 调查问卷
    },
    //获取初始化信息
    getInformation() {
      this.$ajax
        .getInformation({
          type: "get",
          data: {
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID//this.userID/
          }
        })
        .then(res => {
          this.resData = res.Data;
          this.FranchiseBasic = res.Data.FranchiseBasic;
          this.FrontFranchiseLstValue = this.FranchiseBasic.FrontFranchiseBasic?this.FranchiseBasic.FrontFranchiseBasic.split(";"): [];
          res.Data.FrontFranchiseLst.map((v, i) => {
            var obj = { value: v.Dict_Code, label: v.Type_Name, disabled: true };
            this.FrontFranchiseLst.push(obj);
          });
          this.allowSubmit();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
  padding-bottom: 0.2rem;
}
.btn {
  position: absolute;
  top: 0.2rem;
  right: 0.3rem;
  padding: 0.05rem 0.2rem;
  border-radius: 0.06rem;
}
</style>
<style lang="less">
.option-list {
  .mint-radiolist-title {
    font-size: 0.3rem;
    padding-top: 0.35rem;
  }
  .mint-radio-label {
    font-size: 0.26rem;
  }
  .mint-radio-input:checked + .mint-radio-core {
    background-color: #5d7c33;
    border-color: #5d7c33;
  }
}
.option-list {
  .mint-checklist-title {
    font-size: 0.3rem;
    padding-top: 0.35rem;
  }
  .mint-checkbox-label {
    font-size: 0.26rem;
  }
  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #5d7c33;
    border-color: #5d7c33;
  }
}
</style>

