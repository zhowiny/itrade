<template>
  <div class="container">
    <div class="module">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan.png" mode="aspectFit" style="width:41rpx;height:37rpx;">
        <span class="title_text">我的计划书</span>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>
    <div class="module">
      <div class="title">
        <img class="title_icon" src="/images/icon_product_info.png" mode="aspectFit" style="width:41rpx;height:37rpx;">
        <span class="title_text">产品信息</span>
        <!--<img class="arrow" src="/images/icon_arrow_product.png">-->
      </div>
      <div class="item">
        <span class="label">产品公司</span>
        <div class="value">
          <mx-picker
            label="management_name"
            valueKey="management_id"
            :disabled="companyList.length < 1"
            :data="companyList"
            v-model="form.management_id"
            @change="companyChange"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">产品名称</span>
        <div class="value">
          <mx-picker
            label="item_name"
            valueKey="item_id"
            :disabled="productList.length < 1"
            :data="productList"
            v-model="form.item_id"
            @change="productChange"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item none">
        <span class="label">年期</span>
        <div class="value">
          <mx-picker
            label="subline_item_name"
            valueKey="subline_id"
            :disabled="!template.product_year_periods || template.product_year_periods.length < 1"
            :data="template.product_year_periods"
            v-model="form.year_period"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">缴费方式</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :disabled="!template.product_pay_methods || template.product_pay_methods.length < 1"
            :data="template.product_pay_methods"
            v-model="form.pay_method"
            product_pay_methods
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">金额类型</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :disabled="!template.product_amount_types || template.product_amount_types.length < 1"
            :data="template.product_amount_types"
            v-model="form.amount_type"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">缴费币种</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :disabled="!template.product_currenies || template.product_currenies.length < 1"
            :data="template.product_currenies"
            v-model="form.currency"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">金额</span>
        <div class="value">
          <input v-model="form.amount" type="text" placeholder-class="placeholder" placeholder="请输入">
        </div>
        <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
      </div>

      <!--万用寿险不显示附加险,是否提取,高端医疗-->
      <div v-if="insuranceType !== 'HONGKONG_WYSX'">
        <div class="item">
          <span class="label">附加险</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :data="template.yesno"
              v-model="form.additional_risk_flag"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">是否提取</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :data="template.yesno"
              v-model="form.extract_flag"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">高端医疗</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :data="template.yesno"
              v-model="form.advanced_medical"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>
    </div>

    <div
      class="module"
      v-if="form.additional_risk_flag === 'Y'"
      v-for="(item, index) in additions" :key="index"
    >
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_1.png" mode="aspectFit" style="width:32rpx;height:35rpx;">
        <span class="title_text">附加险信息</span>
        <img v-if="index > 0" src="/images/icon_sub.png" style="width: 39rpx;height: 39rpx;">
        <img v-else="index > 0" src="/images/icon_add.png" style="width: 39rpx;height: 39rpx;">
      </div>
      <div class="item">
        <span class="label">附加险</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :disabled="!template.yesno || template.yesno.length < 1"
            :data="template.yesno"
            v-model="item.addition_id"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item textarea">
        <span class="label">附加险备注 (选填)</span>
        <div class="value">
          <textarea v-model="item.remark" placeholder-class="placeholder" placeholder="请输入" maxlength="-1" auto-height></textarea>
        </div>
      </div>
    </div>

    <div
      class="module"
      v-if="form.extract_flag === 'Y'"
    >
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_2.png" mode="aspectFit" style="width:36rpx;height:32rpx;">
        <span class="title_text">添加提取</span>
      </div>
      <div class="item">
        <span class="label">提取类型</span>
        <div class="value">
          <mx-picker
            valueKey="value"
            label="description"
            :disabled="!template.extract_types || template.extract_types.length < 1"
            :data="template.extract_types"
            v-model="form.extract_type"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">提取方式</span>
        <div class="value">
          <mx-picker
            label="description"
            valueKey="value"
            :disabled="!template.extract_method || template.extract_method.length < 1"
            :data="template.extract_method"
            v-model="form.extract_method"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div v-for="(item, index) in extract" :key="index">
        <div class="item">
          <span class="label">提取年数</span>
          <div class="value">
            <div class="extract">
              从第 <input type="text" v-model="item.extract_from"> 年
              到第 <input type="text" v-model="item.extract_to"> 年
            </div>
          </div>
          <img v-if="index > 0" src="/images/icon_sub.png" style="width: 39rpx;height: 39rpx;">
          <img v-else="index > 0" src="/images/icon_add.png" style="width: 39rpx;height: 39rpx;">
        </div>
        <div class="item">
          <span class="label">提取金额</span>
          <div class="value">
            <input v-model="item.extract_amount" type="text" placeholder-class="placeholder" placeholder="请输入">
          </div>
          <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>
    </div>

    <div
      class="module"
      v-if="form.advanced_medical === 'Y'"
    >
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_3.png" mode="aspectFit" style="width:31rpx;height:36rpx;">
        <span class="title_text">添加高端医疗</span>
      </div>
      <div class="item">
        <span class="label">产品名称</span>
        <div class="value">
          <mx-picker
            valueKey="itemId"
            label="itemName"
            :disabled="!template.advanced_medicals || template.advanced_medicals.length < 1"
            :data="template.advanced_medicals"
            v-model="advancedMedicals.item_id"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">保障级别</span>
        <div class="value">
          <mx-picker
            valueKey="itemId"
            label="itemName"
            :disabled="!template.security_levels || template.security_levels.length < 1"
            :data="template.security_levels"
            v-model="advancedMedicals.security_level"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">保障地区</span>
        <div class="value">
          <mx-picker
            valueKey="itemId"
            label="itemName"
            :disabled="!template.security_areas || template.security_areas.length < 1"
            :data="template.security_areas"
            v-model="advancedMedicals.security_area"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">自付选项</span>
        <div class="value">
          <mx-picker
            valueKey="itemId"
            label="itemName"
            :disabled="!template.selfpaies || template.selfpaies.length < 1"
            :data="template.selfpaies"
            v-model="advancedMedicals.self_pay_id"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>
    <div
      class="module"
      v-if="form.advanced_medical === 'Y' || form.extract_flag === 'Y' || form.additional_risk_flag === 'Y'"
    >
      <div class="item textarea">
        <span class="label">其他备注 (选填)</span>
        <div class="value">
          <textarea v-model='remark' placeholder-class="placeholder" placeholder="请输入" maxlength="-1" auto-height></textarea>
        </div>
      </div>
    </div>

    <div class="btn_next" @click="toPage('/pages/plan_module/create_info/main')">
      <span>下一步</span>
    </div>

  </div>
</template>

<script>
  import mxPicker from '@/components/picker.vue'
  export default {
    data () {
      return {
        title: '新建计划书',
        type: 'HONGKONG',
        insuranceType: '',
        companyList: [],
        productList: [],
        template: {
          yesno: [
            {value: 'Y', description: '是'},
            {value: 'N', description: '否'},
          ],
        },

        form: {
          management_id: 1, // 产品公司id
          item_id: undefined, // 产品id
          year_period: '', // 年期
          pay_method: '', // 付款方式
          amount_type: '', // 金额类型
          currency: '', // 币种
          amount: '', // 金额
          additional_risk_flag: 'N', // 附加险
          extract_flag: 'N', // 是否提取
          advanced_medical: 'N', // 高端医疗
          remark: '', // 其他备注

          extract_type: '', // 提取类型
          extract_method: '', // 提取方式

        },

        // 附加险
        additions: [
          {
            addition_id: '', // 附加险id
            remark: '', // 附加险备注
          },
        ],
        // 提取
        extract: [
          {
            extract_amount: '', // 提取金额
            extract_from: '', // 提取开始
            extract_to: '', // 提取结束
          },
        ],
        // 高端医疗
        advancedMedicals: {
          item_id: '', // 高端医疗产品id
          security_area: '', // 保障区域
          security_level: '', // 保障级别
          self_pay_id: '', // 自付选项
        },
      }
    },
    watch: {
    },

    async onLoad (params) {
      this.type = params.type
      await this.getCompany()
      this.getProduct()
    },
    methods: {
      /**
       * 获取产品公司
       * @return {Promise<void>}
       */
      async getCompany () {
        try {
          this.companyList = await this.$http.get('/wx/itrade/ff/product/managements')
        } catch (e) {
          throw new Error(e)
        }
      },
      /**
       * 产品公司改变时清空产品,并重新获取产品列表
       */
      companyChange () {
        this.form.item_id = undefined
        this.reset()
        this.getProduct()
      },
      /**
       * 获取产品列表
       * @return {Promise<void>}
       */
      async getProduct () {
        try {
          this.productList = await this.$http.get('/wx/itrade/ff/product/items', {
            management_id: this.form.management_id
          })
        } catch (e) {
          throw new Error(e)
        }
      },
      productChange () {
        this.reset()
        this.getTemplate()
      },
      reset () {
        this.form.year_period = ''
        this.form.pay_method = ''
        this.form.amount_type = ''
        this.form.currency = ''
        this.form.additional_risk_flag = 'N'
        this.form.extract_flag = 'N'
        this.form.advanced_medical = 'N'
      },
      /**
       * 获取产品相关模板
       * @return {Promise<void>}
       */
      async getTemplate () {
        try {
          let result = await this.$http.get('/wx/itrade/product/plan/template', {
            item_id: this.form.item_id,
            management_id: this.form.management_id,
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
      change (e) {
        console.log(e, this.form, 'change---')
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
  }
</style>
<style>
  .placeholder {
    font-size: 28px;
    font-family: '苹方';
    color: #888;
  }
</style>
