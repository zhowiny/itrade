<template>
  <div class="container">
    <div class="success_box">
      <img src="/images/icon_success.png" mode="aspectFit" style="width: 166rpx;height: 166rpx;">
      <p v-if="status === 'MATCH'">
        已成功匹配计划书库文件
      </p>
      <p v-else>
        计划书申请已提交成功 <br>
        我们会在<b>1-2</b>个工作日给您处理 <br>
        请耐心等候
      </p>
      <div v-if="status === 'MATCH'" class="btn" @click="toPage({url: '/pages/plan_module/plan_detail/main', data: {planId: planId}})">查看文件</div>
      <div v-else class="btn" @click="toPage('/pages/plan_module/my_plan/main')">查看我的计划书</div>
      <div v-if="productId" class="btn back" @click="toPage({url: '/pages/insurance_details_page/main', data: {product_id: productId, product_type: 3}})">返回产品</div>
      <div v-else class="btn back" @click="toPage({url: '/pages/index/main', type: 'switchTab'})">返回首页</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '提交成功',
        planId: '',
        status: '',
        productId: '',
      }
    },

    onLoad () {
      this.planId = this.$mp.query.plan_id
      this.status = this.$mp.query.success_enum
      this.productId = this.$mp.query.productId
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
