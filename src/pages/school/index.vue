<template>
  <div class="find_cnt">
    <div class="nav" :class="{activity: active === 1}">
      <div :class="{actived: active === 0}" @click="active = 0">今日朋友圈</div>
      <div :class="{actived: active === 1}" @click="active = 1">近期活动</div>
    </div>
    <div class="container " :class="{activity: active === 1}">
      <div class="friends">
        <div class="search-bar"></div>
        <div class="moments" v-for="(item, i) in articleList" :key="i">
          <div class="face">
            <img :src="item.advisor_head_img || '/images/icon_placeholder.png'" mode="aspectFit" style="width: 85rpx;height:85rpx">
          </div>
          <div class="content">
            <h4>{{item.advisor_name}}</h4>
            <p>{{item.comments}}</p>
            <div class="article" @click="goPage({url: '/pages/article/main', data: {article_id: item.id, introduce_code: item.advisor_id}})">
              <img :src="item.head_img || '/images/icon_placeholder.png'" mode="aspectFit" style="width: 80rpx;height:80rpx">
              <p>{{item.title}}</p>
            </div>
            <div class="operate">
              <p>{{item.created_at_str}} | 阅读量: {{item.pv}}</p>
              <img @click="copy(item)" src="/images/icon_copy1.png" mode="aspectFit" style="width: 44rpx;height:44rpx">
              <navigator hover-class="none" class="share_btn" v-if="loginStatus"
                         open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                         :path="'/pages/article/main?source=itrade_wx&article_id=' + item.id + '&introduce_code=' + item.advisor_id"
                         target="miniProgram"
                         version="trial"
              > <!-- + '&share_id=' + item.share_id-->
                <img src="/images/icon_share.png" mode="aspectFit" style="width: 44rpx;height:44rpx">
              </navigator>
              <!--<button open-type="share" :data-article_title="item.title" :data-article_id="item.id">
                <img src="/images/icon_share.png" mode="aspectFit" style="width: 44rpx;height:44rpx">
              </button>-->
            </div>
          </div>
        </div>
      </div>
      <div class="school">
        <navigator hover-class="none" class="school_btn" open-type="navigate" app-id="wx5621a217daf101a6" :path="path" target="miniProgram" :extra-data="deliverData" version="release"> 点击查看活动 </navigator>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '发现',
      active: 0,
      deliverData: {
        source: 4,
      },
      articleList: [],
      path: `/pages/activity/index/index?source=4`,
      article_title: '',
      article_id: '',
      loginStatus: false,
    }
  },

  methods: {
    goMiniActive (res) {
      console.log(res)
    },
    erra (err) {
      console.log(err)
    },
    async getArticleList () {
      try {
        let result = await this.$http.get('/wx/itrade/article/list', {
          page_num: 1,
          page_size: 99999,
        })
        this.articleList = result.list
        console.log(result)
      } catch (e) {
        throw new Error(e)
      }
    },
    copy (item) {
      wx.setClipboardData({
        data: item.title,
        success () {
        },
      })
      this.onShareAppMessage()
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
      this.getArticleList()
    },
  },

  async onLoad () {
    // wx.navigateToMiniProgram({
    //   appId: 'wx5621a217daf101a6'
    // })
    this.init()
  },
  onShareAppMessage (res) {
    return {
      title: res.target.dataset.article_title,
      imageUrl: '/images/news.jpg',
      path: '/pages/article/main?article_id=' + res.target.dataset.article_id,
    }
  },
  async onPullDownRefresh () {
    // to doing..
    // 停止下拉刷新
    await this.init()
    wx.stopPullDownRefresh()
  },
  components: {
  },
}
</script>
<style  lang="scss" scoped>
.find_cnt {
  width: 100vw;
  overflow-x: hidden;
}
.container{
  background: #fff;
  width: 1500px;
  min-height: 100vh;
  @include flex(center, flex-start);
  padding-top: 60px;
  transition: all .3s linear;
  .school, .friends {
    flex: 1;
  }
  &.activity {
    height: 100vh;
    overflow: hidden;
    transform: translateX(-750px);
  }
  .friends {
    .moments {
      @include flex(center, flex-start);
      padding: $middle-space;
      border-top: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      .content {
        flex: 1;
        margin-left: $middle-space;
        h4 {
          font-size: 30px;
          color: $mainColor;
        }
        p {
          padding: $small-space 0;
          font-size: 28px;
        }
        .article {
          padding: 0 $small-space ;
          margin: $small-space 0;
          background: #f1f1f1;
          @include flex();
          p {
            flex: 1;
            margin-left: $small-space;
            font-size: 26px;
          }
        }
        .operate {
          @include flex();
          p {
            flex: 1;
            margin-left: $small-space;
            font-size: 24px;
            color: $lightColor;
          }
          .share_btn {
            margin-left: $small-space;
            padding: 0;
            background: transparent;
            border: none;
            line-height: 0;
            &:before, &:after {
              content: normal;
              display: none;
            }
          }
        }
      }
    }
  }
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  @include size(750px, 60px);
  font-size: 32px;
  @include flex();
  padding: 0 $big-space;
  text-align: center;
  background: #fff;
  transition: all .3s linear;
  div {
    flex: 1;
    &.actived {
      color: $mainColor;
    }
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 17%;
    @include size(5em, 4px);
    background: $mainColor;
    transition: all .3s linear;
  }
  &.activity:after {
    left: 61.5%;
  }
}
.school{
  @include flex();
  min-height: 750px;
}
.school_btn{
  color: #ffffff;
  background: $mainColor;
  padding: 10rpx 20rpx;
  border-radius: $default-border-radius;
}
</style>
