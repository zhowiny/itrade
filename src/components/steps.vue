<template>
    <div class="steps">
      <div class="step" v-for="(item,index) in steps" :key="index" :class="{actived: index+1 <= active}">
        <div class="step-head">
          <div class="step-head-line" :class="{actived: index+2 <= active}"></div>
          <image v-if="index+1 <= active" class="step--head-icon" mode="aspectFill" src="/images/icon_step_actived.png" style="width: 32rpx;height:32rpx"></image>
          <image v-else class="step--head-icon" mode="aspectFill" src="/images/icon_step.png" style="width: 32rpx;height:32rpx"></image>
        </div>
        <div class="step-main">
          <div class="step-main-title">{{item.time}}</div>
          <div class="step-main-desc">{{item.title}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'steps',
    props: {
      steps: Array,
      active: Number
    },
  }
</script>

<style scoped lang='scss'>
  .steps {
    @include flex();
    @include size(100%, 235px);
    background: #fff;
    .step {
      flex: 1;
      text-align: center;
      &-head {
        @include flex();
        position: relative;
        &-line {
          width: calc(100% - 48px);
          height: 2px;
          background: $lightColor;
          @include center(100%);
          &.actived {
            background: $mainColor;
          }
        }
      }
      &:last-child .step-head-line{
        display: none;
      }
      &-main {
        padding: 0 14px;
        color: #cccccc;
        margin-top: $middle-space;
      }
      &.actived .step-main{
        color: $deepColor;
      }
    }

  }

</style>
