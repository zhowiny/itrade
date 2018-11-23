<template>
  <div class="container">
    <div class="admin">
      <div class="admin_item" v-for="(item, index) in productAdminTeamDetails" :key="index">
        <div class="admin_item_left">
          <p class="admin_item_left_pic"> <img class="admin_item_left_pic" mode="scaleToFill" :src="item.logo_url" alt=""> </p>
          <p class="admin_item_left_name"> {{item.name}} </p>
          <p class="admin_item_left_position"> {{item.position}} </p>
        </div>
        <div class="admin_item_right">
          {{item.introduction}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        title: '管理团队',
        managementId: '',
      }
    },
    created () {

    },
    mounted () {
      this.managementId = this.$root.$mp.query.management_id || 2484378
      this.$store.dispatch('getProductAdminTeamDetails', {
        management_id: this.managementId,
      })
    },
    methods: {

    },
    computed: {
      ...mapGetters([
        'productAdminTeamDetails'
      ])
    }

  }
</script>

<style lang="scss" scoped>
  .admin{
    margin-top: 20rpx;
    background: #ffffff;
    &_item{
      @include flex(flex-start, center);
      padding: $middle-space;
      border-bottom: 1px solid $borderColor;
      &_left{
        width: 240rpx;
        &_pic{
          margin: 0 auto;
          width: 240rpx;
          height: 240rpx;
        }
        &_name{
          margin-top: 10rpx;
          font-size: 20rpx;
          text-align: center;
          @include text-truncate();
        }
        &_position{
          margin-top: 10rpx;
          font-size: 20rpx;
          text-align: center;
          @include text-truncate();
        }
      }
      &_right{
        margin-left: 20rpx;
        font-size: 24rpx;
        word-break: break-all;
      }
    }
  }
</style>


