<template>
  <button
    class="mx-button"
    hover-class="hover"
    :hover-start-time="0"
    :hover-stay-time="0"
    :open-type="openType"
    :loading="loading"
    :disabled="disabled || loading"
    :class="[
      type ? 'button--' + type : '',
      size ? 'button--' + size : '',
      {
        'is-disabled': disabled,
        'is-plain': plain,
        'is-round': round,
      }
    ]"
    @click="handleClick"
    @getuserinfo="handleClick"
    @contact="handleClick"
    @getphonenumber="handleClick"
    @error="handleClick"
    @opensetting="handleClick"
  >
    {{text}}
  </button>
</template>
<script>
  export default {
    name: 'mx-button',
    props: {
      text: String,
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      round: Boolean,
      'open-type': String,
      'form-type': String,
    },
    methods: {
      handleClick (evt) {
        if (evt.type === 'tap') {
          this.$emit('click', evt.mp)
        } else {
          this.$emit('handleEvent', evt.mp)
        }
      }
    }
  }
</script>

<style scoped lang='scss'>
  @mixin common($color: $mainColor) {
    color: #fff;
    background: $color;
    border-color: $color;
    &.hover {
      background: transparentize($color, 0.1);
    }
  }
  @mixin is-plain($color: $mainColor) {
    color: $color;
    background: transparentize($color, 0.9);
    border-color: $color;
    &.hover {
      background: $color;
      color: #fff;
    }
  }
  @mixin is-disabled($color: $mainColor) {
    color: #fff;
    background: transparentize($color, 0.5);
    border-color: transparentize($color, 0.5);
    &.is-plain {
      color: transparentize($color, 0.5);
      background: transparentize($color, 0.8);
      border-color: transparentize($color, 0.5);
    }
  }
  @mixin button-style($color: $mainColor) {
    @include common($color);
    &.is-plain {
      @include is-plain($color);
    }
    &.is-disabled {
      @include is-disabled($color);
    }
  }
  .mx-button {
    border: 1px solid #dcdfe6;
    width:100%;
    max-height: 100px;
    margin:0;
    line-height:1.5;
    padding: $middle-space;
    font-size:36px;
    &::after {
      content: '';
      border: none;
    }
    &.button--default {
      color: #606266;
      background: #fff;
      &.hover {
        border-color: $mainColor;
        color: $mainColor;
        background: transparentize($mainColor, 0.9);
      }
      &.is-plain {
        &.hover {
          background: #fff;
        }
      }
      &.is-disabled {
        color: #c0c4cc;
        background: #fff;
        border-color: #ebeef5;
      }
    }
    &.button--primary {
      @include button-style();
    }
    &.button--success {
      @include button-style(#67c23a);
    }
    &.button--info {
      @include button-style(#909399);
    }
    &.button--warning {
      @include button-style(#e6a23c);
    }
    &.button--danger {
      @include button-style(#f56c6c);
    }
    &.is-round {
      border-radius: 50px;
    }
    &.button--medium {
      display:inline-flex;
      font-size: 30px;
      padding: 17px $big-space;
      width:auto;
    }
    &.button--small {
      display:inline-flex;
      font-size: 26px;
      padding: 16px $middle-space;
      width:auto;
    }
    &.button--mini {
      display:inline-flex;
      font-size: 24px;
      padding: $small-space $middle-space;
      width:auto;
    }
  }

</style>
