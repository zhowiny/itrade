let API_DOMAIN = process.env.NODE_ENV === 'development' ? 'https://test-api-gateway.meixincn.com/' : 'https://api-gateway.meixinglobal.com/'
const APPID = 'wxfaab93f8bf9fff2d' // meixin－b
const KEY = '3D274AC9D16CA655DAC63B44CCC0BC80'
/** 手机品牌 **/
let dBrand = ''
/** 手机型号 **/
let dModel = ''
/** 屏幕宽度,高;可用宽高 **/
let dScreenWidth
let dScreenHeight
let dWindowWidth
let dWindowHeight
/** 微信版本号 **/
let dWxversion = ''
let mxToken
let mxSecret
/** advisor ID **/
let advisorId
/** 是否认证 **/
let IsLegalize
/** 是否绑定手机号 **/
let HasBindPhone
/** 获取信息弹窗 **/
let modelInfo = false
/** 获取信息弹窗 **/
let hasUserInfo = false

/** 版本号 **/
var version = process.env.NODE_ENV === 'development' ? '1.0.2' : '1.0.1'
wx.mx_dev = process.env.NODE_ENV === 'development'

function getApiDomain () {
  return API_DOMAIN
}

function getDomainAsync () {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
    })
    let url = 'https://domain.meixinglobal.com/domain/get/project/url'
    wx.request({
      url: url,
      data: {
        project_name: 'min_itrade_advisor',
        version: version
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code === 1) {
          resolve(res.data.body)
          API_DOMAIN = res.data.body
        } else {
          reject(res)
        }
        wx.hideLoading()
      },
      fail: function (err) {
        reject(err)
        wx.hideLoading()
      }
    })
  })
}

function loadStorage () {
  mxToken = wx.getStorageSync('mxToken')
  mxSecret = wx.getStorageSync('mxSecret')
  advisorId = wx.getStorageSync('advisorId')
}

function getTokenSecret () {
  let token = mxToken || wx.getStorageSync('mxToken')
  let secret = mxSecret || wx.getStorageSync('mxSecret')
  return { token, secret }
}

function setTokenSecret (token, secret) {
  mxToken = token
  mxSecret = secret
  wx.setStorage({ key: 'mxToken', data: token })
  wx.setStorage({ key: 'mxSecret', data: secret })
}

function getAdvisorId () {
  return advisorId || wx.getStorageSync('advisorId')
}

function setAdvisorId (value) {
  advisorId = value
  wx.setStorage({ key: 'advisorId', data: value })
}

function getIsLegalize () {
  return IsLegalize || wx.getStorageSync('IsLegalize')
}

function setIsLegalize (value) {
  IsLegalize = value
  wx.setStorage({ key: 'IsLegalize', data: value })
}

function getHasBindPhone () {
  return HasBindPhone || wx.getStorageSync('HasBindPhone')
}

function setHasBindPhone (value) {
  HasBindPhone = value
  wx.setStorage({ key: 'HasBindPhone', data: value })
}

function getUserInfo () {
  return hasUserInfo || wx.getStorageSync('hasUserInfo')
}

function setUserInfo (value) {
  hasUserInfo = value
  wx.setStorage({ key: 'hasUserInfo', data: value })
}

function loadSystemInfo () {
  let systemInfo = wx.getSystemInfoSync()
  wx.setStorage({
    key: 'systemInfo',
    data: systemInfo
  })
}

function getBrand () {
  return dBrand
}

function getModel () {
  return dModel
}

function getDeviceWIndow () {
  return {
    screenWidth: dScreenWidth,
    screenHeight: dScreenHeight,
    windowWidth: dWindowWidth,
    windowHeight: dWindowHeight
  }
}

function getWxVersion () {
  return dWxversion
}

function getModalInfo () {
  return modelInfo
}

function setModalInfo (value) {
  modelInfo = value
}

function showToast (params, callback) {
  let { duration = 2000 } = params
  if (typeof params === 'string') {
    wx.showToast({
      title: params,
      icon: 'none',
      duration: duration,
      mask: true,
    })
  } else {
    wx.showToast(params)
  }
  callback && setTimeout(callback, duration)
}

function previewFile (fileObject, fileType) {
  if (typeof fileObject === 'string') {
    let ext = fileObject.substr(fileObject.lastIndexOf('.') + 1)
    let type = (fileType && fileType.includes('.')) ? fileType.substr(fileType.lastIndexOf('.') + 1) : fileType
    let img = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']
    let isImg = img.indexOf(ext.toLowerCase()) !== -1 || (img.indexOf(type) !== -1)
    if (isImg) {
      wx.previewImage({
        urls: [fileObject]
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      wx.downloadFile({
        url: fileObject,
        success: function (res) {
          console.log(res)
          if (res.statusCode === 200) {
            let filePath = res.tempFilePath
            setTimeout(() => {
              wx.hideLoading()
              wx.openDocument({
                filePath: filePath,
                fileType: type || 'pdf',
                success: function (res) {
                  console.log('打开文档成功', res)
                },
                fail (res) {
                  showToast(res.errMsg)
                }
              })
            }, 1000)
          }
        },
        fail: function (err) {
          wx.hideLoading()
          throw new Error(err)
        }
      })
    }
  } else if (Object.prototype.toString.apply(fileObject) === '[object Object]') {
    wx.previewImage(fileObject)
  }
}

export {
  API_DOMAIN,
  APPID,
  KEY,
  loadStorage,
  loadSystemInfo,
  getAdvisorId,
  setAdvisorId,
  getHasBindPhone,
  setHasBindPhone,
  getTokenSecret,
  setTokenSecret,
  getWxVersion,
  getModel,
  getBrand,
  getDeviceWIndow,
  getIsLegalize,
  setIsLegalize,
  getModalInfo,
  setModalInfo,
  getUserInfo,
  setUserInfo,
  showToast,
  previewFile,
  getApiDomain,
  getDomainAsync,
  version,
}
