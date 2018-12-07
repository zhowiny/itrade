<template>
  <div class="my">
    <div class="my_header">
      <div class="my_heafer_lis">
        <div class="my_header_img">
          <img :src="img || '/images/avatar.png'" alt="">
        </div>
        <h1>{{name}}</h1>
        <p>{{class_name}}</p>
      </div>
      <img class="bground" src="/images/bground.png" alt="">
    </div>
    <div class="my_list">
      <ul>
        <li @click="goPage({url: '/pages/product_collection/main'})">
          <img src="/images/product.png" alt="">
          <p>产品收藏</p>
        </li>
        <li @click="goPage({url: '/pages/collection_of_articles/main'})">
          <img src="/images/Collection.png" alt="">
          <p>文章收藏</p>
        </li>
        <li @click="goPage('/pages/plan/main')">
          <img src="/images/Prospectus.png" alt="">
          <p>计划书</p>
        </li>
        <li @click="goPage({url: '/pages/my_Order/main'})">
          <img src="/images/my_order.png" alt="">
          <p>我的订单</p>
        </li>
        <li @click="goPage({url: '/pages/my_activity/main'})">
          <img src="/images/activity.png" alt="">
          <p>活动报名</p>
        </li>
        <li>
          <img src="/images/service.png" alt="">
          <p>服务经理</p>
        </li>
      </ul>
    </div>
    <ul class="invitation">
      <li @click="goPage({url: '/pages/share/main?type=1'})">
        <div class="invitation_img">
          <img src="/images/my3.png" mode="aspectFit" style="width:120rpx;height:120rpx;">
        </div>
        <p>邀请客户开户</p>
      </li>
      <li @click="goPage({url: '/pages/share/main?type=2'})">
        <div class="invitation_img">
          <img src="/images/my2.png" mode="aspectFit" style="width:120rpx;height:120rpx;">
        </div>
        <p>邀请理财师</p>
      </li>
      <!--<li @click="goPage({url: '/pages/house_trust/main'})">
        <div class="invitation_img">
          <img src="/images/icon_house.png" mode="aspectFit" style="width:120rpx;height:120rpx;">
        </div>
        <p>房产托管</p>
      </li>-->
      <li @click="goPage({url: '/pages/trusteeship/main'})">
        <div class="invitation_img">
          <img src="/images/icon_trusteeship.png" mode="aspectFit" style="width:120rpx;height:120rpx;">
        </div>
        <p>托管服务</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'iTrade顾问端',
        img: '',
        name: '',
        class_name: '',
        deliverData: {
          introduce_code: '',
          source: 'sharefromB',
        },
        path: `/pages/open_account/open_account/main?source=sharefromB&introduce_code=`,
        loginStatus: false,
        introduce_code: '',
      }
    },

    methods: {
      async goWebView (url) {
        await wx.setStorageSync('webViewUrl', url)
        await this.toPage({
          url: '/pages/web_view_page/main',
          data: {
            url: url,
            title: '直播',
          }
        })
      },
      goPage (params) {
        if (this.loginStatus) {
          this.toPage(params)
        } else {
          this.showToast('请登录后操作')
        }
      },
      async init () {
        let advisorId = await this.$common.getAdvisorId()
        if (advisorId !== '' && advisorId !== 0) {
          this.loginStatus = true
        } else {
          this.loginStatus = false
        }
        let status = await this.$http.post('/wx/itrade/channel/advisor_info', {})
        this.introduce_code = status.code
        this.img = status.head_img
        this.name = status.name
        this.class_name = status.class_name
        this.deliverData.id = status.channel_id
        this.deliverData.id = status.id
      },
    },

    created () {
    },
    async mounted (opsid) {
      this.init()
    },
    async onPullDownRefresh () {
      // to doing..
      // 停止下拉刷新
      await this.init()
      wx.stopPullDownRefresh()
    },
  }
</script>
<style scoped lang="scss">
  .my {
    background: #ffffff;
    text-align: center;
    height: 100vh;
    border-bottom: 1px solid $borderColor;
    .my_header {
      height: 250px;
      width: 100%;
      padding-top: 10px;
      position: relative;
      .bground {
        position: absolute;
        width: 100%;
        height: 250px;
        top: 0;
        left: 0;
        z-index: 0;
      }
      .my_heafer_lis {
        /*width: 200px;*/
        height: 200px;
        position: absolute;
        @include flex();
        @include center();
        flex-direction: column;
        z-index: 99;
        .my_header_img {
          width: 100px;
          height: 100px;
          background-color: #D2D0D0;
          border-radius: 50px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        h1 {
          color: #FFFFFF;
          font-size: 32px;
          margin-top: 30px;
          z-index: 99;
        }
        p {
          color: #F7F5F5;
          z-index: 99;
          margin-top: 6px;
        }
      }
    }
    .my_list {
      width: 100%;
      height: 300px;
      ul {
        margin: 0;
        padding: 0;
        li {
          list-style: none;
          width: 33.33%;
          height: 150px;
          float: left;
          img {
            width: 50px;
            height: 50px;
            margin-top: 30px;
          }
          p {
            text-align: center;
          }
        }
      }
    }
    .invitation {
      @include flex(space-around);
      @include size(100vw, auto);
      padding: $big-space * 2 $middle-space;
      text-align: center;
    }
  }

</style>
