<template>
  <div class="container">
    <div class="status_info">
      <!--处理中图标-->
      <img src="/images/icon_plan_detail_1.png" mode="aspectFit" style="width: 100rpx;height: 97rpx;">
      <!--需复查图标-->
      <img v-if="false" src="/images/icon_plan_detail_2.png" mode="aspectFit" style="width: 117rpx;height: 99rpx;">
      <!--成功图标-->
      <img v-if="false" src="/images/icon_plan_detail_3.png" mode="aspectFit" style="width: 93rpx;height: 93rpx;">
      <!--失败图标-->
      <img v-if="false" src="/images/icon_plan_detail_4.png" mode="aspectFit" style="width: 99rpx;height: 99rpx;">

      <div class="status">
        <span>处理中</span>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <i>提交时间: 2018-12-25 12:00</i>
      </div>
      <!--成功才显示-->
      <div class="preview" v-if="false">
        <img src="/images/icon_preview.png" mode="aspectFit" style="width:33rpx;height:25rpx;">
        <span>点击预览</span>
      </div>
    </div>
    <div class="module" :class="{edit: edit}">
      <div class="title">
        <img class="title_icon" src="/images/icon_product_info.png" mode="aspectFit" style="width:41rpx;height:37rpx;">
        <span class="title_text">产品信息</span>
        <div class="operate" v-if="edit">
          <span @click="edit = false">取消</span>
          <span @click="edit = false">保存</span>
        </div>
        <img  @click="edit = true" v-else src="/images/icon_edit.png" style="width: 33rpx;height:34rpx;">
      </div>
      <div class="item">
        <span class="label">产品公司</span>
        <div class="value">
          <mx-picker :disabled="!edit" @change="" :data="test" v-model="testVal"/>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">产品名称</span>
        <div class="value">
          <mx-picker :disabled="!edit" @change="change" valueKey="id" label="name" :data="product" v-model="value"/>
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item none">
        <span class="label">年期</span>
        <div class="value">
          <mx-picker :disabled="!edit" />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">缴费方式</span>
        <div class="value">
          <mx-picker :disabled="!edit" />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">金额类型</span>
        <div class="value">
          <mx-picker :disabled="!edit" />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">缴费币种</span>
        <div class="value">
          <mx-picker :disabled="!edit" />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">金额</span>
        <div class="value">
          <input :disabled="!edit" type="text" placeholder-class="placeholder" placeholder="请输入">
        </div>
        <img v-if="false" class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">附加险</span>
        <div class="value">
          <mx-picker :disabled="!edit" />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">是否提取</span>
        <div class="value">
          <mx-picker :disabled="!edit" />
        </div>
        <img class="arrow" src="/images/icon_arrow_product.png">
      </div>
      <div class="item">
        <span class="label">高端医疗</span>
        <div class="value">
          <mx-picker :disabled="!edit" />
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
    <div class="module" :class="{edit: edit}">
      <div class="title" @click="!expand && (expand = true)">
        <img class="title_icon" src="/images/icon_plan_4.png" mode="aspectFit" style="width:32rpx;height:32rpx;">
        <span class="title_text">被保人信息</span>
        <img class="arrow expand" v-if="!expand" src="/images/icon_arrow_product.png">
        <div class="operate" v-if="expand && edit">
          <span @click="edit = false">取消</span>
          <span @click="edit = false">保存</span>
        </div>
        <img  @click="edit = true" v-if="expand && !edit" src="/images/icon_edit.png" style="width: 33rpx;height:34rpx;">
      </div>
      <div class="item_container" v-if="expand"><!-- :style="{height: expand ? '990rpx' : 0}"-->
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
        <div class="collapse" @click="expand = false">
          <span>收起</span>
          <img src="/images/icon_collapse.png" mode="aspectFit" style="width: 26rpx;height: 16rpx;">
        </div>
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
    <p class="time">提交时间: 2018-12-24 17:23</p>

    <div class="btn_next">
      <span>撤销申请</span>
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
        detail: {},
        edit: false,
        expand: false,
        showConfirm: false,
        test: [1, 2, 3, 4],
        testVal: 1,
        product: [{id: 1, name: 'qwer'}, {id: 2, name: 'ssss'}],
        value: 1,
      }
    },

    async onLoad () {
      this.getDetail()
    },
    methods: {
      async getDetail () {
        this.detail = await this.$http.get('/wx/itrade/product/plan/detail', {
          planId: 1
        })
        console.log(this.detail)
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

  .status_info {
    background: #fff;
    padding: $middle-space $mid-space;
    @include flex();
    >img {
      flex-shrink:0;
    }
    .status {
      padding: 0 $middle-space;
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
