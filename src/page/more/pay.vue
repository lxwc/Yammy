<template>
  <div class="c-container">
    <top-header title="全部缴费记录" btn="" :callback="submit"></top-header>
    <div class="c-page p30">
      <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <ul v-infinite-scroll="paymentMoreInit" infinite-scroll-disabled="false" infinite-scroll-distance="50">
          <li v-for="(item, index) in payLst" :key="index" class="news-item" @click="openDialog(item)">
            <div class="news-title">{{item.StoreName}} {{item.ExpirationTime + "应缴" + item.CostTypeName + " " + item.Cost + "元"}}</div>
                <div class="news-date">{{item.CreateDate}}</div>
          </li>
        </ul>
        <p v-show="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          加载中...
        </p>
      </div>
      <div class="mask c-fixed" v-if="mask" @click="mask=false">
        <div class="msg-box">
          <div class="msg-title fs32 black  fw">{{paymentDetails.StoreName}}</div>
          <div class="pay-detail">开店时间: {{paymentDetails.StartTime}}</div>
          <div class="pay-detail">到期日期: {{paymentDetails.ExpirationTime}}</div>
          <div class="pay-detail">费用类型: {{paymentDetails.Remark}}</div>
          <div class="pay-detail">费用: {{paymentDetails.Cost}}</div>
          <div class="c-flex msg-btn br-t">
            <div class="c-box-flex fs30 green" @click="mask=false">关闭</div>
          </div>
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
      payLst: [],
      mask: false,
      dialogContent: {},
      PageModel: {},
      totalPage: 1,
      pageNum: 0,
      paymentDetails: {},
      loading: false,
      wrapperHeight: 0
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    this.mask = false;
    this.paymentMoreInit();
  },
  methods: {
    //保存
    submit() {},
    //初始化
    paymentMoreInit() {
      if(this.pageNum >= this.totalPage){
        this.loading = false;
        return false;
      }else{
        this.pageNum ++;
        this.$ajax
          .paymentMoreInit({
            type: "post",
            data: {
              PageModel: {
                FunctionID: "NewsMoreList",
                PageNumber: this.pageNum,
                PageSize: 10,
                PositionID: JSON.parse(localStorage.getItem("userInfo"))
                  .PositionID
              }
            }
          })
          .then(res => {
            res.Data.lst.map((v, i) => {
              this.payLst.push(v);
            });
            this.PageModel = res.Data.PageModel;
            this.totalPage = Math.ceil(
              this.PageModel.TotalCount / this.PageModel.PageSize
            );
          });
      }
    },
    //显示公告详情
    openDialog(item) {
      this.paymentDetails = item;
      this.mask = true;
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
.pay-detail{
  text-align: left;
  padding-left: .7rem;
}
.page-list {
  margin-top: 0.2rem;
  float: right;
  margin-bottom: 0.2rem;
}
.news-item {
  /* border: 1px dashed; */
  border-radius: 0.2rem;
  margin-top: 0.1rem;
  background-color: #fff;
  padding: 0.2rem;
  .news-title {
    font-size: 0.3rem;
    font-weight: bold;
  }
  .news-date {
    font-size: 0.2rem;
  }
}
.mask {
  background: rgba(3, 3, 3, 0.25);
  z-index: 20;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;  
}
.msg-box {
  position: absolute;
  text-align: center;
  width: 6rem;
  background-color: #fff;
  border-radius: 0.06rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0.08rem rgba(0, 0, 0, 0.2);
  .msg-title {
    // line-height: 1rem;
    text-align: center;
    font-size: 0.3rem;
    padding: 0.3rem 0.2rem 0.1rem 0.2rem;
    // border-bottom: 1px solid #ddd;
  }
  .msg-date {
    font-size: 0.2rem;
  }
  .msg-detail {
    padding: 0.2rem;
    text-indent: 0.5rem;
    height: 2rem;
    overflow-y: scroll;
    word-wrap: break-word;
    text-align: left;
  }
  .msg-btn {
    line-height: 0.88rem;
    text-align: center;
    padding: 0.06rem 0;
  }
}
</style>
