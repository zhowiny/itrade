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
          <mx-picker @change="" :data="test" v-model="testVal"/>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">被保人姓名</span>
        <div class="value">
          <input type="text" placeholder-class="placeholder" placeholder="请输入">
        </div>
        <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">性别</span>
        <div class="value">
          <mx-picker @change="change" valueKey="id" label="name" :data="product" v-model="value"/>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item none">
        <span class="label">出生日期</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">国籍</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">居住地</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
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
      <div class="item">
        <span class="label">是否吸烟</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">保单回溯</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>

    <div class="module">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_4.png" mode="aspectFit" style="width:32rpx;height:32rpx;">
        <span class="title_text">投保人信息</span>
        <!--<img class="arrow" src="/images/icon_arrow_product.png">-->
      </div>
      <div class="item">
        <span class="label">投保人姓名</span>
        <div class="value">
          <input type="text" placeholder-class="placeholder" placeholder="请输入">
        </div>
        <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">性别</span>
        <div class="value">
          <mx-picker @change="change" valueKey="id" label="name" :data="product" v-model="value"/>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item none">
        <span class="label">出生日期</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">国籍</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">居住地</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
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
      <div class="item">
        <span class="label">是否吸烟</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>

    <div class="btn_next" @click="showConfirm = true">
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
        test: [1, 2, 3, 4],
        testVal: 1,
        product: [{id: 1, name: 'qwer'}, {id: 2, name: 'ssss'}],
        value: 1,

        template: {},
        insurance: {},
        policy: {},

        params: {},
        insuranceType: '',
      }
    },

    async onLoad (options) {
      Object.keys(options).forEach(key => {
        options[key] = decodeURIComponent(options[key])
      })
      let result = qs.parse(options)
      this.insuranceType = result.insurance_type
      this.params = result.params
      console.log(result)
    },
    methods: {
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
      change (e) {
        console.log(e, this.value, 'change---')
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
