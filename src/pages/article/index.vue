<template>
  <div class="article_container">
    <div class="article_title" @click="favor">
      <h2>{{article.title}}</h2>
      <img v-if="article.is_favor" src="/images/icon_collection_active.png" mode="aspectFit" style="width: 44rpx;height:44rpx;">
      <img v-else src="/images/icon_collection.png" mode="aspectFit" style="width: 44rpx;height:44rpx;">
    </div>
    <p class="article_pv">{{article.created_at}} | 阅读量: {{article.pv}}</p>
    <div class="article_comment" v-if="article.comments">
      <p>小美短评: <span>(该短评内容不会显示在分享后的页面中)</span> <img @click="copy(article)" src="/images/icon_copy1.png" mode="aspectFit" style="width: 44rpx;height:44rpx;"></p>
      <div>{{article.comments}}</div>
    </div>
    <div class="article_content">
      <wx-parse :content="article.content" :image-prop="{mode: 'widthFix'}"  className="wx_parse_box" />
    </div>
    <div class="article_product">
      <!-- <div class="article_product-add" @click="toPage({url: '/pages/choose_product/main', type: 'redirectTo', data: {article_id: article_id, product: product_id_list_str, introduce_code: introduce_code}})" v-if="productArr.length === 0">
        <span>添加产品推荐</span>
        <img src="/images/icon_arrow_product.png" mode="aspectFit" style="width:15rpx;height:28rpx;">
      </div>
      <div class="article_product-del" v-else>
        <span>产品推荐</span>
      </div> -->
      <div class="article_product-text">
        <span class="article_product-default">产品推荐</span>
        <span class="article_product-return" @click="defaultList">恢复默认推荐</span>
        <span class="article_product-del" v-if="status" @click="deleteProduct()">确定删除</span>
        <span class="article_product-del" v-if="!status" @click="status=true">删除</span>
        <span class="article_product-add" @click="addProduct">添加</span>
      </div>
      <p v-if="show_tips" class="article_tips">！最多可添加5个，数量已达5个，可删除后再添加</p>
      <div>
        <product-list :data="productArr" :editor="status" :articleProduct="true" @clickSelect="delData" @clickProduct="handleClick"/>
      </div>
      <!--<<div class="article_product-item"
           v-for="(item, index) in productArr"
           :key="index"
      >
        <div class="article_product-item_cnt">
          <div class="article_product-item_title" @click="handleClick(item, index)">
            <h2>{{item.name}}</h2>
            <span>{{item.tags}}</span>
          </div>
          <div class="article_product-item_detail" @click="handleClick(item, index)">
            <div>
              <p>{{item.return_rate}}</p>
              <span>预计年化</span>
            </div>
            <div>
              <p>{{item.invest_term}}</p>
              <span>投资期限</span>
            </div>
            <div>
              <p>{{item.minimum_invest_amount}}</p>
              <span>佣金比例</span>
            </div>
          </div>
          <div class="article_product-item_del" @click="deleteProduct(item)">删除</div>
        </div>
        div class="article_product-item_del" @click="deleteProduct(item)">删除</div>
      </div>-->

      <!-- <div class="article_product-update" @click="toPage({url: '/pages/choose_product/main', type: 'redirectTo', data: {article_id: article_id, product: product_id_list_str, introduce_code: introduce_code}})"  v-if="productArr.length > 0">
        <span>更改产品推荐</span>
        <img src="/images/icon_arrow_product.png" mode="aspectFit" style="width:15rpx;height:28rpx;">
      </div> -->
    </div>
    <!-- + '&share_id=' + article.shared_advisor_code + '&k=' + k-->
    <div class="share_btn" @click="toMiniProgram"> 分享 </div>
    <!-- <navigator hover-class="none" class="share_btn"
               open-type="navigate" app-id="wxcd7c5762adbd3cf5"
               :path="'/pages/article/main?source=itrade_wx&article_id=' + article.id + '&introduce_code=' + article.shared_advisor_code + '&share_id=' + article.share_id"
               target="miniProgram"
               version="trial"
    >分享</navigator> -->
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  import productList from '@/components/product-list'
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
        product_id_list_str: '',
        edit: false,
        status: false,
        show_tips: false
      }
    },
    async onLoad (params) {
      console.log(params)
      this.article_id = this.$mp.query.article_id || ''
      this.share_id = this.$mp.query.share_id || ''
      this.introduce_code = this.$mp.query.introduce_code || ''
      await this.getArticleList()
      wx.setNavigationBarTitle({
        title: this.article.title || this.title
      })
      // 数据统计
      this.$auth.dataBuryPoint({
        eventName: 'article_detail:init:visit',
        eventDataId: this.article_id,
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.$common.getAdvisorId(),
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
    },
    methods: {
      toMiniProgram () {
        let _this = this
        // 数据统计
        _this.$auth.dataBuryPoint({
          eventName: 'article_detail:share_button:click',
          eventDataId: this.article_id,
          source: this.$root.$mp.query.source,
          utmSource: this.$root.$mp.query.utm_source,
          introduceCode: this.$common.getAdvisorId(),
          shareInvestorId: '',
          prePage: wx.getStorageSync('from')
        })
        wx.navigateToMiniProgram({
          appId: 'wxcd7c5762adbd3cf5',
          path: `/pages/article/main?source=itrade_wx&article_id=${this.article.id}&introduce_code=${this.article.shared_advisor_code}&share_id=${this.article.share_id}`,
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
      goDetail (product) {
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
            // introduce_code: this.introduce_code,
          })
          let rex = /<img\ssrc="\S+=">/ig
          let video = /<a\shref="(\S+\.mp4)">(\S+)<\/a>/ig
          detail.content = detail.content.replace(rex, '[图片]')
          detail.content = detail.content.replace(video, '<p>$2</p><video custom-cache="{{false}}" style="width:100vw;height: 56.25vw;margin-left: -20rpx;" src="$1"></video>')
          this.article = detail
          this.productArr = detail.product_list
          let arr = []
          this.productArr.forEach(item => {
            // this.$set(item, 'operate', false)
            arr.push(item.id)
            item.management_feature = item.management_feature.split(',')
          })
          this.product_id_list_str = arr.join('-')
          console.log(this.productArr)
        } catch (e) {
          throw new Error(e)
        }
      },
      async favor () {
        try {
          /* eslint-disable */
          let result = await this.$http.post('/wx/itrade/article/favor', {
            article_id: this.article_id,
            is_favor: !this.article.is_favor,
          })
          this.article.is_favor = !this.article.is_favor
        } catch (e) {
          throw new Error(e)
        }
      },
      copy (article) {
        wx.setClipboardData({
          data: article.comments,
          success () {
          },
        })
      },
      handleClick (data) {
        // if (item.product_status !== 'created') return
        let url = ''
        console.log(data)
        switch (data.product_type) {
          case 1:
          case 4:
            url = '/pages/finance_details_page/main'
            break
          case 2:
            url = '/pages/estate_details_page/main'
            break
          case 3:
            url = '/pages/insurance_details_page/main'
            break
          default:
            break
        }
        if (!data.operate) {
          this.toPage({
            url: url,
            data: {
              product_id: data.id,
              product_type: data.product_type,
            }
          })
        } else {
          data.operate = false
        }
      },
      async deleteProduct () {
        // let temp = this.productArr.filter(i => item.id !== i.id)
        // console.log(this.productArr, 'deleteProduct')
        let data = []
        let temp = []
        this.productArr.map(i => {
          if (!i.del) {
            data.push({product_id: i.id, product_type: i.product_type})
            temp.push(i)
          }
        })
        console.log(data)
        console.log(temp)
        try {
          let result = await this.$http.post('/wx/itrade/article/product', {
            article_id: this.$mp.query.article_id,
            product_list: data,
          })
          if (result.share_id) {
            this.productArr = temp
            // let arr = []
            // this.productArr.forEach(item => {
            //   arr.push(item.id)
            // })
            // this.product_id_list_str = arr.join('-')
            this.share_id = result.share_id
            this.showToast('删除成功!', this.getArticleList)
            this.status = false
          }
        } catch (e) {
          throw new Error(e)
        }
      },
      delData (e) {
        console.log(e)
        this.productArr = e
      },
      addProduct () {
        if (this.productArr.length > 4) {
          this.show_tips = true
        } else {
          this.toPage({
            url: '/pages/choose_product/main', 
            type: 'redirectTo', 
            data: {
              article_id: this.article_id, 
              introduce_code: this.introduce_code,
              share_id: this.share_id,
              add_count: this.productArr.length
            }
          })
        }
      },
      // 恢复默认排序
      async defaultList () {
        this.$http.post('/wx/article/update/revertRecommenedProdcut',{
          article_id: this.article_id,
          share_id: this.share_id,
        }).then(res => {
          console.log(res)
          if (res.share_id) {
            this.share_id = res.share_id
          }
          this.getArticleList()
        })
      }
     /* handleStart (e) {
        console.log(e)
        this.point.startX = e.clientX
        this.point.startY = e.clientY
        this.point.endX = e.clientX
        this.point.endY = e.clientY
      },
      handleEnd (item, index) {
        // if (item.product_status !== 'created') return
        if (Math.abs(this.point.startY - this.point.endY) >= 30) return
        let distance = this.point.startX - this.point.endX
        if (distance > 0 && distance > 50) {
          this.productArr.forEach(i => (i.operate = false))
          console.log('swiper left')
          item.operate = true
        } else if (distance < 0 && distance < -50) {
          console.log('swiper right')
          item.operate = false
        }
      },
      handleMove (e) {
        this.point.endX = e.clientX
        this.point.endY = e.clientY
      },*/
    },
    components: {
      wxParse,
      productList,
    },
    onShareAppMessage (res) {
      return {
        title: this.article.title || this.title,
        imageUrl: '/images/news.jpg',
      }
    },
  }
</script>

<style  lang="scss" scoped>
  .article {
    &_container {
      padding-bottom: 100px;
      .share_btn {
        position: fixed;
        left: 10vw;
        bottom: 25px;
        @include size(80vw, 80px);
        @include flex();
        background: $mainColor;
        color: #fff;
        font-size: 26px;
        border-radius: 40px;
      }
    }
    &_title {
      background: #fff;
      padding: $middle-space;
      @include flex(flex-start);
      h2 {
        flex: 1;
        font-size: 40px;
      }
    }
    &_pv {
      background: #fff;
      padding: $small-space $middle-space;
      color: $lightColor;
      font-size: 26px;
    }
    &_comment {
      padding: $middle-space;
      background: $backgroundColor;
      p {
        @include flex();
        span {
          flex: 1;
        }
      }
      div {
        text-indent:2em;
        text-align:justify;
      }
    }
    &_content {
      background: #fff;
      padding: $big-space $middle-space;
    }
    &_product {
      width: 100vw;
      overflow-x: hidden;
      &:before {
        content: '';
        display: block;
        @include size(100%, $middle-space);
      }
      &-text{
        height: 98px;
        background: #fff;
        @include flex(flex-start);
        padding: 0 21px;
        margin-bottom: 22px;
      }
      &-default{
        font-size: 28px;
        color: #666;
        font-weight: bold;
      }
      &-return{
        color: #969696;
        font-size: 24px;
        margin-left: 30px;
      }
      &-del{
        flex: 1;
        text-align: right;
        color: #FF4037;
        font-size: 26px;
      }
      &-add{
        font-size: 26px;
        color: #306FF4;
        margin-left: 30px;
      }
      // &-item {
      //   @include size(900px, auto);
      //   transition: transform .3s;
      //   &.actived {
      //     transform: translateX(-150px);
      //   }
      //   &_cnt {
      //     width: 750px;
      //     display: inline-block;
      //   }
      //   &_del {
      //     display:flex;
      //     justify-content:center;
      //     align-items:center;
      //     width:750px;
      //     border-top:1px dashed $borderColor;
      //     padding: $small-space 0;
      //     color: $lightColor;
      //     font-size:28px;
      //   }
      //   &_title {
      //     @include flex(space-between);
      //     padding: $middle-space;
      //     h2 {
      //       flex: 1;
      //       font-size: 28px;
      //     }
      //     span {
      //       font-size: 22px;
      //       padding: 5px 10px;
      //       background: #FFBB01;
      //       color: #fff;
      //       border-radius: 5px;
      //     }
      //   }
      //   &_detail {
      //     @include flex();
      //     font-size: 26px;
      //     padding: 0 $middle-space $middle-space $middle-space;
      //     div {
      //       flex: 1;
      //       @include flex(center, flex-between);
      //       flex-direction: column;
      //       text-align: center;
      //       p {
      //         margin-bottom: $middle-space;
      //       }
      //       span {
      //         font-size: 24px;
      //         color: $lightColor;
      //       }
      //     }
      //   }
      //   &:after {
      //     content: '';
      //     display: block;
      //     @include size(100%, $middle-space);
      //     background: $backgroundColor;
      //   }
      // }
    }
    &_tips {
      font-size: 24px;
      color: #FE3845;
      // line-height: 62px;
      padding-left: 20px;
      margin-bottom: 22px;
    }
  }
</style>
<style lang="scss">
  .wx_parse_box{
    image{
      max-width: 100% !important;
    }
    video {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 100%;
    }
  }
</style>
