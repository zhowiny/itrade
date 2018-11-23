<template>
  <div class="container">
    <div class="legalizeState">
      <div class="legalizeState_video">
        <video id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"   controls="true" poster="https://file.meixinglobal.com/media/20180910/b5a32cf1-df7f-4c30-9cf5-d0c2ab28ef25.png"></video>
      </div>
      <div class="index_data">
        <div class="index_data_item">
          <p class="index_data_item_value"> $127亿 </p>
          <p class="index_data_item_label"> 平台成交总额 </p>
        </div>
        <div class="index_data_item" style="border-left:1px solid #dddddd;border-right:1px solid #dddddd;">
          <p class="index_data_item_value"> ¥2800000 </p>
          <p class="index_data_item_label"> 平台派发佣金 </p>
        </div>
        <div class="index_data_item">
          <p class="index_data_item_value"> 2222 </p>
          <p class="index_data_item_label"> 认证理财师 </p>
        </div>
      </div>
      <div class="legalize">
        <div class="legalize_status">
          <img class="legalize_status_pic" src="/images/legalize_none.png" alt="">
        </div>
        <div class="legalize_btn">
          <mx-button text="立即认证" @click="toPage({url: '/pages/admin_details_page/main', data: { management_id: product.management_id,}})" round type="primary"/>
        </div>
        <p class="legalize_explain"> - 完成身份认证，享受更多特权 - </p>
        <p class="legalize_text"> 海量优质产品可预约 </p>
        <p class="legalize_text"> 专属客服一对一售前服务 </p>
        <p class="legalize_text"> 每日提供优质内容，可以你的名义分享转发 </p>
        <p class="legalize_text"> 文章中推荐产品随你替换 </p>
        <p class="legalize_text"> …… </p>
      </div>





    </div>
  </div>
</template>

<script>

import mxButton from '@/components/button'
export default {
  data () {
    return {

    }
  },

  components: {
    mxButton,
  },

  methods: {
  },

  created () {
  }
}
</script>

<style scoped lang="scss">
  .legalizeState{
    &_video{
      background: #ffffff;
      #myVideo{
        width: 750rpx;
        height: 400rpx;
      }
    }
    .index_data{
      background: $contentcolor;
      padding: $middle-space 0;
      @include flex(flex-start, center);
      &_item{
        width: 33.33%;
        text-align: center;
        &_value{
          font-size: 28rpx;
          color: $mainColor;
          margin-bottom: 10rpx;
        }
        &_label{
          font-size: 22rpx;
        }
      }
    }

    .legalize{
      margin-top: 20rpx;
      padding: $big-space $big-space;
      background: #ffffff;
      &_status{
        @include flex(center, center);
        &_pic{
          width: 602rpx;
          height: 122rpx;
        }
      }
      &_btn{
        padding: $big-space $middle-space;
        @include flex(center, center);
      }
      &_explain{
        text-align: center;
        margin-bottom: $big-space;
        color: #AAAAAA;
        font-size: 24rpx;
      }
      &_text{
        text-align: center;
        color: #666666;
        font-size: 26rpx;
        margin-bottom: 20rpx;
      }
    }
  }
</style>
