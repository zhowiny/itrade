<template>
  <div class="product_collection">
    <ul v-if="product_collection.length > 0">
      <li v-for="(item ,index) in product_collection" :key="index">
        <div class="product_collection_text"  v-if="item.product_type !== 2">
          <p>{{item.name}}</p>
          <div class="product_collection_g" :id="'type' + item.product_type"><span>{{item.tags}}</span></div>
        </div>
        <!--金融-->
        <div v-if="item.product_type === 1" class="product_collection_list" @click="toPage({url: '/pages/finance_details_page/main', data: {product_id: item.id, product_type: item.product_type}})">
          <div>
            <h2>{{item.return_rate}}</h2>
            <p>预计年化收益</p>
          </div>
          <div>
            <p>投资期限: {{item.invest_term}}</p>
            <p>佣金比例: <span>{{item.commission}}%</span></p>
          </div>
        </div>
        <!--房产-->
        <div v-if="item.product_type === 2" class="product_collection_list estate" @click="toPage({url: '/pages/estate_details_page/main', data: {product_id: item.id, product_type: item.product_type}})">
          <div>
            <img :src="item.product_logo" mode="aspectFill"  />
          </div>
          <div>
            <div class="estate_title">
              <p>{{item.name}}</p>
              <span :id="'type' + item.product_type">{{item.tags}}</span>
            </div>
            <p>{{item.property_type}}·{{item.main_apartment}}·{{item.apartment_area}}</p>
            <p>总价 <span>{{item.amount}}万起</span> &nbsp;&nbsp;佣金: {{item.commission}}%</p>
            <p>近一年房价: {{item.increase}}  年租金{{item.year_rent_return_rate}}</p>
          </div>
        </div>
        <!--保险-->
        <div v-if="item.product_type === 3" class="product_collection_list" @click="toPage({url: '/pages/insurance_details_page/main', data: {product_id: item.id, product_type: item.product_type}})">
          <div>
            <h2>{{item.mid_class}}</h2>
            <p>险种</p>
          </div>
          <div>
            <p>缴费年期: {{item.payment_years}}</p>
            <p>佣金比例: <span>{{item.commission}}%</span></p>
          </div>
        </div>
        <!--移民-->
        <div v-if="item.product_type === 4" class="product_collection_list" @click="toPage({url: '/pages/finance_details_page/main', data: {product_id: item.id, product_type: item.product_type}})">
          <div>
            <h2>{{item.return_rate}}</h2>
            <p>预计年化收益</p>
          </div>
          <div>
            <p>起投金额: {{item.minimum_invest_amount}}</p>
            <p>佣金比例: <span>{{item.commission}}%</span></p>
          </div>
        </div>
        <div class="product_collection_operation">
          <navigator hover-class="none" open-type="navigate"
                     app-id="wxcd7c5762adbd3cf5"  target="miniProgram"
                     :path='item.path' :extra-data="item.extraData"
                     version="trial">
            <img src="/images/fenx.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;">
            <span>分享产品</span>
          </navigator>
          <div @click="cancel(item.id,item.product_type)">
            <img src="/images/xinxin.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;">
            <span>取消收藏</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="product_collection_item">
      <img src="/images/icon_none.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '产品收藏',
        product_collection: [],
        introduceCode: '',
      }
    },
    async onLoad () {
      let status = await this.$http.get('/wx/itrade/channel/getAdvisorByLogin', {})
      this.introduceCode = status.code
      await this.getProductList()
    },
    methods: {
      async cancel (id, type) {
        let params = {
          product_id: id,
          product_type: type,
          is_favor: false
        }
        try {
          await this.$http.post('/wx/itrade/finance/favor', params)
          this.product_collection = this.product_collection.filter(item => id !== item.id)
        } catch (e) {
          throw new Error(e)
        }
      },
      async getProductList () {
        try {
          let status = await this.$http.get('/wx/itrade/product/favor/list', {page_num: 1, page_size: 10000})
          status.list.forEach(item => {
            switch (item.product_type) {
              case 1:
              case 4:
                item.path = `/pages/finance_details_page/main?product_id=${item.id}&product_type=${item.product_type}&introduce_code=${this.introduceCode}&source=itrade_wx`
                break
              case 2:
                item.path = `/pages/estate/product/product_detail/main?product_id=${item.id}&product_type=${item.product_type}&introduce_code=${this.introduceCode}&source=itrade_wx`
                break
              case 3:
                item.path = `/pages/product_detail/main?product_id=${item.id}&product_type=${item.product_type}&introduce_code=${this.introduceCode}&source=itrade_wx`
                break
              default:
                break
            }
            item.extraData = {
              product_id: item.id,
              product_type: item.product_type,
              introduce_code: this.introduceCode,
            }
            item.commission = (parseFloat(item.commission) * 100).toFixed(2)
          })
          console.log(status)
          this.product_collection = status.list
        } catch (e) {
          throw new Error(e)
        }
      },
      share (id, type) {
        console.log(id)
      },
    },
  }
</script>
<style scoped lang="scss">
  .product_collection {
    width: 100vw;
    min-height: 100vh;
    padding-top: $middle-space;
    ul {
      li {
        padding: 0 $middle-space;
        background: #fff;
        margin-bottom: $middle-space;
        .product_collection_text {
          @include flex(space-between);
          padding: $middle-space;
          .product_collection_g {
            background: #ffb951;
            color: #fff;
            @include flex();
            padding: 3px 5px;
            border-radius: 8px;
          }
        }
        .product_collection_list {
          @include flex();
          padding-bottom: $middle-space;
          div {
            flex: 1;
            // padding: 0 $middle-space;
            align-self: stretch;
            @include flex(space-between, flex-start);
            flex-direction: column;
            &:last-child {
              border-left: 1px solid $borderColor;
            }
            h2 {
              font-size: 48px;
              color: #FF3d55;
            }
            p {
              font-size: 28px;
              color: $lightColor;
            }
          }
          div:last-child {
            padding-left: $middle-space;
          }
        }
        .product_collection_operation {
          padding: $middle-space;
          border-top: 1px solid $borderColor;
          @include flex();
          >div, navigator {
            flex: 1;
            @include flex();
            span {
              margin-left: $small-space;
            }
          }
        }
        .estate {
          padding-top: $middle-space;
          div:first-child {
            flex: 1;
            img {
              width: 100%;
              height: 100%;
            }
          }
          div:last-child {
            flex: 2;
          }
          &_title {
            flex-direction:row !important;
            align-items:center !important;
            margin-bottom: $middle-space;
            p {
              font-size: 36px !important;
              color: #333 !important;
            }
            span {
              background: #ffb951 !important;
              color: #fff !important;
              @include flex();
              padding: 3px 5px !important;
              border-radius: 8px !important;
            }
          }
        }
      }
      #type1 {
        background: $mainColor;
      }
      #type2 {
        background: #73ae56;
      }
      #type3 {
        background: #e68f41;
      }
      #type4 {
        background: #fbba2a;
      }
    }
    .product_collection_item {
      @include size(100vw,100vh);
      background: #fff;
      text-align: center;
      img {
        width: 430px;
        height: 290px;
        margin: 25% auto 0 auto;
      }
    }
  }
</style>
