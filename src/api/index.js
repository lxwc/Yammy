/* jshint esversion: 6 */
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
Vue.use(VueRouter)

var _this = Vue.prototype;

const router = new VueRouter({
    routes
})

// axios 配置
axios.defaults.timeout = 100000;
//axios.defaults.baseURL = '/Pmt/Api/APP/'; //开发
//axios.defaults.baseURL = 'http://47.104.84.80:8081/Pmt/Api/APP/'; //测试环境
axios.defaults.baseURL = 'http://47.96.137.30:8081/PMT/Api/APP/'; //生产环境

axios.defaults.withCredentials = true;

export function axiosData(url, method, data, config) {
    Indicator.open();
    return new Promise((resolve, reject) => {
        var json;
        if (method === "get") {
            json = {
                params: data
            }
        } else if (method === "post") {
            json = qs.stringify(data);
        }

        axios[method](url, json, config)
            .then(res => {
                Indicator.close();
                console.log(res)
                if (res.data.Status === 1 || 200) {
                    resolve(res.data);
                } else {
                    Toast(res.data.ErrorResult.ErrMsg);
                }
            }).catch(res => {
                reject(res);
                Indicator.close();
            })
    })
}

export default {
    //登录
    login(data) {
        return axiosData('Account/AuthForApi', data.type, data.data)
    },
    //判断登录权限
    loginPermissions(data) {
        return axiosData('Account/LoginPermissions', data.type, data.data)
    },
    //注册
    register(data) {
        return axiosData('Account/registerSave', data.type, data.data)
    },
    //获取验证码
    getCode(data) {
        return axiosData('Account/GenerateCode', data.type, data.data)
    },
    //检查验证码是否超时
    checkcode(data) {
        return axiosData('Account/CheckCode', data.type, data.data)
    },
    //验证手机号是否注册过
    checkPhone(data) {
        return axiosData('Account/CheckRegPhone', data.type, data.data)
    },
    //验证用户名是否存在
    checkLoginUser(data) {
        return axiosData('Account/CheckLoginUser', data.type, data.data)
    },
    //找回密码
    passwordfind(data) {
        return axiosData('Account/Passwordfind', data.type, data.data)
    },
    //意向加盟商，正式加盟商，地产代表首页权限
    franchiserPermissions(data) {
        return axiosData('Account/FranchiserPermissions', data.type, data.data);
    },
    //地产代表首页
    realEstateStoreScheduleReviewInit(data) {
        return axiosData('Store/RealEstateStoreScheduleReviewInit', data.type, data.data);
    },
    //开店前状态通知
    getRealEstatepreShopStatusList(data) {
        return axiosData('Store/GetRealEstatepreShopStatusList', data.type, data.data);
    },
    //待处理
    getTaskView(data) {
        return axiosData('Store/GetTaskViewForToBePending', data.type, data.data);
    },
    //获取待处理，已处理详细列表
    getTaskViewList(data) {
        return axiosData('Pipeline/GetTaskViewListForToBePending', data.type, data.data);
    },

    //意向资料初始化
    getInformation(data) {
        return axiosData('Franchise/FranchiseBasicInit', data.type, data.data)
    },
    //意向资料-基本信息保存
    franchiseBasicSave(data) {
        return axiosData('AppFranchiseBasicSave', data.type, data.data)
    },
    //意向资料-意向资料保存
    franchiseIntentionSave(data) {
        return axiosData('AppFranchiseIntentionSave', data.type, data.data)
    },
    //意向资料-问卷调查保存
    franchiseQuestionnaireSave(data) {
        return axiosData('AppFranchiseQuestionnaireSave', data.type, data.data)
    },
    //获取城市列表
    getCityName(data) {
        return axiosData('Area/GetAreaSysDataListByJoinID', data.type, data.data)
    },
    //意向资料提交
    basicSubmit(data) {
        return axiosData('Franchise/FranchiseBasicSubmit', data.type, data.data)
    },




    //加盟商资料初始化
    getFranchise(data) {
        return axiosData('Franchise/AppInformationFranchiseeInit', data.type, data.data)
    },

    //加盟商基本信息保存
    franchiseeSave(data) {
        return axiosData('Franchise/AppInformationFranchiseeSave', data.type, data.data)
    },
    //加盟商教育经历保存
    educationalSave(data) {
        return axiosData('Franchise/AppInformationEducationalSave', data.type, data.data)
    },
    //加盟商投入资金保存
    investInFundsSave(data) {
        return axiosData('Franchise/AppInvestInFundsSave', data.type, data.data)
    },

    //加盟商工作经验保存
    workExperienceSave(data) {
        return axiosData('Franchise/AppWorkExperienceSave', data.type, data.data)
    },

    //加盟商工作经验保存
    informationFranchiseeDetail(data) {
        return axiosData('Franchise/InformationFranchiseeDetail', data.type, data.data)
    },
    //删除工作经历
    deleteWorkInformation(data) {
        return axiosData('Franchise/DeleteInformationFranchiseeDetail', data.type, data.data)
    },
    //品牌保存
    brandSave(data) {
        return axiosData('Franchise/AppInformationBrandSave', data.type, data.data)
    },



    //加载上传图片
    avatorUpload(data) {
        return axiosData('Account/Avatorupload', data.type, data.data)
    },



    //新店初始化
    storeSiteEvaluationInit(data) {
        return axiosData('Store/SiteEvaluationInit', data.type, data.data)
    },
    //门店基本资料保存
    storeSiteBasicInfoSave(data) {
        return axiosData('Store/SaveSiteBasicInfos', data.type, data.data);
    },
    //产权信息保存
    SaveSiteProductionInfos(data) {
        return axiosData('Store/SaveSiteProductionInfos', data.type, data.data);
    },
    //租赁条件保存
    SaveLeaseholdconditions(data) {
        return axiosData('Store/SaveLeaseholdconditions', data.type, data.data);
    },
    //每月租赁成本保存
    SaveLeaseholdCost(data) {
        return axiosData('Store/SaveLeaseholdCost', data.type, data.data);
    },
    //人流量测算保存
    SaveMeasurementHuman(data) {
        return axiosData('Store/SaveMeasurementHuman', data.type, data.data);
    },

    //加盟合同审批初始化
    franchiseContractApprovalInit(data) {
        return axiosData('Store/franchiseContractApprovalInit', data.type, data.data)
    },
    //加盟合同审保存
    franchiseContractApprovalSave(data) {
        return axiosData('Store/franchiseContractApprovalSave', data.type, data.data)
    },
    //获利预估保存
    SaveProfitPrediction(data) {
        return axiosData('Store/SaveProfitPrediction', data.type, data.data)
    },
    //营业执照保存
    SaveBusinessLicense(data) {
        return axiosData('Store/SaveBusinessLicense', data.type, data.data)
    },


    //上传附件初始化
    getSysCommonAttached(data) {
        return axiosData('System/GetSysCommonAttached', data.type, data.data)
    },
    //获取附件日期
    getdocumentTransferView(data) {
        return axiosData('Store/GetdocumentTransferView', data.type, data.data)
    },

    //补传【食品经营许可证】初始化
    MakeUpFoodBusinessLicenseInit(data) {
        return axiosData('Store/MakeUpFoodBusinessLicenseInit', data.type, data.data)
    },
    //补传【食品经营许可证】保存
    MakeUpFoodBusinessLicense(data) {
        return axiosData('Store/MakeUpFoodBusinessLicense', data.type, data.data)
    },

    //开店前资料上传初始化
    documentTransferInit(data) {
        return axiosData('Store/documentTransferInit', data.type, data.data)
    },
    //开店前资料上传保存
    documentTransferSave(data) {
        return axiosData('Store/AppdocumentTransferSave', data.type, data.data)
    },
    //开店前资料日期，负责人保存
    saveStoreBasicInfoView(data) {
        return axiosData('Store/APPSaveStoreBasicInfoView', data.type, data.data)
    },

    //付款憑证上传初始化
    paymentVoucherInit(data) {
        return axiosData('Store/paymentVoucherInit', data.type, data.data)
    },

    //首页初始化
    franchiseePotarlInit(data) {
        return axiosData('Store/FranchiseePotarlInit', data.type, data.data)
    },
    //加盟商首页初始化
    formalFranchiseePotarlInit(data) {
        return axiosData('Store/FormalFranchiseePotarlInit', data.type, data.data)
    },
    //所有模块提交接口
    autoSubmit(data) {
        return axiosData('Pipeline/AutoSubmit', data.type, data.data);
    },

    //身份证附件上传
    uploadFile(data) {
        return axiosData('File/UploadFile', data.type, data.data)
    },
    //密码重置初始化
    initChangePwd(data) {
        return axiosData('User/InitChangePwd', data.type, data.data)
    },
    //重置密码保存
    saveChangePwd(data) {
        return axiosData('User/SaveChangePwd', data.type, data.data)
    },


    //加盟者面谈记录初始化
    meetingNegotiationInit(data) {
        return axiosData('Franchise/meetingNegotiationInit', data.type, data.data)
    },
    //面谈记录基本信息保存
    meetingBasicInfoSave(data) {
        return axiosData('Franchise/meetingBasicInfoSave', data.type, data.data)
    },
    //面谈记录-工作经历详情
    meetingworkExperienceDetails(data) {
        return axiosData('Franchise/meetingworkExperienceDetails', data.type, data.data)
    },
    //面谈记录-工作经历保存
    meetingworkExperienceSave(data) {
        return axiosData('Franchise/meetingworkExperienceSave', data.type, data.data)
    },
    //面谈记录-工作经历删除
    meetingworkExperienceDelete(data) {
        return axiosData('Franchise/meetingworkExperienceDelete', data.type, data.data)
    },
    //面谈记录-政商关系详情
    commercialRelationseDetails(data) {
        return axiosData('Franchise/CommercialRelationseDetails', data.type, data.data)
    },
    //面谈记录-政商关系保存
    commercialRelationseSave(data) {
        return axiosData('Franchise/CommercialRelationseSave', data.type, data.data)
    },
    //面谈记录-政商关系删除
    CommercialRelationseDelete(data) {
        return axiosData('Franchise/CommercialRelationseDelete', data.type, data.data)
    },
    //面谈记录-选择原因保存
    meetingReasonsSave(data) {
        return axiosData('Franchise/meetingReasonsSave', data.type, data.data)
    },
    //面谈记录-投入资金保存
    meetingInvestfundSave(data) {
        return axiosData('Franchise/meetingInvestfundSave', data.type, data.data)
    },
    //面谈记录-开店选择区域保存
    meetingOpenAreaSave(data) {
        return axiosData('Franchise/meetingOpenAreaSave', data.type, data.data)
    },
    //面谈记录-区域竞品信息保存
    meetingAreaInfoSave(data) {
        return axiosData('Franchise/meetingAreaInfoSave', data.type, data.data)
    },
    //综合评估保存
    meetingComprehensiveSave(data) {
        return axiosData('Franchise/meetingComprehensiveSave', data.type, data.data)
    },
    //面谈记录保存
    meetingNegotiationSave(data) {
        return axiosData('Franchise/meetingNegotiationSave', data.type, data.data)
    },


    //公告栏更多
    newsMoreInit(data) {
        return axiosData('System/NewsMoreInit', data.type, data.data)
    },
    //所有缴费记录
    paymentMoreInit(data) {
        return axiosData('System/PaymentReminderMoreInit', data.type, data.data)
    },

    //初始化的接口
    FipStoreSalesInit(data) {
        return axiosData('Store/FipStoreSalesInit', data.type, data.data)
    },

    //保存的接口
    SaveFipStoreSales(data) {
        return axiosData('Store/SaveFipStoreSales', data.type, data.data)
    }

    
}