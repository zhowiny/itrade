<template>
  <div class="container">
    <div>
      <div class="file_list">
        <h3>投资文件</h3>
        <ul v-if="orderType !== 3">
          <li v-if="item.document_type === 'legal'" v-for="(item, index) in detail.document_list" :key="index" @click="$common.previewFile(item.document_url)">
            <p>{{item.document_name}}</p>
            <img mode="aspectFit" src="/images/icon_download.png" style="width: 50rpx;height:44rpx"/>
          </li>
        </ul>
        <ul v-else>
          <li v-for="(item, index) in detail.orderFiles" :key="index" @click="$common.previewFile(item.url, 'png')">
            <p>{{item.fileName}}</p>
            <img mode="aspectFit" src="/images/icon_download.png" style="width: 50rpx;height:44rpx"/>
          </li>
        </ul>
      </div>
      <div class="none" v-if="(detail.document_list && detail.document_list.length === 0) && (detail.orderFiles && detail.orderFiles.length === 0)">
        <img src="/images/icon_none_2.png" mode="aspectFit" style="">
        <p>暂无投资文件</p>
      </div>
      <!--<div class="file_list">
        <h3>确认文件</h3>
        <ul>
          <li v-for="(item, index) in fileList" :key="index" @click="preview(item.file_url, 'img')">
            <p>{{item.file_type}}</p>
            <img mode="aspectFit" src="/images/icon_download.png" style="width: 50rpx;height:44rpx"/>
          </li>
        </ul>
      </div>-->
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '投资文件',
        files: [],
        detail: {
          document_list: [],
          orderFiles: [],
        },
        orderType: 0,
      }
    },
    onLoad (params) {
      console.log(params)
      this.orderType = parseInt(params.orderType)
      this.getDetail()
    },
    methods: {
      async getDetail () {
        try {
          let url = '/wx/itrade/order/detail_of_advisor'
          if (this.orderType === 3) {
            url = '/wx/itrade/order/detail_of_insurance'
          }
          this.detail = await this.$http.get(url, {
            order_number: this.$mp.query.order_number
          })
        } catch (e) {
          throw new Error(e)
        }
      },
      preview (url, type = 'pdf') {
        if (type === 'img') {
          let images = []
          this.fileList.forEach(item => {
            images.push(item.file_url)
          })
          this.$common.previewFile({
            current: url,
            urls: images
          })
        } else {
          this.$common.previewFile(url, type)
        }
      }
    },
    components: {
    },
  }
</script>
<style lang="scss" scoped>
  .file_list {
    font-size: 30px;
    padding: 0 $middle-space;
    background: #fff;
    &:not(:first-child) {
      margin-top: $small-space;
    }
    h3, li {
      @include size(100%, 100px);
      @include flex(space-between);
      border-bottom: 1px solid $borderColor;
      color: $mainColor;
    }
    h3 {
      border-top: 1px solid $borderColor;
      color: $deepColor;
    }
  }
  .none {
    text-align: center;
    color: $lightColor;
    font-size: 30px;
  }
</style>
