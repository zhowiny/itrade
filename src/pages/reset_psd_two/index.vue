<template>
  <div class="container">
    <div class="reset_psd">重置密码</div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_password.png" class="psd_icon"/>
        <span class="phone_text">设置新密码</span>
      </div>
      <div class="phone_input picturecode_input">
        <input class="tel" placeholder="请设置新密码" placeholder-style="color:#ccc"/>
      </div>
    </div>
    <div class="lr_phone">
      <div class="phone_label">
        <img src="/images/login_password.png" class="psd_icon"/>
        <span class="phone_text">确认密码</span>
      </div>
      <div class="phone_input picturecode_input">
        <input class="tel" placeholder="请确认密码" placeholder-style="color:#ccc"/>
      </div>
    </div>
    <button class="next_btn">完成</button>
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
    }
  },

  methods: {
  },

  created () {
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
    .tel{
      font-size: 32px;
      margin-left: 20px;
    }
    .psd_icon{
      width: 30px;
      height: 40px;
      margin-right: 24px;
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
