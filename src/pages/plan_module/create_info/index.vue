<template>
  <div class="container">
    <div class="module">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_4.png" mode="aspectFit" style="width:32rpx;height:32rpx;">
        <span class="title_text">被保人信息<i>（若被保人未成年，请填写投保人信息）</i></span>
        <!--<img class="arrow" src="/images/icon_arrow_product.png">-->
      </div>
      <div class="item">
        <span class="label">被保人是投保人</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.yesno"
            v-model="insurance.same_flag"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">被保人姓名</span>
        <div class="value">
          <input v-model="insurance.insurant_name" type="text" placeholder-class="placeholder" placeholder="请输入">
        </div>
        <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">性别</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.genders"
            v-model="insurance.insurant_gender"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item none">
        <span class="label">出生日期</span>
        <div class="value" style="justify-content: flex-end">
          <picker
            mode="date"
            start="1900-01-01" end="2020-01-01"
            :value="insurance.insurant_birth"
            fields="day" @change="e => (insurance.insurant_birth = e.mp.detail.value)"
          >
            <view class="picker" :class="{none: !insurance.insurant_birth}">{{insurance.insurant_birth || '请选择'}}</view>
          </picker>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">国籍</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.countries"
            v-model="insurance.insurant_country"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">居住地</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.lives"
            v-model="insurance.insurant_address"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div v-if="insuranceType === 'HONGKONG_WYSX'">
        <div class="item" v-if="insurance.insurant_address === 'China'">
          <span class="label">居住省</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :data="provinceList"
              v-model="insurance.insurant_province"
              @change="getCity('insurantCityList', insurance.insurant_province)"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item" v-if="insurance.insurant_address === 'China' || insurance.insurant_address === 'Hong Kong' || insurance.insurant_address === 'MO' || insurance.insurant_address === 'Taiwan'">
          <span class="label">居住市</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :data="insurantCityList"
              v-model="insurance.insurant_city"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>
      <div class="item">
        <span class="label">是否吸烟</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.yesno"
            v-model="insurance.insurant_somking_flag"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item" v-if="insuranceType === 'USA'">
        <span class="label">是否去过美国</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.yesno"
            v-model="insurance.insurant_goto_america_aflag"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item" v-else>
        <span class="label">保单回溯</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.yesno"
            v-model="insurance.insurant_policy_back"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>

    <div class="module" v-if="insurance.same_flag === 'N'">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_4.png" mode="aspectFit" style="width:32rpx;height:32rpx;">
        <span class="title_text">投保人信息</span>
        <!--<img class="arrow" src="/images/icon_arrow_product.png">-->
      </div>
      <div class="item">
        <span class="label">投保人姓名</span>
        <div class="value">
          <input v-model="policy.policy_name" type="text" placeholder-class="placeholder" placeholder="请输入">
        </div>
        <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">性别</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.genders"
            v-model="policy.policy_gender"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item none">
        <span class="label">出生日期</span>
        <div class="value"  style="justify-content: flex-end">
          <picker
            mode="date"
            start="1900-01-01" end="2020-01-01"
            :value="policy.policy_birth"
            fields="day" @change="e => (policy.policy_birth = e.mp.detail.value)"
          >
            <view class="picker" :class="{none: !policy.policy_birth}">{{policy.policy_birth || '请选择'}}</view>
          </picker>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">国籍</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.countries"
            v-model="policy.policy_country"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">居住地</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.lives"
            v-model="policy.policy_address"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div v-if="insuranceType === 'HONGKONG_WYSX'">
        <div class="item" v-if="policy.policy_address === 'China'">
          <span class="label">居住省</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :data="provinceList"
              v-model="policy.policy_province"
              @change="getCity('policyCityList', policy.policy_province)"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item" v-if="policy.policy_address === 'China' || policy.policy_address === 'Hong Kong' || policy.policy_address === 'MO' || policy.policy_address === 'Taiwan'">
          <span class="label">居住市</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :data="policyCityList"
              v-model="policy.policy_city"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>
      <div class="item">
        <span class="label">是否吸烟</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :data="template.yesno"
            v-model="policy.policy_somking_flag"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>

    <div class="btn_next" @click="submit">
      <span>提交</span>
    </div>

    <div class="mask" v-if="showConfirm"  @click="showConfirm = false"></div>
    <div class="confirm" v-if="showConfirm">
      <p>根据您所填写的计划书内容，自动计算出保费预算值，可作为参考</p>
      <h3>保费：1000000港币</h3>
      <div class="btn_group">
        <div class="cancel" @click="showConfirm = false">返回修改</div>
        <div class="submit" @click="showConfirm = false;toPage('/pages/plan_module/create_success/main')">继续提交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import mxPicker from '@/components/picker.vue'
  import qs from 'qs'
  export default {
    data () {
      return {
        title: '新建计划书',
        showConfirm: false,

        template: {},
        provinceList: [],
        insurantCityList: [],
        policyCityList: [],
        insurance: {
          same_flag: 'N', // 被保人是否是投保人
          insurant_name: '', // 被保人
          insurant_gender: '', // 被保人性别
          insurant_birth: '', // 被保人出生日期
          insurant_country: '', // 被保人国籍
          insurant_address: '', // 被保人居住地
          insurant_somking_flag: 'N', // 被保人是否吸烟
          insurant_policy_back: 'N', // 保单回溯
          insurant_province: '', // 被保人居住省
          insurant_city: '', // 被保人居住市
          insurant_goto_america_aflag: '', // 是否去过美国(USA才有该字段)
        },
        policy: {
          policy_name: '', // 投保人姓名
          policy_gender: '', // 投保人性别
          policy_birth: '', // 投保人出生日期
          policy_country: '', // 投保人国籍
          policy_address: '', // 投保人居住地
          policy_province: '', // 投保人居住省
          policy_city: '', // 投保人居住市
          policy_somking_flag: 'N', // 投保人是否吸烟
        },

        params: {},
        insuranceType: '',
        detail: {},
      }
    },
    watch: {
      'insurance.insurant_address': function (newVal) {
        this.insurantCityList = []
        this.insurance.insurant_province = ''
        switch (newVal) {
          case 'Hong Kong':
            this.insurance.insurant_province = '810000'
            this.getCity('insurantCityList', '810000')
            break
          case 'MO':
            this.insurance.insurant_province = '820000'
            this.getCity('insurantCityList', '820000')
            break
          case 'Taiwan':
            this.insurance.insurant_province = '710000'
            this.getCity('insurantCityList', '710000')
            break
          default:
            break
        }
      },
      'policy.policy_address': function (newVal) {
        this.policyCityList = []
        this.policy.policy_province = ''
        switch (newVal) {
          case 'Hong Kong':
            this.policy.policy_province = '810000'
            this.getCity('policyCityList', '810000')
            break
          case 'MO':
            this.policy.policy_province = '820000'
            this.getCity('policyCityList', '820000')
            break
          case 'Taiwan':
            this.policy.policy_province = '710000'
            this.getCity('policyCityList', '710000')
            break
          default:
            break
        }
      },
    },

    async onLoad (options) {
      let o = {}
      Object.keys(options).forEach(key => {
        o[decodeURIComponent(key)] = decodeURIComponent(options[key])
      })
      let result = qs.parse(o)
      this.insuranceType = result.insurance_type
      this.params = result.params
      await this.getDetail()
      this.getTemplate()
      if (this.insuranceType === 'HONGKONG_WYSX') {
        this.getProvince()
      }
    },
    methods: {
      async getDetail () {
        try {
          if (!this.params.plan_id) return
          let result = await this.$http.get('/wx/itrade/product/plan/detail', {
            planId: this.params.plan_id,
          })
          switch (result.insurance_type) {
            case 'USA':
              this.detail = JSON.parse(JSON.stringify(result.plan_usa))
              break
            case 'HONGKONG':
              this.detail = JSON.parse(JSON.stringify(result.plan_hk))
              break
            case 'HONGKONG_WYSX':
              this.detail = JSON.parse(JSON.stringify(result.plan_hkwysx))
              break
            case 'HONGKONG_GD':
              this.detail = JSON.parse(JSON.stringify(result.plan_hkgd))
              break
            default:
              break
          }
          this.detail.policy_birth = this.detail.policy_birth.split(' ')[0]
          this.detail.insurant_birth = this.detail.insurant_birth.split(' ')[0]
          Object.keys(this.insurance).forEach(key => {
            this.insurance[key] = this.detail[key]
          })
          Object.keys(this.policy).forEach(key => {
            this.policy[key] = this.detail[key]
          })
        } catch (e) {
          throw new Error(e)
        }
      },
      /**
       * 获取产品相关模板
       * @return {Promise<void>}
       */
      async getTemplate () {
        try {
          let result = await this.$http.get('/wx/itrade/product/plan/template', {
            item_id: this.params.item_id,
            management_id: this.params.supplier_id,
          })
          result.yesno = [
            {value: 'Y', description: '是'},
            {value: 'N', description: '否'},
          ]
          this.template = result
          this.insuranceType = result.insurance_type
        } catch (e) {
          throw new Error(e)
        }
      },
      async getCity (fields, provice) {
        try {
          if (fields === 'insurantCityList') {
            this.insurance.insurant_city = ''
          } else {
            this.policy.policy_city = ''
          }
          this[fields] = await this.$http.get('/wx/itrade/ff/citys', {
            provice: provice,
          })
        } catch (e) {
          throw new Error(e)
        }
      },
      async getProvince (type) {
        try {
          this.provinceList = await this.$http.get('/wx/itrade/ff/provices')
        } catch (e) {
          throw new Error(e)
        }
      },
      checkFields () {
        let fields = []
        let plan = this.clone(this.params)
        switch (this.insuranceType) {
          case 'USA':
            fields = ['insurant_policy_back', 'insurant_province', 'insurant_city', 'policy_province', 'policy_city']
            break
          case 'HONGKONG_WYSX':
            let country = ['China', 'Hong Kong', 'MO', 'Taiwan']
            if (country.includes(this.insurance.insurant_address) && country.includes(this.policy.policy_address)) {
              fields = ['insurant_goto_america_aflag']
            } else if (country.includes(this.insurance.insurant_address) && !country.includes(this.policy.policy_address)) {
              fields = ['insurant_goto_america_aflag', 'policy_province', 'policy_city']
            } else if (!country.includes(this.insurance.insurant_address) && country.includes(this.policy.policy_address)) {
              fields = ['insurant_goto_america_aflag', 'insurant_province', 'insurant_city']
            } else if (!country.includes(this.insurance.insurant_address) && !country.includes(this.policy.policy_address)) {
              fields = ['insurant_goto_america_aflag', 'insurant_province', 'insurant_city', 'policy_province', 'policy_city']
            }
            break
          case 'HONGKONG':
          case 'HONGKONG_GD':
          default:
            fields = ['insurant_goto_america_aflag', 'insurant_province', 'insurant_city', 'policy_province', 'policy_city']
            break
        }
        for (let key of Object.keys(this.insurance)) {
          if (!fields.includes(key)) {
            if (!this.insurance[key]) {
              this.showToast(key + '不能为空!')
              return false
            }
            plan[key] = this.insurance[key]
          }
        }
        for (let key of Object.keys(this.policy)) {
          if (this.insurance.same_flag === 'Y') {
            plan[key] = this.insurance[key.replace('policy', 'insurant')]
          } else if (!fields.includes(key)) {
            if (!this.policy[key]) {
              this.showToast(key + '不能为空!')
              return false
            }
            plan[key] = this.policy[key]
          }
        }
        return plan
      },
      /**
       * 提交计划书
       * @return {Promise<void>}
       */
      async submit () {
        try {
          let plan = this.checkFields()
          let data
          if (!plan) return
          if (this.insuranceType === 'HONGKONG') {
            data = {
              insurance_type: this.insuranceType,
              plan_hk: plan,
            }
          } else if (this.insuranceType === 'HONGKONG_GD') {
            data = {
              insurance_type: this.insuranceType,
              plan_hkgd: plan,
            }
          } else if (this.insuranceType === 'HONGKONG_WYSX') {
            data = {
              insurance_type: this.insuranceType,
              plan_hkwysx: plan,
            }
          } else if (this.insuranceType === 'USA') {
            data = {
              insurance_type: this.insuranceType,
              plan_usa: plan,
            }
          }
          let url = '/wx/itrade/product/plan/submit'
          if (plan.plan_id) {
            url = '/wx/itrade/product/plan/update'
          }
          let result = await this.$http.post(url, data)
          result && this.showToast(result, this.toPage('/pages/plan_module/create_success/main'))
        } catch (e) {
          throw new Error(e)
        }
      },
      /**
       * simple clone
       * @param obj
       * @return {any}
       */
      clone (obj) {
        return JSON.parse(JSON.stringify(obj))
      },
    },
    components: {
      mxPicker,
    }
  }
</script>

<style scoped lang="scss">
  $mid-space: $small-space * 3;
  .container {
    font-family: '苹方';
    color: $deepColor;
    border-top: 1px solid transparent;
    padding-bottom: 120px;
    .module {
      margin-top: $mid-space;
      padding: 0 $mid-space;
      background: #fff;
      .title, .item {
        @include flex(space-between);
        height: 90px;
      }
      .title {
        &_text {
          flex: 1;
          margin-left: $mid-space;
          font-size: 32px;
          font-weight: bold;
          i {
            font-weight: normal;
            font-size: 26px;
            display: inline;
          }
        }
      }
      .item {
        border-top: 1px solid $borderColor;
        .label {
          font-size: 26px;
          color: #888;
          min-width: 6em;
        }
        .value {
          flex: 1;
          @include flex();
          input {
            flex: 1;
            text-align: right;
            font-size: 28px;
          }
          .picker {
            min-width: 50vw;
            min-height: 28px;
            text-align: right;
            font-size: 28px;
            &.none {
              color: #888;
            }
          }
          .extract {
            flex: 1;
            display: block;
            @include flex(flex-end, center);
            margin-right: $small-space;
            color: #888;
            input {
              color: $mainColor;
              display: inline-flex;
              text-align: center;
              flex:initial;
              margin: 0 5px;
              @include size(80px, 60px);
              border: 2px solid #666;
              border-radius: 8px;
            }
          }
        }
        &.textarea {
          @include flex(center, flex-start);
          height: auto;
          flex-direction: column;
          .label {
            padding: $mid-space 0 $small-space;
          }
          .value {
            @include flex();
            align-self: stretch;
            padding: 0 $mid-space $mid-space;
            textarea {
              flex: 1;
              background: #e8e8e8;
              min-height: 140px;
              border-radius: 8px;
              padding: $small-space;
              font-size: 28px;
              font-weight: 600;
              &::placeholder {
                font-size: 28px;
              }
            }
          }
        }
      }
      .arrow {
        width: 15px;
        height: 28px;
        margin-left: $small-space;
      }
    }
    .btn_next {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 2;
      background: #fff;
      @include size(100vw, 100px);
      padding: $mid-space / 2 $mid-space;
      span {
        display: block;
        border-radius: 15px;
        background: $mainColor;
        color: #fff;
        height: 100%;
        @include flex();
        font-size: 32px;
      }
    }
    .mask {
      @include size(100vw, 100vh);
      position: fixed;
      z-index: 9;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .4);
    }
    .confirm {
      @include size(616px, 307px);
      position: fixed;
      z-index: 10;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 8px;
      padding: $big-space $big-space $middle-space;
      @include flex(space-between, stretch);
      flex-direction: column;
      p {
        font-size: 28px;
        color: $deepColor;
      }
      h3 {
        font-size: 32px;
        color: $mainColor;
        font-weight: bold;
      }
      .btn_group {
        font-size: 32px;
        color: $mainColor;
        margin-top: $big-space;
        @include flex(space-between);
        >div {
          @include size(240px, 60px);
          @include flex();
          border: 2px solid $mainColor;
          border-radius: 8px;
          &.submit {
            color: #fff;
            border: none;
            background: $mainColor;
          }
        }
      }
    }
  }
</style>
<style>
  .placeholder {
    font-size: 28px;
    font-family: '苹方';
    color: #888;
  }
</style>
