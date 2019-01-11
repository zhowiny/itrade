<template>
  <div class="container">
    <div class="file">
      <img src="/images/icon_pdf.png" mode="aspectFit" style="width:128rpx;height:128rpx;">
      <p>{{title}}</p>
    </div>
    <div class="btn" @click="preview">点击查看</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '文件',
        filePath: '',
        fileType: 'pdf',
      }
    },
    async onLoad (params) {
      this.title = params.title
      this.filePath = params.filePath
      this.fileType = params.fileType
      wx.setNavigationBarTitle({
        title: this.title
      })
    },
    methods: {
      preview () {
        this.$common.previewFile(this.filePath, this.fileType)
      },
    },
    onShareAppMessage (res) {
      return {
        title: this.title,
        imageUrl: '/images/icon_pdf.png',
        path: `/pages/share_file/main?fileType=${this.fileType}&filePath=${this.filePath}&title=${this.title}`,
      }
    },
    components: {
    },
  }
</script>

<style lang="scss" scoped>
  .file {
    text-align: center;
    padding: $big-space;
  }
  .btn {
    margin: $big-space;
    background: $mainColor;
    color: #fff;
    @include flex();
    font-size: 28px;
    padding: $middle-space
  }
</style>
