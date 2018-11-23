/* eslint-disable no-undef */
let event = {}
module.exports = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    }
  },
  // data: {
  //   event: {}
  // },
  attached: function () {
  },
  methods: {
    $emit: function (...arg) {
      let type = arg[0]
      let eventList = event[type]
      if (!eventList || eventList.length === 0) return
      eventList.map((fn) => {
        fn.apply(this, arg.slice(1))
      })
    },
    $on: function (eventName, fn) {
      // let event = this.data.event
      if (!event[eventName]) {
        event[eventName] = []
      }
      event[eventName].push(fn)
      this.setData({event})
    },
    $once: function (eventName, fn) {
      if (!event[eventName]) {
        event[eventName] = [fn]
      }
      this.setData({event})
    }
  }
})
