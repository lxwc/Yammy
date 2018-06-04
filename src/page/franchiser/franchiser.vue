<!-- 加盟商资料提交 -->
<template>
    <div class="c-container">
        <top-header id="btnSubmit" title="加盟商资料提交" :btn="btnTxt" :callback="submit"></top-header>
        <div class="c-page p30">
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">1</span>加盟品牌
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/franchiserBrand/'+storeID">
                    <div class="btn gray fs26 bg-green color-fff btn-brand">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex">
                    <div class="label">品牌：</div>
                    <div class="c-box-flex ml15">
                        {{brandName}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">2</span>基本信息
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/franchiserInfo/'+storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">姓名：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.User_Name}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">性别：</div>
                    <div class="c-box-flex ml15">
                        {{sexArr[Lst1.Sex]}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">出生日期：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.Birthday}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">手机号码：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.Mobile}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">籍贯：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.Native}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">身份证号：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.IDCard}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">联系邮箱：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.Mail}}
                    </div>
                </div>
                <div class="c-flex">
                    <div class="label">联系地址：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.Address}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">3</span>教育经历
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr tc" v-if="!Lst1.Education">
                <router-link :to="'/franchiserEducation/'+storeID">
                    <div class="add-wrap c-flex c-aj-c">
                        <img src="../../assets/images/add.svg" alt="">
                        <span class="ml15 green fs30">添加教育经历</span>
                    </div>
                </router-link>
                <div class="gray mt15">请填写最高学历</div>
            </div>
            <div class="bg-fff border-gray p20 pr" v-else>
                <router-link :to="'/franchiserEducation/' + storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <ul class="ml30">
                    <li>
                        <div class="date mt15 d-inline">
                            {{Lst1.GraduatedSchool}}
                        </div>
                        <div class="mb30">
                            <span class="mt15">{{Lst1.Education}}</span>
                            <span class="mt15 ml15">{{Lst1.Profession}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">4</span>工作经历
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr tc" v-if="!hasWork">
                <router-link :to="'/franchiserWork/'+storeID">
                    <div class="add-wrap c-flex c-aj-c">
                        <img src="../../assets/images/add.svg" alt="">
                        <span class="ml15 green fs30">添加工作经历</span>
                    </div>
                    <div class="gray mt15">请从最近的工作说起</div>
                </router-link>
            </div>
            <div v-else class="bg-fff border-gray p20 pr">
                <router-link :to="'/franchiserWork/' + storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <ul class="ml30">
                    <li v-for="(obj,index) in Lst1.children" :key="index" class="mt15">
                        <div class="date mt15 d-inline">
                            {{obj.WorkStartDate + "~" +(obj.WorkEndDate?obj.WorkEndDate:"至今")}}
                        </div>
                        <div class="mt15">{{obj.Department}}</div>
                        <div class="mt15">{{obj.Position}}</div>
                    </li>
                </ul>

            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">5</span>投入资金
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr">
                <router-link :to="'/franchiserInvestment/' + storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div>可投入资金RMB（万元）：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.InvestMoney}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">出资人：</div>
                    <div class="c-box-flex ml15">
                        {{showByContributions}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">最大股东：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.LargestShareholder}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div>最大股东占比：</div>
                    <div class="c-box-flex ml15">
                        {{Lst1.ShareholderInvestment}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20" v-if="showByContributions >= 2">
                <span class="p10 bg-green color-fff mr15">6</span>其他出资人1
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr" v-if="showByContributions >= 2">
                <router-link :to="'/franchiserOthers1/' + storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">姓名：</div>
                    <div class="c-box-flex ml15">
                        {{Lst2.User_Name}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">性别：</div>
                    <div class="c-box-flex ml15">
                        {{sexArr[Lst2.Sex]}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">出生日期：</div>
                    <div class="c-box-flex ml15">
                        {{Lst2.Birthday}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">手机号码：</div>
                    <div class="c-box-flex ml15">
                        {{Lst2.Mobile}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">籍贯：</div>
                    <div class="c-box-flex ml15">
                        {{Lst2.Native}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">身份证号：</div>
                    <div class="c-box-flex ml15">
                        {{Lst2.IDCard}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">联系邮箱：</div>
                    <div class="c-box-flex ml15">
                        {{Lst2.Mail}}
                    </div>
                </div>
                <div class="c-flex">
                    <div class="label">联系地址：</div>
                    <div class="c-box-flex ml15">
                        {{Lst2.Address}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20" v-if="showByContributions == 3">
                <span class="p10 bg-green color-fff mr15">7</span>其他出资人2
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr" v-if="showByContributions == 3">
                <router-link :to="'/franchiserOthers2/' + storeID">
                    <div class="btn gray fs26 bg-green color-fff">{{!!btnTxt?'编辑':'查看'}}</div>
                </router-link>
                <div class="c-flex mb15">
                    <div class="label">姓名：</div>
                    <div class="c-box-flex ml15">
                        {{Lst3.User_Name}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">性别：</div>
                    <div class="c-box-flex ml15">
                        {{sexArr[Lst3.Sex]}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">出生日期：</div>
                    <div class="c-box-flex ml15">
                        {{Lst3.Birthday}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">手机号码：</div>
                    <div class="c-box-flex ml15">
                        {{Lst3.Mobile}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">籍贯：</div>
                    <div class="c-box-flex ml15">
                        {{Lst3.Native}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">身份证号：</div>
                    <div class="c-box-flex ml15">
                        {{Lst3.IDCard}}
                    </div>
                </div>
                <div class="c-flex mb15">
                    <div class="label">联系邮箱：</div>
                    <div class="c-box-flex ml15">
                        {{Lst3.Mail}}
                    </div>
                </div>
                <div class="c-flex">
                    <div class="label">联系地址：</div>
                    <div class="c-box-flex ml15">
                        {{Lst3.Address}}
                    </div>
                </div>
            </div>
            <div class="fs30 mt20 mb20">
                <span class="p10 bg-green color-fff mr15">{{showByContributions?(6 + parseInt(showByContributions) - 1):6}}</span>图片上传
                <div class="border-red ml15 p30">必填</div>
            </div>
            <div class="bg-fff border-gray p20 pr tc" v-if="!Pic1.FilePath || !Pic2.FilePath">
                <router-link :to="'/franchiserUpload/'+storeID">
                    <div class="add-wrap c-flex c-aj-c">
                        <img src="../../assets/images/add.svg" alt="">
                        <span class="ml15 green fs30">添加图片</span>
                    </div>
                    <div class="gray mt15">请上传身份证正面、反面</div>
                </router-link>
            </div>
            <div v-else class="bg-fff p20 pr" @click="goEdit">
                <label for="idCard1">
                    <div class="bg-fff mt20 c-flex c-aj-c">
                        <img class="img-card" :src="imgSrc1">
                    </div>
                </label>

                <label for="idCard2">
                    <div class="bg-fff mt20 c-flex c-aj-c">
                        <img class="img-card" :src="imgSrc2">
                    </div>
                </label>
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
      hasWork: false,
      Pic1: {},
      Pic2: {},
      isAllowSubmit: 0,
      showByContributions: 1,
      Pic: [], //附件图片
      Lst1: {}, //出资人1
      Lst2: {}, //出资人2
      Lst3: {}, //出资人3
      brandName: "",
      sexArr: ["男", "女"],
      imgSrc1: "",
      imgSrc2: "",
      host: location.host,
      apiPath: "/Pmt/Api/APP/Account/Avatorupload?AttachedID=",
      actions: [
        {
          name: "迁址",
          method: this.storeSelect
        },
        {
          name: "新店",
          method: this.storeSelect
        }
      ],
      btnTxt: "",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.getFranchise();
    this.getSysCommonAttached();

    this.btnTxt = this.$showSaveBtn(1, "提交");
  },
  methods: {
    //提交
    submit() {
      var franchiser = JSON.parse(localStorage.getItem("initData"))[1];
      if (
        (this.showByContributions == 1 && this.isAllowSubmit == 6) ||
        (this.showByContributions == 2 && this.isAllowSubmit == 7) ||
        (this.showByContributions == 3 && this.isAllowSubmit == 8)
      ) {
        this.$ajax
          .autoSubmit({
            type: "get",
            data: {
              functionID: franchiser.Function_ID,
              itemID: JSON.parse(localStorage.getItem("userInfo")).UserID,
              keyID: franchiser.taskID ? franchiser.taskID : "",
              actionID: "btnSubmit",
              flag: "",
              positionID: JSON.parse(localStorage.getItem("userInfo"))
                .PositionID
            }
          })
          .then(res => {
            if (res.Status == 1) {
              this.$moduleStatus();
              this.btnTxt = this.$showSaveBtn(1, "提交");
              Toast("提交成功");
              this.$router.push("/home");
            }
          });
      } else {
        Toast("请填写完毕");
      }
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
          this.Lst1 = res.Data.Lst[0];
          this.Lst2 = res.Data.Lst[1];
          this.Lst3 = res.Data.Lst[2];
          this.hasWork = this.Lst1.children[0].Department;
          var brandCode = this.Lst1.BrandCode;
          this.showByContributions = res.Data.Contributions;
          var self = this;
          res.Data.Brandlst.forEach(item => {
            if (item.Dict_Code == brandCode) {
              self.brandName = item.Type_Name;
            }
          });

          this.allowSubmit();
        });
    },
    //判断必填项是否填写完毕，是否允许提交数据
    allowSubmit() {
      this.Lst1.BrandCode ? this.isAllowSubmit++ : this.isAllowSubmit; //模块一：品牌
      this.Lst1.IDCard ? this.isAllowSubmit++ : this.isAllowSubmit; //模块二：基本信息
      this.Lst1.Education ? this.isAllowSubmit++ : this.isAllowSubmit; //模块三：教育
      this.Lst1.children[0].Department
        ? this.isAllowSubmit++
        : this.isAllowSubmit; //模块四：工作
      this.Lst1.InvestMoney ? this.isAllowSubmit++ : this.isAllowSubmit; //模块五：投入资金
      this.Pic[0].FilePath && this.Pic[1].FilePath
        ? this.isAllowSubmit++
        : this.isAllowSubmit; //模块六： 附件上传
      if (this.showByContributions == 2) {
        this.Lst2.IDCard ? this.isAllowSubmit++ : this.isAllowSubmit; //投资人1
      } else if (this.showByContributions == 3) {
        this.Lst2.IDCard ? this.isAllowSubmit++ : this.isAllowSubmit; //投资人1
        this.Lst3.IDCard ? this.isAllowSubmit++ : this.isAllowSubmit; //投资人2
      }
    },
    //判断是否满足提交条件

    //获取图片
    getSysCommonAttached() {
      this.$ajax
        .getSysCommonAttached({
          type: "get",
          data: {
            PageID: JSON.parse(localStorage.getItem("initData"))[1]
              .Function_ID,
            ItemID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            KeyID: 0,
            ReadOnly: false
          }
        })
        .then(res => {
          this.Pic = res.Data;
          this.Pic1 = this.Pic[0];
          this.Pic2 = this.Pic[1];
          this.imgSrc1 =
            "http://" + this.host + this.apiPath + this.Pic[0].AttachedID;
          this.imgSrc2 =
            "http://" + this.host + this.apiPath + this.Pic[1].AttachedID;
        });
    },
    storeSelect() {},
    //获取文件对象
    getFile(file) {
      var formData = new FormData();
      formData.append(
        "ProfileUserID",
        JSON.parse(localStorage.getItem("userInfo")).UserID
      );
      formData.append("functionID", file);
      var url = this.$baseUrl + "Account/UploadProfileAvator";
      this.$uploadNative(formData, url);
    },
    //前往编辑图片页面
    goEdit() {
      if (JSON.parse(localStorage.getItem("initData"))[1].CurrentStatus == 0) {
        this.$router.push("/franchiserUpload/"+this.storeID);
      }
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
.btn-brand {
  top: 0.15rem;
}
.header-img {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.2rem auto;
  position: relative;
  display: block;
  .icon {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 0.2rem;
    height: 0.2rem;
    background: url("../../assets/images/w.svg") no-repeat;
    background-size: 100%;
  }
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
}

.add-wrap {
  img {
    width: 0.32rem;
    height: 0.32rem;
  }
}
li:before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px #000000 solid;
  border-radius: 50%;
  margin-left: -0.3rem;
}
.d-inline {
  display: inline;
}
.img-card {
  width: 100%;
  height: 150px;
}
</style>
