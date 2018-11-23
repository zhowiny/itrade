<template>
  <div class="select-container" :class="className" >
    <div class="select-input" @click="showOptions = !showOptions">
      <input :value="meaning" type="text" disabled :placeholder="placeholder" placeholder-style="color: #ccc;">
      <img class="icon" :class="{actived: showOptions}" src="/images/icon_arrow.png" mode="aspectFit" style="width: 24rpx;height:16rpx;">
    </div>
    <ul class="select-options" :class="{actived: showOptions}">
      <li v-for="(item, index) in data" :class="{selected: selected === item[valueKey || 'value']}" :key="index" @click="onSelecte(item)">{{item[label]}}</li>
    </ul>
    <div class="select-mask" v-show="showOptions" @click="hideOptions"></div>
  </div>
</template>

<script>
  export default {
    name: 'select',
    props: {
      data: {
        type: Array,
        required: true,
      },
      className: null,
      placeholder: {
        type: String,
        default: '请选择'
      },
      valueKey: String,
      label: String,
      value: null,
    },
    data () {
      return {
        showOptions: false,
        selected: '',
        meaning: '',
      }
    },
    watch: {
      data: function (val) {
        val.map(item => {
          if (this.value === item[this.valueKey]) {
            this.meaning = item[this.label]
          }
        })
      }
    },
    created () {
      this.selected = this.value
      this.data.map(item => {
        if (this.value === item[this.valueKey]) {
          this.meaning = item[this.label]
        }
      })
    },
    methods: {
      onSelecte (item) {
        // console.log(item, this)
        this.selected = item[this.valueKey]
        this.meaning = item[this.label || this.valueKey]
        this.$emit('input', this.selected)
        this.$emit('change', item)
        this.hideOptions()
      },
      hideOptions () {
        this.showOptions = false
      }
    },
  }
</script>

<style scoped lang='scss'>
  .select-container {
    position: relative;
    @include size(100%, 100%);
    .select-input {
      @include size(inherit);
      @include flex(space-between);
      // font-size: $htmlsize;
      // border-bottom: 1px solid $borderColor;
      input {
        flex: 1;
      }
      .icon {
        transition: all .3s;
        transform:rotate(90deg);
        &.actived {
          transform: rotate(-90deg);
        }
      }
    }
    .select-options {
      position: absolute;
      z-index: 100;
      left: 0;
      width:100%;
      border-radius:10px;
      color: $deepColor;
      box-shadow: 0 0 15px -3px $mainColor;
      background: #fff;
      transition: transform .2s linear, opacity .2s linear;
      transform-origin: top center;
      transform: scale3d(1, 0, 1);
      opacity: .3;
      max-height: 500px;
      overflow-y:scroll;
      li {
        padding: $small-space $middle-space;
        &:not(:last-child) {
          border-bottom: 1rpx solid $borderColor;
        }
        &.selected {
          color: $mainColor;
        }
      }
      &.actived {
        transform: scale3d(1, 1, 1);
        opacity: 1;
      }
    }
    .select-mask {
      position: fixed;
      z-index: 99;
      top:0;
      left:0;
      background: rgba(0,0,0,0);
      @include size(100%);
    }
  }
</style>
