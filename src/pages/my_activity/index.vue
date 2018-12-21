<template>
  <div class="activity">
    <div class="activity_header">
      <div :class="{actived: current === 1}" @click="takepartin(1)">待参加</div>
      <div :class="{actived: current === 2}" @click="takepartin(2)">已结束</div>
    </div>
    <ul class="activity_list" v-if="activity.length > 0">
      <li v-for="(item, index) in activity" :key="index">
        <img :src="item.logo || '/images/icon_placeholder.png'" >
        <navigator v-if="current === 1" hover-class="none" open-type="navigate" app-id="wx5621a217daf101a6" :path="path + item.id" target="miniProgram" :extra-data="deliverData" version="trial">
          <h3>{{item.name}}</h3>
          <span>
            <img src="/images/tiems.png" mode="aspectFit" style="width: 26rpx;height:26rpx;">
            <i>{{item.star_time}}/{{item.end_time}}</i>
          </span>
          <span>
            <img src="/images/icon_map.png" mode="aspectFit" style="width: 26rpx;height:26rpx;">
            <i>{{item.address}}</i>
          </span>
          <!--<navigator v-if="current === 1" hover-class="none" class="btn" open-type="navigate" app-id="wx5621a217daf101a6" :path="path + item.id" target="miniProgram" :extra-data="deliverData" version="develop"> 待参加 </navigator>-->
          <!--<navigator v-if="current === 2" hover-class="none" class="btn" open-type="navigate" app-id="wx5621a217daf101a6" :path="path + item.id" target="miniProgram" :extra-data="deliverData" version="develop"> 已结束 </navigator>-->
          <div class="btn">待参加</div>
        </navigator>
        <navigator v-if="current === 2" hover-class="none" open-type="navigate" app-id="wx5621a217daf101a6" :path="path + item.id" target="miniProgram" :extra-data="deliverData" version="trial">
          <h3>{{item.name}}</h3>
          <span>
            <img src="/images/tiems.png" mode="aspectFit" style="width: 26rpx;height:26rpx;">
            <i>{{item.star_time}}/{{item.end_time}}</i>
          </span>
          <span>
            <img src="/images/icon_map.png" mode="aspectFit" style="width: 26rpx;height:26rpx;">
            <i>{{item.address}}</i>
          </span>
          <!--<navigator v-if="current === 1" hover-class="none" class="btn" open-type="navigate" app-id="wx5621a217daf101a6" :path="path + item.id" target="miniProgram" :extra-data="deliverData" version="develop"> 待参加 </navigator>-->
          <!--<navigator v-if="current === 2" hover-class="none" class="btn" open-type="navigate" app-id="wx5621a217daf101a6" :path="path + item.id" target="miniProgram" :extra-data="deliverData" version="develop"> 已结束 </navigator>-->
          <div class="btn">已结束</div>
        </navigator>
      </li>
    </ul>
    <div class="none" v-else>
      <img src="/images/icon_none_2.png" alt="">
      <p>空空如也</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '我报名的活动',
        activity: [],
        current: 1,
        deliverData: {
          source: 4,
        },
        path: `pages/activity/activityDetail/activityDetail?source=4&activity_id=`,
      }
    },

    methods: {
      takepartin (number) {
        this.current = number
        let params = {
          join_status: number,
          page_index: 1,
          page_size: 10000
        }
        this.$http.get('/wx/itrade/my/applied/activity', params).then(res => {
          console.log(res)
          this.activity = res.list
        })
      }
    },

    async mounted () {
      this.takepartin(this.current)
      this.$auth.dataBuryPoint({
        eventName: 'my_joined_activity_list:init:visit',
        eventDataId: '',
        source: '',
        utmSource: '',
        introduceCode: '',
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
    }
  }
</script>
<style scoped lang="scss">
  .activity {
    min-height: 100vh;
    &_header {
      position: fixed;
      top: 0;
      left: 0;
      @include size(100vw, 80px);
      @include flex(center, stretch);
      background: #fff;
      padding: 0 $big-space * 2;
      border-top: 1px solid $borderColor;
      div {
        @include flex();
        flex: 1;
        text-align: center;
        border-bottom: 2px solid transparent;
        &:first-child {
          margin-right: $big-space * 2;
        }
        &.actived {
          border-bottom-color:$mainColor;
        }
      }
    }
    &_list {
      padding-top: $middle-space;
      margin-top: 80px;
      li {
        padding: $middle-space;
        margin-bottom: $middle-space;
        background: #fff;
        @include flex(flex-start, flex-start);
        h3 {
          font-size: 34px;
          color: $deepColor;
        }
        >img {
          /*flex: 1;*/
          @include size(285px, 200px);
          /*width: 200px;*/
          /*height: 140px;*/
        }
        >navigator {
          margin-left: $middle-space;
          flex: 2;
          font-size: 24px;
          color: $lightColor;
          @include flex(flex-start, flex-start);
          flex-direction: column;
          span {
            @include flex(flex-start);
            margin-top: $small-space;
            i {
              margin-left: $small-space;
            }
          }
        }
        .btn {
          display: inline-flex;
          padding: 5px $small-space;
          background: $mainColor;
          color: #fff;
          margin-top: $small-space;
          border-radius: 5px;
        }
      }
    }
    .none {
      @include size(100vw,100vh);
      background: #fff;
      text-align: center;
      img {
        width: 430px;
        height: 290px;
        margin: 25% auto 0 auto;
      }
      p {
        color: $lightColor;
        text-align: center;
      }
    }
  }
</style>
