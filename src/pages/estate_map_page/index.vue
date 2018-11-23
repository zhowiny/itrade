<template>
  <div class="container">
    <web-view :src="'http://invest.meixincn.com:8081/estate/goole_map.html?estate_id=' + product_id"></web-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '周边配套',
      product_id: ''
    }
  },
  methods: {
  },
  created () {
  },
  onLoad () {
    this.product_id = this.$root.$mp.query.product_id
  }
}
</script>

<style scoped lang="scss">
  .container{
    width: 100%;
    height: 100%;
  }
</style>
