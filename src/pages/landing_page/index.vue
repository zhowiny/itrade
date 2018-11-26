<template>
  <div class="landing">
    <div class="background_img">
      <!--<div>
        <video id="myVideo" direction="0" controls="true" :src="video || 'https://file.meixinglobal.com/media/20180916/17573846-e31e-4ede-bbe6-bcae99d4bb7c.mp4'"  :poster="videoBackground || 'https://file.meixinglobal.com/media/20181103/422e86f1-a3c5-45a5-a719-d790e6d42b44.jpg'"></video>
      </div>-->
      <img :src="videoBackground" mode="widthFix" @click="goWebView" >
      <img :src="backgroundImg" mode="widthFix" >
      <!--<img src="https://pic1.zhimg.com/v2-88470045645317ef334307c0f5180b18_r.jpg"  mode="widthFix">-->
    </div>
    <div class="footer_btn">
      <div @click="concat('4000941580')">
        <img src="/images/icon_kf.png" mode="aspectFit" style="width: 32rpx;height: 32rpx;">
        <span>合作咨询</span>
      </div>
      <div @click="checkUser(1)">
        <img src="/images/icon_hangout.png" mode="aspectFit" style="width: 32rpx;height: 32rpx;">
        <span>逛一逛</span>
      </div>
      <div @click="checkUser">
        <img src="/images/icon_register.png" mode="aspectFit" style="width: 32rpx;height: 32rpx;">
        <span>立即注册</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data () {
      return {
        backgroundImg: '',
        introduce_code: '',
        videoBackground: '',
        video: '',
      }
    },
    async onLoad (params) {
      await this.$auth.login()
      this.setFromLandingPage(true)
      this.introduce_code = params.introduce_code
      let result = await this.$http.post('/wx/itrade/common/carousel_list', {
        size: '1',
        type: '10'
      })
      this.backgroundImg = result[0].img
      let videoData = await this.$http.post('/wx/itrade/common/landingpage')
      this.videoBackground = videoData.bmini_landingpage_cover_img
      this.video = videoData.bmini_landingpage_video
      // 数据统计
      this.$auth.dataBuryPoint({
        eventName: 'landing_page:init:visit',
        eventDataId: this.product_id,
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduce_code,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
    },
    methods: {
      ...mapMutations(['setFromLandingPage']),
      concat (phone) {
        wx.makePhoneCall({
          phoneNumber: phone
        })
      },
      goWebView () {
        wx.setStorageSync('webViewUrl', this.video)
        this.toPage('/pages/web_view_page/main')
      },
      checkUser (tag) {
        if (this.$common.getHasBindPhone()) {
          this.showToast('您已是我们的理财师，可直接进入', () => {
            this.toPage({url: '/pages/index/main', type: 'switchTab'})
          })
        } else if (tag === 1) {
          this.toPage({url: '/pages/index/main', type: 'switchTab'})
        } else {
          if (this.introduce_code) {
            this.toPage('/pages/register_invite_code/main?introduce_code=' + this.introduce_code)
          } else {
            this.toPage('/pages/register_invite_code/main')
          }
        }
      },
    },
  }
</script>
<style scoped lang="scss">
  .landing {
    padding-bottom: 80px;
    .background_img {
      img {
        width: 100vw;
        /*min-height: 100vh;*/
        display: block;
      }
    }
    #myVideo{
      width: 100vw;
      height: 400px;
      display: block;
    }
    .footer_btn {
      @include size(100vw, 80px);
      @include flex();
      position: fixed;
      bottom: 0;
      left: 0;
      background: $mainColor;
      padding: $middle-space $small-space;
      color: #fff;
      text-align: center;
      div {
        @include flex();
        flex: 1;
        &:not(:last-child) {
          border-right: 1px solid #fff;
        }
        span {
          margin-left: $small-space;
        }
      }
    }
  }
</style>
