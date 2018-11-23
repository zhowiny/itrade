<template>
  <div class="container">
    <web-view :src="url"></web-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: '',
      title: 'iTrade顾问端',
    }
  },

  components: {
  },

  methods: {
  },

  created () {
  },
  async mounted () {
    this.url = await wx.getStorageSync('webViewUrl')
    if (this.$common.version === '1.0.1') {
      this.url = this.url.replace('https://weixin.fortunefed.com/#/', 'https://weixin.fortunefed.com/prod/#/')
    }
    console.log(this.url)
    let title = (this.$mp.query.title && decodeURI(this.$mp.query.title)) || this.title
    wx.setNavigationBarTitle({
      title
    })
  }
}
</script>

<style scoped>

</style>
