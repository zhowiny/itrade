<template>
  <div class="invest-container">
    <canvas canvas-id="invest" :style='"width: "+canvas.width+"px;height:"+canvas.height+"px"' @longtap="getSetting"></canvas>
    <div class="save"  @click="getSetting">保存海报</div>
    <p>点击保存，分享到朋友圈</p>

    <cover-view class="mask" v-if="showTip">
      <cover-view class="toast">
        <cover-view class="close"  @click="showTip = false">&times;</cover-view>
        <cover-view class="ul">
          <cover-view class="li">·图片已保存到相册</cover-view>
          <cover-view class="li">·由于小程序分享限制，请到朋友圈上传图片分享</cover-view>
        </cover-view>
        <cover-view class="btn" @click="showTip = false">继续分享</cover-view>
        <!--<navigator
          class="btn"
          target="miniProgram"
          open-type="exit"
          version="release"
        >继续分享</navigator>-->
      </cover-view>
      <cover-image class="img" src="/images/icon_save.png" mode="aspectFit" style="width: 140rpx; height: 140rpx;"/>
    </cover-view>
    <!--<div class="share">
      <button open-type="share" :data-path="'/pages/landing_page/main?introduce_code=' + introduce_code" >
        <img src="/images/icon_hangout.png" mode="aspectFit" style="width: 32rpx;height:32rpx;">
        <span>发送给朋友</span>
      </button>
      <button @click="getSetting">
        <img src="/images/icon_friends.png" mode="aspectFit" style="width: 32rpx;height:32rpx;">
        <span>发送到朋友圈</span>
      </button>
    </div>-->
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
          height = e.windowHeight - 80
        }
      })
      return {
        canvas: {
          radius: 100,
          width,
          height,
          context,
        },
        qrcode: '',
        backgroundImg: '',
        showTip: false,
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
          // path: '/pages/register_invite_code/main?introduce_code=' + this.introduce_code,
          path: '/pages/landing_page/main?introduce_code=' + this.introduce_code,
          type: 2, // 1 活动 2 B端 3 C端
        })
        let result = await this.$http.post('/wx/itrade/common/carousel_list', {
          size: '1',
          type: '3'
        })
        let img = await this.downloadImg([result[0].img, this.qrcode])
        this.backgroundImg = img[0]
        this.qrcode = img[1]
        this.initChat()
        // this.showToast({
        //   title: '请长按保存图片'
        // })
      } catch (e) {
        throw new Error(e)
      }
    },
    methods: {
      initChat () {
        let {context, width, height} = this.canvas
        let qrcodeSize = 150
        let top = height / 4 * 2.5
        // let text = '我的邀请码:' + this.introduce_code
        let text = '长按识别二维码'

        context.drawImage(this.backgroundImg, 0, 0, width, height)
        this.qrcode && context.drawImage(this.qrcode, width / 2 - (qrcodeSize / 2), top, qrcodeSize, qrcodeSize)
        context.fillStyle = '#000'
        context.setFontSize(20)
        context.setTextAlign('center')
        context.setTextBaseline('middle')
        context.fillText(text, width / 2, top + qrcodeSize + 20)
        wx.drawCanvas({
          canvasId: 'invest',
          actions: this.canvas.context.getActions()
        })
      },
      /**
       * 下载图片
       * @param images=[]
       */
      downloadImg (images = []) {
        images = images.filter(i => i)
        let temp = []
        let count = 0
        console.log(images)
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
                x: 0,
                y: 0,
                width: this.canvas.width,
                height: this.canvas.height,
                destWidth: this.canvas.width,
                destHeight: this.canvas.height,
                canvasId: 'invest',
                success: (res) => {
                  console.log(res.tempFilePath)
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: (res) => {
                      console.log(res)
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
              console.log(res)
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success (res) {
                  console.log(this)
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
    .save {
      margin: $big-space * 2 auto 0;
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
    @include size(100vw, 80px);
    @include flex();
    background: $mainColor;
    color: #fff;
    button {
      background: $mainColor;
      color: #fff;
      border: none;
      margin: 0;
      padding: 0;
      line-height: normal;
      flex: 1;
      text-align: center;
      border-radius: 0;
      font-size: 28px;
      @include flex();
      img {
        margin-right: $small-space;
      }
      &:first-child {
        border-right: 1px solid #fff;
      }
      &:after,&:before {
        content: none;
      }
    }
  }
</style>
