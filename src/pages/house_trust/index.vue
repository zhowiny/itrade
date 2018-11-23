<template>
  <div class="container house_trust">
    <div class="banner">
      <img src="/images/house_trust_banner.png" mode="aspectFit">
      <h1>iTrade 全球房屋托管业务</h1>
    </div>
    <div class="statistics">
      <img src="/images/background_1.png" class="statistics_img">
      <ul>
        <li>
          <img src="/images/icon_house_1.png" mode="aspectFit" style="width: 48rpx;height:46rpx;">
          <p><span>5</span>年托管经验</p>
        </li>
        <li>
          <img src="/images/icon_house_2.png" mode="aspectFit" style="width: 48rpx;height:46rpx;">
          <p>管理房产<span>1474</span>套</p>
        </li>
        <li>
          <img src="/images/icon_house_3.png" mode="aspectFit" style="width: 48rpx;height:46rpx;">
          <p>出租成交<span>57604</span>单</p>
        </li>
        <li>
          <img src="/images/icon_house_4.png" mode="aspectFit" style="width: 48rpx;height:46rpx;">
          <p>委托金额达<span>9</span>亿元</p>
        </li>
      </ul>
    </div>
    <div class="brief">
      <div>
        <img src="/images/icon_house_5.png" mode="aspectFit" style="width: 45rpx;height:45rpx;">
        <p><span class="bold">覆盖面广</span>涵盖12项服务</p>
      </div>
      <div>
        <img src="/images/icon_house_6.png" mode="aspectFit" style="width: 45rpx;height:45rpx;">
        <p><span class="bold">靠谱放心</span>甄选开发商深耕合作+自有托管公司</p>
      </div>
      <div>
        <img src="/images/icon_house_7.png" mode="aspectFit" style="width: 45rpx;height:45rpx;">
        <p><span class="bold">专业省心</span>一对一专业服务，全程一站式全包托管服务</p>
      </div>
    </div>
    <div class="trusteeship">
      <h1>"<span class="bold">托管流程</span>"</h1>
      <div class="trusteeship_process">
        <div class="trusteeship_process_icon">
          <img src="/images/icon_house_step_1.png" mode="aspectFit" style="width: 50rpx;height: 54rpx;">
          <i></i>
          <img src="/images/icon_house_step_2.png" mode="aspectFit" style="width: 50rpx;height: 54rpx;">
          <i></i>
          <img src="/images/icon_house_step_3.png" mode="aspectFit" style="width: 50rpx;height: 54rpx;">
          <i></i>
          <img src="/images/icon_house_step_4.png" mode="aspectFit" style="width: 50rpx;height: 54rpx;">
        </div>
        <div class="trusteeship_process_text">
          <p>线上提交委托</p>
          <span></span>
          <p>物业管家电话核实</p>
          <span></span>
          <p>线下材料审核</p>
          <span></span>
          <p>签署委托协议</p>
        </div>
      </div>
    </div>
    <div class="service">
      <h1>"<span class="bold">服务项目</span>"</h1>
      <ul>
        <li>
          <img src="/images/icon_house_product_1.png" mode="aspectFit" style="width: 50rpx;height: 50rpx;">
          <span>房产证办理</span>
        </li>
        <li>
          <img src="/images/icon_house_product_2.png" mode="aspectFit" style="width: 50rpx;height: 50rpx;">
          <span>委托出租</span>
        </li>
        <li>
          <img src="/images/icon_house_product_3.png" mode="aspectFit" style="width: 50rpx;height: 50rpx;">
          <span>账单查询及代缴</span>
        </li>
        <li>
          <img src="/images/icon_house_product_4.png" mode="aspectFit" style="width: 50rpx;height: 50rpx;">
          <span>委托出手</span>
        </li>
        <li>
          <img src="/images/icon_house_product_5.png" mode="aspectFit" style="width: 50rpx;height: 50rpx;">
          <span>房屋价格评估</span>
        </li>
        <li>
          <img src="/images/icon_house_product_6.png" mode="aspectFit" style="width: 50rpx;height: 50rpx;">
          <span>房屋装修</span>
        </li>
        <li>
          <img src="/images/icon_house_product_7.png" mode="aspectFit" style="width: 50rpx;height: 50rpx;">
          <span>维修及日常维护</span>
        </li>
        <li>
          <img src="/images/icon_house_product_8.png" mode="aspectFit" style="width: 50rpx;height: 50rpx;">
          <span>其他5种</span>
        </li>
      </ul>
    </div>
    <div class="partner">
      <h1>"<span class="bold">大牌合作机构</span>"</h1>
      <p>我们甄选当地优质开发商作为合作机构</p>
      <img src="/images/company.png" mode="aspectFut" style="width: 588rpx; height: 433rpx;">
    </div>
    <div class="customer_reviews">
      <h1>"<span class="bold">客户评价</span>"</h1>
      <div class="customer_reviews_swiper">
        <swiper autoplay indicator-dots indicator-color="rgba(48,111,244,0.3)" indicator-active-color="rgba(48,111,244,1)">
          <swiper-item>
            <img src="/images/customer_reviews_1.png" mode="aspectFit" style="width: 698rpx; height: 798rpx" />
          </swiper-item>
          <swiper-item>
            <img src="/images/customer_reviews_2.png" mode="aspectFit" style="width: 698rpx; height: 798rpx" />
          </swiper-item>
          <swiper-item>
            <img src="/images/customer_reviews_3.png" mode="aspectFit" style="width: 698rpx; height: 798rpx" />
          </swiper-item>
        </swiper>
      </div>
    </div>
    <navigator hover-class="none" class="share"
               open-type="navigate" app-id="wxcd7c5762adbd3cf5" :url="path + introduce_code"
               :path="path + introduce_code" target="miniProgram"
               :extra-data="deliverData" version="trial"
    >发送给客户</navigator>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '房产托管',
      deliverData: {
        introduce_code: '',
        source: 'itrade_wx',
      },
      path: `pages/house_trust/trust_landing_page/main?source=itrade_wx&introduce_code=`,
      introduce_code: '',
    }
  },
  async onLoad (params) {
    this.deliverData.introduce_code = this.introduce_code = await this.$common.getAdvisorId()
    // 数据统计
    this.$auth.dataBuryPoint({
      eventName: 'estate_house_trusteeship_introduce:init:visit',
      eventDataId: '',
      source: this.$root.$mp.query.source,
      utmSource: this.$root.$mp.query.utm_source,
      introduceCode: this.introduce_code,
      shareInvestorId: '',
      prePage: wx.getStorageSync('from')
    })
  },
  methods: {
    changeCurrent (e) {
      console.log(e)
    },
  },
}
</script>

<style lang="scss" scoped>
  .house_trust {
    color: $deepColor;
    background: #fff;
    padding-bottom: 100px;
    .banner {
      position: relative;
      @include size(100vw, 360px);
      img {
        @include size(100%);
        position: absolute;
        left: 0;
        top: 0;
      }
      h1 {
        font-size: 52px;
        color: #fff;
        text-align: center;
        padding-top: $big-space;
        position: relative;
        z-index: 2;
      }
    }
    .statistics {
      @include size(607px, 446px);
      position: relative;
      margin: $big-space auto;
      box-shadow: 0 0 40px 0 transparentize($mainColor, .6);
      >img, ul {
        @include size(100%);
      }
      >img {
        position: absolute;
        left: 0;
        top: 0;
      }
      ul {
        padding: $middle-space $big-space * 2;
        position: relative;
        z-index: 2;
        @include flex(center, space-between);
        flex-direction: column;
        li {
          @include flex(flex-start);
          border-bottom: 1px solid transparentize($mainColor, .6);
          padding: $middle-space;
          &:last-child {
            border-bottom: none;
          }
          img {
            margin-right: $big-space;
          }
          p > span {
            font-size: 40px;
            color: transparentize($mainColor, .4);
            margin: 0 $small-space;
          }
        }
      }
    }
    .brief {
      padding: $big-space $big-space * 2;
      >div {
        @include flex(flex-start);
        margin-bottom: $big-space * 2;
        >img {
          margin-right: $big-space;
        }
      }
    }
    .bold {
      position: relative;
      font-size: 36px;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        @include size(100%, 15px);
        background: transparentize($mainColor, .6);
      }
    }
    .trusteeship {
      h1 {
        font-size: 52px;
        text-align: center;
      }
      &_process {
        padding: $big-space;
        font-size: 24px;
        &_text {
          margin-top: $big-space;
        }
        &_icon, &_text {
          @include flex();
          img, p {
            flex: 5;
            text-align: center;
          }
          span, i {
            flex: 3;
          }
          i {
            display: block;
            @include size(100%, 3px);
            background: $mainColor;
          }
        }
      }
    }
    .service {
      padding: $big-space $small-space;
      h1 {
        font-size: 52px;
        text-align: center;
      }
      ul {
        @include flex();
        flex-wrap: wrap;
        padding: $big-space 0;
        li {
          width: 25%;
          padding-bottom: $big-space;
          font-size: 24px;
          align-self: stretch;
          @include flex();
          flex-direction: column;
          text-align: center;
          span {
            margin-top: $middle-space;
          }
        }
      }
    }
    .partner {
      padding: $big-space;
      text-align: center;
      h1 {
        font-size: 52px;
      }
      p {
        font-size: 24px;
        color: $lightColor;
        padding-top: $middle-space;
      }
    }
    .customer_reviews {
      padding: $big-space $middle-space;
      h1 {
        font-size: 52px;
        text-align: center;
      }
      .customer_reviews_swiper {
        width: 698px;
        border-radius: 10px;
        margin: 0 auto;
      }
      swiper {
        height: 860px;
      }
      ._swiper-item {
        text-align: center;
        padding-bottom: 20px;
      }

    }

    .share {
      position: fixed;
      left: 10vw;
      bottom: 25px;
      @include flex();
      @include size(80vw, 80px);
      background: $mainColor;
      color: #fff;
      border-radius: 40px;
    }
  }
</style>


