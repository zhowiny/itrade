<template>
  <div class="container">
    <div class="article">
      <div class="article_title">
        <h2>{{article.title}}</h2>
        <p>{{article.created_at}} | 阅读量: {{article.pv}}</p>
      </div>
      <p>{{article.comments}}</p>
      <div class="article_content">
        <wx-parse :content="article.content" :image-prop="{mode: 'widthFix'}"  className="wx_parse_box"/>
      </div>
    </div>
    <div class="recommend">
      <div class="recommend_title">
        <h2>产品推荐</h2>
        <!-- <span>查看详情</span> -->
      </div>
      <div class="recommend_content" v-for="(item, index) in productArr" :key="index" @click="goDetail(item)">
        <div class="recommend_content_title"> <p> {{item.name}} </p> </div>

        <div class="recommend_content_content" v-if="item.product_type=='1'">
          <div>
            <span>{{item.return_rate}}</span>
            <p>预计年化</p>
          </div>
          <div>
            <span>{{item.invest_term}}</span>
            <p>投资期限</p>
          </div>
          <div>
            <span>{{item.minimum_invest_amount}}</span>
            <p>起投金额</p>
          </div>
        </div>
        <div class="recommend_content_content" v-if="item.product_type=='2'">
          <div>
            <span>{{item.return_rate}}</span>
            <p>预计年化</p>
          </div>
          <div>
            <span>{{item.invest_term}}</span>
            <p>投资期限</p>
          </div>
          <div>
            <span>{{item.address}}</span>
            <p>项目地址</p>
          </div>
        </div>
        <div class="recommend_content_content" v-if="item.product_type=='3'">
          <div>
            <span>{{item.mid_class}}</span>
            <p>险种</p>
          </div>
          <div>
            <span>{{item.payment_years}}</span>
            <p>缴费年期</p>
          </div>
          <div>
            <span>{{item.minimum_invest_amount}}</span>
            <p>起投金额</p>
          </div>
        </div>
        <div class="recommend_content_content" v-if="item.product_type=='4'">
          <div>
            <span>{{item.invest_term}}</span>
            <p>投资期限</p>
          </div>
          <div>
            <span>{{item.minimum_invest_amount}}</span>
            <p>起投金额</p>
          </div>
        </div>
      </div>
    </div>
    <navigator hover-class="none" class="article_share_btn" open-type="navigate" app-id="wxcd7c5762adbd3cf5" :path="path" target="miniProgram" :extra-data="deliverData" version="release"> 分享 </navigator>
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  export default {
    data () {
      return {
        title: '文章详情',
        article: {
          content: '<div>加载中...</div>',
        },
        introduce_code: '',
        article_id: '',
        share_id: '',
        productArr: [],
        path: '',
        deliverData: {}
      }
    },
    async onLoad (params) {
      console.log(params, this.$mp.query)
      this.article_id = this.$mp.query.article_id || ''
      this.share_id = this.$mp.query.share_id || ''
      this.introduce_code = this.$mp.query.introduce_code || ''
      await this.getArticleList()
      wx.setNavigationBarTitle({
        title: this.article.title || this.title
      })
      this.path = '/pages/article/main?article_id=' + this.article_id + '&introduce_code=' + this.introduce_code + '&source=itrade_wx&share_id='
      this.deliverData.article_id = this.article_id
      this.deliverData.introduce_code = this.introduce_code
    },
    methods: {
      goDetail (product) {
        console.log(product)
        if (product.product_type === 2) {
          this.toPage({
            url: '/pages/estate_details_page/main',
            data: {
              product_id: product.id,
              product_type: product.product_type,
              introduce_code: this.introduce_code
            }
          })
        } else if (product.product_type === 3) {
          wx.showToast({
            title: '这里不展示保险产品。',
            icon: 'none'
          })
        } else {
          this.toPage({
            url: '/pages/finance_details_page/main',
            data: {
              product_id: product.id,
              product_type: product.product_type,
              introduce_code: this.introduce_code
            }
          })
        }
      },
      async getArticleList () {
        try {
          let detail = await this.$http.get('/wx/itrade/article/detail', {
            article_id: this.article_id,
            share_id: this.share_id,
            introduce_code: this.introduce_code,
          })
          let rex = /<img\ssrc="\S+=">/ig
          detail.content = detail.content.replace(rex, '[图片]')
          this.article = detail
          this.productArr = detail.product_list
        } catch (e) {
          throw new Error(e)
        }
      }
    },
    components: {
      wxParse
    },
    // onShareAppMessage (res) {
    //   return {
    //     title: this.article.title || this.title,
    //     imageUrl: '/images/news.jpg',
    //   }
    // },
  }
</script>
<style lang="scss" scoped>
  .container {
    border-top:1rpx solid $borderColor;
    width: 100%;
    overflow-x: hidden;
  }
  .article {
    background:#fff;
    padding: $big-space $middle-space 100rpx $middle-space;
    &_title {
      padding: $middle-space 0;
      font-size: 30px;
      h2 {
        font-size: 40px;
        padding-bottom: $small-space;
        font-weight: bold;
      }
      p {
        font-size: 24px;
        color: $lightColor;
      }
    }
    &_content {
      font-size: 26px;
      line-height:1.6em;
    }
  }
  .recommend {
    margin-top: $middle-space;
    &_title {
      padding: $middle-space;
      background: #fff;
      @include flex(space-between);
      padding-bottom: $middle-space;
      border-bottom: 1px solid $borderColor;
      h2 {
        font-size: 30px;
        color: transparentize($deepColor, .6);
      }
      span {
        @include flex();
        padding: $small-space $middle-space;
        color: $mainColor;
        border: 1px solid $mainColor;
        border-radius: 5px;
      }
    }
    &_content {
      background: #fff;
      margin-bottom: 20rpx;
      padding: $big-space $middle-space;
      &_title {
        font-weight: 900;
        font-size: 30rpx;
        margin-bottom: $middle-space;
      }
      &_content {
        @include flex();
        text-align: center;
        color: $lightColor;
        >div {
          flex: 1;
        }
        span {
          margin-bottom: $middle-space;
          text-shadow:0 0 0 $deepColor;
          color:transparent;
          transition: text-shadow .5s;
        }
        &.hidden {
          span {
            text-shadow:0 0 15px $deepColor;
          }
        }
      }
    }
  }
  .article_share_btn{
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 100px;
    height: 100px;
    color: #fff;
    text-align: center;
    line-height: 100px;
    background: #00AD75;
    border-radius: 50%;
    box-shadow: 0 4px 6px 0 #6CD5B4;
  }
</style>
<style lang="scss">
  .wx_parse_box{
    image{
      max-width: 100% !important;
    }
  }
</style>
