<template>
  <div class="container">
    <div class="search_bar" v-if="!params.item_id">
      <img src="/images/search.png" mode="aspectFit" style="width: 28rpx;height:29rpx;">
      <input placeholder-class="placeholder"
             v-model="search.params" type="text"
             placeholder="请输入产品名、被保人、投保人进行搜索"
             @input="searchPlan"
      >

    </div>
    <div class="status_bar" v-if="!params.item_id">
      <div :class="{active: activeIndex === 0}" @click="filter('全部', 0)">
        <wx-badge :isHidden="true" :value="2">全部</wx-badge>
      </div>
      <div :class="{active: activeIndex === 1}" @click="filter('处理中', 1)">
        <wx-badge :isHidden="true" :value="2">处理中</wx-badge>
      </div>
      <div :class="{active: activeIndex === 2}" @click="filter('需复查', 2)">
        <wx-badge :isHidden="!planCount.review" :value="planCount.review">需复查</wx-badge>
      </div>
      <div :class="{active: activeIndex === 3}" @click="filter('已完成', 3)">
        <wx-badge :isHidden="!planCount.completed" :value="planCount.completed">已完成</wx-badge>
      </div>
      <div class="line" :class="'p' + activeIndex"></div>
    </div>
    <div class="none" v-if="planList.length === 0">
      <img src="/images/icon_none_2.png" alt="">
      <p>无申请记录</p>
    </div>
    <div class="plan_list"  v-else>
      <div class="plan_item"
           v-for="(item, index) in planList"
           :key="index" @click="toPage({url: '/pages/plan_module/plan_detail/main', data: {planId: item.plan_id}})"
      >
        <div class="title">
          <h3>{{item.item_name}}/年期:{{item.subline_name || '---'}}</h3>
          <span class="status"  :class="'state_' + statusColorList[item.status]">{{item.status}}</span>
        </div>
        <div class="content">
          <div>
            <p>被保人</p>
            <p>{{item.insurant_name || '---'}}</p>
          </div>
          <div>
            <p>性别/年龄</p>
            <p>{{item.gender || '---'}}/{{item.age ? item.age : item.age === 0 ? '0' : '---'}}</p>
          </div>
          <div>
            <p>是否吸烟</p>
            <p>{{item.smoke_flag || '---'}}</p>
          </div>
          <div>
            <p>保费</p>
            <p>{{item.amount || '---'}}</p>
          </div>
        </div>
        <div v-if="activeIndex === 3" class="time">已完成时间: {{item.request_date || '---'}}</div>
        <div v-else class="time">提交时间: {{item.request_date || '---'}}</div>
      </div>
    </div>
    <div class="btn_new" @click="newPlan" v-if="!search.product_id">
      <span>+ 新建计划书</span>
    </div>

    <div class="choose_insurance" :class="{show: showInsuranceType}">
      <img class='close' @click="showInsuranceType = false" src="/images/icon_close.png" mode="aspectFit" style="width: 48rpx;height:48rpx;">
      <div class="type">
        <div @click="toPage({url:'/pages/plan_module/create_plan/main', data: {type: 'HONGKONG'}})">
          <img src="/images/icon_hk.png" mode="aspectFit" style="width: 120rpx;height:120rpx;">
          <p>港险</p>
        </div>
        <div @click="toPage({url:'/pages/plan_module/create_plan/main', data: {type: 'USA'}})">
          <img src="/images/icon_usa.png" mode="aspectFit" style="width: 120rpx;height:120rpx;">
          <p>美险</p>
        </div>
      </div>
    </div>
    <div class="mask" v-if="showInsuranceType" @click="showInsuranceType = false"></div>
  </div>
</template>

<script>
  import wxBadge from '@/components/badge'
  export default {
    data () {
      return {
        title: '我的计划书',
        activeIndex: 0, // status_bar index
        showInsuranceType: false,
        planCount: {},

        isLastPage: false,
        planList: [],
        search: {
          page_num: 1,
          page_size: 10,
          params: '',
          policy_insurant_name: '',
          product_id: '',
          status: '',
        },
        timer: null,

        statusList: [
          {state: '', label: '全部状态'},
          {state: '已完成', label: '已完成'},
          // {state: '获取中', label: '获取中'},
          {state: '处理中', label: '处理中'},
          {state: '需复查', label: '需复查'},
        ],
        statusColorList: {
          '处理中': 'primary',
          '已完成': 'success',
          '需复查': 'info',
          '已取消': 'error',
          'undefined': 'primary',
        },
        params: {},
        quoteCount: '',
        planQuote: '',
      }
    },

    async onLoad (params) {
      this.planList = []
      this.params = params
      params.item_id && (this.search.product_id = params.item_id)
      // this.queryCount()
      // this.getPlanList()
      // this.queryPlanQuote()
      // this.dataBuryPoint('my_plan_list:init:visit')
    },
    onShow () {
      this.queryCount()
      this.getPlanList()
      this.queryPlanQuote()
    },
    onHide () {
      // let d = this.$options.data()
      // Object.keys(d).forEach(key => {
      //   this[key] = d[key]
      // })
      this.isLastPage = false
      this.search.page_num = 1
      this.planList = []
    },
    onUnload () {
      this.isLastPage = false
      this.search.page_num = 1
      this.search.product_id = ''
      this.planList = []
    },
    methods: {
      async queryPlanQuote () {
        try {
          let result = await this.$http.get('/wx/itrade/product/plan/quote/check')
          this.planQuote = result.plan_quote
          this.quoteCount = result.add_plan_quote
        } catch (e) {
          console.error(e)
        }
      },
      async queryCount () {
        this.planCount = await this.$http.get('/wx/itrade/product/plan/count')
      },
      async getPlanList () {
        try {
          if (this.isLastPage) return
          let result = await this.$http.get('/wx/itrade/product/plan/list', this.search)
          this.planList = this.planList.concat(result.list)
          this.isLastPage = result.is_last_page
          // if (result.list.length === 0) {
          //   this.showToast('没有更多数据了~')
          // }
        } catch (e) {
          throw new Error(e)
        }
      },
      filter (status, index) {
        this.activeIndex = index
        this.isLastPage = false
        if (index === 0) {
          this.search.status = ''
        } else {
          this.search.status = status
        }
        this.search.page_num = 1
        this.planList = []
        this.getPlanList()
      },
      searchPlan () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.search.status = ''
          this.activeIndex = 0
          this.isLastPage = false
          this.search.page_num = 1
          this.planList = []
          this.getPlanList()
        }, 500)
      },
      newPlan () {
        if (this.planQuote) {
          this.toPage({url: '/pages/plan_module/create_plan/main', data: this.params})
        } else {
          this.showModal({
            title: '提示',
            content: `您的计划书额度不够!\n温馨提示:保单签单时可扩增计划书额度,1张签单=${this.quoteCount}份计划书`,
            confirmText: '我知道了',
            confirmColor: '#306FF4',
            showCancel: false,
          })
        }
      },
      dataBuryPoint (evt) {
        this.$auth.dataBuryPoint({
          eventName: evt,
          eventDataId: this.$mp.query.product_id || '',
          source: this.$root.$mp.query.source,
          utmSource: this.$root.$mp.query.utm_source,
          introduceCode: this.introduce_code,
          shareInvestorId: '',
          prePage: wx.getStorageSync('from')
        })
      },
    },
    onReachBottom () {
      if (this.isLastPage) {
        this.showToast('已经到底了!')
        return
      }
      this.search.page_num++
      this.getPlanList()
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
    padding-bottom: 120px;
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
    position: sticky;
    top: 0;
    border-top: 1px solid $backgroundColor;
    border-bottom: 1px solid $backgroundColor;
    font-size: 30px;
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
      font-size: 28px;
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
          p:first-child {
            font-size: 26px;
            color: $lightColor;
            margin-bottom: $small-space;
          }
          &:first-child {
            text-align: left;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
      .time {
        color: $lightColor;
        font-size: 24px;
      }
      .status {
        color: $mainColor;
      }
      .state_info {
        color: #FFBB01;
      }
      .state_primary {
        color: $mainColor;
      }
      .state_success {
        color: #0aba07;
      }
      .state_error {
        color: #FF3d55;
      }
    }
  }
  .none {
    @include size(100vw,100vh);
    background: #fff;
    text-align: center;
    img {
      width: 430px;
      height: 290px;
      margin: 25% auto 0 auto;
    }
    p {
      color: $lightColor;
      text-align: center;
    }
  }
  .btn_new {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    background: #fff;
    @include size(100vw, 100px);
    padding: $mid-space / 2 $mid-space;
    span {
      display: block;
      border-radius: 15px;
      background: $mainColor;
      color: #fff;
      height: 100%;
      @include flex();
      font-size: 32px;
    }
  }
  .choose_insurance {
    position: fixed;
    z-index: 10;
    top: 30%;
    left: 50%;
    transform: translate(-50%)scale(0);
    transition: transform .3s;
    border-radius: 8px;
    padding: $big-space $big-space * 2;
    background: #fff;
    width: 543px;
    .type {
      @include flex(space-between);
      text-align: center;
      margin-top: $big-space * 2;
    }
    .close {
      position: absolute;
      top: $middle-space;
      right: $mid-space;
    }
    &.show {
      transform: translate(-50%)scale(1);
    }
  }

  .mask {
    @include size(100vw, 100vh);
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .4);
  }

</style>
<style lang="scss">
  .placeholder {
    color: $lightColor;
    font-size: 24px;
  }
</style>
