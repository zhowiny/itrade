<template>
  <div class="share">
    <img :src="img" alt="">
    <div v-if="type === 2" class="open_account" @click="showTool = true">立即邀请</div>
    <div v-if="type === 1" class="open_account" @click="toMiniProgram"> 邀请客户开户 </div>
    <!-- <navigator v-if="type === 1" hover-class="none" class="open_account"
               open-type="navigate" app-id="wxcd7c5762adbd3cf5" :url="path + introduce_code"
               :path="path + introduce_code" target="miniProgram"
               :extra-data="deliverData" version="trial">邀请客户开户</navigator> -->
    <div class="tool" :class="{actived: showTool}">
      <div class="btn_group">
        <button hover-class="none" open-type="share" :data-path="'/pages/landing_page/main?introduce_code=' + introduce_code" >
          <img src="/images/icon_wechat.png" mode="aspectFit" style="width: 67rpx;height: 55rpx;">
          <span>分享给微信好友</span>
        </button>
        <button hover-class="none" @click="toPage({url: '/pages/qrcode/main'})">
          <img src="/images/icon_friend_circle.png" mode="aspectFit" style="width: 62rpx;height: 62rpx;">
          <span>分享至朋友圈</span>
        </button>
      </div>
      <div class="btn_cancel" @click="showTool = false">取消</div>
    </div>
    <div class="mask" v-if="showTool" @click="showTool = false"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '邀请说明',
      img: '',
      type: 1,
      deliverData: {
        introduce_code: '',
        source: 'itrade_wx',
      },
      path: `/pages/open_account/open_account/main?source=itrade_wx&introduce_code=`,
      introduce_code: '',
      showTool: false,
    }
  },

  methods: {
    toMiniProgram () {
      let _this = this
      if (_this.type === 1) {
        // 数据统计
        this.$auth.dataBuryPoint({
          eventName: 'invite_consumer:invite_button:click',
          eventDataId: '',
          source: this.$root.$mp.query.source,
          utmSource: this.$root.$mp.query.utm_source,
          introduceCode: this.introduce_code,
          shareInvestorId: '',
          prePage: wx.getStorageSync('from')
        })
      } else {
        // 数据统计
        this.$auth.dataBuryPoint({
          eventName: 'invite_advisor:send_to_wx_friends:click',
          eventDataId: '',
          source: this.$root.$mp.query.source,
          utmSource: this.$root.$mp.query.utm_source,
          introduceCode: this.introduce_code,
          shareInvestorId: '',
          prePage: wx.getStorageSync('from')
        })
      }
      wx.navigateToMiniProgram({
        appId: 'wxcd7c5762adbd3cf5',
        path: `/pages/open_account/open_account/main?source=itrade_wx&introduce_code=${this.introduce_code}`,
        extraData: {},
        envVersion: 'trial',
        success (res) {
          console.log('成功', res)
        },
        fail (res) {
          console.log('失败', res)
        },
        complete (res) {
          console.log('必然', res)
        },
      })
    },
  },
  async onLoad (params) {
    this.type = parseInt(params.type)
    let status = await this.$http.post('/wx/itrade/channel/advisor_info', {})
    this.introduce_code = status.code
    let type = '6'
    if (this.type === 1) {
      type = '9'
      // 数据统计
      this.$auth.dataBuryPoint({
        eventName: 'invite_consumer:init:visit',
        eventDataId: '',
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduce_code,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
    } else {
      type = '6'
      // 数据统计
      this.$auth.dataBuryPoint({
        eventName: 'invite_advisor_wx:init:visit',
        eventDataId: '',
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduce_code,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
    }
    this.$http.post('/wx/itrade/common/carousel_list', {
      size: '1',
      type: type,
    }).then(res => {
      this.img = res[0].img
    })
  },
}
</script>
<style scoped lang="scss">
 .share {
   height: 120%;
   >img {
     height: 100%;
     width: 100%;
   }
   .open_account {
      @include size(100%, 100px);
      @include flex();
      position: fixed;
      bottom: 0;
      left: 0;
      font-size: 32px;
      color: #fff;
      background: #3774f6;
    }
   .tool {
     position: fixed;
     z-index: 10;
     bottom: 0;
     left: 0;
     width: 100vw;
     transform: translateY(100%);
     transition: transform .3s;
     &.actived {
       transform: translateY(0);
     }
     .btn_group {
       background: $backgroundColor;
       height: 180px;
       @include flex();
       padding: $big-space 0;
       button {
         flex: 1;
         @include flex();
         flex-direction: column;
         color: #555;
         font-size: 22px;
         border-radius:0;
         background:transparent;

         &:after, &:before {
           content: none;
         }
         &:last-child {
           border-left: 1px solid #ddd;
         }
         span {
           margin-top: $small-space;
         }
       }
     }
     .btn_cancel {
       @include size(100vw, 100px);
       @include flex();
       background: #fff;
       color: $lightColor;
     }
   }
   .mask {
     position: fixed;
     top: 0;
     left: 0;
     z-index: 9;
     @include size(100vw, 100vh);
     background: rgba(0,0,0,.3);
   }
 }
</style>
