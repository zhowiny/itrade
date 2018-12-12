<template>
  <div class="container">
    <div class="index">
      <!-- 轮播图 -->
      <div class="index_banner" v-if="legalized">
        <swiper indicator-dots="true" autoplay="true" interval="5000" duration="300" circular="true">
          <block v-for="(item, index) in bannerList" :key="index">
            <swiper-item>
              <image :src="item.img" class="slide-image" @click="bannerClick(item.target, item.data_id, item.sub_target)"/>
            </swiper-item>
          </block>
        </swiper>
      </div>

      <div v-if="!legalized">
        <!-- 未认证视频 -->
        <div class="legalizeState_video">
          <!-- :poster="videoPic" -->
          <video id="myVideo" controls="true" src="https://file.meixinglobal.com/media/20180916/17573846-e31e-4ede-bbe6-bcae99d4bb7c.mp4"  poster="https://file.meixinglobal.com/media/20181103/422e86f1-a3c5-45a5-a719-d790e6d42b44.jpg"></video>
        </div>
        <!-- 认证信息 -->
        <div class="legalize">
          <div class="legalize_status" v-if="loginStatus">
            <img class="legalize_status_pic" v-if="legalizedStatus==0||legalizedStatus==-1" src="/images/legalize_none.png" alt="">
            <img class="legalize_status_pic" v-if="legalizedStatus==1" src="/images/legalize_audit.png" alt="">
            <img class="legalize_status_pic" v-if="legalizedStatus==2" src="/images/legalize_success.png" alt="">
            <img class="legalize_status_pic" v-if="legalizedStatus==3" src="/images/legalize_fail.png" alt="">
          </div>
          <div class="legalize_btn">
            <mx-button text="立即认证" v-if="loginStatus" @click="toPage({url: '/pages/legalize_page/main', type: 'reLaunch'})" round type="primary"/>
            <mx-button text="登录/注册" v-else  @click="toPage({url: '/pages/login_vcode/main', type: 'reLaunch'})" round type="primary"/>
          </div>
          <p class="legalize_explain"> - 完成身份认证，享受更多特权 - </p>
          <p class="legalize_text"> 海量优质产品可预约 </p>
          <p class="legalize_text"> 专属客服一对一售前服务 </p>
          <p class="legalize_text"> 每日提供优质内容，可以你的名义分享转发 </p>
          <p class="legalize_text"> 文章中推荐产品随你替换 </p>
          <p class="legalize_text"> …… </p>
        </div>
      </div>

      <!-- 平台数据 -->
      <!-- <div class="index_data">
        <div class="index_data_item">
          <p class="index_data_item_value"> {{info.product_num}}个 </p>
          <p class="index_data_item_label"> 平台资产数量 </p>
        </div>
        <div class="index_data_item" style="border-left:1px solid #dddddd;border-right:1px solid #dddddd;">
          <p class="index_data_item_value"> {{info.gmv}} </p>
          <p class="index_data_item_label"> 平台成交总额 </p>
        </div>
        <div class="index_data_item">
          <p class="index_data_item_value"> {{info.import_product_amount}} </p>
          <p class="index_data_item_label"> 引入资管管理总量 </p>
        </div>
      </div> -->
      <!-- 产品类别 -->
      <div class="index_assortment">
        <div class="index_assortment_item" @click="goProductList(1)">
          <img class="assortmentPic" src="/images/icon_finance.png" alt="">
          <p class="assortmentText"> 金融资产 </p>
        </div>
        <div class="index_assortment_item" @click="goProductList(2)">
          <img class="assortmentPic" src="/images/icon_estate.png" alt="">
          <p class="assortmentText"> 海外房产 </p>
        </div>
        <div class="index_assortment_item" @click="goProductList(3)">
          <img class="assortmentPic" src="/images/icon_insurance.png" alt="">
          <p class="assortmentText"> 保单服务 </p>
        </div>
        <div class="index_assortment_item" @click="goProductList(4)">
          <img class="assortmentPic" src="/images/icon_immigrant.png" alt="">
          <p class="assortmentText"> 移民护照 </p>
        </div>
      </div>
      <!-- 本周推荐 -->
      <div class="index_recommend">
        <p class="index_recommend_title"> 本周推荐 </p>
        <scroll-view class="scroll-view_H" scroll-x>
          <div style="display: flex;">
            <div class="index_recommend_item" v-for="(item, index) in topictList" :key="index" @click="goWebView(item.url)">
              <img class="recommendPic" :src="item.logo" alt="">
              <!-- <p class="recommendText"> {{item.title}} </p> -->
            </div>
          </div>
        </scroll-view>
      </div>
      <!-- 产品类型 -->
      <div class="index_type">
        <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
          <div style="display: flex;">
            <div class="index_type_item" @click="changeTags(-1)">
              <img class="typePic" v-if="tagId==-1" src="/images/icon_allA.png" alt="">
              <img class="typePic" v-if="tagId!=-1" src="/images/icon_all.png" alt="">
              <p class="typeText" :class="{active: tagId==-1}"> 全部类别 </p>
            </div>
            <div class="index_type_item" @click="changeTags(1)">
              <img class="typePic" v-if="tagId==1" src="/images/icon_sequestrationA.png" alt="">
              <img class="typePic" v-if="tagId!=1" src="/images/icon_sequestration.png" alt="">
              <p class="typeText" :class="{active: tagId==1}"> 固收理财 </p>
            </div>
            <div class="index_type_item" @click="changeTags(7)">
              <img class="typePic" v-if="tagId==7" src="/images/icon_estate1A.png" alt="">
              <img class="typePic" v-if="tagId!=7" src="/images/icon_estate1.png" alt="">
              <p class="typeText" :class="{active: tagId==7}"> 海外房产 </p>
            </div>
            <div class="index_type_item" @click="changeTags(2)">
              <img class="typePic" v-if="tagId==2" src="/images/icon_estatefundA.png" alt="">
              <img class="typePic" v-if="tagId!=2" src="/images/icon_estatefund.png" alt="">
              <p class="typeText" :class="{active: tagId==2}"> 房地产基金 </p>
            </div>
            <div class="index_type_item" @click="changeTags(3)">
              <img class="typePic" v-if="tagId==3" src="/images/icon_hedgingA.png" alt="">
              <img class="typePic" v-if="tagId!=3" src="/images/icon_hedging.png" alt="">
              <p class="typeText" :class="{active: tagId==3}"> 对冲/另类 </p>
            </div>
            <div class="index_type_item" @click="changeTags(4)">
              <img class="typePic" v-if="tagId==4" src="/images/icon_equityA.png" alt="">
              <img class="typePic" v-if="tagId!=4" src="/images/icon_equity.png" alt="">
              <p class="typeText" :class="{active: tagId==4}"> 独角兽 </p>
            </div>
            <div class="index_type_item" @click="changeTags(5)">
              <img class="typePic" v-if="tagId==5" src="/images/icon_insuranceA.png" alt="">
              <img class="typePic" v-if="tagId!=5" src="/images/icon_insuranceNA.png" alt="">
              <p class="typeText" :class="{active: tagId==5}"> 保单管理 </p>
            </div>
            <div class="index_type_item" @click="changeTags(9)">
              <img class="typePic" v-if="tagId==9" src="/images/icon_immigrantA.png" alt="">
              <img class="typePic" v-if="tagId!=9" src="/images/icon_immigrantNA.png" alt="">
              <p class="typeText" :class="{active: tagId==9}"> 移民护照 </p>
            </div>
            <div class="index_type_item" @click="changeTags(6)">
              <img class="typePic" v-if="tagId==6" src="/images/icon_trustA.png" alt="">
              <img class="typePic" v-if="tagId!=6" src="/images/icon_trust.png" alt="">
              <p class="typeText" :class="{active: tagId==6}"> 家族信托 </p>
            </div>
            <div class="index_type_item" @click="changeTags(10)">
              <img class="typePic" v-if="tagId==10" src="/images/icon_publicfundA.png" alt="">
              <img class="typePic" v-if="tagId!=10" src="/images/icon_publicfund.png" alt="">
              <p class="typeText" :class="{active: tagId==10}"> 公募基金 </p>
            </div>
          </div>
        </scroll-view>
      </div>
      <!-- 列表 -->
      <div>
        <product-list :data="productList" :legalize="legalized" @clickAdmin="goProductDetails" @clickProduct="goProductDetails"/>
      </div>

      <p class="index_pull_up">{{pullTips}}</p>
    </div>
  </div>
</template>

<script>

import mxButton from '@/components/button'
import productList from '@/components/product-list'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      title: '首页',
      bannerList: [],
      productList: [],
      topictList: [],
      tagId: -1,
      productType: 0,

      loginStatus: false,
      legalized: false,
      legalizedStatus: 0,

      pageNum: 1,
      pullTips: '----- 上拉加载更多 -----',
      isLastPage: false
    }
  },
  computed: {
    ...mapState(['fromLandingPage']),
  },
  components: {
    productList,
    mxButton,
  },

  async onShow () {
    // let status = await this.$http.get('/wx/itrade/channel/getAdvisorByLogin', {})
    // await this.$common.setIsLegalize(status.is_legalize)
    // this.legalizedStatus = status.legalize_status

    // let advisorId = await this.$common.getAdvisorId()
    // if (advisorId !== '' && advisorId !== 0) {
    //   this.loginStatus = true
    // } else {
    //   this.loginStatus = false
    // }
    // let legalize = await this.$common.getIsLegalize()
    // if (legalize !== '' && legalize !== false) {
    //   this.legalized = true
    // } else {
    //   this.legalized = false
    // }
  },

  methods: {
    bannerClick (tag, id, type) {
      if (tag === 5) {
        switch (type) {
          case 2:
            this.toPage({
              url: '/pages/estate_details_page/main',
              data: {
                product_id: id,
                product_type: type,
              }
            })
            break
          case 3:
            this.toPage({
              url: '/pages/insurance_details_page/main',
              data: {
                product_id: id,
                product_type: type,
              }
            })
            break
          default:
            this.toPage({
              url: '/pages/finance_details_page/main',
              data: {
                product_id: id,
                product_type: type,
              }
            })
        }
      }
    },
    changeTags (tagId) {
      this.tagId = tagId
      this.pageNum = 1
      this.getList('', this.productType, tagId, 1)
    },
    // goAdmin (data) {},
    goProductDetails (data) {
      if (!this.legalized) {
        wx.showToast({
          title: '认证后查看',
          icon: 'none',
          duration: 2000,
          mask: true,
        })
        return
      }
      switch (data.product_type) {
        case 2:
          this.toPage({
            url: '/pages/estate_details_page/main',
            data: {
              product_id: data.id,
              product_type: data.product_type,
            }
          })
          break
        case 3:
          this.toPage({
            url: '/pages/insurance_details_page/main',
            data: {
              product_id: data.id,
              product_type: data.product_type,
            }
          })
          break
        default:
          this.toPage({
            url: '/pages/finance_details_page/main',
            data: {
              product_id: data.id,
              product_type: data.product_type,
            }
          })
      }
    },
    goProductList (productType) {
      this.goPage({
        url: '/pages/product_list_page/main',
        data: {
          product_type: productType
        }
      })
    },
    async goWebView (url) {
      await wx.setStorageSync('webViewUrl', url)
      await this.toPage({
        url: '/pages/web_view_page/main',
        data: {
          url: url
        }
      })
    },
    async getList (name, productType, tagId, pageNum) {
      let list = await this.$http.post('/wx/itrade/product/list', {
        name: name,
        product_type: productType,
        tag_id: tagId,
        commission_sort: null,
        invest_term_sort: null,
        return_sort: null,
        sales_volume_sort: null,
        page_num: pageNum,
        page_size: 10
      })
      let productList = list.list
      productList.forEach((v, i) => {
        let feature = v.management_feature.split(',')
        v.management_feature = feature
      })
      if (pageNum === 1) {
        this.productList = []
        this.productList = productList
      } else {
        this.productList = this.productList.concat(productList)
      }
      this.topictList = list.topict_list
      this.isLastPage = list.is_last_page
      if (list.is_last_page) {
        this.pullTips = '----- 已经到底了 -----'
      } else {
        this.pullTips = '----- 上拉加载更多 -----'
      }
    },
    goPage (params) {
      if (this.loginStatus) {
        this.toPage(params)
      } else {
        this.showToast('请登录后操作')
      }
    },
    async init () {
      await this.$auth.login()
      if (!this.$common.getHasBindPhone() && !this.fromLandingPage) {
        this.toPage('/pages/landing_page/main')
      }
      // await this.$common.getUserInfo()
      let advisorId = await this.$common.getAdvisorId()
      this.loginStatus = advisorId !== '' && advisorId !== 0
      let legalize = await this.$common.getIsLegalize()
      this.legalized = legalize !== '' && legalize !== false

      let info = await this.$http.post('/wx/itrade/index', {
        page_num: 1,
        page_size: 10
      })
      console.log(info.un_legalized_top_video)
      this.video = info.un_legalized_top_video
      this.videoPic = info.un_legalized_top_cover_img
      this.bannerList = info.carousel_list

      await this.getList('', this.productType, this.tagId, 1)
    },
  },
  async onLoad () {
    this.init()
    this.$auth.dataBuryPoint({
      eventName: 'index:init:visit',
      eventDataId: '',
      source: this.$root.$mp.query.source,
      utmSource: this.$root.$mp.query.utm_source,
      introduceCode: '',
      shareInvestorId: '',
      prePage: wx.getStorageSync('from')
    })
  },
  created () {
  },
  async onPullDownRefresh () {
    // to doing..
    // 停止下拉刷新
    await this.init()
    wx.stopPullDownRefresh()
  },
  // 上拉加载
  async onReachBottom () {
    if (this.isLastPage) {
      this.$common.showToast('没有跟多数据啦～')
    } else {
      await this.pageNum++
      this.getList('', this.productType, this.tagId, this.pageNum)
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '美信金融顾问端',
      path: '/pages/index/main',
    }
  },
}
</script>

<style scoped lang="scss">
  .index{
    // 轮播图
    width: 750rpx;
    overflow: hidden;
    &_banner{
      width: 750rpx;
      height: 400rpx;
      swiper{
        width: 100%;
        height: 400rpx;
        .slide-image{
          width: 750rpx;
          height: 400rpx;
        }
      }
    }
    // 平台数据
    &_data{
      background: $contentcolor;
      padding: $middle-space 0;
      @include flex(flex-start, center);
      border-bottom: 1px solid $borderColor;
      &_item{
        width: 33.33%;
        text-align: center;
        &_value{
          font-size: 28rpx;
          color: $mainColor;
          margin-bottom: 10rpx;
        }
        &_label{
          font-size: 22rpx;
        }
      }
    }
    // 产品类别
    &_assortment{
      background: $contentcolor;
      padding: $middle-space 0;
      @include flex(flex-start, center);
      &_item{
        width: 25%;
        @include flex(center, center);
        flex-direction: column;
        .assortmentPic{
          width: 86rpx;
          height: 86rpx;
        }
        .assortmentText{
          font-size: 24rpx;
          margin-top: 20rpx;
        }
      }
    }
    // 本周推荐
    &_recommend{
      margin-top: $middle-space;
      background: $contentcolor;
      padding: $middle-space;
      &_title{
        font-size: 30rpx;
        font-weight: 900;
        margin-bottom: $middle-space;
      }
      &_item{
        flex-grow: 1;
        width: 400rpx;
        margin-right: 20rpx;
        .recommendPic{
          width: 400rpx;
          height: 260rpx;
          border-radius: $default-border-radius;
          overflow: hidden;
        }
        .recommendText{
          font-size: 24rpx;
          @include text-truncate();
        }
      }
    }
    // 产品类型
    &_type{
      margin-top: $middle-space;
      background: $contentcolor;
      padding: $middle-space;
      padding-bottom: 0;
      border-bottom: 1px solid $borderColor;
      &_item{
        flex-shrink: 0;
        width: 140rpx;
        @include flex(center, center);
        flex-direction: column;
        .typePic{
          width: 60rpx;
          height: 60rpx;
        }
        .typeText{
          margin-top: 10rpx;
          font-size: 22rpx;
          text-align: center;
          color: $lightColor;
          padding-bottom: 10rpx;
          box-sizing: border-box;
        }
        .active{
          border-bottom: 4px solid $mainColor;
          color: $mainColor;
        }
      }
    }

    .legalizeState_video{
      #myVideo{
        width: 750rpx;
        height: 400rpx;
      }
    }

    .legalize{
      margin-top: 10rpx;
      margin-bottom: 20rpx;
      padding: $big-space $big-space;
      background: #ffffff;
      &_status{
        @include flex(center, center);
        &_pic{
          width: 602rpx;
          height: 122rpx;
        }
      }
      &_btn{
        padding: $big-space $middle-space;
        @include flex(center, center);
      }
      &_explain{
        text-align: center;
        margin-bottom: $big-space;
        color: #AAAAAA;
        font-size: 24rpx;
      }
      &_text{
        text-align: center;
        color: #666666;
        font-size: 26rpx;
        margin-bottom: 20rpx;
      }
    }
    &_pull_up{
      font-size: 24px;
      color: #666666;
      text-align: center;
      margin: 40px 0;
    }
  }
</style>
