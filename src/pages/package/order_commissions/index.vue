<template>
  <div class="commissions">
    <div class="item" v-for="(item, index) in commissions.periodSums" :key="index">
      <div class="title">第{{item.num}}期</div>
      <div class="content" v-for="(p, i) in item.itemSums" :key="i">
        <div>
          <h3>产品名称</h3>
          <p>{{p.itemName}}</p>
        </div>
        <div>
          <h3>佣金率</h3>
          <p>{{p.rate}}</p>
        </div>
        <div>
          <h3>预计佣金</h3>
          <p>{{p.amount}}</p>
        </div>
      </div>
      <div class="footer">
        <span>合计</span>
        <span>{{commissions.periodAmountSum[index]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      title: '订单佣金明细',
      commissions: {
        periodSums: [],
        periodAmountSum: [],
      },
    }
  },

  methods: {
  },
  async onLoad (params) {
    let o = {}
    Object.keys(params).forEach(key => {
      o[decodeURIComponent(key)] = decodeURIComponent(params[key])
    })
    this.commissions = qs.parse(o)
    console.log(this.commissions)
  },
  onShareAppMessage (res) {
  },
}
</script>
<style scoped lang="scss">
  $mid-space: $middle-space;
  .commissions {
    min-height: 100vh;
    .item {
      margin-bottom: $mid-space;
      background: #fff;
      .title {
        padding: $mid-space;
        border-bottom: 1px solid $borderColor;
        color: $mainColor;
        font-size: 28px;
      }
      .content {
        @include flex();
        >div {
          flex: 1;
          text-align: center;
          padding: $mid-space 0;
          h3 {
            font-size: 28px;
          }
          p {
            font-size: 24px;
            color: $lightColor;
            margin-top: $small-space;
          }
        }
      }
      .footer {
        @include flex(space-between);
        padding: $mid-space;
        border-top: 1px solid $borderColor;
        span:last-child {
          color: $mainColor;
          font-size: 24px;
        }
      }
    }
  }
</style>
