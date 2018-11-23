<template>
  <div class="container">
    <div class="search">
      <div class="search_bar">
        <img src="/images/icon_search.png" mode="aspectFit" style="width:30rpx;height:30rpx;">
        <input type="text" placeholder="搜索产品、详情、资管方..." @input="getList(productName, 0, -1)" v-model="productName">
      </div>
    </div>
    <p>小美推荐:</p>
    <div class="product_list">
      <div class="product_list_item" v-for="(item, i) in productList" :key="i" @click="selectProduct(item)">
        <div>
          <p>{{item.name}}</p>
          <span>{{item.tags}}</span>
        </div>
        <img v-if="!item.checked" src="/images/uncheck.png" mode="aspectFit" style="width: 48rpx;height:48rpx;">
        <img v-else src="/images/checked.png" mode="aspectFit" style="width: 48rpx;height:48rpx;">
      </div>
    </div>
    <div class="btn" @click="submit">确认</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '添加产品',
        productList: [],
        selectedProduct: [],
        productName: '',
      }
    },
    async onLoad (params) {
      console.log(params)
      this.getList('', 0, -1)
    },
    methods: {
      async getList (name, productType, tagId) {
        try {
          this.selectedProduct = []
          let list = await this.$http.post('/wx/itrade/product/list', {
            name: name,
            product_type: productType,
            tag_id: tagId,
            commission_sort: null,
            invest_term_sort: null,
            return_sort: null,
            sales_volume_sort: null,
            page_num: 1,
            page_size: 10000
          })
          let productList = list.list
          productList = productList.filter(item => item.product_type !== 3)
          this.productList = productList.map(item => {
            if (~this.$mp.query.product.split('-').indexOf(item.id.toString())) {
              item.checked = true
              this.selectedProduct.push({
                product_type: item.product_type,
                product_id: item.id,
              })
            } else {
              item.checked = false
            }
            return item
          })
          console.log(this.productList)
        } catch (e) {
          throw new Error(e)
        }
      },
      selectProduct (item) {
        if (item.checked) {
          item.checked = false
          this.selectedProduct = this.selectedProduct.filter(i => i.product_id !== item.id)
        } else {
          item.checked = true
          this.selectedProduct.push({
            product_type: item.product_type,
            product_id: item.id,
          })
        }
        console.log(this.selectedProduct, item)
      },
      async submit () {
        try {
          let result = await this.$http.post('/wx/itrade/article/product', {
            article_id: this.$mp.query.article_id,
            product_list: this.selectedProduct,
          })
          if (result.share_id) {
            this.showToast('修改成功!', () => {
              this.toPage({
                url: '/pages/article/main',
                data: {article_id: this.$mp.query.article_id, introduce_code: this.$mp.query.introduce_code},
                type: 'redirectTo',
              })
            })
          }
        } catch (e) {
          throw new Error(e)
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
.container {
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
  .product_list {
    background: #fff;
    padding-bottom: 80px;
    &_item {
      border-bottom: 1px solid $borderColor;
      padding: $middle-space;
      @include flex();
      >div {
        flex: 1;
        @include flex(space-between, flex-start);
        flex-direction: column;
        p {
          margin-bottom: $middle-space;
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
