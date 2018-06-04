<template>
  <div class="c-container">
    <top-header title="门店基本资料" :btn="btnTxt" :callback="submit"></top-header>
    <div class="c-page">
      <form action="" ref="baseInfo" class="mt20">
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.StoreStatusName" data-type='required' @focus="(e)=>{storeSheet=true;e.target.blur();}" placeholder="请选择店铺属性" data-tip="请选择店铺属性" name="StoreStatusName" id="storeStatusName">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.EstimatedSigningDate" @focus="dateSign($event)" data-type='required' placeholder="请输入预计签约日期" data-tip="请输入预计签约日期" name="EstimatedSigningDate" id="signin">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="YM_StoretInfo.EstimatedOpeningDate" @click="dateOpen($event)" data-type='required' placeholder="请输入预计开业日期" data-tip="请输入预计开业日期" name="EstimatedOpeningDate" id="opendate">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" class="c-box-flex" v-model="address" @focus="(e)=>{city=true;e.target.blur();}" data-type='required' placeholder="请输入店铺地址所在地区（省市区）" data-tip="请输入店铺地址所在地区（省市区）" name="NewMarketName" id="newMarketName">
          <i></i>
        </div>
        <div class="c-flex list-cell c-a-c p30 bg-fff">
          <div class="icon add"></div>
          <input type="text" v-model="YM_StoretInfo.NewStoreAddress" class="c-box-flex" data-type='required' placeholder="请输店铺详细地址" data-tip="请输店铺详细地址" name="NewStoreAddress">
          <i></i>
        </div>
      </form>
    </div>
    <mt-actionsheet :actions="actions" v-model="storeSheet" cancel-text="">
    </mt-actionsheet>
    <mt-datetime-picker ref="date" class="date" v-model="pickerVisible" @confirm="handleChange" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <div class="mask c-fixed" v-if="city" @click="city=false"></div>
    <div class="city-wrap c-fixed bg-fff" v-if="city">
      <div class="fs30 btn f-left" @click="cancelBtn">取消</div>
      <div class="green fs30 btn f-right" @click="cityBtn">确认</div>
      <div class="page-picker-wrapper c-flex">
        <div class="c-box-flex">
          <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
        </div>
        <div class="c-box-flex">
          <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="5"></mt-picker>
        </div>
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
      isSign: true, //标记位，判断mt-datetime-picker选择的日期是签约时间（true），还是开店时间（false）
      positionID: null,
      storeSheet: false,
      city: false,
      address: "",
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
      endDate: new Date(),
      pickerVisible: new Date(),
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
      StoreStatuslst: [],
      Marketlst: [],
      cityList: [],
      YM_StoretInfo: {},
      btnTxt: "",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.storeSiteEvaluationInit();
    this.positionID = JSON.parse(localStorage.getItem("userInfo")).PositionID;
    this.btnTxt = this.$showSaveBtn(2, "保存");
  },
  methods: {
    //保存
    submit() {
      if (!this.$getFormData(this.$refs.baseInfo)) {
        return false;
      }
      var model = {
        PositionID: this.positionID,
        KeyID: 0,
        IsDCZL: "",
        YM_StoreBasicInfo: "",
        YM_StoretInfo: this.YM_StoretInfo
      };
      this.$ajax
        .storeSiteBasicInfoSave({
          type: "post",
          data: model
        })
        .then(res => {
          if (res.Status === 1) {
            this.$router.push("/newStore/"+this.storeID);
          }
        });
    },
    //选择店铺属性
    storeSelect(v) {
      this.YM_StoretInfo.StoreStatusName = v.name;
      this.changeSelect("storeStatusName");
    },
    dateSign(e) {
      this.$refs.date.open();
      this.isSign = true;
      e.target.blur();
    },
    dateOpen(e) {
      this.$refs.date.open();
      this.isSign = false;
      e.target.blur();
    },
    //选项样式调整
    changeSelect(id) {
      document
        .getElementById(id)
        .nextElementSibling.setAttribute("class", "right");
      document
        .getElementById(id)
        .previousElementSibling.setAttribute("class", "icon w");
    },
    handleChange(v) {
      //选择的日期
      if (this.isSign) {
        this.YM_StoretInfo.EstimatedSigningDate = this.$formatDate(v);
        this.changeSelect("signin");
      } else {
        this.YM_StoretInfo.EstimatedOpeningDate = this.$formatDate(v);
        this.changeSelect("opendate");
      }
    },
    cityBtn() {
      this.city = false;
      this.address =
        this.cityname(this.Marketlst, this.YM_StoretInfo.NewMarketCode) +
        " - " +
        this.cityname(this.cityList, this.YM_StoretInfo.NewCityCode);
        this.changeSelect("newMarketName");
    },
    //取消按钮
    cancelBtn() {
      this.city = false;
    },
    //新店加盟初始化
    storeSiteEvaluationInit() {
      this.$ajax
        .storeSiteEvaluationInit({
          type: "get",
          data: {
            StoreID: localStorage.getItem("storeID") || 0,
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID,
            PositionID: JSON.parse(localStorage.getItem("userInfo"))
              .PositionID
          }
        })
        .then(res => {
          this.StoreStatuslst = res.Data.StoreStatuslst;
          //城市数据初始化
          res.Data.Marketlst.map((v, i) => {
            this.addressSlots[0].values.push(v.Type_Name);
          });

          this.Marketlst = res.Data.Marketlst;

          this.YM_StoretInfo = res.Data.YM_StoretInfo;
          if (
            this.YM_StoretInfo.NewMarketName == null ||
            this.YM_StoretInfo.NewCityName == null
          ) {
            this.address = "";
          } else {
            this.address =
              this.YM_StoretInfo.NewMarketName +
              " - " +
              this.YM_StoretInfo.NewCityName;
          }
          Array.prototype.slice.call(this.$refs.baseInfo).forEach((v, i) => {
            this.$form(v);
            if (this.YM_StoretInfo[v.name]) {
              v.previousElementSibling.setAttribute("class", "icon w");
            } else {
              v.previousElementSibling.setAttribute("class", "icon add");
            }
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
      this.YM_StoretInfo.NewCityCode = data.DictCode;
      this.cityName = value[0];
      this.YM_StoretInfo.NewCityName = this.cityName;
    },
    onAddressChange(picker, value) {
      var data = this.getCityCode(this.Marketlst, value[0]);
      this.getCityName(data);
      this.YM_StoretInfo.NewMarketCode = data.DictCode;
      this.provinceName = value[0];
      this.YM_StoretInfo.NewMarketName = this.provinceName;
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
.city {
  width: 100%;
  height: 200px;
}
.city-wrap {
  left: 0;
  bottom: 0;
  z-index: 10;
  .f-left {
    float: left;
    padding-left: 0.3rem;
  }
  .f-right {
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
