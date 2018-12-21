<template>
  <div class="container">
    <div class="login_logo_box">
      <img class="login_logo_icon" src="/images/login_logo.png"/>
    </div>
    <p class="title">iTrade为邀请注册制，您可以：</p>
    <p class="notice">-通过iTrade注册理财师获得邀请码</p>
    <p class="notice">-联系客服热线：<span class="main_color">4000941580</span></p>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_invite_code.png" class="invite_code_icon"/>
        <span class="phone_text">邀请码</span>
      </div>
      <div class="phone_input picturecode_input">
        <input :class="orDisabled ? 'tel_none' : 'tel'" v-model="introduce_code" placeholder="请输入邀请码" placeholder-style="color:#ccc" :disabled="orDisabled" @confirm="checkIntroCode"/>
      </div>
    </div>
    <!-- <div class="identity">
      <div class="identity_option" @click="chooseIdentity('4')">
        <img class="identity_icon" :src="role == '4' ? '/images/login_advisor_active.png' : '/images/login_advisor.png'"/>
        <p :class="role == '4' ? 'advisor_text main_color' : 'advisor_text'">独立理财师</p>
      </div>
      <div class="identity_option" @click="chooseIdentity('3')">
        <img class="identity_icon" :src="role == '3' ? '/images/login_jigou_active.png' : '/images/login_jigou.png'"/>
        <p :class="role == '3' ? 'advisor_text main_color' : 'advisor_text'">理财机构</p>
      </div>
    </div> -->
    <button class="next_btn" @click="nextPage">下一步</button>
    <p class="login" @click="toPage('/pages/login_vcode/main')">已有账号，去登录</p>
    <footer>
      注册即代表您已同意<span class="main_color" @click="openFile('https://filehz.meixinglobal.com/20181203/298400af-787c-42de-a6ed-8490aad9e598.pdf')">iTrade使用条款</span>与<span class="main_color" @click="openFile('https://doc.meixinglobal.com/docs/20170725/80af03af-6870-44ad-aa60-06b1b05892be.pdf')">信息保密协议</span>
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
      introduce_code: '',
      isTrueCode: false,
      role: 4,
      // orShowCode: true
      orDisabled: false
    }
  },

  methods: {
    chooseIdentity (type) {
      this.role = type
    },
    async checkIntroCode () {
      if (this.introduce_code === '') {
        this.$common.showToast('请输入您的邀请码')
        return
      }
      let data = await this.$http.get('/wx/itrade/channel/register/check_intro_code', {introduce_code: this.introduce_code})
      this.isTrueCode = data
    },
    async nextPage () {
      if (this.introduce_code === '') {
        this.$common.showToast('请输入您的邀请码')
        return
      }
      await this.checkIntroCode()
      if (!this.isTrueCode) {
        // this.$common.showToast('请选择您的身份')
        return
      }
      if (!this.role) {
        this.$common.showToast('请选择您的身份')
        return
      }
      this.toPage({
        url: '/pages/register_phone/main',
        data: {
          role: this.role,
          introduce_code: this.introduce_code
        }
      })
    },
    openFile (url) {
      this.$common.previewFile(url)
    }
  },

  onLoad (option) {
    if (option.introduce_code) {
      this.introduce_code = option.introduce_code
      if (option.introduce_code.charAt(0, 1) === 'w') {
        this.orDisabled = true
      } else {
        this.orDisabled = false
      }
    }
    // 数据统计
    this.$auth.dataBuryPoint({
      eventName: 'regist_advisor_invite_code:init:visit',
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
    margin-bottom: 50px;
  }
  .login_logo_icon{
    width: 117rpx;
    height: 124rpx;
  }
  .title{
    font-size: 32px;
    color: #444;
    font-weight: bold;
    text-align: center;
    margin-bottom: 25px;
  }
  .notice{
    color: $lightColor;
    text-align: left;
    line-height: 50px;
    width:64vw;
    margin:0 auto;
  }
  .lr_phone{
    color: $fontSizeColor;
    margin-bottom: 100px;
    margin-top: 100px;
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
    .tel{
      font-size: 32px;
      margin-left: 20px;
    }
    .tel_none{
      color: $lightColor;
      font-size: 32px;
      margin-left: 20px;
    }
    .invite_code_icon{
      width: 35px;
      height: 35px;
      margin-right: 20px;
    }
  }
  .identity{
    display: flex;
    margin-top: 90px;
    margin-bottom: 100px;
    justify-content: space-around;
    .identity_option{
      font-size: 32px;
      color: #ccc;
      text-align: center;
    }
    .identity_icon{
      width: 110px;
      height: 110px;
      margin-bottom: 50px;
    }
  }
  .other{
    display: flex;
    justify-content: space-between;
    font-size: 26px;
    color: $mainColor;
    margin-top: 70px;
    margin-bottom: 60px;
  }
  .next_btn{
    width: 300px;
    color: #fff;
    font-size: 32px;
    line-height: 88px;
    background: $mainColor;
    box-shadow: 0 10px 16px 0 #ACC7FF;
    border-radius: 44px;
  }
  .login {
    text-decoration: underline;
    color: $lightColor;
    text-align: center;
    width: 50vw;
    margin: 0 auto;
    padding: $big-space * 2 $big-space;
  }
  footer{
    position: absolute;
    font-size: 26px;
    color: $lightColor;
    bottom: 30px;
    text-align: center;
  }
  .main_color{
    color: $mainColor
  }
</style>
