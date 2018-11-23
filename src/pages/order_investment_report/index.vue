<template>
  <div class="container">
    <div class="none" v-if="!report || report.length < 1">
      <img src="/images/icon_none_2.png" mode="aspectFit" style="">
      <p>暂无投资报告</p>
    </div>
    <ul class="report">
      <li :class="{unread: item.unread}" v-for="(item, index) in report" :key="index">
        <h4>{{item.title}} {{item.desc}}</h4>
        <p>上传时间: {{item.updated_at}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '投资报告',
        report: [],
      }
    },
    created () {
    },
    methods: {
    },
    components: {
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    @include size(100vw, 100vh);
  }
  .none {
    text-align: center;
    color: $lightColor;
    font-size: 30px;
  }
  .report {
    li {
      @include size(100%, 158px);
      @include flex(space-around, flex-start);
      flex-direction: column;
      margin-top: $small-space;
      padding: $middle-space;
      background: #fff;
      color: $lightColor;
      h4 {
        font-size: 30px;
      }
      p {
        font-size: 26px;
      }
      &.unread h4{
        color: $deepColor;
      }
    }
  }
</style>
