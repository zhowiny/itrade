<template>
  <div class="my_Order">
    <div class="my_order_select">
      <ul>
        <li>
          <mx-select v-model="product" @change="select" :data="productList" valueKey="id" label="name"/>
        </li>
        <li>
          <mx-select v-model="order" @change="select1" :data="orderList" valueKey="id" label="name"/>
        </li>
        <li>
          <mx-select v-model="time" @change="select2" :data="timeList" valueKey="id" label="name"/>
        </li>
      </ul>
    </div>
    <div class="my_Order_list">
      <ul>
        <li class="list_none" v-if="list.length === 0">
          <img src="/images/icon_none_2.png" mode="aspectFit">
          <div>空空如也</div>
        </li>
        <li class="list_item" @click="topage(item.order_number, item.order_type)" v-for="(item ,index) in list"
            :key="index">
          <div class="my_order_list_massger">
            <p>
              <span class="my_order_list_massger_span">|&nbsp;&nbsp;&nbsp;</span>
              <span>订单号: {{item.order_number}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </p>
            <div>{{item.order_status_desc}}</div>
          </div>
          <div class="my_order_list_text">
            <ul>
              <li>
                <span class="my_order_list_text_span1">产品</span>
                <span class="my_order_list_text_span">{{item.finance_name}}</span>
              </li>
              <li v-if="item.order_type === 3">
                <span class="my_order_list_text_span1">首期总保费</span>
                <span class="my_order_list_text_span">{{item.first_sum_premium }}</span>
              </li>
              <li v-else>
                <span class="my_order_list_text_span1">金额</span>
                <span class="my_order_list_text_span">{{item.invest_amount }}</span>
              </li>
              <li>
                <span class="my_order_list_text_span1">投资人</span>
                <span class="my_order_list_text_span">{{item.first_name}}{{item.last_name}}</span>
              </li>
              <li>
                <span class="my_order_list_text_span1">联系方式</span>
                <span v-if="item.order_type === 3" class="my_order_list_text_span">{{item.applicant_customer_phone}}</span>
                <span v-else class="my_order_list_text_span">{{item.phone}}</span>
              </li>
              <li>
                <span class="my_order_list_text_span1">下单时间: {{item.created_at}}</span>
                <span v-if="item.order_status_desc !== '已取消' && item.order_status_desc !== '已入金' && item.order_status_desc !== '保单生效'" class="my_order_list_text_span" @click="cancelOrder(item)">取消订单</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import mxSelect from '@/components/select'

  export default {
    data () {
      return {
        title: '我的订单',
        product: '0',
        productList: [
          {
            name: '全部产品',
            id: '0'
          },
          {
            name: '金融产品',
            id: '1'
          },
          {
            name: '海外房产',
            id: '2'
          },
          {
            name: '海外保险',
            id: '3'
          },
          {
            name: '海外移民',
            id: '4'
          }
        ],
        order: 'all',
        orderList: [
          {
            name: '全部订单',
            id: 'all'
          },
          {
            name: '预约中',
            id: 'appointment'
          },
          {
            name: '申请合同',
            id: 'contract_generate'
          },
          {
            name: '待入金',
            id: 'not_received'
          },
          {
            name: '已入金',
            id: 'received'
          },
          {
            name: '已取消',
            id: 'voided'
          },
          {
            name: '已签单(保险)',
            id: 'clb_signed'
          },
          {
            name: '批核中(保险)',
            id: 'clb_approving'
          },
          {
            name: '已生效(保险)',
            id: 'clb_policy_effective'
          },
        ],
        time: 'all',
        timeList: [
          {
            name: '当前全部',
            id: 'all'
          },
          {
            name: '今日',
            id: 'day'
          },
          {
            name: '本月',
            id: 'month'
          },
          {
            name: '本年度',
            id: 'year'
          },
        ],
        list: [],
      }
    },

    methods: {
      productfun (product, order, time) {
        let params = {
          order_source: 'sale',
          order_type: product,
          order_status: order,
          time_kind: time,
        }
        this.$http.get('/wx/itrade/order/list', params).then(res => {
          if (parseInt(params.order_type) === 3) {
            this.list = res.global_order_resp_vos.filter(item => item.from_clb)
          } else {
            this.list = res.global_order_resp_vos
          }
        })
      },
      topage (orderNumber, orderType) {
        this.toPage({url: '/pages/order_detail_other/main', data: {order_number: orderNumber, order_type: orderType}})
        // if (orderType === 3) {
        //   this.toPage({
        //     url: '/pages/order_detail_insurance/main',
        //     data: {
        //       order_number: orderNumber,
        //     }
        //   })
        // } else {
        //   this.toPage({url: '/pages/order_detail_other/main', data: {order_number: orderNumber}})
        // }
      },
      async cancelOrder (item) {
        try {
          let result = await this.$http.post('/wx/itrade/order/cancel_by_advisor', {
            order_number: item.order_number
          })
          if (result) {
            this.showToast({title: '取消成功'}, () => {
              this.productfun(this.product, this.order, this.time)
            })
          }
        } catch (e) {
          throw new Error(e)
        }
      },
      select (even) {
        this.product = even.id
        this.productfun(this.product, this.order, this.time)
      },
      select1 (even) {
        this.order = even.id
        this.productfun(this.product, this.order, this.time)
      },
      select2 (even) {
        this.time = even.id
        this.productfun(this.product, this.order, this.time)
      }
    },

    created () {
    },
    components: {
      mxSelect,
    },
    async mounted () {
      this.productfun(this.product, this.order, this.time)
    }
  }
</script>
<style scoped lang="scss">
  .my_Order {
    min-height: 100vh;
    background-color: #fff;
    .my_order_select {
      background-color: #fff;
      display: flex;
      padding: $small-space $middle-space;
      position:sticky;
      top:0;
      border-bottom: 1px solid $backgroundColor;
      ul {
        margin: 0;
        @include flex(space-between);
        li {
          padding: 0 $middle-space;
          &:nth-child(2) {
            border-left:1px solid $borderColor;
            border-right:1px solid $borderColor;
          }
        }
      }
    }
    .my_Order_list {
      background-color: $backgroundColor;
      padding: $middle-space 0;
      ul {
        margin: 0;
        padding: 0;
        li {
          list-style: none;
          background-color: #fff;
          &.list_none {
            width:100vw;
            height:100vh;
            text-align:center;
          }
          .my_order_list_massger {
            padding: $middle-space;
            border-bottom: 1px solid $borderColor;
            @include flex(space-between);
            p {
              .my_order_list_massger_span {
                color: #306FF4;
              }
              .my_order_list_massger_span1 {
                color: #969696;
              }
            }
            div {
              float: right;
              border: 1px solid #F5A623;
              color: #F5A623;
              border-radius: 10px;
              padding: 2px 5px;
            }
          }
          .my_order_list_text {
            padding: $middle-space;
            ul {
              margin: 0;
              padding: 0;
              li {
                list-style: none;
                margin-bottom: $small-space;
                font-size: 26px;
                @include flex(space-between);
                &:last-child {
                  font-size: 24px;
                  color: $lightColor;
                  margin-bottom: 0;
                  padding-top: $small-space;
                  border-top: 1px solid $borderColor;
                }
              }
            }
          }
        }
        .list_item {
          border-bottom: 1px solid $borderColor;
          margin-bottom: $middle-space;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
