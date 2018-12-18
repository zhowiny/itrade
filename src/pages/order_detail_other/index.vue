<template>
  <div class="order_detail_container">
    <div class="commission" v-if="orderType !== 3 && step === 4">
      <span>我的佣金</span>
      <h2>{{detail.commission_amount}}</h2>
    </div>
    <div class="commission" v-if="orderType === 3 && step === 4">
      <span>我的佣金</span>
      <h2>{{detail.orderCommissions.periodAmountSum[0]}}</h2>
    </div>
    <wx-steps v-if="orderType !== 3 && step !== 4 && detail.order_status_desc !== '已取消'" :active="step" :steps="steps"/>
    <wx-steps v-if="orderType === 3 && step !== 4 && showInsuranceProgress" :active="step" :steps="insurance_steps"></wx-steps>

    <div class="pending" v-if="detail.order_status_desc === '待入金'">
      <h2>入金指南</h2>
      <p v-if="detail.payment_method === 'wire'">客户已成功签约并选择使用电汇(wire)支付，请引导客户以银行电汇的方式回款至以下账户。</p>
      <p v-if="detail.payment_method === 'ach'">客户已成功签约并选择使用AHC自动扣款。我们的服务经理将与您联系确认使用自动扣款。确认后的1-3天款项会自动到账，无需客户操作打款。<br>如需终止AHC自动扣款，请联系您的服务经理。</p>
      <div v-if="detail.payment_method === 'wire'" @click="showBankInfo = true">查看客户汇款银行信息 ></div>
      <div v-if="detail.payment_method === 'ach'" @click="showBankInfo = true">查看客户预留银行信息 ></div>
    </div>
    <div class="success" v-if="orderType !== 3 && step === 4">
      <img src="/images/checked.png" mode="aspectFit" style="width: 48rpx;height:48rpx;">
      <h2>请通知客户订单已完成入金</h2>
      <p>产品的起息日期为: {{detail.start_interest_day}}</p>
      <div>请等待订单进入投资中</div>
    </div>

    <!--金融订单详情/移民订单-->
    <div v-if="orderType === 1 || orderType === 4">
      <div class="order_detail">
        <h3>
          <span>订单信息</span>
          <span class="order_detail_state">{{detail.order_status_desc}}</span>
        </h3>
        <div class="order_field">
          <span>订单号</span>
          <span>{{detail.order_number}}</span>
        </div>
        <div class="order_field">
          <span>产品名称</span>
          <span>{{detail.product_name}}</span>
        </div>
        <div class="order_field">
          <span>投资人</span>
          <span>{{detail.first_name}}{{detail.last_name}}</span>
        </div>
        <div class="order_field">
          <span>联系方式</span>
          <span>{{detail.phone}}</span>
        </div>
        <div class="order_field">
          <span>投资期限</span>
          <span>{{detail.invest_term}}</span>
        </div>
        <div class="order_field">
          <span>起息日期</span>
          <span>{{detail.start_interest_day}}</span>
        </div>
        <div class="order_field">
          <span>投资金额</span>
          <span>{{detail.invest_amount}}</span>
        </div>
        <div class="order_field">
          <span>佣金比例</span>
          <span>{{detail.commission}}%</span>
        </div>
        <div class="order_field">
          <span>佣金金额</span>
          <span>{{detail.commission_amount}}</span>
        </div>
        <div class="order_field">
          <span>投资顾问</span>
          <span>{{detail.advisor_name}}</span>
        </div>
      </div>
    </div>

    <!--房产订单详情-->
    <div v-if="orderType === 2">
      <div class="order_detail">
        <h3>
          <span>订单信息</span>
          <span class="order_detail_state">{{detail.order_status_desc}}</span>
        </h3>
        <div class="order_field">
          <span>订单号</span>
          <span>{{detail.order_number}}</span>
        </div>
        <div class="order_field">
          <span>产品名称</span>
          <span>{{detail.product_name}}</span>
        </div>
        <div class="order_field">
          <span>投资人</span>
          <span>{{detail.first_name}}{{detail.last_name}}</span>
        </div>
        <div class="order_field">
          <span>联系方式</span>
          <span>{{detail.phone}}</span>
        </div>
        <div class="order_field">
          <span>房产信息</span>
          <span>{{detail.invest_term}} 朝向:{{detail.towards}} {{detail.name}}  {{detail.area}}㎡</span>
        </div>
        <div class="order_field">
          <span>预计总价</span>
          <span>{{detail.amount}}</span>
        </div>
        <div class="order_field">
          <span>投资金额</span>
          <span>{{detail.invest_amount}}</span>
        </div>
        <div class="order_field">
          <span>佣金比例</span>
          <span>{{detail.commission}}%</span>
        </div>
        <div class="order_field">
          <span>佣金金额</span>
          <span>{{detail.commission_amount}}</span>
        </div>
        <div class="order_field">
          <span>投资顾问</span>
          <span>{{detail.advisor_name}}</span>
        </div>
      </div>
    </div>

    <!--保险订单-->
    <div v-if="orderType === 3">
      <div class="order_detail">
        <h3>
          <span>订单信息</span>
          <span>{{detail.statusName}}</span>
        </h3>
        <div class="order_field">
          <span>订单编号</span>
          <span>{{detail.orderNumber}}</span>
        </div>
        <div class="order_field">
          <span>保单编号</span>
          <span>{{detail.policyNumber}}</span>
        </div>
        <div class="order_field">
          <span>产品名称</span>
          <span>{{detail.itemName}}</span>
        </div>
        <div class="order_field">
          <span>投保人(受保人)</span>
          <span>{{detail.insurantCustomerChineseName}}({{detail.applicantCustomerChineseName}})</span>
        </div>
        <div class="order_field">
          <span>联系方式</span>
          <span>{{detail.applicantCustomerPhone}}</span>
        </div>
        <div class="order_field">
          <span>预约签单时间</span>
          <span>{{detail.reserveDate}}</span>
        </div>
        <div class="order_field">
          <span>保额</span>
          <span>{{detail.policyAmount}}</span>
        </div>
        <div class="order_field">
          <span>首期保费</span>
          <span>{{detail.yearPayAmount}}</span>
        </div>
        <div class="order_field">
          <span>佣金比例</span>
          <span>{{detail.commissionRate}}</span>
        </div>
      </div>
      <div class="order_detail" v-if="detail.orderAdditions && detail.orderAdditions.length > 0">
        <h3>
          <span>附加险</span>
        </h3>
        <div class="order_field" v-for="(item, index) in detail.orderAdditions" :key="index">
          <span>{{item.itemName}}</span>
          <span>{{item.firstPayAmount}}</span>
        </div>
      </div>
      <div class="order_detail" v-if="detail.statusName === '保单生效'">
        <h3>
          <span>续保信息</span>
        </h3>
        <div class="order_field">
          <span>下期保费到期日</span>
          <span>{{detail.renewalDueDate}}</span>
        </div>
        <div class="order_field">
          <span>续保期数</span>
          <span>{{detail.renewalYear}}</span>
        </div>
        <div class="order_field">
          <span>续保保费</span>
          <span>{{detail.renewalPremium}}</span>
        </div>
        <div class="order_field">
          <span>账户余额</span>
          <span>{{detail.accountBalance}}</span>
        </div>
        <div class="order_field">
          <span>回馈余额</span>
          <span>{{detail.feedbackBalance}}</span>
        </div>
        <div class="order_field">
          <span>客户编号</span>
          <span>{{detail.customerNumber}}</span>
        </div>
      </div>
    </div>



    <ul class="other" v-if="orderType !== 3">
      <li v-for="(item, index) in detail.file_list" :key="index" @click="$common.previewFile(item.file_url)">
        <span>{{type[item.file_type]}}</span>
        <img src="/images/icon_arrow_product.png" mode="aspectFit" style="width: 15rpx;height:28rpx;">
      </li>
    </ul>

    <ul class="other">
      <li @click="toPage('/pages/order_detail_file/main?orderType='+orderType+'&order_number=' + (detail.order_number || detail.orderNumber))">
        <span>投资文件</span>
        <img src="/images/icon_arrow_product.png" mode="aspectFit" style="width: 15rpx;height:28rpx;">
      </li>
      <!--<li v-for="(item, index) in detail.orderFiles" :key="index" @click="$common.previewFile(item.url, 'png')">
        <span>{{item.fileName}}</span>
        <img src="/images/icon_arrow_product.png" mode="aspectFit" style="width: 15rpx;height:28rpx;">
      </li>-->
    </ul>

    <!--<ul class="other" v-if="orderType !== 3">
      <li >
        <span>投资文件</span>
      </li>
      <li v-for="(item, index) in detail.document_list" :key="index" @click="$common.previewFile(item.document_url)">
        <span>{{item.document_name}}</span>
        <img src="/images/icon_arrow_product.png" mode="aspectFit" style="width: 15rpx;height:28rpx;">
      </li>
    </ul>-->

    <ul class="other">
      <li @click="toPage('/pages/order_investment_report/main?orderType=' + orderType + '&order_number=' + (detail.order_number || detail.orderNumber))">
        <span>投资报告</span>
        <img src="/images/icon_arrow_product.png" mode="aspectFit" style="width: 15rpx;height:28rpx;">
      </li>
    </ul>
    <div class="bank_info"  v-if="detail.order_status_desc === '待入金'" v-show="showBankInfo">
      <div>
        <h2 @click="showBankInfo = false">
          <img src="/images/icon_arrow_down.png" mode="aspectFit" style="width: 23rpx;height:12rpx;">
          <p v-if="detail.payment_method === 'wire'">客户汇款银行信息</p>
          <p v-if="detail.payment_method === 'ach'">客户预留银行信息</p>
        </h2>
        <div >
          <ul v-if="detail.payment_method === 'wire'">
            <li>
              <span>收款人</span>
              <p>{{detail.wire_bank.account_name}}</p>
            </li>
            <li>
              <span>收款人地址</span>
              <p>{{detail.wire_bank.account_address}}</p>
            </li>
            <li>
              <span>收款银行</span>
              <p>{{detail.wire_bank.bank_name}}</p>
            </li>
            <li>
              <span>收款银行地址</span>
              <p>{{detail.wire_bank.bank_address}}</p>
            </li>
            <li>
              <span>ABA/Routing #</span>
              <p>{{detail.wire_bank.routing_number}}</p>
            </li>
            <li>
              <span>Swift Code</span>
              <p>{{detail.wire_bank.swift_code}}</p>
            </li>
            <li>
              <span>账户号</span>
              <p>{{detail.wire_bank.account_number}}</p>
            </li>
            <li>
              <span>备注</span>
              <p>{{detail.wire_bank.remark}}</p>
            </li>
          </ul>
          <ul v-if="detail.payment_method === 'ach'">
            <li>
              <span>银行名称</span>
              <p>{{detail.bank_us.bank_name}}</p>
            </li>
            <li>
              <span>银行地址</span>
              <p>{{detail.bank_us.bank_address}}</p>
            </li>
            <li>
              <span>Swift Code</span>
              <p>{{detail.bank_us.swift_code}}</p>
            </li>
            <li>
              <span>账户号</span>
              <p>{{detail.bank_us.account_number}}</p>
            </li>
            <li>
              <span>入金方式</span>
              <p>{{detail.bank_us.account_type}}</p>
            </li>
          </ul>
          <input type="text" :value='shareLink'>
          <button @click="copy">复制链接</button>
        </div>
      </div>
    </div>
    <div v-if="orderType === 3">
      <div class="btn_cancel" @click="cancel"
           v-if="showCancel"
      >取消订单</div>
    </div>
    <div v-else>
      <div class="btn_cancel"
           v-if="detail.order_status_desc !== '已取消' && detail.order_status_desc !== '已入金'"
           @click="cancel"
      >取消订单</div>
    </div>
  </div>
</template>

<script>
  import wxSteps from '@/components/steps'
  export default {
    data () {
      return {
        title: '订单详情',
        step: 0,
        steps: [
          {title: '预约中'},
          {title: '申请合同'},
          {title: '待入金'},
          {title: '已入金'},
        ],
        insurance_steps: [
          {title: '预约中'},
          {title: '已签单'},
          {title: '批核中'},
          {title: '保单生效'},
        ],
        type: {DRIVING_LICENSE: '驾驶证', ID_CARD: '身份证', ID_CARD_REVERSE: '身份证反面', PASSPORT: '护照'},
        detail: {
          document_list: [],
          file_list: [],
        },
        orderType: 0,
        showBankInfo: false,
        showInsuranceProgress: true,
      }
    },
    computed: {
      shareLink () {
        return `https://invest.meixincn.com/white_label/invest_success.html?product_id=${this.detail.product_id}&investor_type=${this.detail.investor_type}&payment_method=${this.detail.payment_method}`
      },
      showCancel () {
        let statusList = ['预审中', '资料审核通过', '预审成功', '资料审核中', '需复查', '预约失败', '预约成功']
        return statusList.indexOf(this.detail.statusName) >= 0
      },
    },
    async onLoad (params) {
      console.log(params)
      this.orderType = parseInt(params.order_type)
      await this.getDetail()
      this.orderType === 3 ? this.insuranceTranserStatus() : this.transferStatus()
    },
    methods: {
      tips () {
      },
      async getDetail () {
        try {
          let url = '/wx/itrade/order/detail_of_advisor'
          if (this.orderType === 3) {
            url = '/wx/itrade/order/detail_of_insurance'
          }
          this.detail = await this.$http.get(url, {
            order_number: this.$mp.query.order_number
          })
          if (this.orderType === 3) {
            if (['退保处理中', '保险公司拒保', '搁置受保', '保单失效', '已取消', '已退保', '预约失败'].includes(this.detail.statusName)) {
              this.showInsuranceProgress = false
            }
          }
          this.detail.commission = (this.detail.commission * 100).toFixed(2)
          // console.log(this.detail)
        } catch (e) {
          throw new Error(e)
        }
      },
      transferStatus () {
        let statusList = {
          reserving: ['appointment'],
          apply: ['not_commit', 'contract_generate'],
          pending: ['not_sign', 'not_received'],
          success: ['received', 'start_audit', 'audit_failed', 'audit_success', 'invest_success', 'start_interest', 'refunded'],
        }
        if (statusList.reserving.includes(this.detail.order_status)) {
          this.step = 1
        } else if (statusList.apply.includes(this.detail.order_status)) {
          this.step = 2
        } else if (statusList.pending.includes(this.detail.order_status)) {
          this.step = 3
        } else if (statusList.success.includes(this.detail.order_status)) {
          this.step = 4
        } else {
          this.step = 0
        }
      },
      insuranceTranserStatus () {
        let statusList = {
          reserving: ['DATA_APPROVED', 'DATA_APPROVING', 'PRE_APPROVED', 'PRE_APPROVING', 'RESERVING', 'NEED_REVIEW', 'ARRIVAL', 'LEAVE', 'RESERVE_SUCCESS'],
          signed: ['SIGNED'],
          approving: ['APPROVING', 'PENDING'],
          effective: ['POLICY_EFFECTIVE', 'TRANSFERED'],
        }
        if (statusList.reserving.includes(this.detail.status)) {
          this.step = 1
        } else if (statusList.signed.includes(this.detail.status)) {
          this.step = 2
        } else if (statusList.approving.includes(this.detail.status)) {
          this.step = 3
        } else if (statusList.effective.includes(this.detail.status)) {
          this.step = 4
        } else {
          this.step = 0
        }
      },
      copy () {
        wx.setClipboardData({
          data: this.shareLink,
          success () {
          },
        })
      },
      async cancel () {
        try {
          let result = await this.$http.post('/wx/itrade/order/cancel_by_advisor', {
            order_number: this.detail.order_number || this.detail.orderNumber,
          })
          if (result) {
            this.showToast({title: '取消成功'}, () => {
              this.toPage({url: '/pages/my_Order/main', type: 'redirectTo'})
            })
          }
        } catch (e) {
          throw new Error(e)
        }
      },
    },
    components: {
      wxSteps,
    },
  }
</script>
<style scoped lang="scss">
  .order_detail_container {
    padding-bottom: 100px;
  }
  .commission {
    background: #fff;
    @include flex();
    flex-direction: column;
    padding: $middle-space;
    text-align: center;
    color: $mainColor;
    margin-bottom: $middle-space;
    h2 {
      font-size: 48px;
      padding: $small-space 0;
    }
    span {
      font-size: 32px;
      color: $deepColor;
    }
    p {
      font-size: 24px;
    }
  }
  .pending {
    background: #fff;
    margin-top: $middle-space;
    h2, div {
      padding: $middle-space;
    }
    div {
      color: $mainColor;
      text-align: center;
    }
    p {
      padding: $big-space * 2 $middle-space;
      border-top: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
    }
  }
  .order_detail {
    margin-top: $middle-space;
    background: #fff;
    h3 {
      font-size: 32px;
      @include flex(space-between);
      padding: $middle-space;
      border-bottom: 1px solid $borderColor;
      span {
        font-size: 26px;
      }
    }
    .order_field {
      @include flex(space-between);
      font-size: 26px;
      padding: $middle-space $middle-space 0 $middle-space;
      &:last-child {
        padding-bottom: $middle-space;
      }
    }
    &_state {
      border:1px solid $mainColor;
      color: $mainColor;
      border-radius:5px;
      padding:2px 5px;
    }
  }
  .other {
    margin-top: $middle-space;
    &:last-child {
      padding-bottom: 100px;
    }
    li {
      background: #fff;
      @include flex(space-between);
      padding: $middle-space;
      font-size: 32px;
      border-bottom: 1px solid $borderColor;
    }
  }
  .btn_cancel {
    position: fixed;
    z-index: 1;
    left: 0;
    bottom: 0;
    @include size(100vw, 80px);
    @include flex();
    background: $mainColor;
    color: #fff;
  }
  .success {
    margin-top: $middle-space;
    @include flex();
    flex-direction: column;
    padding: $big-space;
    text-align: center;
    background: #fff;
    h2 {
      font-size: 40px;
      color: $mainColor;
    }
    p {
      color: $lightColor;
      margin-top: $middle-space;
      margin-bottom: $big-space;
    }
  }
  .bank_info {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0,0,0,.4);
    @include size(100vw, 100vh);
    > div {
      position: absolute;
      bottom: 0;
      left: 0;
      @include size(100vw, 80vh);
      overflow: scroll;
      background: #fff;
      h2 {
        @include flex();
        padding: $middle-space $big-space;
        border-bottom: 1px solid $borderColor;
        p {
          flex: 1;
          font-size: 40px;
          text-align: center;
        }
      }
      >div {
        padding: $big-space;
        font-size:26px;
        li {
          margin-bottom: $middle-space;
          @include flex(flex-start, flex-start);
          text-align: left;
          span {
            flex: 1;
          }
          p {
            flex: 2;
            text-align: justify;
          }
        }
        input {
          border: 1px solid $borderColor;
          padding: 0 $middle-space;
          margin-bottom: $middle-space;
        }
      }
    }
  }
</style>
