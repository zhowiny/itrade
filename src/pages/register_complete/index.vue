<template>
  <div class="container">
    <div class="login_logo_box">
      <img class="login_logo_icon" src="/images/login_logo.png"/>
    </div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_name.png" class="name_icon"/>
        <span class="phone_text">姓名</span>
      </div>
      <div class="phone_input picturecode_input">
        <input class="tel" placeholder="请输入姓名" v-model="name" placeholder-style="color:#ccc"/>
        <!-- <img src="/images/Hcode.png" class="pic_code_img"/> -->
      </div>
    </div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_email.png" class="email_icon"/>
        <span class="phone_text">邮箱</span>
      </div>
      <div class="phone_input picturecode_input">
        <input class="tel" placeholder="请输入有效邮箱" v-model="email" placeholder-style="color:#ccc"/>
      </div>
    </div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_password.png" class="psd_icon"/>
        <span class="phone_text">登录密码</span>
      </div>
      <div class="phone_input picturecode_input">
        <input class="tel" placeholder="请输入登录密码" v-model="password" placeholder-style="color:#ccc" :password="!orShowPsd"/>
        <div class="psd_img_box" @click="changePsd">
          <img :class="orShowPsd ? 'show_psd_icon' : 'hidden_psd_icon'" :src="orShowPsd ? '/images/login_show_psd.png' : '/images/login_hidden_psd.png'"/>
        </div>
      </div>
    </div>
    <button class="next_btn" @click="completeRegister">完成</button>
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
      orShowPsd: true,
      name: '',
      email: '',
      password: '',
      role: '',
      introduce_code: '',
      phone: '',
      verify_code: ''
    }
  },

  methods: {
    changePsd () {
      this.orShowPsd = !this.orShowPsd
    },
    completeRegister () {
      if (this.name === '') {
        this.$common.showToast('请输入您的姓名')
        return
      }
      if (this.email === '') {
        this.showToast('请输入您的邮箱')
        return
      } else {
        let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (reg.test(this.email)) {
        } else {
          this.$common.showToast('邮箱格式不正确')
          return
        }
      }
      if (this.password === '') {
        this.$common.showToast('请输入您的登录密码')
        return
      }
      let params = {
        email: this.email,
        introduce_code: this.introduce_code,
        name: this.name,
        password: this.password,
        phone: this.phone,
        role: this.role,
        verify_code: this.verify_code
      }
      this.$http.post('/wx/itrade/channel/addChannelApply', params).then(d => {
        console.log(d)
        if (d) {
          // this.toPage({
          //   url: '/pages/login_psd/main'
          // })
          this.login()
        } else {
          this.$common.showToast('注册失败，请稍后重试')
        }
      })
    },
    login () {
      this.$http.post('/wx/itrade/channel/advisorLoginByPwd', {phone: this.phone, password: this.password}).then(d => {
        console.log(d)
        this.$common.setIsLegalize(d.is_legalize)
        this.$common.setAdvisorId(d.advisor_id)
        this.$common.setUserInfo(d.has_info)
        this.toPage({
          url: '/pages/index/main',
          type: 'switchTab'
        })
      })
    },
    openFile (url) {
      this.$common.previewFile(url)
    }
  },

  onLoad (option) {
    console.log(option)
    this.role = option.role
    this.introduce_code = option.introduce_code
    this.phone = option.phone.replace(/%2B/ig, '+').replace(/%20/ig, ' ')
    this.verify_code = option.verify_code
    console.log(this.phone)
    // 数据统计
    this.$auth.dataBuryPoint({
      eventName: 'regist_advisor_base_info:init:visit',
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
    .name_icon{
      width: 33px;
      height: 39px;
      margin-right: 22px;
    }
    .pic_code_img{
      width: 170px;
      height: 71px;
    }
    .email_icon{
      width: 35px;
      height: 35px;
      margin-right: 20px;
    }
    .psd_icon{
      width: 30px;
      height: 40px;
      margin-right: 24px;
    }
    .psd_img_box{
      width: 80px;
      text-align: center;
    }
    .show_psd_icon{
      width: 38px;
      height: 33px;
      vertical-align: middle;
    }
    .hidden_psd_icon{
      width: 37px;
      height: 18px;
      vertical-align: middle;
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
    margin-top: 120px;
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
