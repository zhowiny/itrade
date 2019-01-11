<template>
  <div class="invest-container">
    <canvas canvas-id="invest" :style='"width: "+canvas.width+"px;height:"+canvas.height+"px;"'></canvas>
    <cover-view class="mask" v-if="showTip">
      <cover-view class="toast">
        <cover-view class="close"  @click="showTip = false">&times;</cover-view>
        <cover-view class="ul">
          <cover-view class="li">·图片已保存到相册</cover-view>
          <cover-view class="li">·你可从相册选择图片发送给微信好友或朋友圈</cover-view>
        </cover-view>
        <cover-view class="btn" @click="showTip = false">好的</cover-view>
      </cover-view>
      <cover-image class="img" src="/images/icon_save.png" mode="aspectFit" style="width: 140rpx; height: 140rpx;"/>
    </cover-view>
    <cover-view class="share">
      <cover-view class="btn">
        <button @click="getSetting">
          保存海报
        </button>
      </cover-view>
      <cover-view class="btn">
        <button @click="toMiniProgram">
          分享C端小程序
        </button>
      </cover-view>
    </cover-view>
  </div>
</template>

<script>
  export default {
    name: 'invest',
    data () {
      let width, height, context
      context = wx.createCanvasContext('invest')
      wx.getSystemInfo({
        success (e) {
          width = e.windowWidth - 40
          height = width * 1.774
        }
      })
      return {
        canvas: {
          radius: 100,
          width,
          height,
          context,
        },
        qrcode: 'https://filehz.meixinglobal.com/TwoDimensionCodeImage/20190109/d0089f74-c576-4919-b562-009a1f54d349.png',
        backgroundImg: 'https://filehz.meixinglobal.com/20190109/C5A686CD00F19D094FEE1A54D2EF3AA1/WechatIMG2.png',
        showTip: false,
        img: '',
      }
    },
    computed: {
      point () {
        return {x: this.canvas.width / 2, y: this.canvas.radius + 40}
      }
    },
    async onLoad () {
      try {
        let status = await this.$http.post('/wx/itrade/channel/advisor_info', {})
        this.introduce_code = status.code
        this.qrcode = await this.$http.get('/wx/advisor/mini/get/qrcode', {
          path: '/pages/after_service/insurance_landing_page/main?introduce_code=' + this.introduce_code,
          type: 3, // 1 活动 2 B端 3 C端
        })
        let img = await this.downloadImg([this.backgroundImg, this.qrcode])
        this.backgroundImg = img[0]
        this.qrcode = img[1]
        this.initChat()
      } catch (e) {
        throw new Error(e)
      }
    },
    onUnload () {
      let d = this.$options.data()
      this.backgroundImg = d.backgroundImg
    },
    methods: {
      toMiniProgram () {
        wx.navigateToMiniProgram({
          appId: 'wxcd7c5762adbd3cf5',
          path: `pages/after_service/insurance_landing_page/main?source=itrade_wx&introduce_code=${this.introduce_code}`,
          extraData: {},
          envVersion: 'trial',
          // envVersion: 'develop',
        })
      },
      initChat () {
        let {context, width, height} = this.canvas
        let qrcodeSize = 100
        let top = height - qrcodeSize - 20
        // let text = '我的邀请码:' + this.introduce_code
        // let text = '长按识别二维码'

        context.drawImage(this.backgroundImg, 0, 0, width, height)
        this.qrcode && context.drawImage(this.qrcode, width / 2 - (qrcodeSize / 2), top, qrcodeSize, qrcodeSize)
        wx.drawCanvas({
          canvasId: 'invest',
          actions: this.canvas.context.getActions()
        })
        // wx.canvasToTempFilePath({
        //   canvasId: 'invest',
        //   success: (res) => {
        //     this.img = res.tempFilePath
        //     console.log(this.img)
        //   }
        // })
      },
      /**
       * 下载图片
       * @param images=[]
       */
      downloadImg (images = []) {
        images = images.filter(i => i)
        let temp = []
        let count = 0
        this.showLoading({title: '加载中'})
        return new Promise((resolve, reject) => {
          images.forEach((item, index) => {
            wx.downloadFile({
              url: item,
              success: (res) => {
                if (res.statusCode === 200) {
                  count++
                  temp.push({index: index, img: res.tempFilePath})
                  if (count === images.length) {
                    temp.sort((a, b) => (a.index > b.index))
                    let img = temp.map(i => i.img)
                    this.hideLoading()
                    resolve(img)
                  }
                }
              },
              fail: (err) => {
                reject(err)
              },
            })
          })
        })
      },
      saveImg (e) {
        this.showModal({
          title: '提示',
          content: '是否保存当前页面图片?',
          success: (res) => {
            if (res.confirm) {
              wx.canvasToTempFilePath({
                // x: 0,
                // y: 0,
                // width: this.canvas.width,
                // height: this.canvas.height,
                // destWidth: this.canvas.width,
                // destHeight: this.canvas.height,
                canvasId: 'invest',
                success: (res) => {
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: (res) => {
                      this.buryPoint('invite_advisor:send_to_wx_zone:click')
                      // wx.showToast({title: '保存成功'})
                      this.showTip = true
                    },
                    fail: (res) => {
                      console.log(res)
                    }
                  })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      getSetting () {
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success (res) {
                  this.saveImg()
                },
                fail (err) {
                  console.log(err, 'err')
                }
              })
            } else {
              this.saveImg()
            }
          }
        })
      },
      buryPoint (event) {
        this.$auth.dataBuryPoint({
          eventName: event,
          eventDataId: '',
          source: this.$root.$mp.query.source,
          utmSource: this.$root.$mp.query.utm_source,
          introduceCode: this.introduce_code,
          shareInvestorId: '',
          prePage: wx.getStorageSync('from')
        })
      },
    },
    onShareAppMessage (res) {
      return {
        title: 'iTrade邀你立刻成为国际化理财师！',
        imageUrl: '/images/share.png',
        path: '/pages/landing_page/main?introduce_code=' + this.introduce_code
      }
    },
  }
</script>

<style scoped lang='scss'>
  .invest-container {
    padding-bottom: 150px;
    .save {
      margin: $big-space auto 0;
      @include size(443px, 70px);
      font-size: 32px;
      color: #fff;
      background: $mainColor;
      @include flex();
      border-radius: 8px;
    }
    >p {
      font-size: 24px;
      color: $lightColor;
      text-align: center;
    }
    canvas {
      margin: 0 auto;
      box-shadow: 0 0 100px 0 #aaa;
    }
    .toast {
      position: fixed;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      @include size(490px, 390px);
      padding-top: 100px;
      box-sizing: border-box;
      border-radius: 10px;
      .ul {
        padding-left: 50px;
        padding-right: 50px;
        padding-bottom: $middle-space;
      }
      .li {
        font-size: 28px;
        line-height: 1.6em;
        margin-bottom: $middle-space;
        @include flex(flex-start);
        flex-wrap: wrap;
        white-space: pre-line;
      }
      .close {
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .btn {
        @include size(100%, 100px);
        @include flex();
        background: transparentize($mainColor, .8);
        font-size: 32px;
        line-height: 100px;
        text-align: center;
      }
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    @include size(100vw, 100vh);
    background: rgba(0,0,0,.3);
    .img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform:translate(-50%, -190%);
      z-index:11;
    }
  }
  .share {
    position: fixed;
    bottom: 0;
    left: 0;
    @include size(100vw, 88px);
    @include flex(center, stretch);
    background: $mainColor;
    color: #fff;
    .btn {
      width: 50vw;
      line-height: 88px;
      background: $mainColor;
      color: #fff;
      @include flex();
      &:first-child {
        background: #fff;
        color: $mainColor;
      }
    }
    button {
      border: none;
      margin: 0;
      padding: 0;
      line-height: normal;
      text-align: center;
      border-radius: 0;
      font-size: 32px;
      background:transparent;
      color: inherit;
      &:after,&:before {
        content: none;
      }
    }
  }
</style>
