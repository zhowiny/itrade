<template>
  <div class="container">
    <div class="success_box">
      <img src="/images/icon_success.png" mode="aspectFit" style="width: 166rpx;height: 166rpx;">
      <p>
        计划书申请已提交成功 <br>
        我们会在<b>1-3</b>个工作日给您处理 <br>
        请耐心等候
      </p>
      <div class="btn" @click="toPage('/pages/plan_module/my_plan/main')">查看我的计划书</div>
      <div class="btn back" @click="toPage({url: '/pages/index/main', type: 'switchTab'})">返回首页</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '提交成功',
      }
    },

    async onLoad () {
    },
    methods: {
    },
  }
</script>

<style scoped lang="scss">
  .success_box {
    @include flex(space-around, stretch);
    flex-direction: column;
    @include size(644px, 769px);
    margin: $big-space auto;
    box-shadow: 0 0 100px 0 #c0cede;
    background: #fff;
    border-radius: 8px;
    padding: $big-space;
    text-align: center;
    .btn {
      @include size(100%, 88px);
      @include flex();
      font-size: 32px;
      border-radius: 8px;
      margin-top: $middle-space;
      background: $mainColor;
      color: #fff;
      border: none;
      &.back {
        color: $mainColor;
        border: 2px solid $mainColor;
        background: transparent;
      }
    }
    img {
      margin: $big-space auto;
    }
    p {
      font-size: 28px;
      color: #888;
      margin-bottom: $big-space;
    }
    b {
      display: inline;
      font-size: 32px;
      font-weight: bold;
      color: $mainColor;
    }
  }
</style>
