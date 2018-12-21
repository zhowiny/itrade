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
          <mx-picker @change="" :data="test" v-model="testVal"/>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">产品名称</span>
        <div class="value">
          <mx-picker @change="change" valueKey="id" label="name" :data="product" v-model="value"/>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item none">
        <span class="label">年期</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">缴费方式</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">金额类型</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">缴费币种</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">金额</span>
        <div class="value">
          <input type="text" placeholder-class="placeholder" placeholder="请输入">
        </div>
        <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">附加险</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">是否提取</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">高端医疗</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>

    <div class="module" v-for="(item, index) in [1, 2]" :key="index">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_1.png" mode="aspectFit" style="width:32rpx;height:35rpx;">
        <span class="title_text">附加险信息</span>
        <img v-if="index > 0" src="/images/icon_sub.png" style="width: 39rpx;height: 39rpx;">
        <img v-else="index > 0" src="/images/icon_add.png" style="width: 39rpx;height: 39rpx;">
      </div>
      <div class="item">
        <span class="label">附加险</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item textarea">
        <span class="label">附加险备注 (选填)</span>
        <div class="value">
          <textarea placeholder-class="placeholder" placeholder="请输入" maxlength="-1" auto-height></textarea>
        </div>
      </div>
    </div>

    <div class="module">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_2.png" mode="aspectFit" style="width:36rpx;height:32rpx;">
        <span class="title_text">添加提取</span>
      </div>
      <div class="item">
        <span class="label">提取类型</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">提取方式</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div v-for="(item, index) in [1, 2, 3]" :key="index">
        <div class="item">
          <span class="label">提取年数</span>
          <div class="value">
            <div class="extract">
              从第 <input type="text" value="1"> 年到第 <input type="text" vlaue="10"> 年
            </div>
          </div>
          <img v-if="index > 0" src="/images/icon_sub.png" style="width: 39rpx;height: 39rpx;">
          <img v-else="index > 0" src="/images/icon_add.png" style="width: 39rpx;height: 39rpx;">
        </div>
        <div class="item">
          <span class="label">提取金额</span>
          <div class="value">
            <input type="text" placeholder-class="placeholder" placeholder="请输入">
          </div>
          <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
        </div>
      </div>
    </div>

    <div class="module">
      <div class="title">
        <img class="title_icon" src="/images/icon_plan_3.png" mode="aspectFit" style="width:31rpx;height:36rpx;">
        <span class="title_text">添加高端医疗</span>
      </div>
      <div class="item">
        <span class="label">提取方式</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">保障级别</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">保障地区</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">自付选项</span>
        <div class="value">
          <mx-picker />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
    </div>
    <div class="module">
      <div class="item textarea">
        <span class="label">其他备注 (选填)</span>
        <div class="value">
          <textarea placeholder-class="placeholder" placeholder="请输入" maxlength="-1" auto-height></textarea>
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
        test: [1, 2, 3, 4],
        testVal: 1,
        product: [{id: 1, name: 'qwer'}, {id: 2, name: 'ssss'}],
        value: 1,
      }
    },

    async onLoad () {
    },
    methods: {
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
