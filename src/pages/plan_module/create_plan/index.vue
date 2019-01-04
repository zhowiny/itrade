<template>
  <div class="container">
    <!--<div class="module">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan.png" mode="aspectFit" style="width:41rpx;height:37rpx;">
        <span class="title_text">我的计划书</span>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>-->
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
            :disabled="planId || companyList.length === 0"
            :data="companyList"
            v-model="form.supplier_id"
            @change="companyChange"
          />
        </div>
        <img v-if="!planId" class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">产品名称</span>
        <div class="value">
          <mx-picker
            label="item_name"
            valueKey="item_id"
            :disabled="planId || productList.length === 0"
            :data="productList"
            v-model="form.item_id"
            @change="productChange"
          />
        </div>
        <img v-if="!planId" class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item none">
        <span class="label">年期</span>
        <div class="value">
          <mx-picker
            label="subline_item_name"
            valueKey="subline_id"
            :disabled="!template.product_year_periods || template.product_year_periods.length < 1"
            :placeholder="(template.product_year_periods && template.product_year_periods.length === 0) ? '无可选项' : '请选择'"
            :data="template.product_year_periods"
            v-model="form.subline_id"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <!--美险显示字段-->
      <div v-if="insuranceType === 'USA'">
        <div class="item" >
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
          <span class="label">金额</span>
          <div class="value">
            <input v-model="form.amount" type="text" placeholder-class="placeholder" placeholder="请输入">
          </div>
          <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item" >
          <span class="label">保单需求</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :disabled="!template.policy_requires || template.policy_requires.length < 1"
              :data="template.policy_requires"
              v-model="form.policy_demand"
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
        <div class="item" v-if="form.extract_flag === 'Y'"><!--v-for="(item, index) in extract" :key="index"-->
          <span class="label">提取年数</span>
          <div class="value">
            <div class="extract">
              从第 <input type="text" v-model="form.extract_from"> 年
              到第 <input type="text" v-model="form.extract_to"> 年
            </div>
          </div>
          <!--<img v-if="false" src="/images/icon_sub.png" style="width: 39rpx;height: 39rpx;">
          <img v-else src="/images/icon_add.png" style="width: 39rpx;height: 39rpx;">-->
        </div>

        <div class="item textarea">
          <span class="label">任何健康问题? (选填)</span>
          <div class="value">
            <textarea v-model="form.health_problem" placeholder-class="placeholder" placeholder="请输入" maxlength="-1" auto-height></textarea>
          </div>
        </div>
      </div>
      <!--不是美险才显示-->
      <div v-else>
        <div class="item">
          <span class="label">缴费方式</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :placeholder="(template.product_pay_methods && template.product_pay_methods.length === 0) ? '无可选项' : '请选择'"
              :disabled="!template.product_pay_methods || template.product_pay_methods.length < 1"
              :data="template.product_pay_methods"
              v-model="form.pay_method"
              product_pay_methods
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item" v-if="insuranceType !== 'HONGKONG_GD'">
          <span class="label">金额类型</span>
          <div class="value">
            <mx-picker
              label="description"
              valueKey="value"
              :placeholder="(template.product_amount_types && template.product_amount_types.length === 0) ? '无可选项' : '请选择'"
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
        <div class="item" v-if="insuranceType !== 'HONGKONG_GD'">
          <span class="label">金额</span>
          <div class="value">
            <input v-model="form.amount" type="number" placeholder-class="placeholder" placeholder="请输入">
          </div>
          <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>

      <!--普通港险才显示附加险,是否提取,高端医疗-->
      <div v-if="insuranceType === 'HONGKONG'">
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
              v-model="form.advanced_medical_flag"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>

      <!--只有高端医疗显示-->
      <div v-if="insuranceType === 'HONGKONG_GD'">
        <div class="item">
          <span class="label">保障级别</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
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
              valueKey="value"
              label="description"
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
              valueKey="self_pay_id"
              label="self_pay_name"
              :disabled="!template.selfpaies || template.selfpaies.length < 1"
              :data="template.selfpaies"
              v-model="advancedMedicals.self_pay_id"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>

    </div>

    <div
      class="module"
      v-if="form.additional_risk_flag === 'Y' && insuranceType === 'HONGKONG'"
      v-for="(item, index) in additions" :key="index"
    >
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_1.png" mode="aspectFit" style="width:32rpx;height:35rpx;">
        <span class="title_text">附加险信息{{index || ''}}</span>
        <img @click="delAddition(index)" v-if="index > 0" src="/images/icon_sub.png" style="width: 39rpx;height: 39rpx;">
        <img @click="addAddition" v-else src="/images/icon_add.png" style="width: 39rpx;height: 39rpx;">
      </div>
      <div class="item">
        <span class="label">附加险</span>
        <div class="value">
          <mx-picker
            label="itemName"
            valueKey="itemId"
            :disabled="!template.additions || template.additions.length < 1"
            :data="template.additions"
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
      v-if="form.extract_flag === 'Y' && insuranceType === 'HONGKONG'"
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
            :disabled="!template.extract_methods || template.extract_methods.length < 1"
            :data="template.extract_methods"
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
              从第 <input type="number" v-model="item.extract_from"> 年
              到第 <input type="number" v-model="item.extract_to"> 年
            </div>
          </div>
          <img @click="delExtract(index)" v-if="index > 0" src="/images/icon_sub.png" style="width: 39rpx;height: 39rpx;">
          <img @click="addExtract" v-if="form.extract_method === 'FA' && index === 0" src="/images/icon_add.png" style="width: 39rpx;height: 39rpx;">
        </div>
        <div class="item" v-if="form.extract_method !== 'MA'">
          <span class="label">提取金额</span>
          <div class="value">
            <input v-model="item.extract_amount" type="number" placeholder-class="placeholder" placeholder="请输入">
          </div>
          <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>
    </div>

    <div
      class="module"
      v-if="form.advanced_medical_flag === 'Y' && insuranceType === 'HONGKONG'"
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
            @change="getOptions(1)"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">保障级别</span>
        <div class="value">
          <mx-picker
            valueKey="value"
            label="description"
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
            valueKey="value"
            label="description"
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
            valueKey="self_pay_id"
            label="self_pay_name"
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
      v-if="insuranceType === 'HONGKONG' && (form.advanced_medical_flag === 'Y' || form.extract_flag === 'Y' || form.additional_risk_flag === 'Y')"
    >
      <div class="item textarea">
        <span class="label">其他备注 (选填)</span>
        <div class="value">
          <textarea v-model='form.remark' placeholder-class="placeholder" placeholder="请输入" maxlength="-1" auto-height></textarea>
        </div>
      </div>
    </div>

    <div class="btn_next" @click="nextStep">
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
          supplier_id: '', // 产品公司id
          item_id: '', // 产品id
          subline_id: '', // 年期
          pay_method: '', // 付款方式
          amount_type: '', // 金额类型
          currency: '', // 币种
          amount: '', // 金额
          additional_risk_flag: 'N', // 附加险
          extract_flag: 'N', // 是否提取
          advanced_medical_flag: 'N', // 高端医疗
          remark: '', // 其他备注

          extract_type: '', // 提取类型
          extract_method: '', // 提取方式

          policy_demand: '', // 保单需求
          health_problem: '', // 健康问题
          extract_from: '', // 提取开始
          extract_to: '', // 提取结束
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

        detail: {},
        planId: '',
      }
    },
    watch: {
    },

    async onLoad (params) {
      this.type = params.type
      this.planId = params.plan_id
      await this.getDetail()
      await this.getCompany()
      this.getProduct()
    },
    onUnload () {
      let d = this.$options.data()
      Object.keys(d).forEach(key => {
        this[key] = d[key]
      })
    },
    methods: {
      async getDetail () {
        try {
          if (!this.$mp.query.plan_id) return
          let result = await this.$http.get('/wx/itrade/product/plan/detail', {
            planId: this.$mp.query.plan_id,
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
          this.insuranceType = result.insurance_type
          this.detail.policy_birth = this.detail.policy_birth.split(' ')[0]
          this.detail.insurant_birth = this.detail.insurant_birth.split(' ')[0]

          Object.keys(this.form).forEach(key => {
            this.form[key] = this.detail[key]
          })
          this.form.supplier_id = this.detail.management_id

          this.form.subline_id = parseInt(this.detail.year_period)
          this.detail.additions.length > 0 && (this.additions = this.detail.additions)
          this.detail.extracts.length > 0 && (this.extract = this.detail.extracts)
          this.advancedMedicals = Object.assign({self_pay_id: this.detail.advanced_medical.selfpay_id}, this.detail.advanced_medical)
          if (this.detail.advanced_medical.item_id) {
            this.getOptions()
          }
          await this.getTemplate()
        } catch (e) {
          throw new Error(e)
        }
      },
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
          if (!this.form.supplier_id) return
          this.productList = await this.$http.get('/wx/itrade/ff/product/items', {
            management_id: this.form.supplier_id
          })
        } catch (e) {
          throw new Error(e)
        }
      },
      /**
       * 产品改变时重置部分字段
       */
      productChange () {
        this.reset()
        this.getTemplate()
        return null
      },
      reset () {
        this.form.subline_id = ''
        this.form.pay_method = ''
        this.form.amount_type = ''
        this.form.currency = ''
        this.form.additional_risk_flag = 'N'
        this.form.extract_flag = 'N'
        this.form.advanced_medical_flag = 'N'
      },
      /**
       * 获取产品相关模板
       * @return {Promise<void>}
       */
      async getTemplate () {
        try {
          let result = await this.$http.get('/wx/itrade/product/plan/template', {
            item_id: this.form.item_id,
            management_id: this.form.supplier_id,
          })
          result.yesno = [
            {value: 'Y', description: '是'},
            {value: 'N', description: '否'},
          ]
          Object.keys(result).forEach(key => {
            this.$set(this.template, key, result[key] || [])
          })
          this.insuranceType = result.insurance_type
        } catch (e) {
          throw new Error(e)
        }
      },
      /**
       * 查询高端医疗下拉选项
       */
      async getOptions (clear) {
        try {
          if (clear) {
            this.advancedMedicals.security_area = ''
            this.advancedMedicals.security_level = ''
            this.advancedMedicals.self_pay_id = ''
          }
          let result = await this.$http.get('/wx/itrade/product/plan/advanced_medical/options', {
            item_id: this.advancedMedicals.item_id
          })
          this.$set(this.template, 'security_levels', result.security_levels || result.securityLevels)
          this.$set(this.template, 'security_areas', result.security_areas || result.securityAreas)
          this.$set(this.template, 'selfpaies', result.selfpaies || [])
        } catch (e) {
          throw new Error(e)
        }
      },
      addAddition () {
        if (!this.additions[0].addition_id) {
          this.showToast('请选择附加险!')
          return
        }
        this.additions.unshift({
          addition_id: '', // 附加险id
          remark: '', // 附加险备注
        })
      },
      delAddition (index) {
        this.additions = this.additions.filter((i, k) => {
          return index !== k
        })
      },
      addExtract () {
        if (!this.extract[0].extract_from || !this.extract[0].extract_to || !this.extract[0].extract_amount) {
          this.showToast('请完善提取信息!')
          return
        }
        this.extract.unshift({
          extract_amount: '', // 提取金额
          extract_from: '', // 提取开始
          extract_to: '', // 提取结束
        })
      },
      delExtract (index) {
        this.extract = this.extract.filter((i, k) => {
          return index !== k
        })
      },
      /**
       * 把数据带入下一步
       */
      nextStep () {
        let params = this.checkFields()
        if (params) {
          this.toPage({
            url: '/pages/plan_module/create_info/main',
            data: {params, insurance_type: this.insuranceType},
          })
        }
      },
      /**
       * 检验字段是否通过
       * @return {*}
       */
      checkFields () {
        let params = {}
        let fields = {}
        switch (this.insuranceType) {
          case 'HONGKONG':
            fields = [
              {
                required: true,
                value: this.form.supplier_id,
                meaning: '产品公司',
                field: 'supplier_id',
              },
              {
                required: true,
                value: this.form.item_id,
                meaning: '产品',
                field: 'item_id',
              },
              {
                required: true,
                value: this.form.subline_id,
                meaning: '年期',
                field: 'subline_id',
              },
              {
                required: true,
                value: this.form.pay_method,
                meaning: '付款方式',
                field: 'pay_method',
              },
              {
                required: true,
                value: this.form.amount_type,
                meaning: '金额类型',
                field: 'amount_type',
              },
              {
                required: true,
                value: this.form.currency,
                meaning: '币种',
                field: 'currency',
              },
              {
                required: true,
                value: this.form.amount,
                meaning: '金额',
                field: 'amount',
              },
              {
                required: true,
                value: this.form.additional_risk_flag,
                meaning: '附加险',
                field: 'additional_risk_flag',
              },
              {
                required: true,
                value: this.form.extract_flag,
                meaning: '是否提取',
                field: 'extract_flag',
              },
              {
                required: true,
                value: this.form.advanced_medical_flag,
                meaning: '高端医疗',
                field: 'advanced_medical_flag',
              },
              {
                required: false,
                value: this.form.remark,
                meaning: '其他备注',
                field: 'remark',
              },
            ]
            for (let field of fields) {
              if (field.required && (!field.value && field.value !== 0)) {
                this.showToast(field.meaning + '不能为空!')
                return false
              } else {
                params[field.field] = field.value
              }
            }
            // 如果添加提取,增加校验提取选项
            if (this.form.extract_flag === 'Y') {
              if (!this.form.extract_type) {
                this.showToast('提取类型不能为空!')
                return false
              } else {
                params.extract_type = this.form.extract_type
              }
              if (!this.form.extract_method) {
                this.showToast('提取方式不能为空!')
                return false
              } else {
                params.extract_method = this.form.extract_method
              }
              for (let e of this.extract) {
                if (this.form.extract_method !== 'MA' && !e.extract_amount && e.extract_amount !== 0) {
                  this.showToast('提取金额不能为空!')
                  return false
                }
                if (!e.extract_from && e.extract_from !== 0) {
                  this.showToast('提取开始年数不能为空!')
                  return false
                }
                if (!e.extract_to && e.extract_to !== 0) {
                  this.showToast('提取结束年数不能为空!')
                  return false
                }
              }
              params.extracts = this.extract
            }
            // 如果添加附加险,增加校验附加险产品
            if (this.form.additional_risk_flag === 'Y') {
              for (let addition of this.additions) {
                if (!addition.addition_id) {
                  this.showToast('附加险不能为空!')
                  return false
                }
              }
              params.additions = this.additions
            }
            // 如果添加高端医疗,增加校验高端医疗
            if (this.form.advanced_medical_flag === 'Y') {
              if (!this.advancedMedicals.item_id) {
                this.showToast('高端医疗产品不能为空!')
                return false
              }
              if (!this.advancedMedicals.security_area) {
                this.showToast('保障区域不能为空!')
                return false
              }
              if (!this.advancedMedicals.security_level) {
                this.showToast('保障级别不能为空!')
                return false
              }
              if (!this.advancedMedicals.self_pay_id) {
                this.showToast('自付选项不能为空!')
                return false
              }
              params.advanced_medical = this.advancedMedicals
            }
            break
          case 'HONGKONG_GD':
            fields = [
              {
                required: true,
                value: this.form.supplier_id,
                meaning: '产品公司',
                field: 'supplier_id',
              },
              {
                required: true,
                value: this.form.item_id,
                meaning: '产品',
                field: 'item_id',
              },
              {
                required: true,
                value: this.form.subline_id,
                meaning: '年期',
                field: 'subline_id',
              },
              {
                required: true,
                value: this.form.pay_method,
                meaning: '缴费方式',
                field: 'pay_method',
              },
              {
                required: true,
                value: this.form.currency,
                meaning: '币种',
                field: 'currency',
              },
            ]
            for (let field of fields) {
              if (field.required && (!field.value && field.value !== 0)) {
                this.showToast(field.meaning + '不能为空!')
                return false
              } else {
                params[field.field] = field.value
              }
            }
            if (!this.advancedMedicals.security_area) {
              this.showToast('保障区域不能为空!')
              return false
            } else {
              params.security_area = this.advancedMedicals.security_area
            }
            if (!this.advancedMedicals.security_level) {
              this.showToast('保障级别不能为空!')
              return false
            } else {
              params.security_level = this.advancedMedicals.security_level
            }
            if (!this.advancedMedicals.self_pay_id) {
              this.showToast('自付选项不能为空!')
              return false
            } else {
              params.self_pay_id = this.advancedMedicals.self_pay_id
            }
            break
          case 'USA':
            fields = [
              {
                required: true,
                value: this.form.supplier_id,
                meaning: '产品公司',
                field: 'supplier_id',
              },
              {
                required: true,
                value: this.form.item_id,
                meaning: '产品',
                field: 'item_id',
              },
              {
                required: true,
                value: this.form.subline_id,
                meaning: '年期',
                field: 'subline_id',
              },
              {
                required: true,
                value: this.form.amount_type,
                meaning: '金额类型',
                field: 'amount_type',
              },
              {
                required: true,
                value: this.form.amount,
                meaning: '金额',
                field: 'amount',
              },
              {
                required: true,
                value: this.form.policy_demand,
                meaning: '保单需求',
                field: 'policy_demand',
              },
              {
                required: false,
                value: this.form.extract_flag,
                meaning: '是否提取',
                field: 'extract_flag',
              },
              {
                required: false,
                value: this.form.extract_from,
                meaning: '提取开始年数',
                field: 'extract_from',
              },
              {
                required: false,
                value: this.form.extract_to,
                meaning: '提取结束年数',
                field: 'extract_to',
              },
              {
                required: false,
                value: this.form.health_problem,
                meaning: '任何健康问题',
                field: 'health_problem',
              },
            ]
            for (let field of fields) {
              if (field.required && (!field.value && field.value !== 0)) {
                this.showToast(field.meaning + '不能为空!')
                return false
              } else {
                params[field.field] = field.value
              }
            }
            break
          case 'HONGKONG_WYSX':
          default:
            fields = [
              {
                required: true,
                value: this.form.supplier_id,
                meaning: '产品公司',
                field: 'supplier_id',
              },
              {
                required: true,
                value: this.form.item_id,
                meaning: '产品',
                field: 'item_id',
              },
              {
                required: true,
                value: this.form.subline_id,
                meaning: '年期',
                field: 'subline_id',
              },
              {
                required: true,
                value: this.form.pay_method,
                meaning: '缴费方式',
                field: 'pay_method',
              },
              {
                required: true,
                value: this.form.amount_type,
                meaning: '金额类型',
                field: 'amount_type',
              },
              {
                required: true,
                value: this.form.currency,
                meaning: '币种',
                field: 'currency',
              },
              {
                required: true,
                value: this.form.amount,
                meaning: '金额',
                field: 'amount',
              },
            ]
            for (let field of fields) {
              if (field.required && (!field.value && field.value !== 0)) {
                this.showToast(field.meaning + '不能为空!')
                return false
              } else {
                params[field.field] = field.value
              }
            }
            break
        }
        this.$mp.query.plan_id && (params.plan_id = this.$mp.query.plan_id)
        return params
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
