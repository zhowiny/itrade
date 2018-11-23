<template>
  <div class="container">
    <div class="estate_info" v-if="estateDetail.project_intro">
      <p class="estate_info_label">楼盘简介</p>
      <p class="estate_info_content">{{estateDetail.project_intro}}</p>
    </div>
    <div class="estate_detail_list">
      <div class="estate_option">
        <span class="option_name">项目名称</span>
        <span class="option_data">{{estateName}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">项目面积</span>
        <span class="option_data">{{estateDetail.project_area}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">项目性质</span>
        <span class="option_data">{{estateDetail.property_type}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">项目构造</span>
        <span class="option_data">{{estateDetail.project_structure}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">项目位置</span>
        <span class="option_data">{{estateDetail.address}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">项目完工</span>
        <span class="option_data">{{estateDetail.compete_date}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">物业费</span>
        <span class="option_data">{{estateDetail.property_fee}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">大楼维修基金</span>
        <span class="option_data">{{estateDetail.maintenance_funds}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">商铺个数</span>
        <span class="option_data">{{estateDetail.shop_num}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">停车位</span>
        <span class="option_data">{{estateDetail.parking_num}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">项目户数</span>
        <span class="option_data">{{estateDetail.house_num}}</span>
      </div>
      <div class="estate_option">
        <span class="option_name">项目户型</span>
        <span class="option_data">{{estateDetail.apartment_layout_desc}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      estateDetail: {},
      estateName: '',
      // apratmentList: []
      product_id: ''
    }
  },
  methods: {
    // 获取产品详情
    getEstateDetail (id) {
      this.$http.post('/wx/itrade/finance/detail?finance_id=' + id, {finance_id: id}).then((res) => {
        this.estateDetail = res.finance_estate_desc
        this.estateName = res.name
      })
    },
    // 获取户型图
    // getApratmentList (id) {
    //   this.$http.get('/mini/product/estate/apratment/list', {product_id: id}).then((res) => {
    //     this.apratmentList = res
    //   })
    // },
  },
  created () {
  },
  onLoad (option) {
    // let id = this.$root.$mp.query.product_id
    this.product_id = option.product_id
    this.getEstateDetail(option.product_id)
    // this.getApratmentList(id)
  },
}
</script>

<style scoped lang="scss">
  .container{

  }
  .estate_info{
    background: $contentcolor;

  }
  .estate_info_label{
    font-size: $htmlsize;
    color: $lightColor;
    line-height: 88rpx;
    padding-left: 22rpx;
    border-bottom: 1rpx solid #ddd;
  }
  .estate_info_content{
    color: #666;
    font-size: 26rpx;
    line-height: 48rpx;
    padding: 32rpx 20rpx 43rpx;
  }
  .estate_detail_list{
    background: #fff;
    padding: 0 20rpx;
    margin-top: 30rpx;
  }
  .estate_option{
    @include flex(space-between,flex-start);
    font-size: 26px;
    border-bottom: 1rpx solid #e6e6e6;
    padding: 27px 0 24px;
  }
  .option_name{
    color: #555;
  }
  .option_data{
    color: #969696;
    white-space: pre-line;
  }
  .option_data p{
    text-align: right;
    line-height: 48rpx;
  }
</style>
