<template>
  <div class="number">
    <p class="number-btn" @click="_reduce">-</p>
    <input class="number-input" type="number" :value="value" maxlength="10" @input="_input" :style='"color: "+color' :disabled="disabled">
    <p class="number-btn" @click="_add">+</p>
  </div>
</template>

<script>
  export default {
    name: 'number',
    props: {
      min: {
        type: Number,
        required: false,
        default: 10000
      },
      max: {
        type: Number,
        required: false,
        default: 1000000000
      },
      value: {
        type: Number,
        required: false,
        default: 10000
      },
      increase: {
        type: Number,
        required: false,
        default: 5000
      },
      color: {
        type: String,
        required: false,
        default: '#000000'
      },
      disabled: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data () {
      return {

      }
    },
    created () {
    },
    mounted () {
      this.$emit('change', this.value)
    },
    methods: {
      _input (e) {
        console.log(e)
        let num = parseInt(e.mp.detail.value || this.min)
        this.value = num
        this.$emit('change', this.value)
      },
      _add () {
        let num = parseInt(this.value) + this.increase
        num >= this.max ? this.value = this.max : this.value = num
        this.$emit('change', this.value)
      },
      _reduce () {
        let num = parseInt(this.value) - this.increase
        num <= this.min ? this.value = this.min : this.value = num
        this.$emit('change', this.value)
      },
    },
    components: {
    },
  }
</script>

<style lang="scss" scoped>
  .number {
    width: 100%;
    background: #ffffff;
    @include flex(flex-start, center);
    &-input{
      height: 60rpx;
      flex: 1;
      text-align: center;
    }
    &-btn{
      width: 60rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      color: #e6a23c;
      border: 1px solid $borderColor;
      border-radius: $default-border-radius;
    }
  }
</style>
