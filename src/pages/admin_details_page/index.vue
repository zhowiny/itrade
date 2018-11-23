<template>
  <div class="container">
    <div class="admin">
      <div class="admin_info">
        <p class="admin_info_pic"> <img class="admin_info_pic" mode="scaleToFill" :src="productAdmin.logo" alt=""> </p>
        <div class="admin_info_main">
          <p class="admin_info_main_name"> {{productAdmin.name}} </p>
          <div class="admin_info_main_label">
            <p class="admin_info_main_label_solid" v-if="isAuthority"> 官方通道 </p>
            <!-- <p class="admin_info_main_label_solid"> 线上签署 </p> -->
            <p class="admin_info_main_label_hollow" v-for="(item, index) in tags" :key="index"> {{item}} </p>
          </div>
        </div>
      </div>

      <div class="admin_basic">
        <div class="admin_title">
          <p class="admin_title_icon"> <img class="admin_title_icon" mode="scaleToFill" src="/images/icon_adminTitle.png" alt=""> </p>
          <p class="admin_title_text"> 基本信息 </p>
        </div>
        <div class="admin_basic_content"> {{productAdmin.introduction}} </div>
      </div>

      <div class="admin_people">
        <div class="admin_title">
          <p class="admin_title_icon"> <img class="admin_title_icon" mode="scaleToFill" src="/images/icon_adminTitle.png" alt=""> </p>
          <p class="admin_title_text"> 管理团队 </p>
        </div>
        <div class="admin_people_content" @click="toPage({url: '/pages/admin_team_page/main', data: {management_id: managementId}})">
          <div class="admin_people_content_item" v-for="(item, index) in productAdminTeam" :key="index">
            <p class="admin_people_content_item_pic"> <img class="admin_people_content_item_pic" mode="scaleToFill" :src="item.logo_url" alt=""> </p>
            <p class="admin_people_content_item_name"> {{item.name}} </p>
          </div>
        </div>
      </div>

      <div class="admin_prize">
        <div class="admin_title">
          <p class="admin_title_icon"> <img class="admin_title_icon" mode="scaleToFill" src="/images/icon_adminTitle.png" alt=""> </p>
          <p class="admin_title_text"> 获得奖项 </p>
        </div>
        <div class="admin_prize_content">
          <div class="admin_prize_content_item" v-for="(item, index) in productAdminAwards" :key="index">
            <p class="admin_prize_content_item_pic"> <img class="admin_prize_content_item_pic" mode="scaleToFill" :src="item.awards_url" alt=""> </p>
            <p class="admin_prize_content_item_text"> {{item.name}} </p>
          </div>
        </div>
      </div>

      <div class="admin_feature">
        <div class="admin_title">
          <p class="admin_title_icon"> <img class="admin_title_icon" mode="scaleToFill" src="/images/icon_adminTitle.png" alt=""> </p>
          <p class="admin_title_text">  资管特色 </p>
        </div>
        <div class="admin_feature_content" v-for="(item, index) in productAdminNews" :key="index">
          <div class="admin_feature_content_item">
            <p class="admin_feature_content_item_pic"> <img class="admin_feature_content_item_pic" mode="scaleToFill" :src="item.logo_url" alt="">  </p>
            <p class="admin_feature_content_item_text"> {{item.introduction}} </p>
          </div>
        </div>
      </div>

      <div class="admin_product">
        <div class="admin_title">
          <p class="admin_title_icon"> <img class="admin_title_icon" mode="scaleToFill" src="/images/icon_adminTitle.png" alt=""> </p>
          <p class="admin_title_text">  相关产品 </p>
        </div>
        <div class="admin_product_content">
          <div class="admin_product_content_item" v-for="(item, index) in productAdminPro" :key="index" @click="goProductDetails(item)">
            <!-- <p class="admin_product_content_item_type green"> {{item.tag_name}} </p> -->
            <div class="admin_product_content_item_title"> {{item.product_name}}  </div>
            <div class="admin_product_content_item_content">
              <div class="admin_product_content_item_content_attr">
                <p class="admin_product_content_item_content_attr_value"> {{item.return_rate}} </p>
                <p class="admin_product_content_item_content_attr_label"> 预计年化 </p>
              </div>
              <div class="admin_product_content_item_content_attr">
                <p class="admin_product_content_item_content_attr_value"> {{item.invest_term}} </p>
                <p class="admin_product_content_item_content_attr_label"> 投资期限 </p>
              </div>
              <div class="admin_product_content_item_content_attr">
                <p class="admin_product_content_item_content_attr_value"> {{item.minimum_invest_amount}} </p>
                <p class="admin_product_content_item_content_attr_label"> 投资金额 </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="admin_in">
        <div class="admin_title">
          <p class="admin_title_icon"> <img class="admin_title_icon" mode="scaleToFill" src="/images/icon_adminTitle.png" alt=""> </p>
          <p class="admin_title_text">  入驻信息 </p>
        </div>
        <div class="admin_in_content"> {{productAdmin.settled}} </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        title: '资管方',
        managementId: '',
      }
    },
    created () {

    },
    mounted () {
      this.managementId = this.$root.$mp.query.management_id || 2484378
      this.$store.dispatch('getProductAdmin', {
        management_id: this.managementId,
      })
    },
    methods: {
      goProductDetails (data) {
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
    computed: {
      ...mapGetters({
        productAdmin: 'productAdmin',
        productAdminTeam: 'productAdminTeam',
        productAdminAwards: 'productAdminAwards',
        productAdminNews: 'productAdminNews',
        productAdminPro: 'productAdminPro',
        isAuthority: 'isAuthority',
        tags: 'tags',
      })
    }

  }
</script>

<style lang="scss" scoped>
  .admin{
    &_info{
      padding: $middle-space;
      background: #ffffff;
      @include flex(flex-start, center);
      &_pic{
        width: 100rpx;
        height: 100rpx;
      }
      &_main{
        margin-left: 20rpx;
        @include flex(space-between, flex-start);
        flex-direction: column;
        &_name{
          font-size: 24rpx;
        }
        &_label{
          display: flex;
          &_solid{
            margin-top: 10rpx;
            margin-right: 20rpx;
            font-size: 20rpx;
            padding: 2rpx 15rpx;
            background: #E1A678;
            border-radius: $default-border-radius;
            color: #ffffff;
          }
          &_hollow{
            margin-top: 10rpx;
            margin-right: 20rpx;
            font-size: 20rpx;
            padding: 2rpx 15rpx;
            background: #ffffff;
            border-radius: $default-border-radius;
            color: #E1A678;
            border: 1px solid #E1A678;
          }
        }
      }
    }
    &_basic{
      padding: $middle-space;
      margin-top: 20rpx;
      background: #ffffff;
      &_content{
        padding-top: 20rpx;
        word-break: break-all;
        color: $lightColor;
      }
    }
    &_people{
      padding: $middle-space;
      margin-top: 20rpx;
      background: #ffffff;
      &:-webkit-scrollbar {
            display: none;
        }
      &_content{
        overflow-x: scroll;
        display: flex;
        &:-webkit-scrollbar {
            display: none;
        }
        &_item{
          margin-top: 20rpx;
          margin-right: 60rpx;
          &_pic{
            margin: 0 auto;
            width: 160rpx;
            height: 160rpx;
            border-radius: 140rpx;
            overflow: hidden;
          }
          &_name{
            margin-top: 20rpx;
            text-align: center;
            word-break: break-all;
          }
        }
      }
    }
    &_prize{
      padding: $middle-space;
      margin-top: 20rpx;
      background: #ffffff;
      &_content{
        @include flex(space-around, center);
        flex-wrap: wrap;
        &_item{
          margin-top: 20rpx;
          width: 30%;
          &_pic{
            width: 190rpx;
            height: 100rpx;
          }
          &_text{
            margin-top: 10rpx;
            text-align: center;
            @include text-truncate();
            color: $lightColor;
            font-size: 24rpx;
          }
        }
      }
    }
    &_feature{
      padding: $middle-space;
      margin-top: 20rpx;
      background: #ffffff;
      &_content{
        &_item{
          @include flex(flex-start, center);
          margin-top: 20rpx;
          &_pic{
            width: 180rpx;
            height: 120rpx;
          }
          &_text{
            font-size: 26rpx;
            margin-left: 20rpx;
            word-break:break-all;
            display:-webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient:vertical;
            overflow:hidden;
          }
        }
      }
    }
    &_product{
      padding: $middle-space;
      margin-top: 20rpx;
      background: #ffffff;
      &_content{
        &_item{
          margin-top: 20rpx;
          border-bottom: 1px solid $borderColor;
          position: relative;
          &_type{
            padding: 2rpx 20rpx;
            color: #ffffff;
            font-size: 20rpx;
            border-radius: 20rpx;
            position: absolute;
            right: -35rpx;
            top: 5rpx;
            &.green{
              background: green;
            }
            &.red{
              background: red;
            }
          }
          &_title{
            font-size: 26rpx;
            font-weight: 600;
          }
          &_content{
            padding: 20rpx 0;
            @include flex(space-between, center);
            &_attr{
              width: 30%;
              &_value{
                font-size: 26rpx;
                text-align: center;
              }
              &_label{
                margin-top: 10rpx;
                font-size: 24rpx;
                color: $lightColor;
                text-align: center;
              }
            }
          }
        }
      }
    }


    &_in{
      padding: $middle-space;
      margin-top: 20rpx;
      background: #ffffff;
      &_content{
        padding-top: 20rpx;
        word-break: break-all;
        color: $lightColor;
      }
    }










    &_title{
      @include flex(flex-start, center);
      padding-bottom: 20rpx;
      border-bottom: 1px solid $borderColor;
      &_icon{
        width: 28rpx;
        height: 28rpx;
      }
      &_text{
        font-size: $htmlsize;
        margin-left: 20rpx;
      }
    }
  }
</style>


