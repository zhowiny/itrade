<template>
  <div class="wx-badge">
    <slot></slot>
    <sup
      v-if="!isHidden && (content || content === 0 || isDot)"
      v-text="content"
      class="badge__content" :style="position"
      :class="{ 'is-fixed': fixed, 'is-dot': isDot }">
    </sup>
  </div>
</template>

<script>
  export default {
    name: 'badge',
    props: {
      value: {},
      max: Number,
      isDot: Boolean,
      isHidden: Boolean,
      fixed: {
        default: true
      },
      position: String
    },
    computed: {
      content () {
        if (this.isDot) return
        const value = this.value
        const max = this.max
        if (typeof value === 'number' && typeof max === 'number') {
          return max < value ? `${max}+` : value
        }
        return value
      }
    },
    // created () {
    //   console.log(this)
    // }
  }
</script>

<style scoped>

  .wx-badge {
    position: relative;
    vertical-align: middle;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .badge__content {
    background-color: #f56c6c;
    border-radius: 15px;
    color: #fff;
    display: inline-block;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    padding: 0 8px;
    text-align: center;
    white-space: nowrap;
    letter-spacing: 1px;
    /*width:30px;*/
    font-weight:bold;
    /*border: 1px solid #fff;*/
  }

  .badge__content.is-fixed {
    position: absolute;
    top: 0;
    right: 10px;
    transform: translateY(-50%) translateX(100%);
  }

  .badge__content.is-dot {
    height: 8px;
    width: 8px;
    padding: 0;
    right: 0;
    border-radius: 50%;
  }

  .badge__content.is-fixed.is-dot {
    right: 5px;
  }
</style>
