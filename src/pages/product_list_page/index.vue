<template>
  <div class="container">
    <div class="productList">
      <div class="productList_search">
        <div class="searchLine">
          <p class="searchLine_icon"> <img class="searchLine_icon" src="/images/icon_search.png" alt=""> </p>
          <input class="searchLine_text" v-model="search" @input="searchInput" placeholder-style="color: #9B9B9B" placeholder="搜索产品、详情、资管方..." type="text">
        </div>
      </div>

      <div>
        <product-list :data="productList" :legalize="legalized" @clickAdmin="goProductDetails" @clickProduct="goProductDetails"/>
      </div>
    </div>
  </div>
</template>

<script>

import productList from '@/components/product-list'
export default {
  data () {
    return {
      // title: '',
      productList: [],

      search: '',
      tagId: -1,
      productType: 0,

      legalized: false,
      timer: undefined,
    }
  },

  components: {
    productList,
  },

  methods: {

    searchInput () {
      console.log(this.search)
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getList(this.search, this.productType, this.tagId)
      }, 500)
    },
    // goAdmin (data) {},
    goProductDetails (data) {
      console.log(data, 'product')
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
    async getList (name, productType, tagId) {
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
      productList.forEach((v, i) => {
        let feature = v.management_feature.split(',')
        v.management_feature = feature
      })
      this.productList = productList
      this.topictList = list.topict_list
    }
  },

  async onShow (ops) {
    console.log(ops)
    let legalize = await this.$common.getIsLegalize()
    if (legalize !== '' && legalize !== false) {
      this.legalized = true
    } else {
      this.legalized = false
    }
  },

  async mounted () {
    this.search = this.$mp.query.search || ''
    let status = await this.$http.get('/wx/itrade/channel/getAdvisorByLogin', {})
    this.legalized = status.is_legalize
    await this.$common.setIsLegalize(status.is_legalize)

    this.productType = parseInt(this.$root.$mp.query.product_type) || 0
    if (this.productType === 1) {
      // this.title = '金融资产'
      wx.setNavigationBarTitle({
        title: '金融资产'
      })
    } else if (this.productType === 2) {
      // this.title = '海外房产'
      wx.setNavigationBarTitle({
        title: '海外房产'
      })
    } else if (this.productType === 3) {
      // this.title = '保单服务'
      wx.setNavigationBarTitle({
        title: '保单服务'
      })
    } else if (this.productType === 4) {
      // this.title = '移民护照'
      wx.setNavigationBarTitle({
        title: '移民护照'
      })
    }
    this.search = this.$root.$mp.query.search || ''
    console.log(this.search, this.productType)
    if (this.productType === 3) {
      this.productType = 0
      this.tagId = 5
    } else {
      this.tagId = -1
    }
    await this.getList(this.search, this.productType, this.tagId)
  },

  created () {
  }
}
</script>

<style scoped lang="scss">
  .productList{
    max-width: 100vw;
    overflow-x: hidden;
    &_search{
      background: $contentcolor;
      padding: $middle-space;
      .searchLine{
        width: 710rpx;
        height: 72rpx;
        border-radius: 72rpx;
        background: #F2F2F2;
        padding: 30rpx;
        @include flex(flex-start, center);
        &_icon{
          width: 30rpx;
          height: 30rpx;
        }
        &_text{
          margin-left: 20rpx;
          width: 100%;
          font-size: 26rpx;
        }
      }
    }
  }
</style>
