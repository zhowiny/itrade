<template>
  <div class="container">
    <div class="search_bar">
      <img src="/images/search.png" mode="aspectFit" style="width: 28rpx;height:29rpx;">
      <input placeholder-class="placeholder" type="text" placeholder="请输入产品名、被保人、投保人进行搜索">

    </div>
    <div class="status_bar">
      <div :class="{active: activeIndex === 0}" @click="activeIndex = 0">
        <wx-badge :isHidden="true" :value="2">全部</wx-badge>
      </div>
      <div :class="{active: activeIndex === 1}" @click="activeIndex = 1">
        <wx-badge :isHidden="true" :value="2">处理中</wx-badge>
      </div>
      <div :class="{active: activeIndex === 2}" @click="activeIndex = 2">
        <wx-badge :isHidden="false" :value="2">需复查</wx-badge>
      </div>
      <div :class="{active: activeIndex === 3}" @click="activeIndex = 3">
        <wx-badge :isHidden="false" :value="2">已完成</wx-badge>
      </div>
      <div class="line" :class="'p' + activeIndex"></div>
    </div>

    <div class="plan_list">
      <div class="plan_item" v-for="(item, index) in [1, 2, 3]" :key="index">
        <div class="title">
          <h3>金钻非凡储蓄寿险计划</h3>
          <span class="status">处理中</span>
        </div>
        <div class="content">
          <div>
            <p>被保人</p>
            <p>张三</p>
          </div>
          <div>
            <p>性别</p>
            <p>男</p>
          </div>
          <div>
            <p>是否吸烟</p>
            <p>是</p>
          </div>
          <div>
            <p>保费</p>
            <p>$10000</p>
          </div>
        </div>
        <div class="time">提交时间: 2018-12-21 12:00</div>
      </div>
    </div>
  </div>
</template>

<script>
  import wxBadge from '@/components/badge'
  export default {
    data () {
      return {
        title: '我的计划书',
        activeIndex: 0,
      }
    },

    async onLoad () {
    },
    methods: {
    },
    components: {
      wxBadge,
    },
  }
</script>

<style scoped lang="scss">
  $mid-space: $small-space * 3;
  .container {
    border-top: 1px solid transparent;
  }
  .search_bar {
    margin: $middle-space $big-space * 2;
    height: 60px;
    @include flex(flex-start);
    background: #fff;
    border-radius: 30px;
    padding: $small-space;
    img {
      margin-right: $small-space;
    }
    input {
      flex: 1;
    }
  }

  .status_bar {
    @include flex(center, stretch);
    @include size(100vw, 88px);
    background: #fff;
    position: relative;
    >div {
      flex: 1;
      @include flex();
      &.active {
        color: $mainColor;
      }
    }
    .line {
      position: absolute;
      @include size(15vw, 4px);
      background: $mainColor;
      bottom: 0;
      left: 0;
      transform: translateX(5vw);
      transition: transform .3s;
      &.p1 {
        transform: translateX(30vw);
      }
      &.p2 {
        transform: translateX(55vw);
      }
      &.p3 {
        transform: translateX(80vw);
      }
    }
  }

  .plan_list {
    padding: 0 $mid-space;
    .plan_item {
      background: #fff;
      border-radius: 8px;
      margin-top: $middle-space;
      padding: $mid-space 0;
      >div {
        padding: 0 $middle-space;
      }
      .title {
        @include flex(space-between);
        padding-bottom: $mid-space;
        border-bottom: 1px solid $borderColor;
      }
      .content {
        @include flex(space-between);
        padding: $middle-space;
        text-align: center;
        >div {
          flex: 1;
          &:first-child {
            text-align: left;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }

</style>
<style>
  .placeholder {
    color: red;
  }
</style>
