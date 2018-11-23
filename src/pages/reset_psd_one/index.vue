<template>
  <div class="container">
    <div class="reset_psd">重置密码</div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_phone.png" class="phone_icon"/>
        <span class="phone_text">手机号</span>
      </div>
      <div class="phone_input">
        <picker :range="phoneList" range-key="name" @change="selectedPhoneCode">
          <p class="phone_code">{{phoneCodeName}}</p>
        </picker>
        <input class="tel" placeholder="请输入手机号" placeholder-style="color:#ccc"/>
      </div>
    </div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_code.png" class="code_icon"/>
        <span class="phone_text">验证码</span>
      </div>
      <div class="phone_input picturecode_input">
        <input class="tel" placeholder="请输入图片验证码" placeholder-style="color:#ccc"/>
        <span class="get_code">获取验证码</span>
      </div>
    </div>
    <button class="next_btn">下一步</button>
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
    }
  },

  methods: {
    selectedPhoneCode (e) {
      let value = this.phoneList[e.target.value]
      this.phoneCode = value.code
      this.phoneCodeName = value.name
    },
    getPhoneCode () {
      this.$http.get('/big_bend/common/cms_content/info', {content_key: 'phone_code'}).then(d => {
        this.phoneList = JSON.parse(d.content)
      })
    },
  },

  onLoad () {
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
  .reset_psd{
    font-size: 48px;
    color: $fontSizeColor;
    font-weight: bold;
    margin-bottom: 120px;
    padding-top: 40px;
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
    margin-top: 120px;
  }
</style>
