<template>
  <div class="container">
    <div class="search">
      <div class="search_bar">
        <img src="/images/icon_search.png" mode="aspectFit" style="width:30rpx;height:30rpx;">
        <input type="text" placeholder="搜索产品、详情、资管方..." @input="getList(productName)" v-model="productName">
      </div>
    </div>
    <!-- <p>小美推荐:</p> -->
    <p class="product_tips">！最多可添加5个，已添加{{add_count}}个，还可添加{{5 - add_count}}个</p>
    <div class="product_list">
      <div class="product_list_item" v-for="(item, i) in productList" :key="i">
        <div>
          <p @click="goProductDetail(item)">{{item.product_name}}</p>
          <!-- <span>{{item.tags}}</span> -->
        </div>
        <img v-if="!item.checked" src="/images/uncheck.png" mode="aspectFit" @click="selectProduct(item)" style="width: 48rpx;height:48rpx;">
        <img v-else src="/images/checked.png" mode="aspectFit" @click="selectProduct(item)" style="width: 48rpx;height:48rpx;">
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
        article_id: '',
        share_id: '',
        introduce_code: '',
        add_count: ''
      }
    },
    async onLoad (params) {
      console.log(params)
      this.article_id = params.article_id
      this.share_id = params.share_id
      this.introduce_code = params.introduce_code
      this.add_count = params.add_count
      this.getList('')
    },
    methods: {
      async getList (name) {
        try {
          this.selectedProduct = []
          let list = await this.$http.get('/wx/itrade/article/get/listSelectProduct', {
            article_id: this.article_id,
            page_num: 1,
            page_size: 10,
            share_id: this.share_id,
            tag_id: -1,
            search_param: name
          })
          this.productList = list.product_list
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
              this.share_id = await result.share_id
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
  .product_tips{
    font-size: 24px;
    color: #FE3845;
    line-height: 72px;
    padding: 0;
    padding-left: 20px;
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
