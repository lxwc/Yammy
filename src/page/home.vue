<template>
  <div class="c-container">
    <Top :callback="submit"></Top>
    <div class="c-page bg-fff">
      <div class="tab-nav c-flex c-a-c fs32" v-if="roleHome==0||roleHome==1">
        <div class="c-box-flex cell" @click="active=0">
          <span :class="{'green':active==0,}">首页</span>
          <div class="line" v-if="active==0"></div>
        </div>
        <div class="c-box-flex cell" @click="active=1;getTaskView();">
          <span :class="{'green':active==1}">待处理</span>
          <span class="red-badge">{{waitTask.Count}}</span>
          <div class="line" v-if="active==1"></div>
        </div>
      </div>
      <div class="tab-nav c-flex c-a-c fs32" v-if="roleHome==2||roleHome==3">
        <div class="c-box-flex cell" @click="change=0">
          <span :class="{'green':change==0, 'activeTab': change==0}">门店流程申请进度一览表</span>
          <!-- <div class="line" v-if="change==0"></div> -->
        </div>
        <div class="c-box-flex cell" @click="change=1;getRealEstatepreShopStatusList();">
          <span :class="{'green':change==1, 'activeTab': change==1}">开店前状态通知</span>
          <!-- <div class="line" v-if="change==1"></div> -->
        </div>
      </div>
      <div v-if="active==0 && roleHome == 0" class="p-h">
        <div class="head-line mt20">
          <div class="income line mt20">
            <div class="fs20 tc">昨日本店收入</div>
            <div class="fs20 tc b-r-25">￥
              <span class="fs50">{{formatNum(StoreDayBusiness.NTBusiness,0)}}</span>.{{formatNum(StoreDayBusiness.NTBusiness,1)}}</div>
            <div class="green fs20 tc">堂食{{formatNum(StoreDayBusiness.NBusiness,3)}} | 外卖{{formatNum(StoreDayBusiness.Tbusiness,3)}}</div>
          </div>
          <div class="income line mt20 ml-20">
            <div class="fs20 tc">昨日订单数量</div>
            <div class="fs20 tc b-r-25">
              <span class="fs50">{{formatNum(StoreDayBusiness.TNOrders,0)}}</span>单</div>
            <div class="green fs20 tc">堂食{{formatNum(StoreDayBusiness.NOrders,0)}} | 外卖{{formatNum(StoreDayBusiness.TOrders,0)}}</div>
          </div>
          <div class="income line mt20 mb30">
            <div class="fs20 tc">杯单价</div>
            <div class="fs20 tc b-w-25">￥
              <span class="fs50">{{formatNum(StoreDayBusiness.NTBusinessPrice,0)}}</span>.{{formatNum(StoreDayBusiness.NTBusinessPrice,0)}}</div>
            <div class="green fs20 tc mb30">堂食{{formatNum(StoreDayBusiness.NBusinessPrice,3)}} | 外卖{{formatNum(StoreDayBusiness.TbusinessPrice,3)}}</div>
          </div>
        </div>
        <div class="prop-line mt20">
          <div class="income line mt20 mb30">
            <div class="fs20 tc">当月达成率</div>
            <div class="fs20 tc b-r-30">
              <span class="fs50">{{formatNum(StoreDayBusiness.CurMonthsRate,2)}}</span>
            </div>
            <div class="green fs20 tc">预算金额：￥{{formatNum(StoreDayBusiness.CurMonthsFNetSales,3)}}元</div>
          </div>
          <div class="income line mt20 mb30">
            <div class="fs20 tc">营业额同比状况</div>
            <div class="fs20 tc b-w-35">
              <span class="fs50">{{formatNum(StoreDayBusiness.SalesVolume,2)}}</span>
            </div>
            <div class="green fs20 tc mb30">同比金额：￥{{formatNum(StoreDayBusiness.NTBusinessTYTotals,3)}}元</div>
          </div>
        </div>
        <div class="board prop-line">
          <div class="head-title mt20">
            <span class="ml20 fw">公告栏</span>
            <router-link to="/news" class="fs20 more">更多<img class="more-arrow" src="../assets/images/arrow.svg"></router-link>
          </div>
          <div class="board-list">
            <div class="board-item" v-for="(news, index) in NewsLst" :key="index" @click="openNews(news)" v-if="NewsLst.length>0">
              <div class="board-time green mt15">{{formatDate(news.CreateDate)}}</div>
              <div class="board-content ">
                {{news.Title}}
              </div>
            </div>
            <div v-if="NewsLst==0" class="no-data">暂无数据</div>
          </div>
        </div>
        <div class="pay-remind">
          <div class="head-title mt20">
            <span class="ml20 fw">缴费提醒</span>
            <router-link to="/pay" class="fs20 more">更多<img class="more-arrow" src="../assets/images/arrow.svg"></router-link>
          </div>
          <div class="pay-list">
            <div class="pay-item mt15" v-for="(payment, index) in PaymentReminderNewsLst" :key="index" :class="paymentExpire(payment.ExpirationTime)" @click="openPayment(payment)" v-if="PaymentReminderNewsLst.length>0">
              {{index + 1}}、
              <span>{{payment.StoreName}}</span>
              <span>{{paymentDetail(payment)}}</span>
            </div>
            <div v-if="PaymentReminderNewsLst==0" class="no-data">暂无数据</div>
          </div>
        </div>
      </div>
      <div v-if="active==0 && roleHome == 1" class="p-h">
        <div class="tips mt30 p30">
          <div class="fs36 fw">欢迎进入加盟商管理系统</div>
          <div>以下为您申请加盟开店之操作流程图：</div>
          <div style="color:#D26B22;font-size:.2rem">{{process}}</div>
        </div>
        <div class="gray-line bg-eee mt20"></div>
        <div class="menu-list p30">
          <div v-for="obj in menuList" :key="obj.Sort">
            <router-link :to="obj.IsShow==0 ? '/home':obj.Page +'/'+obj.StoreID">
              <!-- <router-link :to="obj.Page+'/'+obj.StoreID"> -->
              <div class="menu-list-cell mt20 ml15" :class="obj.IsShow==1 && obj.PStatus==1?'bg-green':obj.IsShow==1 && obj.PStatus==0?'bg-orange':'bg-eee'">
                <span>{{obj.Sort}}</span>{{obj.Function_Name}}
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="change==0 && (roleHome == 2||roleHome==3)" class="p-h">
        <div class="table-list" ref="wrapper">
          <div class="page-infinite-wrapper">
            <div v-infinite-scroll="realEstateStoreScheduleReviewInit" infinite-scroll-disabled="false" infinite-scroll-distance="50">
              <ul v-for="(item, index) in scheduleLst" :key="index">
                <li>
                  当前进程为：{{item.process}}
                </li>
                <li>
                  姓名：{{item.User_Name}}
                </li>
                <li>
                  电话: {{item.Mobile}}
                </li>
                <li>
                  <span @click="$router.push('/interview/'+(item.QuestionScore=='合格' && roleHome==3&&!item.AN_Finishdate?1:0)+'/'+item.User_ID)">面谈记录</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="change==1 && (roleHome == 2 || roleHome==3)" class="p-h">
        <div class="table-list" ref="wrapper">
          <div class="page-infinite-wrapper">
            <div class="bg-fff open_notice pr" v-if="isOpenStoreStatus">
              <div class="c-flex mb15">
                <div class="c-box-flex ml15 tc">
                  暂无数据
                </div>
              </div>
            </div>
            <div v-infinite-scroll="getRealEstatepreShopStatusList" v-else infinite-scroll-disabled="false" infinite-scroll-distance="50">
              <div class="bg-fff open_notice pr" v-for="(item, index) in openStoreStatus" :key="index">
                <div class="c-flex mb15">
                  <div>预计开店日期：</div>
                  <div class="c-box-flex ml15">
                    {{item.PlanDate}}
                  </div>
                </div>
                <div class="c-flex mb15">
                  <div class="label">实际开业日期：</div>
                  <div class="c-box-flex ml15">
                    {{item.ActualOpeningDate}}
                  </div>
                </div>
                <div class="c-flex mb15">
                  <div class="label">大区：</div>
                  <div class="c-box-flex ml15">
                    {{item.regionName}}
                  </div>
                </div>
                <div class="c-flex mb15">
                  <div>城市：</div>
                  <div class="c-box-flex ml15">
                    {{item.CountryName}}
                  </div>
                </div>
                <div class="c-flex mb15">
                  <div>门店编号：</div>
                  <div class="c-box-flex ml15">
                    {{item.StoreCode}}
                  </div>
                </div>
                <div class="c-flex mb15">
                  <div>店舖名称：</div>
                  <div class="c-box-flex ml15">
                    {{item.StoreName}}
                  </div>
                </div>
                <div class="c-flex mb15">
                  <div>订货编号(B2B帐号)：</div>
                  <div class="c-box-flex ml15">
                    {{item.OrderNumber}}
                  </div>
                </div>
                <div class="c-flex mb15">
                  <div>加盟商电话：</div>
                  <div class="c-box-flex ml15">
                    {{item.Tel}}
                  </div>
                </div>
                <div class="c-flex mb15">
                  <div>店舖地址：</div>
                  <div class="c-box-flex ml15">
                    {{item.Address}}
                  </div>
                </div>
                <div class="c-flex mb15">
                  <div>是否购置POS机：</div>
                  <div class="c-box-flex ml15">
                    {{item.IsBuyPOSName}}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div v-if="active==1">
        <div class="tab-nav c-flex c-a-c fs32">
          <div class="c-box-flex cell" @click="handle=0">
            <span :class="{'green':handle==0}">待处理</span>
            <div class="line" v-if="handle==0">
            </div>
          </div>
          <div class="c-box-flex cell" @click="handle=1">
            <span :class="{'green':handle==1}">已处理</span>
            <div class="line" v-if="handle==1"></div>
          </div>
        </div>
        <div v-if="handle == 0">
          <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <ul v-infinite-scroll="getTaskView" infinite-scroll-disabled="false" infinite-scroll-distance="50">
              <li class="task" @click="goTargetPage(item)" v-for="(item, index) in waitTask.TaskLeftViewLst" :key="index">
                <img class="icon" src="../assets/images/arrow.svg" alt="" :style="{marginTop: (roleHome==0||roleHome==1)&&!!item.StoreName?'0.3rem':''}">
                <div class="task-item">
                  <div>{{item.FunctionNameCN}}</div>
                  <div v-if="roleHome==0" class="task-storename">{{item.StoreName}}</div>
                </div>
              </li>
            </ul>
            <p v-show="loading" class="page-infinite-loading">
              <mt-spinner type="fading-circle"></mt-spinner>
              加载中...
            </p>
          </div>
        </div>
        <div v-if="handle == 1">
          <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <ul v-infinite-scroll="getTaskView" infinite-scroll-disabled="false" infinite-scroll-distance="50">
              <li class="task" @click="goTargetPage(item)" v-for="(item, index) in completeTask.TaskLeftViewLst" :key="index">
                <img class="icon" src="../assets/images/arrow.svg" alt="" :style="{marginTop: (roleHome==0||roleHome==1)&&!!item.StoreName?'0.3rem':''}">
                <div class="task-item">
                  <div>{{item.FunctionNameCN}}</div>
                  <div v-if="roleHome==0" class="task-storename">{{item.StoreName}}</div>
                </div>
              </li>
            </ul>
            <p v-show="loading" class="page-infinite-loading">
              <mt-spinner type="fading-circle"></mt-spinner>
              加载中...
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="c-foot-pic c-fixed">
      <img src="../assets/images/H5_logo.png" alt="">
    </div>
    <div class="mask c-fixed" v-if="news" @click="news=false">
      <div class="msg-box">
        <div class="msg-title fs32 black  fw">{{newsDetail.Title}}</div>
        <div class="msg-date">{{newsDetail.CreateDate}}</div>
        <div class="mb15 pb20 msg-detail">{{newsDetail.Details}}</div>
        <div class="c-flex msg-btn br-t">
          <div class="c-box-flex fs30 green" @click="news=false">关闭</div>
        </div>
      </div>
    </div>
    <div class="mask c-fixed" v-if="payment" @click="payment=false">
      <div class="msg-box">
        <div class="msg-title fs32 black  fw">{{paymentDetails.StoreName}}</div>
        <div class="pay-detail">开店时间: {{paymentDetails.StartTime}}</div>
        <div class="pay-detail">到期日期: {{paymentDetails.ExpirationTime}}</div>
        <div class="pay-detail">费用类型: {{paymentDetails.CostType}}</div>
        <div class="pay-detail">费用: {{paymentDetails.Cost}}</div>
        <div class="c-flex msg-btn br-t">
          <div class="c-box-flex fs30 green" @click="payment=false">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Top from "../components/top";
import { InfiniteScroll } from "mint-ui";
export default {
  data() {
    return {
      isOpen: true,
      showList: null,
      mask: false,
      active: 0, //意向加盟商和正式加盟商页面切换
      handle: 0, //待处理和已处理页面切换
      change: 0, //加盟代表和地产代表页面切换
      roleHome: null, //初始值设为null,避免页面加载时出现闪跳0:正式加盟商/营运人员首页，1：意向加盟商首页，2：地产代表首页,3:加盟代表
      userInfo: null,
      menuList: [],
      menuPage: [
        "/intentional",
        "/consentForm",
        "/newStore",
        "/contract",
        "/payment",
        "/takeOut",
        "/food"
      ],
      NewsLst: [],
      PaymentReminderNewsLst: [],
      StoreDayBusiness: {},
      process: "",
      role_ID: null,
      scheduleLst: [],
      completeTask: [], //已处理
      waitTask: [], //待处理
      taskList: [],
      PageModel: {},
      news: false,
      payment: false,
      paymentDetails: {},
      newsDetail: {},
      totalPage: 1,
      loading: false,
      wrapperHeight: 0,
      pageNum: 0,
      loading: false,
      roleList: [],
      isOpenStoreStatus: true,
      openStoreStatus: []
    };
  },
  components: {
    Top
  },
  mounted() {
    //用户信息
    //ff6e00
    //this.getTaskViewList();
    this.franchiserPermissions();
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.franchiseePotarlInit();
  },
  methods: {
    submit() {
      this.$router.push("/setting");
    },

    //意向加盟商，正式加盟商，地产代表,加盟代表首页权限
    franchiserPermissions() {
      this.$ajax
        .franchiserPermissions({
          type: "get",
          data: {
            UserID: JSON.parse(localStorage.getItem("userInfo")).UserID
          }
        })
        .then(res => {
          this.roleList = res.Data; //148-意向加盟商，149-正式加盟商，155-地产代表,162-加盟代表
          for (var i = 0; i < this.roleList.length; i++) {
            if (this.roleHome != null) {
              break;
            }
            this.judgmentRole(this.roleList[i]);
          }
        });
    },
    //角色判断
    judgmentRole(role) {
      this.role_ID = role.Role_ID;
      if (this.role_ID == 149 || this.role_ID == 147) {
        this.formalFranchiseePotarlInit();
        this.getTaskView();
        this.roleHome = 0;
      } else if (this.role_ID == 148) {
        this.franchiseePotarlInit();
        this.getTaskView();
        this.roleHome = 1;
      } else if (this.role_ID == 155) {
        this.realEstateStoreScheduleReviewInit();
        this.getRealEstatepreShopStatusList();
        this.roleHome = 2;
      } else if (this.role_ID == 162) {
        this.roleHome = 3;
        this.realEstateStoreScheduleReviewInit();
        this.getRealEstatepreShopStatusList();
      }
    },
    //地产代表首页
    realEstateStoreScheduleReviewInit() {
      if (this.pageNum >= this.totalPage) {
        this.loading = false;
      } else {
        this.pageNum++;
        this.loading = true;
        this.$ajax
          .realEstateStoreScheduleReviewInit({
            type: "post",
            data: {
              PageSize: 10,
              PageNumber: this.pageNum,
              PositionID: JSON.parse(localStorage.getItem("userInfo"))
                .PositionID,
              RoleID: this.role_ID,
              UserID: JSON.parse(localStorage.getItem("userInfo")).UserID
            }
          })
          .then(res => {
            res.Data.map((v, i) => {
              this.currentProcess(v);
              this.scheduleLst.push(v);
            });

            this.PageModel = res.PageModel;
            this.totalPage = Math.ceil(
              this.PageModel.TotalCount / this.PageModel.PageSize
            );
            this.loading = false;
          });
      }
    },
    //地产代表--开店前状态通知
    getRealEstatepreShopStatusList() {
      this.$ajax
        .getRealEstatepreShopStatusList({
          type: "post",
          data: {
            PageSize: 10,
            PageNumber: 1,
            PositionID: JSON.parse(localStorage.getItem("userInfo"))
              .PositionID
          }
        })
        .then(res => {
          this.openStoreStatus = res.Data;
          if (res.Data.length > 0) {
            this.isOpenStoreStatus = false;
          } else {
            this.isOpenStoreStatus = true;
          }
        });
    },
    //地产代表及加盟代表首页，开店前状态通知--当前进程
    //MB_Finishdate:【补】食品经营许可证
    // CP_Finishdate:用印合同上传
    // DT_Finishdate:开店前资料上传
    // PV_Finishdate:付款憑证上传
    // CA_Finishdate:加盟合同审批申请
    // SE_Finishdate:新店/迁址评估申请
    // IF_Finishdate:加盟商资料提交
    // MResult:加盟商面谈记录
    // FB_Finishdate:意向资料填写
    currentProcess(user) {
      var processLst = [
        "FB_Finishdate",
        "MResult",
        "IF_Finishdate",
        "SE_Finishdate",
        "CA_Finishdate",
        "PV_Finishdate",
        "DT_Finishdate",
        "CP_Finishdate",
        "MB_Finishdate"
      ];
      for (var i = 8; i >= 0; i--) {
        if (!!user[processLst[i]]&&i == 8) {
          user.process = "已完成";
          break;
        }
        if(!!user[processLst[i]]&&!user[processLst[i+1]]){
          if(i==7){ user.process = "【补】食品经营许可证进行中";}
          if(i==6){ user.process = "用印合同上传进行中";}
          if(i==5){ user.process = "开店前资料上传进行中";}
          if(i==4){ user.process = "付款憑证上传进行中";}
          if(i==3){ user.process = "加盟合同审批申请进行中";}
          if(i==2){ user.process = "新店/迁址评估申请进行中";}
          if(i==1){ user.process = "加盟商资料提交进行中";}
          if(i==0){ user.process = "加盟商面谈记录进行中";}
          break;
        }
        if(!user[processLst[i]]&&i==0){
          user.process = "意向资料填写进行中";
          break;;
        }
      }
    },
    //意向加盟商初始化首页
    franchiseePotarlInit() {
      this.$ajax
        .franchiseePotarlInit({
          type: "get",
          data: {
            CurrentUserPositionID: JSON.parse(
              localStorage.getItem("userInfo")
            ).PositionID,
            StoreID: 0
            // StoreID: JSON.parse(localStorage.getItem("storeID")) || 0
          }
        })
        .then(res => {
          this.menuList = res.Data;
          localStorage.setItem("initData", JSON.stringify(res.Data));
          //localStorage.setItem("storeID", res.Data[0].StoreID);
          this.menuList.map((v, i) => {
            v.Page = this.menuPage[i];
          });
          this.processTip();
        });
    },
    //正式加盟商初始化首页
    formalFranchiseePotarlInit() {
      this.$ajax
        .formalFranchiseePotarlInit({
          type: "get",
          data: {
            CurrentUserPositionID: JSON.parse(
              localStorage.getItem("userInfo")
            ).PositionID,
            StoreID: JSON.parse(localStorage.getItem("storeID")) || 0
          }
        })
        .then(res => {
          this.NewsLst = res.Data.NewsLst;
          this.PaymentReminderNewsLst = res.Data.PaymentReminderNewsLst;
          this.StoreDayBusiness = res.Data.StoreDayBusiness;
        });
    },

    //意向加盟商首页进程提示
    processTip() {
      this.menuList.forEach((item, i) => {
        if (item.Function_ID == "franchiseBasic") {
          if (item.IsShow == 1) {
            if (item.PStatus == 0) {
              this.process = "当前进程为：" + item.Function_Name + "进行中";
            }
          }
        } else {
          if (item.IsShow == 1) {
            if (item.CurrentStatus == 0) {
              //审批拒绝
              this.process = "当前进程为：" + item.Function_Name + "进行中";
            }
            if (item.CurrentStatus == 3) {
              //呈递完成
              this.process = "当前进程为：" + item.Function_Name + "审核中";
            }
            if (item.CurrentStatus == 4) {
              //等待OA审核
              this.process = "当前进程为：" + item.Function_Name + "审核中";
            }
          }
        }
      });
    },
    //缴费详情
    paymentDetail(payment) {
      return (
        this.formatDate(payment.ExpirationTime) +
        "应缴" +
        payment.CostType +
        payment.Cost
      );
    },
    //去掉收尾空格
    trimStr(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    //调整日期格式
    formatDate(date) {
      if (!date) {
        return "";
      }
      this.paymentExpire(date);
      var dateArr = date.split("-");
      dateArr.map((v, i) => {
        dateArr[i] = this.trimStr(v);
      });
      if (dateArr.length === 3) {
        return dateArr[0] + "年" + dateArr[1] + "月" + dateArr[2] + "日";
      } else if (dateArr.length === 2) {
        return dateArr[0] + "月" + dateArr[1] + "日";
      } else if (dateArr.length === 1) {
        return dateArr[0] + "日";
      }
    },
    //缴费是否到期  0：未到期(黑色) ，1：即将到期（黄色）， 2：已过期（红色）
    paymentExpire(date) {
      if (!date) {
        return "";
      }
      var now = new Date();
      var expiry = new Date(date);
      const eTime = 3 * 24 * 60 * 60 * 1000; //3天的毫秒数
      // expiry.setDate(expiry.getDate()+3);
      var expiryTime = expiry.getTime() - now.getTime();
      if (expiryTime <= 0) {
        return "color-red";
      } else if (expiryTime > 0 && expiryTime <= eTime) {
        return "color-yellow";
      } else if (expiryTime > eTime) {
        return "";
      }
    },
    //格式化数量值  type(格式化类型):0:整数，1：小数,2百分比,3:金额
    formatNum(num, type) {
      if (num) {
        if (type === 0) {
          return parseInt(num);
        }
        if (type === 1) {
          return num.split(".")[1];
        }
        if (type === 2) {
          return num;
        }
        if (type === 3) {
          return parseFloat(num).toFixed(2);
        }
      } else {
        if (type === 0) {
          return "0";
        }
        if (type === 1) {
          return "00";
        }
        if (type === 2) {
          return "0%";
        }
        if (type === 3) {
          return "0.00";
        }
      }
    },
    //
    getTaskView() {
      this.$ajax
        .getTaskView({
          type: "get",
          data: {
            PositionID: JSON.parse(localStorage.getItem("userInfo"))
              .PositionID
          }
        })
        .then(res => {
          this.waitTask = res.Data[0];
          this.completeTask = res.Data[1];
        });
    },
    //前往编辑页面
    goTargetPage(page) {
      console.log(page);
      //1、意向资料
      if (page.FunctionID == "franchiseBasic") {
        this.$router.push("/intentional/0");
      }
      //2、加盟资料
      if (page.FunctionID == "InformationFranchisee") {
        
        if(page.Status == 0){
          this.$router.push("/consentForm/0");
        }else{
          this.$router.push("/franchiser/0");
        }
      }
      //3、新店/迁址
      if (page.FunctionID == "SiteEvaluation") {
        this.$router.push("/newStore/" + page.StoreID);
      }
      //4、加盟合同审批
      if (page.FunctionID == "franchiseContractApproval") {
        this.$router.push("/contract/" + page.StoreID);
      }
      //5、付款凭证
      if (page.FunctionID == "uploadPaymentVoucher") {
        this.$router.push("/payment/" + page.StoreID);
      }
      //6、开店资料
      if (page.FunctionID == "documentTransfer") {
        if(page.Status == 0){
          this.$router.push("/takeOut/" + page.StoreID);
        }else{
          this.$router.push("/dataUploading/" + page.StoreID);
        }
      }
      //7、食品许可证
      if (page.FunctionID == "MakeUpFoodBusinessLicense") {
        this.$router.push("/food/" + page.StoreID);
      }
      //8、销售数据采集
      if (page.FunctionID == "FipStoreSales") {
        this.$router.push("/FipStoreSales/" + page.TaskID + "/"+ page.CreateDate);
      }
    },
    openNews(news) {
      this.newsDetail = news;
      this.news = true;
    },
    openPayment(payment) {
      this.paymentDetails = payment;
      this.payment = true;
    }
  }
};
</script>
<style lang="less" scoped>
.pay-detail {
  text-align: left;
  padding-left: 0.7rem;
}
.task {
  border-bottom: 1px solid #ddd;
  padding-left: 0.75rem;
  padding-right: 0.3rem;
  color: #666;
  font-size: 0.3rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  .task-item {
    display: inline-block;
    width: 3.3rem;
    .task-storename {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .icon {
    transform: rotate(180deg);
    width: 0.32rem;
    height: 0.32rem;
    float: right;
    clear: both;
    display: block;
    margin-top: 0.1rem;
  }
}
.open_notice {
  padding: 0.1rem 0.2rem;
  margin-top: 0.2rem;
}
.open_notice:first-child {
  margin-top: 0;
}
.p-h {
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
}
.board,
.pay-remind {
  width: 100%;
}
.page-list {
  margin-top: 0.2rem;
  float: right;
  margin-bottom: 0.2rem;
}
.board-list,
.pay-list {
  margin: 0.2rem;
  overflow-y: scroll;
  height: 30vmin;
  width: 98%;
  font-size: 0.2rem;
}
.head-title {
  border-left: 5px solid #5d7c33;
}
.more-arrow {
  width: 0.2rem;
  height: 0.2rem;
  transform: rotate(180deg);
  margin-top: -0.05rem;
}
.no-data {
  text-align: center;
}
.red-badge {
  background-color: red;
  padding: 0.05rem 0.1rem;
  border-radius: 50%;
  font-size: 0.2rem;
  color: #fff;
  text-align: center;
}
.more {
  float: right;
  padding-right: .1rem;
}
.b-r-25 {
  border-right: 1px solid #ddd;
  width: 2.5rem;
}
.b-r-30 {
  border-right: 1px solid #ddd;
  width: 3.5rem;
}
.b-w-35 {
  width: 3.5rem;
}
.b-w-25 {
  width: 2.5rem;
}
.fs50 {
  font-size: 0.4rem;
}
.fs20 {
  font-size: 0.2rem;
  -webkit-text-size-adjust: none;
  -webkit-transform-origin-x: 0;
  // -webkit-transform: scale(0.9);
}

.display-flex() {
  display: -webkit-box;
  /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;
  /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;
  /* TWEENER - IE 10 */
  display: -webkit-flex;
  /* NEW - Chrome */
  display: flex;
}

.head-line {
  border-bottom: 4px solid #f1f1f1a6;
  .display-flex();
}
.ml-20 {
  margin-left: -0.2rem;
}
.prop-line {
  border-bottom: 2px solid #eee;
}
.line {
  display: inline-block;
}
.c-page {
  padding-top: 0.96rem;
  padding-bottom: 0.98rem;
}
.c-foot-pic {
  left: 0;
  bottom: 0;
  img {
    width: 100%;
    height: auto;
  }
}
.tab-nav {
  width: 100%;
  height: 0.95rem;
  background: #fff;
  border-bottom: 1px solid #ddd;
  .cell {
    text-align: center;
    height: 0.95rem;
    line-height: 0.95rem;
    position: relative;
    .line {
      position: absolute;
      width: 40%;
      height: 2px;
      background: #5d7c33;
      left: 30%;
      bottom: 0;
    }
  }
}

.tips {
  line-height: 0.5rem;
}

.gray-line {
  height: 0.1rem;
}
.activeTab {
  display: block;
  height: 0.94rem;
  border-bottom: 2px solid #5d7c33;
}
.menu-list {
  .menu-list-cell {
    height: 0.86rem;
    line-height: 0.86rem;
    position: relative;
    display: inline-block;
    span {
      font-size: 0.4rem;
      margin: 0 0.1rem;
      font-weight: bold;
    }

    &.bg-green {
      color: #fff;
      &::before {
        background: #5d7c33;
      }
      &::after {
        border-left: 0.5rem solid #5d7c33;
      }
    }
    &.bg-orange {
      color: #fff;
      &::before {
        background: #ff6e00;
      }
      &::after {
        border-left: 0.5rem solid #ff6e00;
      }
    }
    &.bg-eee {
      &::before {
        background: #eee;
      }
      &::after {
        border-left: 0.5rem solid #eee;
      }
    }
    &::before {
      position: absolute;
      content: "";
      display: block;
      width: 0.1rem;
      height: 100%;
      border-radius: 0.005rem 0 0.005rem;
      left: -0.15rem;
      top: 0;
    }
    &::after {
      position: absolute;
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-bottom: 0.43rem solid transparent;
      border-top: 0.43rem solid transparent;
      right: -0.5rem;
      top: 0;
    }
  }
}
.mask {
  background: rgba(3, 3, 3, 0.25);
  z-index: 20;
  top: 0;
  width: 100%;
  height: 100%;
}
.msg-title {
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
  }
  .msg-btn {
    line-height: 0.88rem;
    text-align: center;
    padding: 0.06rem 0;
  }
}
.table-list {
  height: 100%;
  .page-infinite-wrapper {
    background: #e4e4e4;
  }
  ul:first-child {
    margin-top: 0;
  }
  ul {
    padding: 0rem 0.2rem;
    position: relative;
    margin-top: 0.15rem;
    background: #fff;
    li:first-child {
      .sts {
        float: right;
        color: #d26b22;
      }
    }
    li:last-child {
      width: 1.5rem;
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
      span {
        display: block;
        border: 1px solid #5d7c33;
        color: #5d7c33;
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 0.1rem;
        -moz-border-radius: 0.1rem;
        -webkit-border-radius: 0.1rem;
        float: right;
      }
    }
    li {
      width: 100%;
      padding: 0.1rem 0;
    }
  }
}
</style>
