<template>
  <div class="pie-container">
    <canvas canvas-id="pie" :style='"width: "+canvas.width+"px;height:"+canvas.height+"px"'></canvas>
  </div>
</template>

<script>
  export default {
    name: 'pie',
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data () {
      let width, height, context
      context = wx.createCanvasContext('pie')
      wx.getSystemInfo({
        success (e) {
          width = e.windowWidth
          height = e.windowHeight
        }
      })
      let colors = ['#00ad74', '#56bdde', '#ffbc00', '#b198dc', '#ff6666', '#ffaa40', '#ff8e00', '#b1db49']
        .concat(Array.apply(null, {length: 20}).map(() => '#' + (Math.random().toString(16).substr(2, 6))))
      return {
        canvas: {
          radius: 100,
          width,
          height,
          context,
          colors,
        },
        delay: 500,
      }
    },
    computed: {
      total () {
        let total = 0
        this.data.forEach(item => {
          total += item.value
        })
        return total
      },
      point () {
        return {x: this.canvas.width / 2, y: this.canvas.radius + 40}
      }
    },
    onLoad () {
      this.animate()
      // this.initChat()
    },
    methods: {
      initChat () {
        this.createPie()
        this.createText(this.point)
        this.createMenu()
        this.drawChat()
      },
      createPie () {
        let {context, colors, radius} = this.canvas
        let point = this.point
        let start = -Math.PI / 2
        let data = this.data
        let total = this.total
        data.forEach((item, index) => {
          let end = start + item.value / total * 2 * Math.PI
          context.beginPath()
          context.arc(point.x, point.y, radius, start, end, false)
          context.lineTo(point.x, point.y)
          context.setFillStyle(colors[index])
          context.fill()
          context.closePath()
          start = end
        })
        context.beginPath()
        context.setFillStyle('#fff')
        context.arc(point.x, point.y, radius / 3 * 2, 0, 2 * Math.PI, false)
        context.fill()
        context.closePath()
      },
      createText (point) {
        let {context} = this.canvas
        context.beginPath()
        context.setTextAlign('center')
        context.setTextBaseline('middle')
        context.setFillStyle('#00ad74')
        context.setFontSize(12)
        context.fillText('在投总额(美元)', point.x, point.y - 10)
        context.setFontSize(20)
        context.fillText(this.total.toFixed(2), point.x, point.y + 10)
        context.fill()
        context.closePath()
      },
      createMenu () {
        let {context, colors, width} = this.canvas
        this.data.forEach((item, index) => {
          let x = (index % 2) * width / 2 + 20
          let y = Math.floor(index / 2) * 35 + 300
          context.beginPath()
          context.setFillStyle(colors[index])
          context.arc(x, y, 5, 2 * Math.PI)
          context.fill()
          context.setFillStyle('#333')
          context.setFontSize(15)
          context.setTextAlign('left')
          context.fillText(item.title, x + 15, y)
          context.setTextAlign('right')
          context.fillText((item.value / this.total * 100).toFixed(2) + '%', width / (index % 2 || 2) - 20, y)
          context.closePath()
        })
      },
      drawChat () {
        wx.drawCanvas({
          canvasId: 'pie',
          actions: this.canvas.context.getActions()
        })
      },
      animate () {
        let delay = this.delay
        let radius = this.canvas.radius
        let speed = radius / (delay / (1000 / 60))
        this.canvas.radius = 0
        let timer = setInterval(() => {
          if (this.canvas.radius >= radius) {
            clearInterval(timer)
            this.initChat()
            return
          }
          this.canvas.radius += speed
          this.canvas.radius = this.canvas.radius > radius ? radius : this.canvas.radius
          this.createPie()
          this.drawChat()
        }, 1000 / 60)
      }
    }
  }
</script>

<style scoped lang='scss'>
</style>
