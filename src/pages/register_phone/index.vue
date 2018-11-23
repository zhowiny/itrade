<template>
  <div class="container">
    <div class="login_logo_box">
      <img class="login_logo_icon" src="/images/login_logo.png"/>
    </div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_phone.png" class="phone_icon"/>
        <span class="phone_text">手机号</span>
      </div>
      <div class="phone_input">
        <picker :range="phoneList" range-key="name" @change="selectedPhoneCode">
          <p class="phone_code">{{phoneCodeName}}</p>
        </picker>
        <input class="tel" v-model="phone" placeholder="请输入手机号" placeholder-style="color:#ccc"/>
      </div>
    </div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_pic.png" class="code_icon"/>
        <span class="phone_text">图片验证码</span>
      </div>
      <div class="phone_input picturecode_input">
        <input class="tel" placeholder="请输入图片验证码" placeholder-style="color:#ccc" v-model="picCode"/>
        <img :src="picCodeDetail.data" class="pic_code_img" @click="getPicCode"/>
      </div>
    </div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_code.png" class="code_icon"/>
        <span class="phone_text">验证码</span>
      </div>
      <div class="phone_input picturecode_input">
        <input class="tel" placeholder="请输入短信验证码" placeholder-style="color:#ccc" v-model="msgCode"/>
        <span :class="msgDisabled ? 'get_code' : 'get_code_none'" @click="getMsgCode">{{msgHtml}}</span>
      </div>
    </div>
    <button class="next_btn" @click="nextPage">下一步</button>
    <footer>
      注册即代表您已同意<span class="main_color" @click="openFile('https://file.meixinglobal.com/media/20180914/ee7a9a6f-ebfb-496d-9f6b-12fac896c86f.pdf')">iTrade使用条款</span>与<span class="main_color" @click="openFile('https://doc.meixinglobal.com/docs/20170725/80af03af-6870-44ad-aa60-06b1b05892be.pdf')">信息保密协议</span>
    </footer>
  </div>
</template>

<script>
import mxButton from '@/components/button'
export default {
  components: {
    mxButton,
  },
  data () {
    return {
      phoneList: [],
      phoneCodeName: '中国 +86',
      phoneCode: '+86',
      introduce_code: '',
      role: '',
      picCodeDetail: {},
      msgDisabled: true,
      msgHtml: '获取验证码',
      phone: '',
      picCode: '',
      msgCode: ''
    }
  },

  methods: {
    getPhoneCode () {
      this.$http.get('/big_bend/common/cms_content/info', {content_key: 'phone_code'}).then(d => {
        this.phoneList = JSON.parse(d.content)
      })
    },
    getPicCode () {
      this.$http.post('/wx/itrade/common/send_pic').then(d => {
        this.picCodeDetail = d
      })
    },
    selectedPhoneCode (e) {
      let value = this.phoneList[e.target.value]
      this.phoneCode = value.code
      this.phoneCodeName = value.name
    },
    getMsgCode () {
      if (!this.msgDisabled) {
        return
      }
      if (this.phone === '') {
        this.$common.showToast('请输入您的手机号')
        return
      }
      if (this.picCode === '') {
        this.$common.showToast('请输入图片验证码')
        return
      }
      let params = {
        data_id: this.picCodeDetail.dataId,
        phone: this.phoneCode + ' ' + this.phone,
        pic_capatcha: this.picCode
      }
      this.$http.post('/wx/itrade/common/check_pic_send_sms', params).then(d => {
        let i = 60
        this.msgHtml = i + '秒后重新发送'
        this.msgDisabled = false
        let timer = setInterval(() => {
          i--
          this.msgHtml = i + '秒后重新发送'
          this.msgDisabled = false
          if (i === 0) {
            clearInterval(timer)
            this.getPicCode()
            this.picCode = ''
            this.msgCode = ''
            this.msgHtml = '重新获取'
            this.msgDisabled = true
            i = 60
          }
        }, 1000)
      })
    },
    async nextPage () {
      if (this.phone === '') {
        this.$common.showToast('请输入您的手机号')
        return
      }
      if (this.msgCode === '') {
        this.$common.showToast('请输入短信验证码')
        return
      }
      this.$http.get('/wx/itrade/common/check_sms', {phone: this.phoneCode + ' ' + this.phone, sms_code: this.msgCode}).then(async d => {
        console.log(d)
        if (d) {
          let result
          try {
            //
            result = await this.$http.get('/wx/itrade/channel/check_exist', {phone: this.phoneCode + ' ' + this.phone})
            console.log(result)
            if (result) {
              this.showToast('该手机号已注册!请更换手机号注册或登录')
            } else {
              this.toPage({
                url: '/pages/register_complete/main',
                data: {
                  role: this.role,
                  introduce_code: this.introduce_code,
                  phone: this.phoneCode + ' ' + this.phone,
                  verify_code: this.msgCode
                }
              })
            }
          } catch (e) {
            throw new Error(e)
          }
        } else {
          this.$common.showToast('短信验证码错误')
        }
      })
    },
    openFile (url) {
      this.$common.previewFile(url)
    }
  },

  onLoad (option) {
    console.log(option)
    this.introduce_code = option.introduce_code
    this.role = option.role
    this.getPicCode()
    this.getPhoneCode()
    // 数据统计
    this.$auth.dataBuryPoint({
      eventName: 'regist_advisor_phone_info:init:visit',
      eventDataId: '',
      source: this.$root.$mp.query.source,
      utmSource: this.$root.$mp.query.utm_source,
      introduceCode: this.introduce_code,
      shareInvestorId: '',
      prePage: wx.getStorageSync('from')
    })
  },
}
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    min-height: 100%;
    padding: 0 50px;
    background: #fff;
  }
  .login_logo_box{
    text-align: center;
    padding-top: 20px;
    margin-bottom: 90px;
  }
  .login_logo_icon{
    width: 117rpx;
    height: 124rpx;
  }
  .lr_phone{
    color: $fontSizeColor;
    margin-bottom: 45px;
    .phone_icon{
      width: 26px;
      height: 40px;
      margin-right: 28px;
    }
    .phone_text{
      font-size: 26px;
    }
    .phone_input{
      display: flex;
      margin-top: 40px;
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
    .picturecode_input{
      justify-content: space-between;
    }
    .phone_code{
      position: relative;
      width: 180px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 32px;
      padding-right: 30px;
    }
    .phone_code::after{
      content: '';
      position: absolute;
      right: 0;
      top: 18px;
      width: 0px;
      height: 0px;
      border: solid 12px transparent;
      border-top: solid 10px $fontSizeColor;
    }
    .tel{
      font-size: 32px;
      margin-left: 20px;
    }
    .code_icon{
      width: 32px;
      height: 36px;
      margin-right: 23px;
    }
    .pic_code_img{
      width: 170px;
      height: 71px;
    }
    .get_code{
      font-size: 32px;
      color: $mainColor;
    }
    .get_code_none{
      font-size: 32px;
      color: #cccccc;
    }
  }
  .next_btn{
    width: 300px;
    color: #fff;
    font-size: 32px;
    line-height: 88px;
    background: $mainColor;
    box-shadow: 0 10px 16px 0 #ACC7FF;
    border-radius: 44px;
    margin-top: 130px;
  }
  footer{
    position: absolute;
    font-size: 26px;
    color: $lightColor;
    bottom: 30px;
    text-align: center;
    .main_color{
      color: $mainColor
    }
  }
</style>
