<template>
  <div class="list">
    <div class="item" v-for="(item, index) in data" :key="index">

      <div class="item_admin" @click="clickAdmin(item)" v-if="hasAdmin">
        <p class="adminLogo" v-if="item.product_type!=3"> <img class="adminLogo" :src="item.management_logo" alt=""> </p>
        <p class="adminLogo" v-if="item.product_type==3"> <img class="adminLogo" src="/images/defalutLogo.png" alt=""> </p>
        <div class="adminDetails">
          <p class="adminDetails_title"> {{item.management_name}} </p>
          <div class="adminDetails_attr" v-if="item.product_type!=3">
            <p class="adminDetails_attr_solid" v-if="item.is_legalize"> 官方通道 </p>
            <p class="adminDetails_attr_hollow" v-if="item.is_on_line"> 线上签署 </p>
            <p class="adminDetails_attr_hollow" v-for="(item, i) in item.management_feature" :key="i"> {{item}} </p>
          </div>
          <div class="adminDetails_attr" v-if="item.product_type==3">
            <p class="adminDetails_attr_hollow" v-if="item.product_type==3"> 线上保单管理 </p>
            <p class="adminDetails_attr_hollow" v-if="item.product_type==3"> 线上生成计划书 </p>
          </div>
        </div>
      </div>

      <div  @click="clickProduct(item)">
          <!-- 金融 -->
        <div class="item_product" v-if="item.product_type==1">
          <div class="productTitle">
            <p class="productTitle_name"> {{item.name || '---'}} </p>
            <div class="productTitle_type">
              <p class="finance"> {{item.tags || '---'}} </p>
            </div>
          </div>
          <div class="productAttr">
            <div class="productAttr_left">
              <p class="productAttr_left_value"> {{item.return_rate || '---'}} </p>
              <p class="productAttr_left_label"> 预计年化收益 </p>
            </div>
            <p style="width: 1px; background: #eeeeee; height: 50rpx;"></p>
            <div class="productAttr_right">
              <p>
                <span class="productAttr_right_label">投资期限：</span>
                <span class="productAttr_right_value">{{item.invest_term || '---'}}</span>
              </p>
              <p>
                <span class="productAttr_right_label">佣金比例：</span>
                <span class="productAttr_right_value commission" v-if="legalize">{{item.commission || '---'}}</span>
                <span class="productAttr_right_value noAuth" v-if="!legalize">认证可见</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 房产 -->
        <div class="item_estate" v-if="item.product_type==2">
          <div class="estatePic">
            <img class="estatePic" :src="item.product_logo" alt="">
            <div class="estatePic_address">
              <img class="estatePic_address_icon" src="/images/map_icon.png" alt="">
              <p class="estatePic_address_text"> {{item.address || '---'}} </p>
            </div>
          </div>
          <div class="estateDetails">
            <div class="estateDetails_title">
              <p class="estateDetails_title_name"> {{item.name || '---'}} </p>
              <p class="estateDetails_title_type"> {{item.tags || '---'}} </p>
            </div>
            <p class="estateDetails_attr"> {{item.property_type || '---'}}·{{item.main_apartment || '---'}}·{{item.apartment_area || '---'}} </p>
            <p class="estateDetails_money">
              <span class="estateDetails_money_label">总价 ¥</span> <span class="estateDetails_money_value money">{{item.amount || '---'}}万<span style="font-size: 24rpx;">起</span> </span>
              <span class="estateDetails_money_label">佣金</span> <span class="estateDetails_money_value commission" v-if="legalize">{{item.commission || '---'}}</span> <span class="estateDetails_money_value noAuth" v-if="!legalize">认证可见</span>
            </p>
            <div class="estateDetails_profit"> <p>近一年房价{{item.increase || '---'}}</p> <p>年租金{{item.year_rent_return_rate || '---'}}</p> </div>
          </div>
        </div>
        <!-- 保险 -->
        <div class="item_product" v-if="item.product_type==3">
          <div class="productTitle">
            <p class="productTitle_name"> {{item.name || '---'}} </p>
            <div class="productTitle_type">
              <p class="insurance"> {{item.tags || '---'}} </p>
            </div>
          </div>
          <div class="productAttr">
            <div class="productAttr_left">
              <p class="productAttr_left_value"> {{item.mid_class || '---'}} </p>
              <p class="productAttr_left_label"> 险种 </p>
            </div>
            <p style="width: 1px; background: #eeeeee; height: 50rpx;"></p>
            <div class="productAttr_right">
              <p>
                <span class="productAttr_right_label">缴费年期：</span>
                <span class="productAttr_right_value">{{item.payment_years || '---'}}</span>
              </p>
              <p>
                <span class="productAttr_right_label">佣金比例：</span>
                <span class="productAttr_right_value commission" v-if="legalize">{{item.commission || '---'}}</span>
                <span class="productAttr_right_value noAuth" v-if="!legalize">认证可见</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 移民 -->
        <div class="item_product" v-if="item.product_type==4">
          <div class="productTitle">
            <p class="productTitle_name"> {{item.name}} </p>
            <div class="productTitle_type">
              <p class="immigrant"> {{item.tags}} </p>
            </div>
          </div>
          <div class="productAttr">
            <div class="productAttr_left">
              <!--<p class="productAttr_left_value"> {{item.return_rate || '-&#45;&#45;'}} </p>-->
              <p class="productAttr_left_value"> {{item.property_type || '---'}} </p>
              <p class="productAttr_left_label"> 项目类型 </p>
            </div>
            <p style="width: 1px; background: #eeeeee; height: 50rpx;"></p>
            <div class="productAttr_right">
              <p>
                <span class="productAttr_right_label">起投金额：</span>
                <span class="productAttr_right_value">{{item.minimum_invest_amount || '---'}}</span>
              </p>
              <p>
                <span class="productAttr_right_label">佣金比例：</span>
                <span class="productAttr_right_value commission" v-if="legalize">{{item.commission || '---'}}</span>
                <span class="productAttr_right_value noAuth" v-if="!legalize">认证可见</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'product-list',
    props: {
      data: {
        type: Array,
        default: []
      },
      legalize: {
        type: Boolean,
        default: false
      },
      hasAdmin: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        type: 2,
      }
    },
    mounted () {

    },
    methods: {
      clickAdmin (data) {
        this.$emit('clickAdmin', data)
      },
      clickProduct (data) {
        this.$emit('clickProduct', data)
      },
    }
  }
</script>

<style scoped lang='scss'>
  .list{
    .item{
      margin-bottom: 20rpx;
      &_admin{
        padding: $middle-space;
        background: #ffffff;
        border-bottom: 1px solid $borderColor;
        @include flex(flex-start, center);
        .adminLogo{
          width: 90rpx;
          height: 90rpx;
        }
        .adminDetails{
          @include flex(space-between, flex-start);
          flex-direction: column;
          margin-left: 20rpx;
          width: 100%;
          overflow: hidden;
          &_title{
            font-size: 26rpx;
            width: 100%;
            @include text-truncate();
          }
          &_attr{
            display: flex;
            flex-wrap: wrap;
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
      &_product{
        padding: $middle-space;
        background: #ffffff;
        .productTitle{
          font-size: 30rpx;
          font-weight: 900;
          @include flex(space-between, center);
          &_name{
            width: 70%;
            @include text-truncate();
          }
          &_type{
            p{
              font-size: 20rpx;
              color: #ffffff;
              padding: 0 5rpx;
              font-weight: 300;
              border-radius: $default-border-radius;
            }
            .finance{
              background: #FFBB01;
            }
            .estate{
              background: #7BC45C;
            }
            .insurance{
              background: #FF912C;
            }
            .immigrant{
              background: #4581FB;
            }
          }
        }
        .productAttr{
          margin-top: 10rpx;
          @include flex(space-between, center);
          &_left{
            &_value{
              color: #FF3d55;
              font-size: 34rpx;
            }
            &_label{
              font-size: 22rpx;
              color: $lightColor;
            }
          }
          &_right{
            width: 50%;
            &_value{
              color: $lightColor;
              font-size: 22rpx;
            }
            .commission{
              color: $mainColor;
            }
            .noAuth{
              color: $mainColor;
              font-size: 22rpx;
            }
            &_label{
              font-size: 22rpx;
              color: $lightColor;
            }
          }
        }
      }

      &_estate{
        padding: $big-space $middle-space;
        background: #ffffff;
        @include flex(space-between, center);
        .estatePic{
          width: 270rpx;
          height: 180rpx;
          border-radius: $default-border-radius;
          position: relative;
          &_address{
            position: absolute;
            left: 10rpx;
            bottom: 10rpx;
            @include flex(flex-start, center);
            &_icon{
              width: 22rpx;
              height: 22rpx;
            }
            &_text{
              margin-left: 10rpx;
              font-size: 20rpx;
              color: #ffffff;
            }
          }
        }
        .estateDetails{
          margin-left: 20rpx;
          width: 55%;
          &_title{
            @include flex(space-between, center);
            font-size: 30rpx;
            font-weight: 900;
            &_name{
              width: 60%;
              @include text-truncate();
            }
            &_type{
              background: #7BC45C;
              font-size: 20rpx;
              color: #ffffff;
              padding: 0 5rpx;
              font-weight: 300;
              border-radius: $default-border-radius;
            }
          }
          &_attr{
            margin-top: 10rpx;
            font-size: 24rpx;
            color: $lightColor;
            @include text-truncate();
          }
          &_money{
            margin-top: 10rpx;
            &_label{
              font-size: 24rpx;
              color: $lightColor;
              margin-right: 10rpx;
            }
            &_value{
              color: $lightColor;
              font-size: 24rpx;
              margin-right: 20rpx;
            }
            .money{
              font-size: 32rpx;
              color: #FF485E;
            }
            .commission{
              color: $mainColor;
            }
            .noAuth{
              color: $mainColor;
              font-size: 24rpx;
            }
          }
          &_profit{
            margin-top: 10rpx;
            display: flex;
            flex-wrap: wrap;
            p{
              margin-top: 10rpx;
              margin-right: 20rpx;
              font-size: 20rpx;
              padding: 2rpx 15rpx;
              background: #F3F3F9;
              border-radius: $default-border-radius;
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>
