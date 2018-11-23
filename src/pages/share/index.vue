<template>
  <div class="share">
    <img :src="img" alt="">
    <div v-if="type === 2" class="open_account" @click="toPage({url: '/pages/qrcode/main'})">立即邀请</div>
    <div v-if="type === 1" class="open_account" @click="toMiniProgram"> 邀请客户开户 </div>
    <!-- <navigator v-if="type === 1" hover-class="none" class="open_account"
               open-type="navigate" app-id="wxcd7c5762adbd3cf5" :url="path + introduce_code"
               :path="path + introduce_code" target="miniProgram"
               :extra-data="deliverData" version="trial">邀请客户开户</navigator> -->
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
        envVersion: 'develop',
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
    this.introduce_code = await this.$common.getAdvisorId()
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
   img {
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
 }
</style>
