<template>
  <div class="product">
    <div class="product_title">
      <img src="/images/defalutLogo.png" mode="aspectFit" style="width:100rpx;height:100rpx;">
      <h2>{{detail.name}}</h2>
    </div>
    <div class="product_summary">
      <div>
        <p>{{detail.finance_insurance_extend.mid_class || '---'}}</p>
        <span>险种</span>
      </div>
      <div>
        <p>{{detail.finance_insurance_extend.payment_years || '---'}}</p>
        <span>缴费年期</span>
      </div>
      <div>
        <p>{{detail.commission || '---'}}</p>
        <span>佣金</span>
      </div>
    </div>
    <div class="product_company">
      <div @click="showShareBtn = true">
        <img src="/images/icon_download.png" mode="aspectFit" style="width:50rpx;height:50rpx">
        <span>下载产品书</span>
        <div v-if="showShareBtn">
          <span @click="openFile" class="btn">查看</span>
          <navigator class="btn" hover-class="none" v-if="detail.product_book_documents.length > 0"
                     open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                     :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + detail.product_book_documents[0].document_name + '&filePath=' + detail.product_book_documents[0].document_url"
                     target="miniProgram"
                     version="trial"
          >分享</navigator><!--develop-->
        </div>
      </div>
      <div @click="toPage('/pages/product_list_page/main?product_type=3&search='+detail.finance_insurance_extend.insurance_company || '')">
        <img src="/images/icon_company.png" mode="aspectFit" style="width:50rpx;height:50rpx;">
         <span>{{detail.finance_insurance_extend.insurance_company || '---'}}</span>
        <!--<span> 资管方 </span>-->
      </div>
    </div>
    <div v-if="detail.finance_insurance_extend.product_highlights.length > 0" class="product_highlight">
      <div>
        <img src="/images/icon_highlight.png" mode="aspectFit" style="width:52rpx;height:37rpx;">
        <span>产品亮点</span>
      </div>
      <ul>
        <li  v-for="(item, index) in detail.finance_insurance_extend.product_highlights" :key="index">{{item.title}}: {{item.content}}</li>
      </ul>
    </div>
    <div class="product_detail">
      <ul class="product_tab">
        <!--<li :class="{actived: activeIndex === 0}" @click="activeIndex = 0">相关资讯</li>-->
        <li :class="{actived: activeIndex === 1}" @click="activeIndex = 1">产品要素</li>
        <li :class="{actived: activeIndex === 2}" @click="activeIndex = 2">产品文件</li>
      </ul>
      <div class="product_tab_item information_list" :class="{actived: activeIndex === 0}">
        <div class="information_item" v-for="(item,i) in productArticle" :key="i">
          <img :src="item.head_img || '/images/icon_placeholder.png'" mode="aspectFit" style="width:168rpx;height:128rpx;">
          <div>
            <h3>{{item.title}}</h3>
            <span>{{item.created_at}} | 阅读量: {{item.pv}}</span>
          </div>
        </div>
      </div>
      <div class="product_tab_item product_points" :class="{actived: activeIndex === 1}">
        <div class="product_points_item">
          <div>产品名称</div>
          <div>{{detail.name}}</div>
        </div>
        <div class="product_points_item">
          <div>险种</div>
          <div>{{detail.finance_insurance_extend.mid_class || '---'}}</div>
        </div>
        <div class="product_points_item">
          <div>缴费年期</div>
          <div>{{detail.finance_insurance_extend.payment_years || '---'}}</div>
        </div>
        <div class="product_points_item">
          <div>投保年龄</div>
          <div>{{detail.finance_insurance_extend.policy_holders_age || '---'}}</div>
        </div>
        <div class="product_points_item">
          <div>保障期限</div>
          <div>{{detail.finance_insurance_extend.policy_period || '---'}}</div>
        </div>
      </div>
      <div class="product_tab_item product_files" :class="{actived: activeIndex === 2}">
        <h3>产品介绍文件</h3>
        <ul class="product_files_file">
          <li v-for="(item, index) in detail.introduction_documents" :key="index" >
            <span @click="$common.previewFile(item.document_url, 'pdf')">{{item.document_name}}</span>
            <navigator class="file" hover-class="none"
                       open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                       :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + item.document_name + '&filePath=' + item.document_url"
                       target="miniProgram"
                       version="trial"
            >
              <img src="/images/icon_share.png" mode="aspectFit" style="width: 40rpx;height: 43rpx;">
            </navigator><!--develop-->
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="btn_concat" v-if="advisor.advisor_name" @click="concat(advisor.advisor_phone)">
      <img src="/images/icon_phone_white.png" mode="aspectFit" style="width: 32rpx;height: 32rpx;">
      <span>联系我的小i投资顾问: {{advisor.advisor_name}}</span>
    </div> -->
    <div class="finance_footer">
      <div class="finance_footer_left">
        <div class="finance_footer_icon" @click="changeCollection">
          <img :src="detail.is_favor ? '/images/icon_collection_active.png' : '/images/icon_collection.png'" class="finance_footer_collection_icon"/>
          <span>{{detail.is_favor ? '已收藏' : '收藏'}}</span>
        </div>
        <label class="finance_footer_icon" for="contact">
          <img src="/images/icon_advisory.png"/>
          <span>在线咨询</span>
        </label>
        <div class="finance_footer_icon" @click="showReserveLink = true">
          <img src="/images/icon_reserve.png"/>
          <span>签单预约</span>
        </div>
      </div>
      <div class="finance_footer_right">
        <div class="finance_footer_invest" @click="toMiniProgram"> 发送客户 </div>
        <div class="finance_footer_adviser" @click="toPage('/pages/plan/main?product_id=' + deliverData.product_id )"> 生成计划书 </div>
      </div>
    </div>
    <button id="contact" open-type="contact"></button>
    <div class="mask" v-if="showShareBtn" @click="showShareBtn = false"></div>

    <div class="reserve_link" :class="{actived: showReserveLink}"  @click.self="showReserveLink = false">
      <div>
        <h2 @click="showReserveLink = false">
          <img src="/images/icon_arrow_down.png" mode="aspectFit" style="width: 23rpx;height:12rpx;">
          <p>保单预约</p>
        </h2>
        <div >
          <p >由于保单预约所需资料过多，为方便填写，建议您复制以下链接到PC端进行预约</p>
          <span class="link">{{reserveLink}}</span>
          <button @click="copy">复制链接</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        title: '海外保险',
        product: {},
        activeIndex: 1,
        deliverData: {
          product_id: '',
          product_type: '',
          introduce_code: '',
        },
        detail: {
          finance_insurance_extend: {
            product_highlights: []
          },
        },
        path: '',
        planParams: {},
        showShareBtn: false,
        showReserveLink: false,
        reserveLink: '',
      }
    },
    computed: {
      ...mapState(['productArticle']),
    },
    async onLoad (params) {
      this.productId = this.$root.$mp.query.product_id || 2010700
      this.productType = this.$root.$mp.query.product_type || 1
      let status = await this.$http.get('/wx/itrade/channel/getAdvisorByLogin', {})
      this.introduceCode = status.code

      this.deliverData.product_id = this.productId
      this.deliverData.product_type = this.productType
      this.deliverData.introduce_code = status.code

      this.path = `/pages/product_detail/main?product_id=${this.deliverData.product_id}&product_type=${this.deliverData.product_type}&introduce_code=${this.deliverData.introduce_code}&source=itrade_wx`

      await this.getParams()
      await this.getProductDetail()

      this.reserveLink = `https://${wx.mx_dev ? 'org' : ''}api.fortunefed.com/mx/sso/login?action=APPOINTMENT_SIGN_BILL&channelId=${this.planParams.related_party_id}&itemId=${this.detail.id}&supplierId=${this.detail.management_id}&token=${this.planParams.unitive_token}`

      await this.$store.dispatch('getProductArticle', {
        id: this.productId,
        type: this.productType
      })
      // 数据统计
      this.$auth.dataBuryPoint({
        eventName: 'product_detail:init:visit',
        eventDataId: this.productId,
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduceCode,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
    },
    methods: {
      changeCollection () {
        // 数据统计
        this.$auth.dataBuryPoint({
          eventName: 'product_detail:collect:click',
          eventDataId: this.productId,
          source: this.$root.$mp.query.source,
          utmSource: this.$root.$mp.query.utm_source,
          introduceCode: this.introduceCode,
          shareInvestorId: '',
          prePage: wx.getStorageSync('from')
        })
        let params = {
          is_favor: !this.detail.is_favor,
          product_id: this.productId,
          product_type: this.productType
        }
        this.$http.post('/wx/itrade/finance/favor', params).then(d => {
          this.detail.is_favor = !this.detail.is_favor
          // this.$store.dispatch('getProductInfo', {
          //   id: this.productId,
          //   type: this.productType
          // })
        })
      },
      async getProductDetail () {
        try {
          this.detail = await this.$http.post(`/wx/itrade/finance/detail?finance_id=${this.productId}&product_type=${this.productType}`, {})
          console.log(this.detail)
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
      createPlan () {
        // let url = `https://weixin.fortunefed.com/prod/#/normalPlan?sessionId=${this.planParams.session_id}&token=${this.planParams.access_token}&channelId=${this.planParams.related_party_id}&itemId=${this.deliverData.product_id}&userId=${this.planParams.ff_user_id}`
        let url = `https://weixin.fortunefed.com/#/normalPlan?sessionId=${this.planParams.session_id}&token=${this.planParams.access_token}&channelId=${this.planParams.related_party_id}&itemId=${this.deliverData.product_id}&userId=${this.planParams.ff_user_id}`
        this.goWebView(url)
      },
      async goWebView (url) {
        await wx.setStorageSync('webViewUrl', url)
        await this.toPage({
          url: '/pages/web_view_page/main',
          data: {
            url: url,
            title: '申请计划书',
          }
        })
      },
      openFile () {
        // 数据统计
        this.$auth.dataBuryPoint({
          eventName: 'product_detail:load_product_book:click',
          eventDataId: this.productId,
          source: this.$root.$mp.query.source,
          utmSource: this.$root.$mp.query.utm_source,
          introduceCode: this.introduceCode,
          shareInvestorId: '',
          prePage: wx.getStorageSync('from')
        })
        if (this.detail.product_book_documents.length > 0) {
          this.$common.previewFile(this.detail.product_book_documents[0].document_url, 'pdf')
        } else {
          wx.showToast({
            title: '暂无文件',
            icon: 'none'
          })
        }
      },
      openDoc (url) {
        wx.showLoading({
          title: '文件打开中'
        })
        wx.downloadFile({
          url: url,
          success: function (res) {
            if (res.statusCode === 200) {
              wx.openDocument({
                filePath: res.tempFilePath,
                fail: function () {
                  wx.hideLoading()
                  wx.showToast({
                    title: '打开失败',
                    icon: 'none'
                  })
                }
              })
            } else {
              wx.hideLoading()
              wx.showToast({
                title: '文件名错误',
                icon: 'none'
              })
            }
          },
          fail: function () {
            wx.hideLoading()
            wx.showToast({
              title: '打开失败',
              icon: 'none'
            })
          }
        })
      },
      concat (phone) {
        wx.makePhoneCall({
          phoneNumber: phone
        })
      },
      toMiniProgram () {
        let _this = this
        // 数据统计
        _this.$auth.dataBuryPoint({
          eventName: 'product_detail:share_button:click',
          eventDataId: this.productId,
          source: this.$root.$mp.query.source,
          utmSource: this.$root.$mp.query.utm_source,
          introduceCode: this.introduceCode,
          shareInvestorId: '',
          prePage: wx.getStorageSync('from')
        })
        wx.navigateToMiniProgram({
          appId: 'wxcd7c5762adbd3cf5',
          path: _this.path,
          extraData: {},
          envVersion: 'trial',
          success (res) {
            console.log('成功', res)
          },
          fail (res) {
            console.log('失败', res)
          },
          complete (res) {
            console.log('必然', res)
          },
        })
      },
      copy () {
        wx.setClipboardData({
          data: this.reserveLink,
          success () {
          },
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product {
    padding-top: 5px;
    &_title {
      @include flex(flex-start);
      margin-bottom: 5px;
      padding: $middle-space;
      background: #fff;
      h2 {
        font-size: 36px;
        margin-left: $middle-space;
      }
      img {
        // background: $backgroundColor;
      }
    }
    &_summary {
      @include flex();
      padding: $big-space 0;
      margin-bottom: $small-space;
      background: #fff;
      >div {
        @include flex();
        flex-direction: column;
        flex: 1;
        max-width: 33%;
        p {
          width: 100%;
          @include text-truncate();
          text-align: center;
        }
        span {
          padding-top: $middle-space;
          color: $lightColor;
        }
      }
    }
    &_company {
      @include flex(space-between);
      padding: $middle-space;
      margin-bottom: $middle-space;
      background: #fff;
      >div {
        position: relative;
        @include size(333px, 100px);
        padding: 10px;
        @include flex();
        background: $backgroundColor;
        color: $mainColor;
        border: 1px solid $mainColor;
        border-radius: 10px;
        >span {
          margin-left: $middle-space;
        }
        >div {
          position: absolute;
          top: 120px;
          left: 0;
          z-index: 100;
          background: #fff;
          padding: $middle-space;
          @include flex();
          border-radius: 5px;
          &:before {
            content: '';
            display: block;
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            border: 10px solid transparent;
            border-bottom-color: #ffffff;
          }
          .btn {
            flex: 1;
            @include size(150px, 40px);
            @include flex();
            &:first-child {
              border-right: 1px solid $borderColor;
              color: $lightColor;
            }
          }
        }
      }
    }
    &_highlight {
      background: #fff;
      padding: $middle-space;
      margin-bottom: $middle-space;
      >div {
        @include flex(flex-start);
        padding: $middle-space 0;
        font-size: 30px;
        border-bottom: 1px solid $borderColor;
        span {
          margin-left: $middle-space;
        }
      }
      li {
        line-height: 1.6em;
      }
    }
    &_detail {
      padding-bottom: 120px;
    }
    &_tab {
      width: 100%;
      @include flex();
      text-align: center;
      padding: $small-space;
      border-bottom: 1px solid $borderColor;
      background: #fff;
      > li {
        padding: $middle-space;
        flex: 1;
        font-size: 28px;
        transition: color .3s;
        &:not(:last-child) {
          border-right: 1px solid $borderColor;
        }
        &.actived {
          color: $mainColor;
        }
      }
      &_item {
        transition: transform .2s;
        transform: scaleY(0);
        transform-origin: top center;
        position: absolute;
        opacity: 0;
        &.actived {
          position: static;
          transform: scaleY(1);
          opacity: 1;
        }
      }
    }
    .information_item {
      background: #fff;
      @include flex();
      padding: $middle-space;
      border-bottom: 1px solid $borderColor;
      img {
        background: $backgroundColor;
      }
      >div {
        @include flex(space-between, flex-start);
        flex-direction: column;
        margin-left: $middle-space;
        line-height: 1.6;
        flex: 1;
        align-self: stretch;
        font-size: 22px;
        color: $lightColor;
        h3 {
          font-size: 26px;
          color: $deepColor;
        }
      }
    }
    &_points {
      padding-top: $small-space;
      &_item {
        padding: 0 $middle-space;
        background: #fff;
        margin-bottom: $small-space;
        div:first-child {
          border-bottom: 2px solid $borderColor;
        }
        div {
          font-size: 22rpx !important;
          padding: $middle-space $big-space;
          @include text-truncate();
        }
      }
    }
    &_files {
      margin-top: $small-space;
      background: #fff;
      padding: 0 $middle-space;
      h3 {
        padding: $middle-space 0;
        border-bottom: 1px solid $borderColor;
      }
      &_file {
        padding: $small-space $big-space;
        color: $mainColor;
        font-size: 28px;
        li {
          padding: 5px 0;
          @include flex(space-between);
          .file {
            @include flex();
          }
          >span {
            flex: 1;
          }
        }
      }
    }

    .finance_footer {
      width: 100%;
      height: 100rpx;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      &_adviser {
        flex: 1;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        background: $mainColor;
        color: #fff;
      }
      &_invest {
        flex: 1;
        height: 100rpx;
        background: #84A9F8;
        text-align: center;
        line-height: 100rpx;
        color: #ffffff;
      }
      &_left, &_right {
        @include flex();
        flex: 1;
        align-self: stretch;
        background: #fff;
      }
      &_icon {
        flex: 1;
        @include flex();
        flex-direction: column;
        font-size: 24px;
        color: $deepColor;
        img {
          @include size(34px);
        }
        &:not(:last-child) {
          border-right: 1px solid $borderColor;
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    @include size(100vw, 100vh);
    background: rgba(0,0,0,.4);
  }

  .reserve_link {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background: rgba(0,0,0, .4);
    visibility: hidden;
    @include size(100vw, 100vh);

    > div {
      position: absolute;
      bottom: 0;
      left: 0;
      @include size(100vw, 50vh);
      overflow: scroll;
      background: #fff;
      transition: all .3s;
      transform: translateY(100%);
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
        .link {
          display: block;
          word-break: break-all;
          border: 1px solid $borderColor;
          padding: $middle-space;
          margin: $middle-space 0;
        }
      }
    }
  }
  .reserve_link.actived {
    z-index: 10;
    visibility: visible;
    >div {
      transform: translateY(0);
    }
  }
</style>
