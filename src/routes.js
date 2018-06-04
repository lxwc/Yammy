import home from './page/home'
import login from './page/login'
import register from './page/register'
import forget from './page/forget'

import intentional from './page/intentional/intentional' //意向资料
import intentionalBaseInfo from './page/intentional/intentionalBaseInfo' //意向资料-基础信息
import intentionalInfo from './page/intentional/intentionalInfo' //意向资料-意向资料
import intentionalQuestionnaire from './page/intentional/intentionalQuestionnaire' //意向资料-问卷调查

import franchiser from './page/franchiser/franchiser' //加盟商资料提交
import consentForm from './page/franchiser/consentForm' //加盟商资料提交-确认书
import franchiserInfo from './page/franchiser/franchiserInfo' //加盟商资料提交-基本信息
import franchiserEducation from './page/franchiser/franchiserEducation' //加盟商资料提交-教育经历
import franchiserWork from './page/franchiser/franchiserWork' //加盟商资料提交-工作经历
import franchiserEditorialWork from './page/franchiser/franchiserEditorialWork' //加盟商资料提交-工作经历-编辑工作经历
import franchiserInvestment from './page/franchiser/franchiserInvestment' //加盟商资料提交-投入资金
import franchiserUpload from './page/franchiser/franchiserUpload' //加盟商资料提交-图片上传
import franchiserBrand from './page/franchiser/franchiserBrand' //加盟商资料提交-加盟品牌选择
import franchiserOthers1 from './page/franchiser/franchiserOthers1' //加盟商资料提交-其他出资人1信息
import franchiserOthers2 from './page/franchiser/franchiserOthers2' //加盟商资料提交-其他出资人2信息


import newStore from './page/newStore/newStore' //新店/迁址评估申请 
import newStoreInfo from './page/newStore/newStoreInfo' //新店/迁址评估申请-门店基本资料
import newStoreProduction from './page/newStore/newStoreProduction' //新店/迁址评估申请-产证资料
import newStoreLease from './page/newStore/newStoreLease' //新店/迁址评估申请-租赁条件
import newStoreLeaseholdCost from './page/newStore/newStoreLeaseholdCost' //新店/迁址评估申请-每月租赁成本
import newStorePeople from './page/newStore/newStorePeople' //新店/迁址评估申请-人流量测算
import newStoreAssessment from './page/newStore/newStoreAssessment' //新店/迁址评估申请-获利评估
import newStoreLicense from './page/newStore/newStoreLicense' //新店/迁址评估申请-办理营业执照
import newStoreUpload from './page/newStore/newStoreUpload' //新店/迁址评估申请-店铺图片附件列表

import contract from './page/contract/contract' //加盟商合同审批申请
import pos from './page/contract/pos' //加盟商合同审批申请-购置pos机
import contractUpload from './page/contract/contractUpload' //加盟商合同审批申请-图片上传


import payment from './page/payment/payment' //付款凭证上传
import paymentVoucher from './page/payment/paymentVoucher' //付款凭证上传


import dataUploading from './page/dataUploading/dataUploading' //开店前资料上传
import takeOut from './page/dataUploading/takeOut' //开店前资料上传-第三方支付授权书
import dataUploadingDetail from './page/dataUploading/dataUploadingDetail' //开店前资料上传-图片上传
import dataUploadingInfo from './page/dataUploading/dataUploadingInfo.vue' //开店前资料上传-门店详情

import food from './page/food/food' //补传食品经营许可证
import foodDetail from './page/food/foodDetail' //补传食品经营许可证-图片上传

import setting from './page/setting/setting' //用户管理
import modifyPwd from "./page/setting/modifyPwd" //用户管理-修改密码

import interview from "./page/interview/interview" //意向加盟面谈记录
import interviewInfo from "./page/interview/interviewInfo" //意向加盟面谈记录--基本信息
import interviewWork from "./page/interview/interviewWork" //意向加盟面谈记录--工作经历
import interviewEditorialWork from "./page/interview/interviewEditorialWork" //意向加盟面谈记录--工作编辑
import interviewCommercialRelationse from "./page/interview/interviewCommercialRelationse" //意向加盟面谈记录--政商关系
import interviewEditorialCommercialRelationse from "./page/interview/interviewEditorialCommercialRelationse" //意向加盟面谈记录--政商关系编辑
import interviewReasons from "./page/interview/interviewReasons" //意向加盟面谈记录--选择原因
import interviewInvestfund from "./page/interview/interviewInvestfund" //意向加盟面谈记录--可投入资金
import interviewOpenArea from "./page/interview/interviewOpenArea" //意向加盟面谈记录--开店区域
import interviewAreaInfo from "./page/interview/interviewAreaInfo" //意向加盟面谈记录--区域竞品信息
import interviewComprehensive from "./page/interview/interviewComprehensive" //意向加盟面谈记录--综合评估

import FipStoreSales from './page/FipStoreSales/FipStoreSales' //销售数据采集


import news from "./page/more/news" //公告栏
import pay from "./page/more/pay" //公告栏




export default [{
        path: '/',
        component: home
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/forget',
        component: forget
    },
    {
        path: '/intentional/:storeID',
        component: intentional
    },
    {
        path: '/intentionalBaseInfo/:storeID',
        component: intentionalBaseInfo
    },
    {
        path: '/intentionalInfo/:storeID',
        component: intentionalInfo
    },
    {
        path: '/intentionalQuestionnaire/:storeID',
        component: intentionalQuestionnaire
    },
    {
        path: '/franchiser/:storeID',
        component: franchiser
    },
    {
        path: '/consentForm/:storeID',
        component: consentForm
    },
    {
        path: '/franchiserInfo/:storeID',
        component: franchiserInfo
    },
    {
        path: '/franchiserEducation/:storeID',
        component: franchiserEducation
    },
    {
        path: '/franchiserWork/:storeID',
        component: franchiserWork
    },
    {
        path: '/franchiserEditorialWork/:id/:informationID/:storeID',
        component: franchiserEditorialWork
    },
    {
        path: '/franchiserInvestment/:storeID',
        component: franchiserInvestment
    },
    {
        path: '/franchiserUpload/:storeID',
        component: franchiserUpload
    },
    {
        path: '/franchiserBrand/:storeID',
        component: franchiserBrand
    },
    {
        path: '/franchiserOthers1/:storeID',
        component: franchiserOthers1
    },
    {
        path: '/franchiserOthers2/:storeID',
        component: franchiserOthers2
    },
    {
        path: '/newStore/:storeID',
        component: newStore
    },
    {
        path: '/newStoreInfo/:storeID',
        component: newStoreInfo
    },
    {
        path: '/newStoreProduction/:storeID',
        component: newStoreProduction
    },
    {
        path: '/newStoreLease/:storeID',
        component: newStoreLease
    },
    {
        path: '/newStoreLeaseholdCost/:storeID',
        component: newStoreLeaseholdCost
    },
    {
        path: '/newStorePeople/:storeID',
        component: newStorePeople
    },
    {
        path: '/newStoreAssessment/:storeID',
        component: newStoreAssessment
    },
    {
        path: '/newStoreLicense/:storeID',
        component: newStoreLicense
    },
    {
        path: '/newStoreUpload/:storeID',
        component: newStoreUpload
    },
    {
        path: '/contract/:storeID',
        component: contract
    },
    {
        path: '/pos/:storeID',
        component: pos
    },
    {
        path: '/contractUpload/:storeID',
        component: contractUpload
    },
    {
        path: '/payment/:storeID',
        component: payment
    },
    {
        path: '/paymentVoucher/:storeID',
        component: paymentVoucher
    },
    {
        path: '/dataUploading/:storeID',
        component: dataUploading
    },
    {
        path: '/takeOut/:storeID',
        component: takeOut
    },
    {
        path: '/dataUploadingDetail/:storeID',
        component: dataUploadingDetail
    },
    {
        path: '/dataUploadingInfo/:storeID',
        component: dataUploadingInfo
    },
    {
        path: '/food/:storeID',
        component: food
    },
    {
        path: '/foodDetail/:storeID',
        component: foodDetail
    },
    {
        path: '/setting',
        component: setting
    },
    {
        path: '/modifyPwd',
        component: modifyPwd
    },
    {
        path: '/interview/:isEdit/:userID',
        component: interview
    },
    {
        path: '/interviewInfo/:isEdit/:userID',
        component: interviewInfo
    },
    {
        path: '/interviewWork/:isEdit/:userID',
        component: interviewWork
    },
    {
        path: '/interviewEditorialWork/:id/:isEdit/:userID',
        component: interviewEditorialWork
    },
    {
        path: '/interviewCommercialRelationse/:isEdit/:userID',
        component: interviewCommercialRelationse
    },
    {
        path: '/interviewEditorialCommercialRelationse/:id/:isEdit/:userID',
        component: interviewEditorialCommercialRelationse
    },
    {
        path: '/interviewReasons/:isEdit/:userID',
        component: interviewReasons
    },
    {
        path: '/interviewInvestfund/:isEdit/:userID',
        component: interviewInvestfund
    }, {
        path: '/interviewOpenArea/:isEdit/:userID',
        component: interviewOpenArea
    },
    {
        path: '/interviewAreaInfo/:isEdit/:userID',
        component: interviewAreaInfo
    },
    {
        path: '/interviewComprehensive/:isEdit/:userID',
        component: interviewComprehensive
    },
    {
        path: '/news',
        component: news
    },
    {
        path: '/pay',
        component: pay
    },
    {
        path: '/FipStoreSales/:TaskID/:CreateDate',
        component: FipStoreSales
    }
]