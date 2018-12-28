<template>
  <div class="container">
    <div class="status_info">
      <!--处理中图标-->
      <img v-if="form.plan_status === 'PROCESSING'" src="/images/icon_plan_detail_1.png" mode="aspectFit" style="width: 100rpx;height: 97rpx;">
      <!--需复查图标-->
      <img v-if="form.plan_status === 'REVIEW'" src="/images/icon_plan_detail_2.png" mode="aspectFit" style="width: 117rpx;height: 99rpx;">
      <!--成功图标-->
      <img v-if="form.plan_status === 'COMPLETED'" src="/images/icon_plan_detail_3.png" mode="aspectFit" style="width: 93rpx;height: 93rpx;">
      <!--失败图标-->
      <img v-if="false" src="/images/icon_plan_detail_4.png" mode="aspectFit" style="width: 99rpx;height: 99rpx;">

      <div class="status">
        <span>{{form.plan_status_name}}</span>
        <p>{{form.description}}</p>
        <i v-if="form.plan_status === 'REVIEW'">复查时间: {{form.review_date}}</i>
        <i v-if="form.plan_status === 'PROCESSING'">提交时间: {{form.request_date}}</i>
        <i v-if="form.plan_status === 'COMPLETED'">完成时间: {{form.complete_date}}</i>
      </div>
      <!--成功才显示-->
      <div
        v-if="form.plan_status === 'COMPLETED'"
        class="preview" @click="$common.previewFile(form.file.file_url, form.file.file_name)"
      >
        <img src="/images/icon_preview.png" mode="aspectFit" style="width:33rpx;height:25rpx;">
        <span>点击预览</span>
      </div>
    </div>
    <div style="order:0;" class="module" :class="{edit: view.productEditable}">
      <div class="title">
        <img class="title_icon" src="/images/icon_product_info.png" mode="aspectFit" style="width:41rpx;height:37rpx;">
        <span class="title_text">产品信息</span>
        <div class="operate" v-if="view.productEditable">
          <span @click="view.productEditable = false">取消</span>
          <span @click="view.productEditable = false">保存</span>
        </div>
        <img v-if="view.editable && !view.productEditable"  @click="view.productEditable = true" src="/images/icon_edit.png" style="width: 33rpx;height:34rpx;">
      </div>
      <div class="item">
        <span class="label">产品公司</span>
        <div class="value" style="justify-content:flex-end;font-weight: bold;">{{form.management_name}}</div>
      </div>
      <div class="item" >
        <span class="label">产品名称</span>
        <div class="value" style="justify-content:flex-end;font-weight: bold;">{{form.item_name}}</div>
      </div>
      <div class="item none">
        <span class="label">年期</span>
        <div class="value">
          <mx-picker
            :disabled="!view.productEditable" valueKey="subline_item_name"
            label="subline_item_name"
            :data="template.product_year_periods"
            v-model="form.year_period"
            @change="change"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">缴费方式</span>
        <div class="value">
          <mx-picker
            :disabled="!view.productEditable" valueKey="value"
            label="description"
            :data="template.product_pay_methods"
            v-model="form.pay_method"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">金额类型</span>
        <div class="value">
          <mx-picker
            :disabled="!view.productEditable" valueKey="value"
            label="description"
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
            :disabled="!view.productEditable" valueKey="value"
            label="description"
            :data="template.product_currenies"
            v-model="form.currency"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">金额</span>
        <div class="value">
          <input
            v-model="form.amount"
            :disabled="!view.productEditable" type="text"
            placeholder-class="placeholder" placeholder="请输入"
          >
        </div>
        <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">附加险</span>
        <div class="value">
          <mx-picker
            :disabled="!view.productEditable" valueKey="value"
            label="description"
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
            :disabled="!view.productEditable" valueKey="value"
            label="description"
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
            :disabled="!view.productEditable" valueKey="value"
            label="description"
            :data="template.yesno"
            v-model="form.advanced_medical_flag"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>

    <div style="order:1;" v-show="form.extract_flag === 'Y'" class="module" :class="{edit: view.productEditable}">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_2.png" mode="aspectFit" style="width:36rpx;height:32rpx;">
        <span class="title_text">添加提取</span>
      </div>
      <div class="item">
        <span class="label">提取类型</span>
        <div class="value">
          <mx-picker
            :disabled="!view.productEditable" valueKey="value"
            label="description"
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
            :data="template.extract_methods"
            valueKey="value"
            label="description"
            v-model="form.extract_method"
            :disabled="!view.productEditable"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div v-for="(item, index) in form.extracts" :key="index">
        <div class="item">
          <span class="label">提取年数</span>
          <div class="value">
            <div class="extract">
              从第 <input :disabled="!view.productEditable" v-model="item.extract_from" type="text" value="1"> 年
              到第 <input :disabled="!view.productEditable" v-model="item.extract_to" type="text" vlaue="10"> 年
            </div>
          </div>
          <img v-if="view.productEditable && index > 0" src="/images/icon_sub.png" style="width: 39rpx;height: 39rpx;">
          <img v-if="view.productEditable && index === 0" src="/images/icon_add.png" style="width: 39rpx;height: 39rpx;">
        </div>
        <div class="item">
          <span class="label">提取金额</span>
          <div class="value">
            <input :disabled="!view.productEditable" v-model="item.extract_amount" type="text" placeholder-class="placeholder" placeholder="请输入">
          </div>
          <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>
    </div>

    <div
      v-for="(item, index) in form.additions" :key="index"
      v-if="form.additional_risk_flag === 'Y' "
      class="module"
      style="order:0;"
    >
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_1.png" mode="aspectFit" style="width:32rpx;height:35rpx;">
        <span class="title_text">附加险信息</span>
        <img v-if="index > 0" src="/images/icon_sub.png" style="width: 39rpx;height: 39rpx;">
        <img v-else="index > 0" src="/images/icon_add.png" style="width: 39rpx;height: 39rpx;">
      </div>
      <div class="item">
        <span class="label">附加险</span>
        <div class="value" style="justify-content: flex-end;font-weight: bold;">
          <!--<span>{{item.additionName}}</span>-->
          <mx-picker
            valueKey="itemId"
            label="itemName"
            :data="template.additions"
            :disabled="!view.productEditable"
            v-model="item.item_id"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item textarea">
        <span class="label">附加险备注 (选填)</span>
        <div class="value">
          <textarea
            :disabled="!view.productEditable"
            v-model="item.remark" placeholder-class="placeholder"
            placeholder="请输入" maxlength="-1" auto-height
          ></textarea>
        </div>
      </div>
    </div>


    <div class="module" v-if="form.advanced_medical_flag === 'Y' && form.advanced_medical" style="order:1;">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_3.png" mode="aspectFit" style="width:31rpx;height:36rpx;">
        <span class="title_text">添加高端医疗</span>
      </div>
      <div class="item">
        <span class="label">产品名称</span>
        <div class="value">
          <mx-picker
            v-if="template.advanced_medicals"
            :data="template.advanced_medicals"
            valueKey="itemId"
            label="itemName"
            :disabled="!view.productEditable"
            v-model="form.advanced_medical.item_id"
          />
          <span v-else>{{form.advanced_medical.item_name}}</span>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">保障级别</span>
        <div class="value">
          <mx-picker
            :data="template.security_levels"
            valueKey="value"
            label="description"
            v-model="form.advanced_medical.security_level"
            :disabled="!view.productEditable"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">保障地区</span>
        <div class="value">
          <mx-picker
            :data="template.security_areas"
            valueKey="value"
            label="description"
            :disabled="!view.productEditable"
            v-model="form.advanced_medical.security_area"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">自付选项</span>
        <div class="value">
          <mx-picker
            :data="template.selfpaies"
            valueKey="self_pay_id"
            label="self_pay_name"
            :disabled="!view.productEditable"
            v-model="form.advanced_medical.selfpay_id"
          />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>
    <div style="order:1;" class="module" v-if="form.advanced_medical_flag === 'Y' || form.extract_flag === 'Y' || form.additional_risk_flag === 'Y'">
      <div class="item textarea">
        <span class="label">其他备注 (选填)</span>
        <div class="value">
          <textarea
            :disabled="!view.productEditable"
            v-model="form.remark" placeholder-class="placeholder"
            placeholder="请输入" maxlength="-1" auto-height
          ></textarea>
        </div>
      </div>
    </div>
    <div style="order:1;" class="module" :class="{edit: view.insuranceEditable}">
      <div class="title" @click="!view.insuranctExpand && (view.insuranctExpand = true)">
        <img class="title_icon" src="/images/icon_plan_4.png" mode="aspectFit" style="width:32rpx;height:32rpx;">
        <span class="title_text">被保人信息</span>
        <img class="arrow expand" v-if="!view.insuranctExpand" src="/images/icon_arrow_product.png">
        <div class="operate" v-if="view.insuranctExpand && view.insuranceEditable">
          <span @click="view.insuranceEditable = false">取消</span>
          <span @click="view.insuranceEditable = false">保存</span>
        </div>
        <img  @click="view.insuranceEditable = true" v-if="view.editable && view.insuranctExpand && !view.insuranceEditable" src="/images/icon_edit.png" style="width: 33rpx;height:34rpx;">
      </div>
      <div class="item_container" v-if="view.insuranctExpand"><!-- :style="{height: expand ? '990rpx' : 0}"-->
        <div class="item">
          <span class="label">被保人是投保人</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.yesno"
              :value="form.same_flag"
              :disabled="!view.insuranceEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">被保人姓名</span>
          <div class="value">
            <input
              v-model="form.insurant_name"
              type="text" :disabled="!view.insuranceEditable"
              placeholder-class="placeholder"
              placeholder="请输入"
            >
          </div>
          <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">性别</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.genders"
              :value="form.insurant_gender"
              :disabled="!view.insuranceEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item none">
          <span class="label">出生日期</span>
          <div class="value">
            <picker
              mode="date"
              :value="form.insurant_birth"
              start="1900-01-01"
              end="2020-01-01"
              @change="change"
              :disabled="!view.insuranceEditable"
            >
              <view class="picker">{{form.insurant_birth}}</view>
            </picker>
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">国籍</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.countries"
              v-model="form.insurant_country"
              :disabled="!view.insuranceEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">居住地</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.lives"
              v-model="form.insurant_address"
              :disabled="!view.insuranceEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <!--万用寿险才显示-->
        <div v-if="detail.insurance_type === 'HONGKONG_WYSX'">
          <div class="item">
            <span class="label">居住省</span>
            <div class="value">
              <mx-picker />
            </div>
            <img class="arrow" src="/images/icon_arrow_product.png">
          </div>
          <div class="item">
            <span class="label">居住市</span>
            <div class="value">
              <mx-picker />
            </div>
            <img class="arrow" src="/images/icon_arrow_product.png">
          </div>
        </div>

        <div class="item">
          <span class="label">是否吸烟</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.yesno"
              v-model="form.insurant_somking_flag"
              :disabled="!view.insuranceEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">保单回溯</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.yesno"
              v-model="form.insurant_policy_back"
              :disabled="!view.insuranceEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="collapse" @click="view.insuranctExpand = false">
          <span>收起</span>
          <img src="/images/icon_collapse.png" mode="aspectFit" style="width: 26rpx;height: 16rpx;">
        </div>
      </div>
    </div>

    <div style="order:1;" class="module" :class="{edit: view.policyEditable}">
      <div class="title" @click="!view.policyExpand && (view.policyExpand = true)">
        <img class="title_icon" src="/images/icon_plan_4.png" mode="aspectFit" style="width:32rpx;height:32rpx;">
        <span class="title_text">投保人信息</span>
        <img class="arrow expand" v-if="!view.policyExpand" src="/images/icon_arrow_product.png">
        <div class="operate" v-if="view.policyExpand && view.policyEditable">
          <span @click="view.policyEditable = false">取消</span>
          <span @click="view.policyEditable = false">保存</span>
        </div>
        <img  @click="view.policyEditable = true" v-if="view.editable && view.policyExpand && !view.policyEditable" src="/images/icon_edit.png" style="width: 33rpx;height:34rpx;">
      </div>
      <div class="item_container" v-if="view.policyExpand">
        <div class="item">
          <span class="label">投保人姓名</span>
          <div class="value">
            <input
              v-model="form.policy_name"
              type="text"
              placeholder-class="placeholder"
              placeholder="请输入"
              :disabled="!view.policyEditable"
            >
          </div>
          <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">性别</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.genders"
              :value="form.policy_gender"
              :disabled="!view.policyEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item none">
          <span class="label">出生日期</span>
          <div class="value">
            <picker
              mode="date"
              :value="form.policy_birth"
              start="1900-01-01"
              end="2020-01-01"
              @change="change"
              :disabled="!view.policyEditable"
            >
              <view class="picker">{{form.policy_birth}}</view>
            </picker>
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">国籍</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.countries"
              v-model="form.policy_country"
              :disabled="!view.policyEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="item">
          <span class="label">居住地</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.lives"
              v-model="form.policy_address"
              :disabled="!view.policyEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <!--万用寿险才显示-->
        <div v-if="detail.insurance_type === 'HONGKONG_WYSX'">
          <div class="item">
            <span class="label">居住省</span>
            <div class="value">
              <mx-picker />
            </div>
            <img class="arrow" src="/images/icon_arrow_product.png">
          </div>
          <div class="item">
            <span class="label">居住市</span>
            <div class="value">
              <mx-picker />
            </div>
            <img class="arrow" src="/images/icon_arrow_product.png">
          </div>
        </div>
        <div class="item">
          <span class="label">是否吸烟</span>
          <div class="value">
            <mx-picker
              valueKey="value"
              label="description"
              :data="template.yesno"
              v-model="form.policy_somking_flag"
              :disabled="!view.policyEditable"
            />
          </div>
          <img class="arrow" src="/images/icon_arrow_product.png">
        </div>
        <div class="collapse" @click="view.policyExpand = false">
          <span>收起</span>
          <img src="/images/icon_collapse.png" mode="aspectFit" style="width: 26rpx;height: 16rpx;">
        </div>
      </div>
    </div>
    <p class="time" style="order:1;">提交时间: {{form.creation_date}}</p>

    <div class="btn_next">
      <span >撤销申请</span><!--@click="cancel"-->
      <span @click="showConfirm = true">修改申请</span>
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
  export default {
    data () {
      return {
        title: '计划书详情',
        planId: '',
        type: '',
        detail: {
          plan_hk: {},
        },
        template: {},
        form: {
          additions: [],
        },
        view: {
          editable: false,
          productEditable: false,
          insuranctExpand: false,
          insuranceEditable: false,
          policyExpand: false,
          policyEditable: false,
        },

        showConfirm: false,
      }
    },

    async onLoad (params) {
      this.planId = params.planId
      await this.getDetail()
      this.getTemplate()
    },
    methods: {
      async getDetail () {
        try {
          this.detail = await this.$http.get('/wx/itrade/product/plan/detail', {
            planId: this.planId,
          })
          let result
          switch (this.detail.insurance_type) {
            case 'USA':
              result = JSON.parse(JSON.stringify(this.detail.plan_usa))
              break
            case 'HONGKONG':
              result = JSON.parse(JSON.stringify(this.detail.plan_hk))
              break
            case 'HONGKONG_WYSX':
              result = JSON.parse(JSON.stringify(this.detail.plan_hkwysx))
              break
            case 'HONGKONG_GD':
              result = JSON.parse(JSON.stringify(this.detail.plan_hkgd))
              break
            default:
              break
          }
          result.policy_birth = result.policy_birth.split(' ')[0]
          result.insurant_birth = result.insurant_birth.split(' ')[0]
          this.type = this.detail.insurance_type
          this.form = result

          // 状态为需复查时,可编辑
          this.view.editable = this.form.plan_status === 'REVIEW'
        } catch (e) {
          throw new Error(e)
        }
      },
      async getTemplate () {
        try {
          let result = await this.$http.get('/wx/itrade/product/plan/template', {
            insurance_type: this.detail.insurance_type,
            item_id: this.form.item_id,
            management_id: this.form.management_id,
          })
          result.yesno = [
            {value: 'Y', description: '是'},
            {value: 'N', description: '否'},
          ]
          this.template = result
        } catch (e) {
          throw new Error(e)
        }
      },

      // 撤销计划书申请
      async cancel () {
        try {
          let result = await this.$http.post('/wx/itrade/product/plan/cancel', {
            insurance_type: this.type,
            plan_id: this.form.plan_id,
          })
          console.log(result)
        } catch (e) {
          throw new Error(e)
        }
      },
      change (e) {
        console.log(e, 'eeeeeee')
      },
    },
    onUnload () {
      Object.keys(this.view).forEach(key => {
        this.view[key] = false
      })
      this.form = {}
    },
    components: {
      mxPicker,
    }
  }
</script>

<style scoped lang="scss">
  $mid-space: $small-space * 3;

  .status_info {
    background: #fff;
    padding: $middle-space $mid-space;
    @include flex(flex-start);
    order: 0;
    >img {
      flex-shrink:0;
    }
    .status {
      padding: 0 $middle-space;
      flex: 1;
      >span {
        font-size: 32px;
        color: $mainColor;
      }
      >p {
        font-size: 26px;
        color: #666;
        text-align:justify;
      }
      i {
        font-size: 24px;
        color: $lightColor;
      }
    }
    .preview {
      @include flex();
      @include size(165px, 56px);
      background: transparentize(#83c014, .8);
      color: #83c014;
      flex-shrink:0;
      border-radius: 4px;
      font-size: 24px;
    }
  }

  .container {
    font-family: '苹方';
    color: $deepColor;
    border-top: 1px solid transparent;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
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
        .operate {
          color: $mainColor;
          span:first-child {
            margin-right: $big-space;
            color: transparentize($mainColor, .2);
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
          @include flex(flex-end);
          >span {
            font-weight: bold;
          }
          input {
            flex: 1;
            text-align: right;
            font-size: 28px;
          }
          >picker {
            @include flex(flex-end, stretch);
            flex: 1;
            font-size: 28px;
            font-weight: 600;
            .picker {
              min-width: 50vw;
              min-height:30px;
              text-align: right;
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
              @include size(2em, 60px);
              border: 2px solid transparent;
              transition: all .3s;
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
      /*.item_container {
        height: 0;
        transition: all .5s;
        overflow-y: hidden;
      }*/
      .collapse {
        height: 90px;
        @include flex();
        color: $mainColor;
        border-top: 1px solid $borderColor;
        transition: all .3s;
        overflow: hidden;
      }
      .arrow {
        width: 0;
        height: 28px;
        transition: all .3s;
      }
      &.edit {
        .arrow {
          width: 15px;
          margin-left: $small-space;
        }
        .item .value .extract input {
          border-color:#666;
          width: 80px;
          border-radius: 8px;
        }
        .collapse {
          height: 0;
        }
      }

      .expand {
        height: 28px;
        width: 15px;
        transform: rotate(90deg);
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
      @include flex();
      span {
        display: block;
        border-radius: 15px;
        background: $mainColor;
        color: #fff;
        height: 100%;
        @include flex();
        font-size: 32px;
        flex: 1;
        &:first-child {
          background: #fff;
          border: 1px solid $borderColor;
          color: $deepColor;
          margin-right: $mid-space;
        }
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
    .time {
      color: $lightColor;
      @include flex();
      padding: $small-space;
      font-size: 24px;
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
