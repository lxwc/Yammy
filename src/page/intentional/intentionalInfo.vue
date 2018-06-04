<!-- 意向资料-意向资料 -->
<template>
  <div class="c-container">
    <top-header title="意向资料" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <div class="q-list">
        <form action="" ref="lidt">
          <div class="mt15">
            <mt-checklist title="1、请问您是从何处得知快乐柠檬加盟讯息?【可多选】" v-model="FrontFranchiseLstValue" :options="FrontFranchiseLst">
            </mt-checklist>
            <input class="remark" v-if="getMultiLable(FrontFranchiseLst,FrontFranchiseLstValue,'员工或亲友推荐')" type="text" placeholder="请输入员工或亲友姓名" v-model="FranchiseBasic.FrontFranchiseBasicName">
            <input class="remark" v-if="getMultiLable(FrontFranchiseLst,FrontFranchiseLstValue,'其他')" type="text" placeholder="请输入其他途径" v-model="FranchiseBasic.FrontFranchiseBasicRemark">
          </div>
          <div class="mt15">
            <div class="q-cell pl-30 color-222">
              2、您想在哪一个城市开店?
            </div>
            <div class="q-cell c-flex c-a-c" @click="city=true">
              <span class="c-box-flex color-222">{{FranchiseBasic.WhichProvinceStore ? cityname(Marketlst,FranchiseBasic.WhichProvinceStore)+ '-' + cityname(cityList,FranchiseBasic.WhichCityStore) : ""}}</span>
              <!-- <input type="text" class="vh"> -->
              <img class="icon" src="../../assets/images/arrow.svg" alt="">
            </div>
          </div>
          <div class="mt15">
            <div class="q-cell pl-30 color-222">
              3、您预算投资金额?（RMB:万元）
            </div>
            <!-- <input class="q-cell" type="text" placeholder="请输入预算投资金额" v-model="FranchiseBasic.BudgetInvestmentAmount" data-type="validateAmount" data-tip="请输入数字，最多两位小数" name="BudgetInvestmentAmount"> -->
            <div class="c-flex list-cell c-a-c p30 bg-fff i-cell">
              <input type="text" class="c-box-flex" v-model="FranchiseBasic.BudgetInvestmentAmount" name="BudgetInvestmentAmount" data-tip="请输入数字，最多两位小数" data-type='validateAmount' placeholder="请输入预算投资金额">
              <i></i>
            </div>
          </div>
          
          <div class="mt15">
            <mt-radio title="4、您是否拥有可开店店铺?" v-model="FranchiseBasic.IsShop" :options="IsShopLst">
            </mt-radio>
            <input class="remark" type="text" v-if="getLable(IsShopLst,FranchiseBasic.IsShop,'有')" placeholder="请输入店铺详细地址" v-model="FranchiseBasic.ShopAddress">
            <input class="remark" type="text" v-if="getLable(IsShopLst,FranchiseBasic.IsShop,'自有')" placeholder="请输入店铺详细地址" v-model="FranchiseBasic.ShopAddress">
            <input class="remark" type="text" v-if="getLable(IsShopLst,FranchiseBasic.IsShop,'租赁')" placeholder="请输入店铺详细地址" v-model="FranchiseBasic.ShopAddress">
          </div>

          <div class="mt15">
            <mt-radio title="5、您是否自营过零售或餐饮店?" v-model="FranchiseBasic.IsWhetherOwn" :options="IsWhetherOwn">
            </mt-radio>
            <input class="remark" type="text" v-if="getLable(IsWhetherOwn,FranchiseBasic.IsWhetherOwn,'有')" v-model="FranchiseBasic.OwnBrand" placeholder="请输入品牌">
            <input class="remark" type="text" v-if="getLable(IsWhetherOwn,FranchiseBasic.IsWhetherOwn,'有')" v-model="FranchiseBasic.OwnIndustry" placeholder="请输入行业">
          </div>
          <div class="mt15">
            <mt-radio title="6、您是否加盟过其他连锁品牌?" v-model="FranchiseBasic.IsJoinBrand" :options="IsWhetherOwn">
            </mt-radio>
            <input class="remark" type="text" v-if="getLable(IsWhetherOwn,FranchiseBasic.IsJoinBrand,'有')" v-model="FranchiseBasic.JoinBrand" placeholder="请输入品牌">
            <input class="remark" type="text" v-if="getLable(IsWhetherOwn,FranchiseBasic.IsJoinBrand,'有')" v-model="FranchiseBasic.JoinIndustry" placeholder="请输入行业">
          </div>
          <div class="mt15">
            <mt-radio title="7、您加盟快乐柠檬的理由?" v-model="FranchiseBasic.FranchiseResion" :options="FranchiseResionLst">
            </mt-radio>
            <input class="remark" type="text" v-if="getLable(FranchiseResionLst,FranchiseBasic.FranchiseResion,'其他')" v-model="FranchiseBasic.FranchiseResionRemark" placeholder="请输入备注">
          </div>
          <div class="mt15">
            <mt-radio title="8、您投资的股东组合?" v-model="FranchiseBasic.ShareholderGroup" :options="ShareholderGroupLst">
            </mt-radio>
            <input class="remark" type="text" v-if="getLable(ShareholderGroupLst,FranchiseBasic.ShareholderGroup,'其他')" v-model="FranchiseBasic.ShareholderGroupRemark" placeholder="请输入备注">
          </div>
          <div class="mt15">
            <mt-radio title="9、您想加盟的类型?" v-model="FranchiseBasic.JoinType" :options="JoinTypelst">
            </mt-radio>
          </div>
        </form>
      </div>
    </div>
    <div class="mask c-fixed" v-if="city" @click="city=false"></div>
    <div class="city-wrap c-fixed bg-fff" v-if="city">
      <div class="green fs30 btn" @click="cityBtn">确认</div>
      <div class="page-picker-wrapper c-flex">
        <div class="c-box-flex">
          <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
        </div>
        <div class="c-box-flex">
          <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="5"></mt-picker>
        </div>
      </div>
      <!-- <p class="page-picker-desc">地址: {{ addressProvince }} {{ addressCity }}</p> -->
    </div>
    <palette-button></palette-button>
  </div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import { Toast } from "mint-ui";
import { Checklist } from "mint-ui";
export default {
  data() {
    return {
      btnTxt: "",
      city: false, //是否显示城市组件
      cityName: "请选择",
      provinceName: "请选择",
      value: "",
      FranchiseBasic: {},
      FrontFranchiseLst: [],
      FrontFranchiseLstValue: [],
      IsShopLst: [],
      ShareholderGroupLst: [],
      FranchiseResionLst: [],
      JoinTypelst: [],
      IsWhetherOwn: [
        {
          label: "无",
          value: "0"
        },
        {
          label: "有",
          value: "1"
        }
      ],
      Marketlst: [],
      addressSlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        }
      ],
      citySlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      addressProvince: "北京",
      addressCity: "北京",
      cityList: [],
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,
    paletteButton
  },
  mounted() {
    this.getInformation();
    this.btnTxt = this.$showSaveBtn(0, "保存");
  },
  methods: {
    //保存
    submit() {
      this.FranchiseBasic.FrontFranchiseBasic = this.FrontFranchiseLstValue.join(
        ";"
      );
      //1
      if (!!this.FranchiseBasic.FrontFranchiseBasic) {
        if (
          !!this.getMultiLable(
            this.FrontFranchiseLst,
            this.FranchiseBasic.FrontFranchiseBasic.split(";"),
            "其他"
          )
        ) {
          if (!this.FranchiseBasic.FrontFranchiseBasicRemark) {
            Toast("请输入其他途径");
            return false;
          }
        }
        if (
          !!this.getMultiLable(
            this.FrontFranchiseLst,
            this.FranchiseBasic.FrontFranchiseBasic.split(";"),
            "员工或亲友推荐"
          )
        ) {
          if (!this.FranchiseBasic.FrontFranchiseBasicName) {
            Toast("请输入员工或亲友姓名");
            return false;
          }
        }
      } else {
        Toast("请选择完整");
        return false;
      }

      //2

      if (!this.FranchiseBasic.WhichProvinceStore) {
        Toast("请选择省份");
      }
      if (!this.FranchiseBasic.WhichCityStore) {
        Toast("请选择城市");
      }
      //3
      if (!this.FranchiseBasic.BudgetInvestmentAmount) {
        Toast("请输入预算投资金额");
        return false;
      }
      //4
      if (!!this.FranchiseBasic.IsShop) {
        if (!!this.getLable(this.IsShopLst, this.FranchiseBasic.IsShop, "有") || !!this.getLable(this.IsShopLst, this.FranchiseBasic.IsShop, "自有") || !!this.getLable(this.IsShopLst, this.FranchiseBasic.IsShop, "租赁")) {
          if (!this.FranchiseBasic.ShopAddress) {
            Toast("请输入店铺详细地址");
            return false;
          }
        }
      } else {
        Toast("请选择完整");
        return false;
      }

      //5
      if (!!this.FranchiseBasic.IsWhetherOwn) {
        if (!!this.getLable(this.IsShopLst, this.FranchiseBasic.IsShop, "有")) {
          if (!this.FranchiseBasic.OwnBrand) {
            Toast("请输入品牌");
            return false;
          }
          if (!this.FranchiseBasic.OwnIndustry) {
            Toast("请输入行业");
            return false;
          }
        }
      } else {
        Toast("请选择完整");
        return false;
      }

      //6
      if (!!this.FranchiseBasic.IsJoinBrand) {
        if (
          !!this.getLable(
            this.IsWhetherOwn,
            this.FranchiseBasic.IsJoinBrand,
            "有"
          )
        ) {
          if (!this.FranchiseBasic.JoinBrand) {
            Toast("请输入品牌");
            return false;
          }
          if (!this.FranchiseBasic.JoinIndustry) {
            Toast("请输入行业");
            return false;
          }
        }
      } else {
        Toast("请选择完整");
        return false;
      }

      //7
      if (!!this.FranchiseBasic.FranchiseResion) {
        if (
          !!this.getLable(
            this.FranchiseResionLst,
            this.FranchiseBasic.FranchiseResion,
            "其他"
          )
        ) {
          if (!this.FranchiseBasic.FranchiseResionRemark) {
            Toast("请输入备注");
            return false;
          }
        }
      } else {
        Toast("请选择完整");
        return false;
      }

      //8
      if (!!this.FranchiseBasic.ShareholderGroup) {
        if (
          !!this.getLable(
            this.ShareholderGroupLst,
            this.FranchiseBasic.ShareholderGroup,
            "其他"
          )
        ) {
          if (!this.FranchiseBasic.ShareholderGroupRemark) {
            Toast("请输入备注");
            return false;
          }
        }
      } else {
        Toast("请选择完整");
        return false;
      }
      //9
      if (!this.FranchiseBasic.JoinType) {
        Toast("请选择完整");
        return false;
      }
      this.$ajax
        .franchiseIntentionSave({
          type: "post",
          data: { FranchiseBasic: this.FranchiseBasic }
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/intentional/" + this.storeID);
          }
        });
    },
    //获取初始化信息
    getInformation() {
      this.FranchiseBasic = {};
      this.FrontFranchiseLst = [];
      this.IsShopLst = [];
      this.ShareholderGroupLst = [];
      this.FranchiseResionLst = [];
      this.JoinTypelst = [];
      this.FrontFranchiseLstValue = [];
      this.$ajax
        .getInformation({
          type: "get",
          data: {
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID
          }
        })
        .then(res => {
          this.FranchiseBasic = res.Data.FranchiseBasic; //获取初始化信息
          this.FrontFranchiseLstValue = this.FranchiseBasic.FrontFranchiseBasic
            ? this.FranchiseBasic.FrontFranchiseBasic.split(";")
            : [];
          if (!!this.FranchiseBasic.WhichProvinceStore) {
            this.getCityName({
              DictCode: this.FranchiseBasic.WhichProvinceStore,
              TypeID: 104
            });
          }
          res.Data.FrontFranchiseLst.map((v, i) => {
            var obj = { value: v.Dict_Code, label: v.Type_Name };
            this.FrontFranchiseLst.push(obj);
            //this.FrontFranchiseLstValue = [];
          });
          res.Data.IsShopLst.map((v, i) => {
            var obj = { value: v.Dict_Code, label: v.Type_Name };
            this.IsShopLst.push(obj);
          });

          res.Data.ShareholderGroupLst.map((v, i) => {
            var obj = { value: v.Dict_Code, label: v.Type_Name };
            this.ShareholderGroupLst.push(obj);
          });

          res.Data.FranchiseResionLst.map((v, i) => {
            var obj = { value: v.Dict_Code, label: v.Type_Name };
            this.FranchiseResionLst.push(obj);
          });
          res.Data.JoinTypelst.map((v, i) => {
            var obj = { value: v.Dict_Code, label: v.Type_Name };
            this.JoinTypelst.push(obj);
          });

          //城市数据初始化
          res.Data.Marketlst.map((v, i) => {
            this.addressSlots[0].values.push(v.Type_Name);
          });

          this.Marketlst = res.Data.Marketlst;
          Array.prototype.slice.call(this.$refs.lidt).forEach((v, i) => {
            this.$form(v);
          });
        });
    },
    //获取城市名称
    getCityName(data) {
      this.$ajax
        .getCityName({
          type: "get",
          data: data
        })
        .then(res => {
          var arr = [];
          this.cityList = res.Data.MarketList;
          res.Data.MarketList.map((v, i) => {
            arr.push(v.Type_Name);
          });
          this.$set(this.citySlots[0], "values", arr);
        });
    },
    onCityChange(picker, value) {
      var data = this.getCityCode(this.cityList, value[0]) || { DictCode: "" };
      this.FranchiseBasic.WhichCityStore = data.DictCode;
      this.cityName = value[0];
    },
    onAddressChange(picker, value) {
      var data = this.getCityCode(this.Marketlst, value[0]);
      this.getCityName(data);
      this.FranchiseBasic.WhichProvinceStore = data.DictCode;
      this.provinceName = value[0];
    },
    cityBtn() {
      this.city = false;
    },
    //其他选择 隐藏输入框
    getLable(arr, v, str) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].label == str) {
          if (v == arr[i].value) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    //多选框 其他选项 隐藏输入框
    getMultiLable(arr, v, str) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < v.length; j++) {
          if (arr[i].value == v[j]) {
            if (arr[i].label == str) {
              return true;
            }
          }
        }
      }
      //this.FranchiseBasic.FrontFranchiseBasicRemark = "";
      return false;
    },
    //根据名称获取城市code
    getCityCode(arr, cityName) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].Type_Name == cityName) {
          return {
            TypeID: 104,
            DictCode: arr[i].Dict_Code
          };
        }
      }
    },
    //根据code获取城市名称
    cityname(arr, cityCode) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].Dict_Code == cityCode) {
          return arr[i].Type_Name;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.pl-30 {
  padding-left: 0.3rem;
}
.color-222 {
  color: #222;
}
.city {
  width: 100%;
  height: 200px;
}
.city-wrap {
  left: 0;
  bottom: 0;
  z-index: 10;
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

.remark {
  &.p1 {
    border: 1px solid #f00;
  }
}
.i-cell{
  padding: 0 .3rem 0 .75rem;
  font-size: .3rem;
}
</style>
