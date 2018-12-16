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
            <p class="fields_label"> 真实姓名 </p>
            <input v-model="legalizeInfo.name" placeholder="请输入您的身份证姓名"  placeholder-style="color: #ccc;" :disabled="disabledInfo" />
          </div>
          <div class="fields_section">
            <p class="fields_label"> 证件类型 </p>
            <picker :range="cardTypeList" range-key="name" @change="bindCardTypeChange" :disabled="disabledInfo">
              <view class="picker" :style="cardTypeString == '请选择' ? 'color: #ccc;' : ''"> {{cardTypeString}} </view>
            </picker>
            <img src="/images/icon_arrow_product.png" alt="" class="fields_arrow_icon"/>
          </div>
          <p class="fields_tips">*中国公民，请上传身份证：其它国家公民，请上传护照。</p>
          <div class="fields_section fields_form_none" v-if="cardTypeString === '身份证'">
            <p class="fields_label"> 身份证号 </p>
            <input v-model="legalizeInfo.card_number" placeholder="请输入您的身份证号" :disabled="disabledInfo" placeholder-style="color: #ccc;" />
          </div>
          <div class="fields_section fields_form_none" v-if="cardTypeString === '护照'">
            <p class="fields_label"> 护照号 </p>
            <input v-model="legalizeInfo.passport_number" placeholder="请输入您的护照号" :disabled="disabledInfo" placeholder-style="color: #ccc;" />
          </div>
        </div>
        <div class="fields_id_card" v-if="cardTypeString === '身份证'">
          <div class="fields_pic">
            <img class="idDard" v-if="!legalizeInfo.card_front_url" @click="upLoadIdCardFront" src="https://file.meixinglobal.com/media/20180823/23394cf4-6547-4dae-8e26-340afcb5fa63.png" alt="" mode="aspectFit">
            <div class="picture_shadow" v-else><img class="picture" @click="upLoadIdCardFront" :src="legalizeInfo.card_front_url" alt="" mode="aspectFit"></div>
            <p class="explain"> 身份证正面 </p>
          </div>
          <div class="fields_pic">
            <img class="idDard" v-if="!legalizeInfo.card_back_url" @click="upLoadIdCardBack" src="https://file.meixinglobal.com/media/20180910/cb585c03-a6ba-42fa-a092-3f4af6cd2d47.png" alt="" mode="aspectFit">
            <div class="picture_shadow" v-else><img class="picture" @click="upLoadIdCardBack" :src="legalizeInfo.card_back_url" alt="" mode="aspectFit"></div>
            <p class="explain"> 身份证反面 </p>
          </div>
        </div>
        <div class="fields_passport" v-if="cardTypeString === '护照'">
          <div class="fields_pic">
            <img class="idDard" v-if="!legalizeInfo.passport_url" @click="upLoadIdCardPassport" src="https://filehz.meixinglobal.com/20181129/16c9d641-b9d5-4aa9-9b71-ff8091df7642.png" alt="" mode="aspectFit">
            <div class="picture_shadow" v-else><img class="picture" @click="upLoadIdCardPassport" :src="legalizeInfo.passport_url" alt="" mode="aspectFit"></div>
            <p class="explain"> 护照信息页照片或扫描文件 </p>
          </div>
        </div>
        <div class="fields_form">
          <div class="fields_section">
            <p class="fields_label"> 所在地区 </p>
            <picker @change="bindRegionChange" :value="region" :disabled="disabledInfo" :range="provinceList" range-key="name">
              <view class="picker" v-if="legalizeInfo.province == ''" style="color: #ccc;"> 请选择 </view>
              <view class="picker"> {{legalizeInfo.province}} </view>
            </picker>
            <img src="/images/icon_arrow_product.png" alt="" class="fields_arrow_icon"/>
          </div>
          <div class="fields_section">
            <p class="fields_label"> 所属行业 </p>
            <picker @change="bindProfessionChange" :value="legalizeInfo.profession" :range="industryList" :disabled="disabledInfo" range-key="industry_cn">
              <view class="picker" v-if="legalizeInfo.profession===''" style="color: #ccc;"> 请选择 </view>
              <view class="picker" v-else> {{legalizeInfo.profession}} </view>
            </picker>
            <img src="/images/icon_arrow_product.png" alt="" class="fields_arrow_icon"/>
          </div>
          <div class="fields_section">
            <p class="fields_label"> 从业年限 </p>
            <picker @change="bindIndustryYearsChange" :value="legalizeInfo.industry_years" :range="yearList" range-key="name" :disabled="disabledInfo">
              <view class="picker" v-if="yearString===''" style="color: #ccc;"> 请选择 </view>
              <view class="picker" v-else> {{yearString}} </view>
            </picker>
            <img src="/images/icon_arrow_product.png" alt="" class="fields_arrow_icon"/>
          </div>
        </div>
        <div class="assetType">
          <p class="assetType_title"> “ 请勾选您感兴趣的资产类型（可多选） ” </p>
          <mx-checkbox-group class-name="group" @change="handleCheckboxChange">
            <div class="assetType_checkbox">
              <div class="assetType_checkbox_item" v-for="(item, index) in productList" :key="index">
                <mx-checkbox class-name="item" :key="item.value" :checked="item.checked" :disabled="disabledInfo">{{item.name}}</mx-checkbox>
              </div>
            </div>
          </mx-checkbox-group>
        </div>
        <div class="legalizeFooter" @click="confirm" v-if="!disabledInfo"> 保存并提交 </div>
        <div class="legalizeFooter" v-else style="background: #dddddd;"> {{legalizeStatus}} </div>
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
        passport_url: '',
        passport_number: ''
      },
      industryList: [],
      provinceList: [],
      yearList: [
        {name: '刚入行', value: 0},
        {name: '1-3年', value: 1},
        {name: '3-5年', value: 2},
        {name: '5年以上', value: 3},
      ],
      yearString: '',
      region: [],

      cardTypeList: [
        {name: '身份证', value: 1},
        {name: '护照', value: 2},
      ],
      cardTypeString: '请选择',
      disabledInfo: true,
      productList: [
        {name: '股权基金', value: '01', checked: false},
        {name: '非股权基金', value: '02', checked: false},
        {name: '海外房产', value: '03', checked: false},
        {name: '保险', value: '04', checked: false},
        {name: '债券', value: '05', checked: false},
        {name: '护照', value: '06', checked: false},
      ]
    }
  },

  components: {
  },

  methods: {
    upLoadIdCardFront () {
      if (!this.disabledInfo) {
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
      }
    },
    upLoadIdCardBack () {
      if (!this.disabledInfo) {
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
      }
    },
    upLoadIdCardPassport () {
      if (!this.disabledInfo) {
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
                this.legalizeInfo.passport_url = data.body
              }
            })
          }
        })
      }
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
      this.legalizeInfo.profession = this.industryList[index].industry_cn
    },
    bindIndustryYearsChange (e) {
      let index = e.mp.detail.value
      this.legalizeInfo.industry_years = this.yearList[index].value
      this.yearString = this.yearList[index].name
    },
    bindRegionChange: function (e) {
      console.log(e)
      let address = e.mp.detail.value
      this.legalizeInfo.province = this.provinceList[address].name
      // this.legalizeInfo.province = address[0]
    },
    handleCheckboxChange (e) {
      console.log(e)
      this.legalizeInfo.favor_asset_type = e.mp.detail
      this.productList.forEach(val => {
        val.checked = false
      })
      this.legalizeInfo.favor_asset_type.forEach(item => {
        this.productList.forEach(type => {
          if (item === type.value) {
            type.checked = true
          }
        })
      })
    },
    async getLegalizeInfo () {
      this.cardTypeString = ''
      this.yearString = ''
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
      this.legalizeInfo.passport_number = data.passport_number
      this.legalizeInfo.passport_url = data.passport_url
      this.legalizeInfo.legalize_type = data.legalize_type
      if (data.legalize_type === 1) {
        this.cardTypeString = '身份证'
      } else if (data.legalize_type === 2) {
        this.cardTypeString = '护照'
      } else {
        this.cardTypeString = ''
      }
      if (data.status === -1 || data.status === 0) {
        this.legalizeStatus = '未认证'
        this.disabledInfo = false
      }
      if (data.status === 1) {
        this.legalizeStatus = '审核中'
        this.disabledInfo = true
      }
      if (data.status === 2) {
        this.legalizeStatus = '认证成功'
        this.disabledInfo = true
      }
      if (data.status === 3) {
        this.legalizeStatus = '认证失败'
        this.disabledInfo = false
      }
      this.yearList.forEach(item => {
        if (item.value === data.industry_years) {
          this.yearString = item.name
        }
      })
      data.favor_asset_type.forEach(item => {
        this.productList.forEach(type => {
          if (item === type.value) {
            type.checked = true
          }
        })
      })
    },
    bindCardTypeChange (event) {
      console.log(event)
      let index = event.mp.detail.value
      this.cardTypeString = this.cardTypeList[index].name
      this.legalizeInfo.legalize_type = this.cardTypeList[index].value
    },
    confirm () {
      console.log(this.legalizeInfo)
      if (!this.legalizeInfo.name) {
        this.$common.showToast('请输入姓名')
        return
      }
      if (!this.legalizeInfo.legalize_type) {
        this.$common.showToast('请选择证件类型')
        return
      }
      if (this.legalizeInfo.legalize_type === 2) {
        if (!this.legalizeInfo.passport_number) {
          this.$common.showToast('请输入护照号')
          return
        }
        if (!this.legalizeInfo.passport_url) {
          this.$common.showToast('护照信息页照片或扫描文件')
          return
        }
      } else {
        if (this.legalizeInfo.card_number && this.legalizeInfo.card_number.length === 18) {
          let reg = /^[0-9a-zA-Z]+$/
          let value = reg.test(this.legalizeInfo.card_number)
          if (!value) {
            this.$common.showToast('请填写正确格式的身份证号')
            return
          }
          if (!this.legalizeInfo.card_front_url) {
            this.$common.showToast('请上传身份证正面')
            return
          }
          if (!this.legalizeInfo.card_back_url) {
            this.$common.showToast('请上传身份证反面')
            return
          }
        } else {
          this.$common.showToast('请填写正确格式的身份证号')
          return
        }
      }
      if (!this.legalizeInfo.province) {
        this.$common.showToast('请选择地区')
        return
      }
      if (!this.legalizeInfo.profession) {
        this.$common.showToast('请选择行业')
        return
      }
      if (this.legalizeInfo.industry_years === '') {
        this.$common.showToast('请选择从业年限')
        return
      }
      if (this.legalizeInfo.favor_asset_type.length < 1) {
        this.$common.showToast('请选择资产类型')
        return
      }
      this.$http.post('/wx/itrade/channel/addLegalize', this.legalizeInfo).then(res => {
        console.log(res)
        this.getLegalizeInfo()
      })
    },
    fetchDate () {
      // 获取行业
      this.$http.get('/big_bend/common/cms_content/info', {content_key: 'industry'}).then((res) => {
        this.industryList = JSON.parse(res.content)
        console.log(this.industryList, 'industryList')
      })
      // 获取省市
      this.$http.post('/big_bend/common/access_district', {
        city: '',
        country: '中国',
        region: ''
      }).then((res) => {
        console.log(res)
        this.provinceList = res
      })
    }
  },
  async mounted () {
    this.fetchDate()
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
      margin-bottom: 40px;
    }
    &_checkbox{
      @include flex(flex-start);
      flex-wrap: wrap;
      &_item{
        width: 50%;
        padding-left: 55px;
        margin-bottom: 20px;
      }
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
    font-size: 26px;
    color: #646464;
    padding: 0 $big-space;
    margin-top: 20rpx;
    background: #ffffff;
    .fields_section {
      @include flex(space-between, center);
      @include size(100%, 88px);
      border-bottom: 1px solid $borderColor;
      > input{
        text-align: right;
      }
      > picker{
        flex: 1;
        text-align: right;
      }
      .fields_arrow_icon{
        width: 15px;
        height: 28px;
        margin-left: 22px;
      }
    }
    .fields_form_none{
      border: none;
    }
    .fields_tips{
      color: #969696;
      font-size: 22px;
      line-height: 68px;
      border-bottom: 1px solid $borderColor;
    }
  }
  .fields_id_card{
    background: #fff;
    margin-top: 33px;
    padding: 0px 75px 40px;
    .fields_pic{
      padding-top: 50px;
      .picture_shadow{
        width: 600px;
        height: 380px;
        box-shadow: 0 0 10px 0 #D3DBEB;
      }
      .picture{
        max-width: 600px;
        max-height: 380px;
      }
      .idDard{
        width: 600px;
        height: 380px;
      }
      .idDardSide{
        width: 600px;
        height: 380px;
        background-image: url(https://file.meixinglobal.com/media/20180910/cb585c03-a6ba-42fa-a092-3f4af6cd2d47.png);
        background-size: cover;
        background-repeat: no-repeat;
      }
      .explain{
        color: #646464;
        font-size: 26px;
        text-align: center;
        margin-top: 35px;
      }
    }
  }
  .fields_passport{
    background: #fff;
    margin-top: 33px;
    padding: 87px 75px 69px;
    .fields_pic{
      .picture_shadow{
        width: 600px;
        height: 380px;
        box-shadow: 0 0 10px 0 #D3DBEB;
      }
      .picture{
        max-width: 600px;
        max-height: 380px;
      }
      .passportDard{
        max-width: 600px;
        height: 380px;
        background-image: url(https://filehz.meixinglobal.com/20181129/16c9d641-b9d5-4aa9-9b71-ff8091df7642.png);
        background-size: cover;
        background-repeat: no-repeat;
      }
      .explain{
        color: #646464;
        font-size: 26px;
        text-align: center;
        margin-top: 35px;
      }
    }
  }
  .fields_pic{
    .business{
      background-image: url(https://file.meixinglobal.com/media/20180910/b5a32cf1-df7f-4c30-9cf5-d0c2ab28ef25.png);
      background-size: cover;
      background-repeat: no-repeat;
    }
    .uploadHint{
      margin-top: 20rpx;
      text-align: center;
      font-size: 24rpx;
      color: #F5A623;
    }
  }
</style>
