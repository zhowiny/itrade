<template>
  <div class="container">
    <div class="legalizeInfo">
      <div class="legalizeInfo_title">
        <p class="legalizeInfo_title_title">
          认证状态:
          <span class=""> {{legalizeStatus}} </span>
        </p>
        <p class="legalizeInfo_title_explain"> *请认真核对填写的信息，审核中信息将不能更改，审核期为2—3天，通过认证后 iTrade 的功能将对您开放* </p>
      </div>
      <div class="legalizeInfo_content">
        <div class="fields_form">
          <div class="fields_section">
            <p class="fields_label"> 所在地区 </p>
            <picker mode="region" @change="bindRegionChange" :value="region">
              <view class="picker" v-if="legalizeInfo.province == '' && legalizeInfo.city == ''" style="color: #ccc;"> 请选择 </view>
              <view class="picker"> {{legalizeInfo.province}} {{legalizeInfo.city}} </view>
            </picker>
          </div>
        </div>
        <div class="fields_form">
          <div class="fields_section">
            <p class="fields_label"> 身份证姓名 </p>
            <input v-model="legalizeInfo.name" placeholder="请输入您的身份证姓名"  placeholder-style="color: #ccc;" />
          </div>
          <div class="fields_section">
            <p class="fields_label"> 身份证号 </p>
            <input v-model="legalizeInfo.card_number" placeholder="请输入您的身份证号"  placeholder-style="color: #ccc;" />
          </div>
          <div class="fields_pic">
            <img class="picture idDard" @click="upLoadIdCardFront" :src="legalizeInfo.card_front_url" alt="">
            <p class="explain"> 个人信息面 </p>
          </div>
          <div class="fields_pic">
            <img class="picture idDardSide" @click="upLoadIdCardBack" :src="legalizeInfo.card_back_url" alt="">
            <p class="explain"> 有效期面 </p>
          </div>
        </div>
        <div class="fields_form">
          <div class="fields_section">
            <p class="fields_label"> 所属行业 </p>
            <picker @change="bindProfessionChange" :value="legalizeInfo.profession" :range="industryList">
              <view class="picker" v-if="legalizeInfo.profession===''" style="color: #ccc;"> 请选择 </view>
              <view class="picker" v-else> {{legalizeInfo.profession}} </view>
            </picker>
          </div>
          <div class="fields_section">
            <p class="fields_label"> 从业年限 </p>
            <picker @change="bindIndustryYearsChange" :value="legalizeInfo.industry_years" :range="yearList">
              <view class="picker" v-if="legalizeInfo.industry_years===''" style="color: #ccc;"> 请选择 </view>
              <view class="picker" v-else> {{legalizeInfo.industry_years}} </view>
            </picker>
          </div>
          <div class="fields_pic">
            <img class="picture business" @click="upLoadCarte" :src="legalizeInfo.carte_url" alt="">
            <p class="explain"> 名片照片 </p>
          </div>
        </div>
        <div class="assetType">
          <p class="assetType_title"> “ 请勾选您感兴趣的海外资产类型 ” </p>
          <mx-checkbox-group class-name="group" @change="handleCheckboxChange" >
            <div style="display: flex; padding-left: 80rpx; margin-top: 20rpx; color:">
              <p style="width: 50%;"> <mx-checkbox class-name="item" key="股权基金" :checked="false" >股权基金</mx-checkbox> </p>
              <p style="width: 50%; margin-left: 80rpx;"> <mx-checkbox class-name="item" key="非股权基金" :checked="false" >非股权基金</mx-checkbox> </p>
            </div>
            <div style="display: flex; padding-left: 80rpx; margin-top: 20rpx;">
              <p style="width: 50%;"> <mx-checkbox class-name="item" key="海外房产" :checked="false" >海外房产</mx-checkbox> </p>
              <p style="width: 50%; margin-left: 80rpx;"> <mx-checkbox class-name="item" key="境外保险" :checked="false" >境外保险</mx-checkbox> </p>
            </div>
            <div style="display: flex; padding-left: 80rpx; margin-top: 20rpx;">
              <p style="width: 50%;"> <mx-checkbox class-name="item" key="债券" :checked="false" >债券</mx-checkbox> </p>
              <p style="width: 50%; margin-left: 80rpx;"> <mx-checkbox class-name="item" key="护照" :checked="false" >移民护照</mx-checkbox> </p>
            </div>
          </mx-checkbox-group>
        </div>
        <div class="legalizeFooter" @click="confirm" v-if="legalizeStatus=='未认证'"> 提交认证信息 </div>
        <div class="legalizeFooter" @click="confirm" v-else style="background: #dddddd;"> {{legalizeStatus}} </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      legalizeStatus: '未认证',
      legalizeInfo: {
        province: '',
        city: '',
        name: '',
        card_number: '',
        card_front_url: '',
        card_back_url: '',
        profession: '',
        industry_years: '',
        carte_url: '',
        favor_asset_type: [],
      },
      industryList: [],
      yearList: [],
      region: [],
    }
  },

  components: {
  },

  methods: {
    upLoadIdCardFront () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          let tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: 'https://upload.meixinglobal.com/web/upload/public',
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {},
            success: res => {
              var data = JSON.parse(res.data)
              this.legalizeInfo.card_front_url = data.body
            }
          })
        }
      })
    },
    upLoadIdCardBack () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          let tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: 'https://upload.meixinglobal.com/web/upload/public',
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {},
            success: res => {
              var data = JSON.parse(res.data)
              this.legalizeInfo.card_back_url = data.body
            }
          })
        }
      })
    },
    upLoadCarte () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          let tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: 'https://upload.meixinglobal.com/web/upload/public',
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {},
            success: res => {
              var data = JSON.parse(res.data)
              this.legalizeInfo.carte_url = data.body
            }
          })
        }
      })
    },
    bindProfessionChange (e) {
      let index = e.mp.detail.value
      this.legalizeInfo.profession = this.industryList[index]
    },
    bindIndustryYearsChange (e) {
      let index = e.mp.detail.value
      this.legalizeInfo.industry_years = this.yearList[index]
    },
    bindRegionChange: function (e) {
      let address = e.mp.detail.value
      this.legalizeInfo.province = address[0]
      this.legalizeInfo.city = address[1]
    },
    handleCheckboxChange (e) {
      this.legalizeInfo.favor_asset_type = e.mp.detail
    },
    async getLegalizeInfo () {
      let data = await this.$http.post('/wx/itrade/channel/getLegalizeByLogin', {})
      this.legalizeInfo.province = data.province
      this.legalizeInfo.city = data.city
      this.legalizeInfo.name = data.name
      this.legalizeInfo.card_number = data.card_number
      this.legalizeInfo.card_front_url = data.card_front_url
      this.legalizeInfo.card_back_url = data.card_back_url
      this.legalizeInfo.profession = data.profession
      this.legalizeInfo.industry_years = data.industry_years
      this.legalizeInfo.carte_url = data.carte_url
      this.legalizeInfo.favor_asset_type = data.favor_asset_type
      if (data.status === -1 || data.status === 0) {
        this.legalizeStatus = '未认证'
      }
      if (data.status === 1) {
        this.legalizeStatus = '审核中'
      }
      if (data.status === 2) {
        this.legalizeStatus = '认证成功'
      }
      if (data.status === 3) {
        this.legalizeStatus = '认证失败'
      }
    },
    confirm () {
      console.log(this.legalizeInfo)
      this.$http.post('/wx/itrade/channel/addLegalize', this.legalizeInfo).then(res => {
        console.log(res)
        this.getLegalizeInfo()
      })
    }
  },

  async mounted () {
    this.yearList = await Array.apply(null, {length: 40}).map((v, i) => { return i })
    let arr = await this.$http.post('/big_bend/common/access_careers', { industry: '' })
    this.industryList = await arr.map((v, i) => { return v.name_cn })
    this.getLegalizeInfo()
  },

  created () {
  }
}
</script>

<style scoped lang="scss">
  .legalizeInfo{
    &_title{
      padding: $big-space 60rpx;
      background: #ffffff;
      text-align: center;
      &_title{
        font-size: 28rpx;
        .none{
          color: #F5A623;
        }
        .audit{
          color: #306FF4;
        }
        .success{
          color: #0aba07;
        }
        .fail{
          color: #fe0000;
        }
      }
      &_explain{
        margin-top: 30rpx;
        color: $lightColor;
        font-size: 22rpx;
      }
    }
  }
  .assetType{
    margin-top: 20rpx;
    padding: $big-space;
    padding-bottom: 120rpx;
    background: #ffffff;
    &_title{
      text-align: center;
      font-size: 32rpx;
      color: #646464;
    }
  }

  .legalizeFooter{
    width: 100%;
    height: 100rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    background: $mainColor;
    text-align: center;
    line-height: 100rpx;
    color: #ffffff;
  }

  .fields_form {
    width: 100%;
    font-size: 36px;
    padding: 0 $big-space;
    margin-top: 20rpx;
    background: #ffffff;
    .fields_section {
      @include flex(space-between, center);
      @include size(100%, 100px);
      border-bottom: 1px solid $borderColor;
      > input{
        text-align: right;
      }
    }
  }
  .fields_pic{
    border-bottom: 1px solid $borderColor;
    padding: 20rpx 0;
    .picture{
      width: 100%;
      height: 400rpx;
    }
    .idDard{
      background-image: url(https://file.meixinglobal.com/media/20180823/23394cf4-6547-4dae-8e26-340afcb5fa63.png);
      background-size: cover;
      background-repeat: no-repeat;
    }
    .idDardSide{
      background-image: url(https://file.meixinglobal.com/media/20180910/cb585c03-a6ba-42fa-a092-3f4af6cd2d47.png);
      background-size: cover;
      background-repeat: no-repeat;
    }
    .business{
      background-image: url(https://file.meixinglobal.com/media/20180910/b5a32cf1-df7f-4c30-9cf5-d0c2ab28ef25.png);
      background-size: cover;
      background-repeat: no-repeat;
    }
    .explain{
      text-align: center;
      font-size: 28rpx;
    }
    .uploadHint{
      margin-top: 20rpx;
      text-align: center;
      font-size: 24rpx;
      color: #F5A623;
    }
  }
</style>
