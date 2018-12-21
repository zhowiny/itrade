import * as config from './const'
import fly from './request'
/* eslint-disable */
import qs from 'qs'

let showNotice = true
export default {
  // 获取jscode
  getCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          resolve(res.code)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  },
  async dataBuryPoint (params) {
    const {eventName, eventDataId, utmSource, introduceCode, source, shareInvestorId, prePage} = params
    const systemInfo = wx.getStorageSync('systemInfo')
    let data = {
      event_name: eventName,        // 事件名
      event_data_id: eventDataId,       // 事件数据id
      utm_source: utmSource || '',         // 事件真实来源。线下活动，头条发布文章等
      introduce_code: introduceCode,     // 邀请码
      source: source || '',                   // 来源
      share_investor_id: shareInvestorId,   // 分享人投资人id
      // pre_page: config.getMapPage(prePage) || '',           // 前一个页面
      pre_Page: prePage,

      phone_brand: systemInfo.brand,                  // 手机品牌 （小程序）
      phone_model: systemInfo.model,                  // 手机型号 （小程序）
      operator_system: systemInfo.system,              // 操作系统 （小程序）
      operator_system_verison: systemInfo.system,      // 操作系统版本 （小程序）
      wx_version: systemInfo.version,                   // 微信版本号 （小程序）
      app_version: systemInfo.SDKVersion,                  // 小程序版本号 （小程序）
      app_name_enum: 'itrade_wx',                // 操作端
      device: '',                       // 设备号 （App）
      browser_name: '',                 // 浏览器名称 （浏览器）
    }
    let res = fly.post('/access_stream/mx/wx/visit/record', data)
    console.log(res)
  },
  checkAccount() {
    //todo 检测账户是否存在,如果存在直接登录,否则去注册开户
  },
  async login () {
    // config.loadSystemInfo()
    // let tokenSecret = config.getTokenSecret()
    // if(tokenSecret.token && tokenSecret.secret){
    //   this.loginWithToken()
    // }else{
    wx.clearStorageSync()
    config.loadSystemInfo()
    let result = await this.loginWithJscode()
    if (result.has_bind_phone && showNotice) {
      await this.showNotice()
    }
    // }
  },
  // token登陆
  async loginWithToken () {
    console.log('[loginWithToken]----------')
    // let tokenSecret = config.getTokenSecret()
    try {
      let result = await fly.post('/wx/itrade/advisor/token/login')
      console.log(result)
      config.setAdvisorId(result.advisor_id)
      config.setIsLegalize(result.is_legalize)
      config.setUserInfo(result.has_info)
      config.setTokenSecret(result.mx_token, result.mx_secret)
      } catch (e) {
        console.log(e)
        throw new Error(e)
      }
  },
  // jscode 登陆
  async loginWithJscode () {
    console.log('[loginWithJscode]----------')
    try {
      let code = await this.getCode()
      let result = await fly.post('/wx/itrade/advisor/jscode/login', {
        js_code: code
      })
      config.setAdvisorId(result.advisor_id)
      config.setIsLegalize(result.is_legalize)
      config.setUserInfo(result.has_info)
      config.setHasBindPhone(result.has_bind_phone)
      config.setTokenSecret(result.mx_token, result.mx_secret)
      return result
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  },
  async showNotice () {
    try {
      let result = await fly.get('/channel/list/launchNotice', {
        app : 'iTrade'
      })
      // console.log(result.list[0])
      if (result.list && result.list[0] && showNotice) {
        wx.showModal({
          title: result.list[0].title,
          content: result.list[0].content_text,
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#306FF4',
          success () {
            showNotice = false
          },
        })
      }
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  },
  install(Vue) {
    Vue.prototype.$auth = this
    Vue.prototype.$http = fly
    Vue.prototype.$common = config
    Vue.prototype.showToast = config.showToast
    Vue.prototype.showLoading = wx.showLoading
    Vue.prototype.hideToast = wx.hideToast
    Vue.prototype.hideLoading = wx.hideLoading
    Vue.prototype.showModal = wx.showModal
    Vue.prototype.showActionSheet = wx.showActionSheet
    Vue.prototype.getCurrentPages = getCurrentPages
  }
}
