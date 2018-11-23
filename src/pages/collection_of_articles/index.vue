<template>
  <div class="collection_of_articles">
    <div class="friends" v-if="articleList.length > 0">
      <div class="search-bar"></div>
      <div class="moments" v-for="(item, i) in articleList" :key="i">
        <div class="face">
          <img :src="item.advisor_head_img || '/images/icon_placeholder.png'" mode="aspectFit" style="width: 85rpx;height:85rpx">
        </div>
        <div class="content">
          <h4><span>{{item.advisor_name}}</span> <span @click="cancelFavor(item, i)">取消收藏</span></h4>
          <p>{{item.comments}}</p>
          <div class="article" @click="toPage({url: '/pages/article/main', data: {article_id: item.id, introduce_code: item.advisor_id}})">
            <img :src="item.head_img || '/images/icon_placeholder.png'" mode="aspectFit" style="width: 80rpx;height:80rpx">
            <p>{{item.title}}</p>
          </div>
          <div class="operate">
            <p>{{item.created_at_str}} | 阅读量: {{item.pv}}</p>
            <img @click="copy(item)" src="/images/icon_copy1.png" mode="aspectFit" style="width: 44rpx;height:44rpx">
            <navigator hover-class="none" class="share_btn"
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
    <div v-else class="product_collection_item">
      <img src="/images/icon_none.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '内容收藏',
        articleList: [],
      }
    },
    async onLoad () {
      // wx.navigateToMiniProgram({
      //   appId: 'wx5621a217daf101a6'
      // })
      this.getArticleList()
    },
    methods: {
      async getArticleList () {
        try {
          let result = await this.$http.get('/wx/itrade/article/list', {
            page_num: 1,
            page_size: 99999,
            is_favor: true,
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
      async cancelFavor (item, index) {
        try {
          /* eslint-disable */
          let result = await this.$http.post('/wx/itrade/article/favor', {
            article_id: item.id,
            is_favor: false,
          })
          this.articleList = this.articleList.filter(i => i.id !== item.id)
        } catch (e) {
          throw new Error(e)
        }
      },
    },
    onShareAppMessage (res) {
      return {
        title: res.target.dataset.title,
        // imageUrl: '/images/login_logo.jpg',
        path: `pages/article/main?article_id=${res.target.dataset.article_id}`
      }
    },
  }
</script>
<style scoped lang="scss">
  .collection_of_articles {
    .friends {
      background: #fff;
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
            @include flex(space-between);
            &>span:last-child {
              font-size: 24px;
              color: $lightColor;
            }
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
  .product_collection_item {
    text-align: center;
    width: 100vw;
    height: 100vh;
    background: #fff;
    padding-top: 200px;
  }
</style>
