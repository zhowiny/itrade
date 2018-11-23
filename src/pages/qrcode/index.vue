<template>
  <div class="invest-container">
    <canvas canvas-id="invest" :style='"width: "+canvas.width+"px;height:"+canvas.height+"px"' @longtap="getSetting"></canvas>
    <div class="share">
      <button open-type="share" :data-path="'/pages/landing_page/main?introduce_code=' + introduce_code" >
        <img src="/images/icon_hangout.png" mode="aspectFit" style="width: 32rpx;height:32rpx;">
        <span>发送给朋友</span>
      </button>
      <button @click="getSetting">
        <img src="/images/icon_friends.png" mode="aspectFit" style="width: 32rpx;height:32rpx;">
        <span>发送到朋友圈</span>
      </button>
    </div>
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
          width = e.windowWidth
          height = e.windowHeight - 40
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
      }
    },
    computed: {
      point () {
        return {x: this.canvas.width / 2, y: this.canvas.radius + 40}
      }
    },
    async onLoad () {
      this.introduce_code = this.$common.getAdvisorId()
      try {
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
        let text = '长按识别小程序码'

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
                success: function (res) {
                  console.log(res.tempFilePath)
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (res) {
                      console.log(res)
                      wx.showToast({title: '保存成功'})
                    },
                    fail: function (res) {
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
