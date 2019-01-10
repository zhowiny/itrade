<template>
  <div class="trusteeship">
    <h1>选择托管服务</h1>
    <div @click="toPage({url: '/pages/house_trust/main'})">
      <img src="/images/bg_trusteeship.png" class="bg">
      <h2>
        <img src="/images/icon_trusteeship2.png" mode="aspectFit" style="width: 65rpx;height:60rpx;">
        房产托管
      </h2>
      <p>提供房产证办理、委托出租、账单查询及代缴、委托出手，房屋价格评估、房屋装修、维修及日常维护等10余种服务项目</p>
    </div>
    <!--<div @click="toPage('/pages/package/insurance_landing_page/main')">-->
    <div @click="toPage('/pages/package/invite/main')">
      <img src="/images/bg_trusteeship.png" class="bg">
      <h2>
        <img src="/images/icon_trusteeship1.png" mode="aspectFit" style="width: 65rpx;height:60rpx;">
        保单托管
      </h2>
      <p>提供续保、退保、理赔、提取红利、保单复效、保单贷款、更改附加险、更改信息等10余种售后服务</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '托管服务',
    }
  },

  methods: {
  },
  async onLoad (params) {
  },
}
</script>
<style scoped lang="scss">
  .trusteeship {
    @include size(100vw, 100vh);
    background: #fff;
    h1 {
      font-size: 42px;
      padding-top: 80px;
      text-align: center;
    }
    >div {
      @include size(600px, 300px);
      margin: 80px auto 0;
      position: relative;
      color: #fff;
      @include flex();
      padding: 0 80px;
      flex-direction: column;
      box-shadow: 5px 10px 30px transparentize($mainColor, .5);
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        @include size(600px, 300px);
        z-index: 0;
      }
      h2 {
        @include flex();
        font-size: 32px;
        img {
          margin-right: $middle-space;
        }
      }
      p {
        font-size: 24px;
        margin-top: $big-space;
      }
      h2, p {
        position: relative;
        z-index: 1;
      }
    }
  }
</style>
