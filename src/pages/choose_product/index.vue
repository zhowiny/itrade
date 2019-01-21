<template>
  <div class="container">
    <div class="fixed">
      <div class="search">
        <div class="search_bar">
          <img src="/images/icon_search.png" mode="aspectFit" style="width:30rpx;height:30rpx;">
          <input type="text" placeholder="搜索产品、详情、资管方..." @input="goSearch()" v-model="productName" @click="goSearch()">
        </div>
      </div>
      <!-- <p>小美推荐:</p> -->
      <div class="product_top">
        <ul class="product_top_ul">
          <li class="product_top_li" :class="item.active ? 'active' : ''" v-for="(item, index) in product_tag" :key="index" @click="changeTagProduct(index)">{{item.name}}</li>
        </ul>
      </div>
      <p class="product_tips">！最多可添加5个，已添加{{add_count}}个，还可添加{{5 - add_count}}个</p>
    </div>
    
    <div class="product_list">
      <div class="product_list_item" v-for="(item, i) in productList" :key="i">
        <div>
          <p @click="goProductDetail(item)">{{item.product_name}}</p>
          <!-- <span>{{item.tags}}</span> -->
        </div>
        <img @click="selectProduct(item)" v-if="!item.checked" src="/images/uncheck.png" mode="aspectFit" style="width: 48rpx;height:48rpx;">
        <img @click="selectProduct(item)" v-else src="/images/checked.png" mode="aspectFit" style="width: 48rpx;height:48rpx;">
      </div>
    </div>
    <div class="btn" @click="submit">确认</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '产品库',
        productList: [],
        selectedProduct: [],
        productName: '',
        add_count: '',
        article_id: '',
        introduce_code: '',
        share_id: '',
        product_tag: [
          {name: '系统推荐', tag_id: -1, active: true},
          {name: '爆款', tag_id: 11, active: false},
          {name: '固收理财', tag_id: 1, active: false},
          {name: '房地产基金', tag_id: 2, active: false},
          {name: '对冲/另类', tag_id: 3, active: false},
          {name: '独角兽', tag_id: 4, active: false},
          {name: '家族信托', tag_id: 6, active: false},
          {name: '海外房产', tag_id: 7, active: false},
          {name: '人民币', tag_id: 8, active: false},
          {name: '移民项目', tag_id: 9, active: false},
          {name: '公募基金', tag_id: 10, active: false},
        ]
      }
    },
    async onLoad (params) {
      console.log(params)
      this.add_count = params.add_count
      this.article_id = params.article_id
      this.introduce_code = params.introduce_code
      this.share_id = params.share_id || ''
      this.getList(-1, '')
    },
    methods: {
      async getList (tagId, name) {
        try {
          // this.selectedProduct = []
          let list = await this.$http.get('/wx/itrade/article/get/listSelectProduct', {
            article_id: this.article_id,
            page_num: 1,
            page_size: 10,
            share_id: this.share_id,
            tag_id: tagId,
            search_param: name
          })
          this.productList = this.compareId(list.product_list, this.selectedProduct)
          console.log(this.productList)
        } catch (e) {
          throw new Error(e)
        }
      },
      selectProduct (item) {
        if (item.checked) {
          item.checked = false
          this.selectedProduct = this.selectedProduct.filter(i => i.product_id !== item.product_id)
        } else {
          item.checked = true
          this.selectedProduct.push({
            product_type: item.product_type,
            product_id: item.product_id,
          })
        }
        console.log(this.selectedProduct, item)
      },
      async submit () {
        let number = 5 - this.add_count
        if (this.selectedProduct.length > number) {
          this.showToast('您当前可添加' + number + ' 个产品，您已选择' + this.selectedProduct.length + '个产品，请重新选择！')
        } else {
          try {
            let result = await this.$http.post('/wx/itrade/article/product/add', {
              article_id: this.$mp.query.article_id,
              product_list: this.selectedProduct,
              share_id: this.share_id
            })
            if (result.share_id) {
              this.share_id = result.share_id
              this.showToast('修改成功!', () => {
                this.toPage({
                  url: '/pages/article/main',
                  data: {article_id: this.$mp.query.article_id, introduce_code: this.$mp.query.introduce_code, share_id: this.share_id},
                  type: 'redirectTo',
                })
              })
            }
          } catch (e) {
            throw new Error(e)
          }
        }
      },
      goSearch () {
        console.log('goSearch')
        this.toPage({
          url: '/pages/search_product/main',
          type: 'redirectTo',
          data: {
            article_id: this.article_id,
            introduce_code: this.introduce_code,
            share_id: this.share_id,
            add_count: this.add_count
          }
        })
      },
      changeTagProduct (index) {
        let value = this.product_tag[index]
        this.product_tag.map((item) => {
          item.active = false
        })
        this.product_tag[index].active = true
        this.getList(value.tag_id, '')
      },
      compareId (list, ids) {
        console.log(ids, 'compareId ids')
        if (list instanceof Array) {
        } else {
          return list
        }
        if (ids instanceof Array) {
        } else {
          return list
        }
        if (ids.length < 1 || list.length < 1) return list

        for (var i = list.length - 1; i >= 0; i--) {
          ids.map((v, k) => {
            if (list[i].product_id === v.product_id) {
              list[i].checked = true
            }
          })
        }
        console.log(list, 'compareIdlist')
        return list
      },
      goProductDetail (data) {
        switch (data.product_type) {
          case 2:
            this.toPage({
              url: '/pages/estate_details_page/main',
              data: {
                product_id: data.product_id,
                product_type: data.product_type,
              }
            })
            break
          case 3:
            this.toPage({
              url: '/pages/insurance_details_page/main',
              data: {
                product_id: data.product_id,
                product_type: data.product_type,
              }
            })
            break
          default:
            this.toPage({
              url: '/pages/finance_details_page/main',
              data: {
                product_id: data.product_id,
                product_type: data.product_type,
              }
            })
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
.container {
  .fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .search {
    background: #fff;
    padding: $middle-space;
    border-top: 1px solid $borderColor;
    &_bar {
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
  >p {
    padding: $big-space $middle-space $middle-space $middle-space;
  }
  .product_top{
    background: #fff;
    overflow-x: scroll; 
    border-top: 1px solid #dddddd;
    &_ul{
      height: 80px;
      min-width: 100%;
      display: flex;
      float: left;
    }
    &_li{
      min-width: 160px;
      text-align: center;
      line-height: 80px;
      margin-right: 20px;
      border-bottom: 4px solid transparent;
    }
    .active{
      color: #306FF4;
      border-bottom: 4px solid #306FF4;
    }
  }
  .product_tips{
    font-size: 24px;
    color: #FE3845;
    line-height: 72px;
    padding: 0;
    padding-left: 20px;
    background: $backgroundColor;
  }
  .product_list {
    padding-top: 280px;
    padding-bottom: 80px;
    &_item {
      background: #fff;
      border-bottom: 1px solid $borderColor;
      padding: $middle-space;
      @include flex();
      >div {
        flex: 1;
        @include flex(space-between, flex-start);
        flex-direction: column;
        p {
          // margin-bottom: $middle-space;
          font-size: 28px;
        }
        span {
          font-size: 26px;
          color: $lightColor;
        }
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    @include flex();
    @include size(100%, 80px);
    background: $mainColor;
    color: #fff;
    font-size: 28px;
  }
}
</style>
