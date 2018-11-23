<template>
    <div class="calendar">
      <div class="calendar-title">
        <div @click="preMonth">
          <image mode="aspectFit" src="/images/icon_left.png" style="width: 32rpx;height:32rpx"></image>
        </div>
        <p @click="showMonth">{{year}}年{{month}}月</p>
        <div @click="nextMonth">
          <image mode="aspectFit" src="/images/icon_left.png" style="width: 32rpx;height:32rpx;transform: rotate(180deg)"></image>
        </div>
        <div class="month-list" v-if="monthVisible">
          <span v-for="(item, index) in monthList" :key="index" @click="selecteMonth(index)" :class="{selected: item === month}">{{item}}月</span>
        </div>
        <div class="year-list" v-if="yearVisible">
          <span @click="yearList = yearList.map(v => v - 10)">
            <image mode="aspectFit" src="/images/icon_double_arrow.png" style="width: 32rpx;height:32rpx;transform: rotate(180deg)"></image>
          </span>
          <span @click="yearList = yearList.map(v => v + 10)">
            <image mode="aspectFit" src="/images/icon_double_arrow.png" style="width: 32rpx;height:32rpx;"></image>
          </span>
          <span v-for="(item, index) in yearList" :key="index" @click="selecteYear(item)" :class="{selected: item === year}">{{item}}</span>
        </div>
      </div>
      <div class="calendar-weeks">
        <div v-for="(item, index) in weeks" :key="index">{{item}}</div>
      </div>
      <div class="calendar-days">
        <div v-for="(item, index) in days"
             :key="index" class="day"
             :class="{
               selected: item.selected,
               preMonth: index < 7 && item.day > 7,
               nextMonth: index > 28 && item.day < 15,
               today: item.isToday,
               hasData: item.hasData,
             }"
             @click="selectedDay(item, index)"
        ><span>{{item.day}}</span></div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'calendar',
    props: {
      data: {
        type: Array,
      },
      date: {
        default: new Date()
      },
      connector: {
        type: String,
        default: '/'
      }
    },
    data () {
      return {
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        days: [],
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth(),
        selectedTime: this.format(new Date()),
        monthList: Array.apply(null, {length: 12}).map((v, k) => {
          return k + 1
        }),
        yearList: Array.apply(null, {length: 10}).map((v, k) => {
          return new Date().getFullYear() + k
        }),
        monthVisible: false,
        yearVisible: false,
      }
    },
    computed: {
      dataList () {
        return this.data.map(i => this.format(i))
      },
      month () {
        let calendarMonth = new Date().setFullYear(this.selectedYear, this.selectedMonth, 1)
        return new Date(calendarMonth).getMonth() + 1
      },
      year () {
        let calendarMonth = new Date().setFullYear(this.selectedYear, this.selectedMonth, 1)
        return new Date(calendarMonth).getFullYear()
      },
    },
    watch: {
      date: function (val) {
        this.setDate(val)
      },
      data: function (val) {
        this.setDate(this.date || new Date())
      }
    },
    created () {
      this.setDate(this.date || new Date())
    },
    methods: {
      setDate (date) {
        this.selectedYear = this.stringTransformDate(date).getFullYear()
        this.selectedMonth = this.stringTransformDate(date).getMonth()
        this.selectedTime = this.format(date)
        this.initDatePicker()
      },
      initDatePicker () {
        // 初始化日历
        let days = []
        let calendarMonth = new Date().setFullYear(this.selectedYear, this.selectedMonth, 1) // 当前显示的月份
        let startDay = new Date(new Date(calendarMonth).setDate(1 - new Date(calendarMonth).getDay())) // 当前日历的第一格的日期
        Array.apply(null, {length: 42}).map((value, index) => {
          let blockTime = new Date(startDay.getTime() + index * 24 * 60 * 60 * 1000) // 每一格中对应的时间
          days.push({
            day: blockTime.getDate(),
            date: this.format(blockTime),
            selected: this.format(blockTime) === this.selectedTime,
            isToday: this.format(blockTime) === this.format(new Date()),
            hasData: this.dataList.includes(this.format(blockTime))
          })
        })
        this.days = days
      },
      selectedDay (item, index) {
        this.selectedTime = item.date
        this.days.map((v, i) => {
          this.$set(v, 'selected', false)
        })
        this.$set(this.days[index], 'selected', true)
        this.$emit('selected', item) // 向父组件派发selected事件
        if (item.day > 7 && index < 7) {
          this.preMonth()
        } else if (item.day < 15 && index > 28) {
          this.nextMonth()
        }
        this.monthVisible = false
        this.yearVisible = false
      },
      selecteMonth (month) {
        this.selectedMonth = month
        this.selectedYear = this.year
        this.initDatePicker()
      },
      selecteYear (year) {
        this.selectedMonth = (this.month - 1)
        this.selectedYear = year
        this.monthVisible = false
        this.yearVisible = false
        this.initDatePicker()
      },
      nextMonth () {
        // 下一个月
        this.monthVisible = false
        this.yearVisible = false
        this.selectedMonth++
        this.initDatePicker()
      },
      preMonth () {
        // 上一个月
        this.monthVisible = false
        this.yearVisible = false
        this.selectedMonth--
        this.initDatePicker()
      },
      showMonth () {
        if (this.monthVisible) {
          this.monthVisible = false
          this.yearVisible = true
          return
        }
        if (this.yearVisible) {
          this.monthVisible = false
          this.yearVisible = false
          return
        }
        this.monthVisible = true
      },
      formatNumber (n) {
        const str = n.toString()
        return str[1] ? str : `0${str}`
      },
      format (time, connector) {
        let date = time
        if (typeof date === 'string') {
          date = this.stringTransformDate(time)
        }
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(this.formatNumber).join(connector || this.connector)
      },
      stringTransformDate (str) {
        if (typeof str === 'object' && 'toDateString' in str) return str
        if (~str.indexOf('/')) {
          let a = [...str.split('/')]
          return new Date(new Date().setFullYear(a[0], a[1] - 1, a[2]))
        } else if (~str.indexOf('-')) {
          let a = [...str.split('-')]
          return new Date(new Date().setFullYear(a[0], a[1] - 1, a[2]))
        } else {
          throw new Error('时间格式不对! yyyy-mm-dd或者yyyy/mm/dd')
        }
      },
    }
  }
</script>

<style scoped lang='scss'>
.calendar {
  background: #fff;
  &-title {
    position: relative;
    background: $mainColor;
    @include flex();
    font-size: 32px;
    color: #fff;
    padding: $middle-space 0;
    p {
      padding: 0 $small-space;
    }
    div {
      width: 50px;
      @include flex();
    }
    .month-list, .year-list {
      width:260px;
      position:absolute;
      background:#fff;
      color: $mainColor;
      flex-wrap:wrap;
      top:100%;
      text-align:center;
      box-shadow:0 0 5px;
      z-index:10;
      span {
        width: calc(50% - 1px);
        padding: $small-space 0;
        border-bottom: 1px solid lighten($mainColor, 20%);
        transition: background .3s;
      }
      span:nth-child(odd) {
        border-right: 1px solid lighten($mainColor, 20%);
      }
      span:nth-child(11), span:last-child {
        border-bottom: none;
      }
      span.selected {
        background: $mainColor;
        color: #fff;
      }
    }
  }
  &-weeks {
    @include flex();
    background: $mainColor;
    color: #fff;
    font-size: 24px;
    padding: $middle-space 0;
    text-align: center;
    div {
      flex: 1;
    }
  }
  &-days {
    @include flex();
    flex-wrap: wrap;
    text-align: center;
    padding: $middle-space 0;
    .day {
      position: relative;
      width: calc(100% / 7);
      @include flex();
      padding: $small-space / 2 0;
      span {
        @include size(72px);
        @include flex();
        color: $deepColor;
        background: transparent;
        transition: all .3s;
        border-radius: 50%;
      }
      &.preMonth span, &.nextMonth span{
        color: #aaa;
      }
      &.today span {
        color: #fff;
        background: #aaa;
      }
      &.selected span{
        color: #fff;
        background: $mainColor;
      }
      &.hasData:before {
        content: '';
        @include size(10px);
        border-radius: 50%;
        background: red;
        @include center(20%);
      }
      &.hasData:after {
        content: '';
        @include size(32px, 4px);
        background: $mainColor;
        @include center(50%, auto);
        bottom: 0;
      }
    }
  }
}
</style>
