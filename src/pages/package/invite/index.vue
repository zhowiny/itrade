<template>
  <div class="invite">
    <img :src="img" mode="widthFix">
    <div class="invite_customer" @click="toPage('/pages/package/share/main')"> 邀请客户开户 </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '邀请',
      img: 'https://filehz.meixinglobal.com/20190109/B2EE56610103A84CC13FD8A3510BF563/WechatIMG1.png',
    }
  },

  methods: {
  },
  async onLoad (params) {
  },
  onShareAppMessage (res) {
  },
}
</script>
<style scoped lang="scss">
 .invite {
   min-height: 100vh;
   padding-bottom: 100px;
   >img {
     min-height: 100vh;
     width: 100%;
     display: block;
   }
   .invite_customer {
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
