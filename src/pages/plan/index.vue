<template>
  <div class="container">
    <div class="search">
      <mx-select v-model="status" :data="statusList" valueKey="state" label="label" @input="getPlanList"/>
      <div class="search_bar">
        <img src="/images/icon_search.png" mode="aspectFit" style="width:30rpx;height:30rpx;">
        <input type="text" placeholder="请输入投保人/受保人进行搜索" v-model="keyword" @input="getPlanList">
      </div>
    </div>
    <div class="plan_list">
      <div class="plan_list_item" v-for="(item,i) in planList" :key="i" >
        <h2>
          <span>{{item.itemName}}</span>
          <navigator class="btn" hover-class="none" v-if="item.status === '已完成'"
                     open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                     :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + item.itemName + '&filePath=' + item.planUrl"
                     target="miniProgram"
                     version="trial"
          >
            <img src="/images/fenx.png" mode="aspectFit" style="width: 34rpx;height:32rpx;">
          </navigator>
          <!--<button v-if="item.status === '已完成'" open-type="share" :data-path="item.planUrl" :data-title="item.itemName+'(计划书)'">
            <img src="/images/fenx.png" mode="aspectFit" style="width: 34rpx;height:32rpx;">
          </button>-->
        </h2>
        <ul @click="operate(item)">
          <li>
            <span>性别</span>
            <p>{{item.gender}}</p>
          </li>
          <li>
            <span>是否吸烟</span>
            <p>{{item.smokeFlag}}</p>
          </li>
          <li>
            <span>年龄</span>
            <p>{{item.age}}</p>
          </li>
          <li>
            <span>{{item.amountType}}</span>
            <p>{{item.amount}}</p>
          </li>
        </ul>
        <div>
          <span :class="'state_' + statusColorList[item.status]">状态: {{item.status}}</span>
          <p>客户: {{item.insurantName}}</p>
        </div>
      </div>
    </div>
    <div class="plan_add_btn" @click="createPlan">+ 新建计划书申请</div>
  </div>
</template>

<script>
import mxSelect from '@/components/select'
export default {
  data () {
    return {
      title: '我的计划书',
      status: '',
      keyword: '',
      statusList: [
        {state: '', label: '全部状态'},
        {state: '已完成', label: '已完成'},
        // {state: '获取中', label: '获取中'},
        {state: '处理中', label: '处理中'},
        {state: '需复查', label: '需复查'},
      ],
      statusColorList: {
        '已完成': 'primary',
        '需复查': 'info',
        '已取消': 'error',
        'undefined': 'primary',
      },
      planList: [],
      planParams: {},
    }
  },

  components: {
    mxSelect,
  },
  async onLoad () {
    this.getParams()
    await this.getPlanList()
    this.$auth.dataBuryPoint({
      eventName: 'my_plan_list:init:visit',
      eventDataId: this.$mp.query.product_id || '',
      source: this.$root.$mp.query.source,
      utmSource: this.$root.$mp.query.utm_source,
      introduceCode: this.introduce_code,
      shareInvestorId: '',
      prePage: wx.getStorageSync('from')
    })
  },
  async mounted () {
  },
  methods: {
    async getPlanList () {
      try {
        let result = await this.$http.get('/wx/itrade/product/plan/list', {
          page_num: 1,
          page_size: 99999,
          policy_insurant_name: this.keyword,
          status: this.status,
          product_id: this.$mp.query.product_id || '',
        })
        this.planList = result.list
      } catch (e) {
        throw new Error(e)
      }
    },
    async getParams () {
      try {
        this.planParams = await this.$http.get('/wx/itrade/ffplan/apply_param')
      } catch (e) {
        throw new Error(e)
      }
    },
    operate (item) {
      if (item.status === '需复查') {
        // let url = `https://weixin.fortunefed.com/prod/#/operatePlan?sessionId=${this.planParams.session_id}&token=${this.planParams.access_token}&channelId=${this.planParams.related_party_id}&planId=${item.planId}`
        let url = `https://weixin.fortunefed.com/#/operatePlan?sessionId=${this.planParams.session_id}&token=${this.planParams.access_token}&channelId=${this.planParams.related_party_id}&planId=${item.planId}`
        this.goWebView(url)
      } else if (item.status === '已完成') {
        this.$common.previewFile(item.planUrl, 'pdf')
      }
    },
    createPlan () {
      // let url = `https://weixin.fortunefed.com/prod/#/operatePlan?sessionId=${this.planParams.session_id}&token=${this.planParams.access_token}&channelId=${this.planParams.related_party_id}&planId=${item.planId}`
      let url = `https://weixin.fortunefed.com/#/normalPlan?sessionId=${this.planParams.session_id}&token=${this.planParams.access_token}&channelId=${this.planParams.related_party_id}` + (this.$mp.query.product_id ? `&itemId=${this.$mp.query.product_id}` : '')
      this.goWebView(url)
      this.$auth.dataBuryPoint({
        eventName: 'my_plan_list:item:click',
        eventDataId: this.$mp.query.product_id || '',
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduce_code,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
    },
    async goWebView (url) {
      await wx.setStorageSync('webViewUrl', url)
      await this.toPage({
        url: '/pages/web_view_page/main',
        type: 'redirectTo',
        data: {
          url: url,
          title: '处理计划书',
        }
      })
    },
  },
  onShareAppMessage (res) {
    return {
      title: res.target.dataset.title,
      imageUrl: '/images/icon_placeholder.png',
      path: `pages/share_file/main?filePath=${res.target.dataset.path}&title=${res.target.dataset.title}`
    }
  },
}
</script>

<style scoped lang="scss">
  .search {
    background: #fff;
    padding: $small-space $middle-space;
    @include flex(flex-start);
    border-top: 1px solid $borderColor;
    &_bar {
      flex: 3;
      margin-left: $middle-space;
      @include flex();
      background: $backgroundColor;
      border-radius: 40px;
      padding: $small-space $middle-space;
      input {
        flex: 1;
        border: none;
        outline: none;
        margin-left: $middle-space;
      }
    }
  }
  .plan_list {
    padding-bottom: 100px;
    &_item {
      margin-top: $middle-space;
      background: #fff;
      h2 {
        padding: $middle-space;
        font-size: 28px;
        @include flex(space-between);
      }
      button {
        padding: 0;
        margin: 0;
        background: transparent;
        border: none;
        line-height: 0;
        &:before, &:after {
          content: normal;
          display: none;
        }
      }
      ul {
        border-top: 1px solid $borderColor;
        border-bottom: 1px solid $borderColor;
        padding: $middle-space;
        li {
          @include flex(space-between);
          span {
            color: $lightColor;
          }
        }
      }
      >div {
        padding: $middle-space;
        @include flex(space-between);
      }
    }
  }
  .plan_add_btn {
    position: fixed;
    left: 0;
    bottom: 0;
    @include size(100%, 100px);
    @include flex();
    font-size: 32px;
    color: #fff;
    background: $mainColor;
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

</style>
<style lang="scss">
  .select-container {
    flex: 1;
  }
</style>
