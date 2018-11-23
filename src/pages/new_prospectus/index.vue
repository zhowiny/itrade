<template>
  <div class="new_prospectus">
    <div class="searchLine">
      <div class="status">
        <picker @change="bindPickerChange" :value="active" :range="array">
          <view class="picker"> {{active}} </view>
        </picker>
        <i class="triangleIcon"> <img class="triangleIcon" mode="scaleToFill" src="/images/triangle.png" alt=""> </i>
      </div>
      <div class="search">
        <i class="searchIcon"> <img class="searchIcon" mode="scaleToFill" src="/images/search.png" alt=""> </i>
        <input class="searchInput" v-model="value" type="text" placeholder="请出入投保人／受保人进行搜索" confirm-type="done" @confirm="searchName">
      </div>
    </div>

    <div class="list">

      <div class="items">
        <p class="title"> 充裕未来2-15-年缴－美元 </p>
        <div class="info">
          <p class="infoLine"> <span class="label"> 性别 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 是否吸烟 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 年龄 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 保费 </span> <span class="value"> 男 </span> </p>
        </div>
        <div class="person">
          <p class="personStatus">
            <span v-if="status==1" style="color: #F5A623;">  状态：需复查  </span>
            <span v-if="status==2" style="color: #306FF4;">  状态：处理中  </span>
            <span v-if="status==3" style="color: #555555;">  状态：已处理完成  </span>
          </p>
          <p class="personName"> 客户：张先生 </p>
        </div>
      </div>
      <div class="items">
        <p class="title"> 充裕未来2-15-年缴－美元 </p>
        <div class="info">
          <p class="infoLine"> <span class="label"> 性别 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 是否吸烟 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 年龄 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 保费 </span> <span class="value"> 男 </span> </p>
        </div>
        <div class="person">
          <p class="personStatus">
            <span v-if="status==1" style="color: #F5A623;">  状态：需复查  </span>
            <span v-if="status==2" style="color: #306FF4;">  状态：处理中  </span>
            <span v-if="status==3" style="color: #555555;">  状态：已处理完成  </span>
          </p>
          <p class="personName"> 客户：张先生 </p>
        </div>
      </div>
      <div class="items">
        <p class="title"> 充裕未来2-15-年缴－美元 </p>
        <div class="info">
          <p class="infoLine"> <span class="label"> 性别 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 是否吸烟 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 年龄 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 保费 </span> <span class="value"> 男 </span> </p>
        </div>
        <div class="person">
          <p class="personStatus">
            <span v-if="status==1" style="color: #F5A623;">  状态：需复查  </span>
            <span v-if="status==2" style="color: #306FF4;">  状态：处理中  </span>
            <span v-if="status==3" style="color: #555555;">  状态：已处理完成  </span>
          </p>
          <p class="personName"> 客户：张先生 </p>
        </div>
      </div>
      <div class="items">
        <p class="title"> 充裕未来2-15-年缴－美元 </p>
        <div class="info">
          <p class="infoLine"> <span class="label"> 性别 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 是否吸烟 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 年龄 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 保费 </span> <span class="value"> 男 </span> </p>
        </div>
        <div class="person">
          <p class="personStatus">
            <span v-if="status==1" style="color: #F5A623;">  状态：需复查  </span>
            <span v-if="status==2" style="color: #306FF4;">  状态：处理中  </span>
            <span v-if="status==3" style="color: #555555;">  状态：已处理完成  </span>
          </p>
          <p class="personName"> 客户：张先生 </p>
        </div>
      </div>
      <div class="items">
        <p class="title"> 充裕未来2-15-年缴－美元 </p>
        <div class="info">
          <p class="infoLine"> <span class="label"> 性别 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 是否吸烟 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 年龄 </span> <span class="value"> 男 </span> </p>
          <p class="infoLine"> <span class="label"> 保费 </span> <span class="value"> 男 </span> </p>
        </div>
        <div class="person">
          <p class="personStatus">
            <span v-if="status==1" style="color: #F5A623;">  状态：需复查  </span>
            <span v-if="status==2" style="color: #306FF4;">  状态：处理中  </span>
            <span v-if="status==3" style="color: #555555;">  状态：已处理完成  </span>
          </p>
          <p class="personName"> 客户：张先生 </p>
        </div>
      </div>



    </div>
    
    <div class="footer" @click="goToNewPlan"> + 新建计划书申请 </div>

  </div>
</template>

<script>
export default {
  components: {

  },

  data () {
    return {
      value: '',
      status: 1,
      array: ['全部状态', '已完成', '获取中', '处理中', '需复查'],
      active: '全部状态',
      productId: 0
    }
  },

  async onLoad (params) {
    this.productId = this.$root.$mp.query.product_id
    this.getOrder(this.value, this.active, this.productId)
    this.getApplyParam()
  },

  created () {

  },

  methods: {
    searchName () {
      console.log(this.value)
      this.getOrder(this.value, this.active, this.productId)
    },
    goToNewPlan () {
      let url = ''
      this.goWebView(url)
    },
    async goWebView (url) {
      await wx.setStorageSync('webViewUrl', url)
      await this.toPage({
        url: '/pages/web_view_page/main',
        data: {
          url: url
        }
      })
    },
    bindPickerChange (e) {
      let index = e.mp.detail.value
      this.active = this.array[index]
      this.getOrder(this.value, this.active, this.productId)
    },
    getApplyParam () {
      this.$http.get(`/wx/itrade/ffplan/apply_param`, {
        user_name: '',
        email: '',
        user_phone: ''
      }).then(d => {
        console.log(d)
      })
    },
    getOrder (name, statu, product) {
      if (statu === '全部状态') {
        statu = ''
      }

      this.$http.get(`/wx/itrade/product/plan/list`, {
        policy_insurant_name: name,
        status: statu,
        product_id: product,
        page_num: 1,
        page_size: 10000
      }).then(d => {
        console.log(d)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.new_prospectus{
  .searchLine{
    width: 100%;
    padding: $middle-space;
    @include flex(space-between, center);
    background: #ffffff;
    .status{
      color: #306FF4;
      @include flex(space-between, center);
      .picker{
        width: 140rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
      }
      .triangleIcon{
        display: block;
        width: 16rpx;
        height: 10rpx;
      }
    }
    .search{
      width: 520rpx;
      height: 60rpx;
      background: #F0F0F0;
      border-radius: 60rpx;
      padding: 0 30rpx;
      @include flex(space-between, center);
      .searchIcon{
        display: block;
        width: 28rpx;
        height: 29rpx;
      }
      .searchInput{
        width: 420rpx;
      }
    }
  }
  .list{
    padding-bottom: 120rpx;
    .items{
      margin-top: 20rpx;
      .title{
        padding: 20rpx;
        background: #ffffff;
        border-bottom: 1px solid #dddddd;
        font-size: 28rpx;
        font-weight: 900；
      }
      .info{
        padding: 30rpx;
        background: #ffffff;
        border-bottom: 1px solid #dddddd;
        font-size: 26rpx;
        .infoLine:last-child{
          margin-bottom: 0;
        }
        .infoLine{
          margin-bottom: 10rpx;
          @include flex(space-between, center);
          .label{
            width: 50%;
            color: #969696;
          }
          .value{
            width: 50%;
            color: #555555;
          }
        }
      }
      .person{
        padding: 20rpx;
        background: #ffffff;
        @include flex(space-between, center);
        font-size: 24rpx;
      }
    }
  }

  .footer{
    width: 100%;
    height: 100rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #306FF4;
    color: #ffffff;
    line-height: 100rpx;
    text-align: center;
    font-size: 30rpx;
  }

}
</style>
