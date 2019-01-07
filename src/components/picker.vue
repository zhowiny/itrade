<template>
  <div class="mx-picker_container" :class="className">
    <picker @click="click" class="mx-picker" :disabled="disabled" :range="data" :range-key="label" :value="dataIndex" @change="change">
      <div class="mx-picker_none" v-if="(!dataIndex && dataIndex !== 0) || dataIndex === -1 || !current">{{placeholder}}</div>
      <div class="mx-picker_text" v-else>{{label ? current[label] : valueKey ? current[valueKey] : current}}</div>
    </picker>
  </div>
</template>

<script>
/**
 * mx-picker组件
 * 用法:
 * import mxPicker from '@/components/picker.vue'
 * <mx-picker @change="change" className='abc' placeholder='请选择' valueKey="id" label="name" :data="data" v-model="value"/>
 * data: [{name: 'a', id: 1}, {name: 'b', id: 2}]
 */

export default {
  name: 'mx-picker',
  props: {
    data: {
      // 一维数组或者对象数组 [1, 2, 3] or [{a: '1', b: '2', id: 1}, {a: '2', b: '3', id: 2}]
      type: Array,
      default: [],
    },
    className: String,
    placeholder: {
      type: String,
      default: '请选择',
    },
    valueKey: String,
    label: String,
    value: null,
    disabled: Boolean,
  },
  data () {
    return {
      current: undefined,
      dataIndex: undefined,
    }
  },
  watch: {
    value: function (newVal, oldVal) {
      if (oldVal) {
        this.init(newVal)
      }
    },
    data: function (newVal, oldVal) {
      this.init(this.value)
    }
  },
  created () {
    this.init(this.value)
  },
  methods: {
    click (e) {
      if (this.data.length === 0) {
        this.showToast('无可选值')
      }
    },
    init (val) {
      if (!this.valueKey) {
        this.dataIndex = this.data.indexOf(val)
        this.current = val
      } else {
        this.current = this.data.filter((i, index) => {
          if (i[this.valueKey] === val) {
            this.dataIndex = index
            return true
          }
        })[0]
        if (!this.current) {
          this.dataIndex = undefined
          // this.$emit('change', undefined)
          // this.$emit('input', undefined)
        }
      }
    },
    change (e) {
      this.dataIndex = e.mp.detail.value
      this.current = this.data[this.dataIndex]
      if (!this.current) return
      if (typeof this.current !== 'object') {
        this.$emit('input', this.current)
      } else {
        this.$emit('input', this.current[this.valueKey])
      }
      this.$emit('change', this.current)
    },
  },
}
</script>

<style scoped lang='scss'>
  .mx-picker_container {
    @include size(100%);
    align-self: stretch;
    flex: 1;
    text-align: right;
    @include flex();

    picker {
      @include flex(flex-end, stretch);
      flex: 1;
      font-size: 28px;
      font-weight: 600;
      .mx-picker_text {
        min-width: 50vw;
        min-height:28px;
        color: $deepColor;
      }
      .mx-picker_none {
        min-width: 50vw;
        color: #888;
        font-weight: normal;
      }
    }
  }
</style>
