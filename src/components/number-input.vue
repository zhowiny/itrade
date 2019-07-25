<template>
    <input ref="number_input"
           :disabled="disabled"
           @change="$emit('change', $event)"
           @focus="$emit('focus', $event)"
           @blur="$emit('blur', $event)"
           v-model="currentValue"
           :max="currentMax"
           :min="currentMin"
           :type="type"
           :placeholder="placeholder"
 
    />
</template>

<script>
  export default {
    name: 'number_input',
    props: {
      value: [String, Number],
      disabled: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'number',
      },
      placeholder: {
        type: String,
        default: '请输入数字, 可保留两位小数',
      },
      keepDigit: {
        type: String,
        default: '2',
      },
      max: Number,
      min: Number,
    },
    data () {
      return {
        currentValue: this.value,
      }
    },
    computed: {
      currentMax () {
        return (this.type === 'number') ? undefined : this.max
      },
      currentMin () {
        return (this.type === 'number') ? undefined : this.min
      }
    },
    watch: {
      currentValue (val, oldVal) {
        // 调用filter过滤数据
        let formattedValue = this.filter(val)
        if (this.type === 'number') {
          formattedValue = this.typeNumberFilter(formattedValue, oldVal)
        }
        if (val !== formattedValue || val === '') {
          setTimeout(() => {
            this.currentValue = formattedValue
          }, 0)
        }
        this.$emit('input', formattedValue)
      },
      value (value) {
        this.currentValue = value
      },
    },
    mounted () {
      if (this.type === 'number') {
        const inputEle = this.$refs.number_input
        inputEle.onkeydown = (e) => {
          const keyCode = e.keyCode
          if (!this.isBackspace(keyCode) && !this.isNumber(keyCode) && (this.keepDigit === '0' || !this.isDot(keyCode))) {
            // 其他按键
            e.preventDefault()
            e.stopPropagation()
            return false
          }
        }
      }
    },
    methods: {
      filter (value) {
        let formattedValue = ''
        let rex = new RegExp(`^([1-9]\\d*(\\.[\\d]{0,${this.keepDigit}})?|0(\\.[\\d]{0,${this.keepDigit}})?)[\\d.]*`)
        const match = value.match(rex)
        if (match) {
          formattedValue = match[1]
        }
        return formattedValue
      },
      typeNumberFilter (val, v) {
        const oldVal=v.toString()
        const inputEle = this.$refs.number_input
        let formattedValue = val
        // 由于type=number不支持maxLength，用slice模拟
        if (formattedValue.length > this.max) {
          formattedValue = formattedValue.slice(0, this.max)
        }
        if (formattedValue === '' && inputEle.value === '' && oldVal && oldVal.match(/^(\d)[\d.]+/)) {
          formattedValue = oldVal
        }
        setTimeout(() => {
          inputEle.value = formattedValue
        }, 0)
        return formattedValue
      },
      isBackspace (keyCode) {
        return keyCode === 8
      },
      isDot (keyCode) {
        const codeList = [46, 110, 190]
        return this.currentValue.toString().length > 0 && !this.hasDot() && (~codeList.indexOf(keyCode))
      },
      hasDot () {
        return !!~this.currentValue.toString().indexOf('.')
      },
      isNumber (keyCode) {
        return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)
      },
    },
  }
</script>

<style scoped lang='scss'>

</style>
