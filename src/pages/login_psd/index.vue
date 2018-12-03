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
        <img src="/images/login_password.png" class="psd_icon"/>
        <span class="phone_text">密码</span>
      </div>
      <div class="phone_input picturecode_input">
        <input class="tel" v-model="password" placeholder="请输入密码" placeholder-style="color:#ccc" :password="true"/>
        <!-- <img src="/images/Hcode.png" class="pic_code_img"/> -->
        <!-- <p class="forget_psd" @click="toPage({url: '/pages/login_vcode/main'})">忘记密码？</p> -->
      </div>
    </div>
    <div class="other">
      <p @click="toPage({url: '/pages/login_vcode/main'})">验证码登录</p>
      <p @click="toPage({url: '/pages/register_invite_code/main'})">快速注册</p>
    </div>
    <button class="next_btn" @click="loginWithPsd">登录</button>
    <footer>
      登陆即代表您已同意<span class="main_color" @click="openFile('https://filehz.meixinglobal.com/20181203/298400af-787c-42de-a6ed-8490aad9e598.pdf')">iTrade使用条款</span>与<span class="main_color" @click="openFile('https://doc.meixinglobal.com/docs/20170725/80af03af-6870-44ad-aa60-06b1b05892be.pdf')">信息保密协议</span>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phoneList: [],
      phoneCodeName: '中国 +86',
      phoneCode: '+86',
      password: '',
      phone: ''
    }
  },

  methods: {
    loginWithPsd () {
      if (this.phone === '') {
        this.$common.showToast('请输入您的手机号')
        return
      }
      if (this.password === '') {
        this.$common.showToast('请输入您的密码')
        return
      }
      this.$http.post('/wx/itrade/channel/advisorLoginByPwd', {phone: this.phoneCode + ' ' + this.phone, password: this.password}).then(d => {
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
    getPhoneCode () {
      this.$http.get('/big_bend/common/cms_content/info', {content_key: 'phone_code'}).then(d => {
        this.phoneList = JSON.parse(d.content)
      })
    },
    selectedPhoneCode (e) {
      let value = this.phoneList[e.target.value]
      this.phoneCode = value.code
      this.phoneCodeName = value.name
    },
    openFile (url) {
      this.$common.previewFile(url)
    }
  },

  onLoad () {
    this.$auth.login()
    this.getPhoneCode()
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
    overflow: hidden;
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
    .get_code{
      font-size: 32px;
      color: $mainColor;
    }
    .get_code_none{
      font-size: 32px;
      color: #cccccc;
    }
    .psd_icon{
      width: 30px;
      height: 40px;
      margin-right: 24px;
    }
    .forget_psd{
      line-height: 52px;
      color: $lightColor;
      font-size: 26px;
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
