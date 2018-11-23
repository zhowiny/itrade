/* eslint-disable */
'use strict';

var _relations;

var CHECKBOX_PATH = '../checkbox/index';
var behavior = require('../behaviors')

Component({
  externalClasses: ['class-name'],
  behaviors: [behavior],
  relations: (_relations = {}, _relations[CHECKBOX_PATH] = {
    type: 'child',
    linked: function linked() {
      this.updateChildren(CHECKBOX_PATH);
    }
  }, _relations),
  properties: {
    max: {
      type: Number,
      value: -1,
    },
    type: {
      type: String,
      value: 'checkbox',
    }
  },
  data: {
    elementUpdateTimeout: 0,
    groupId: 0,
    maxCount: -1,
    count: 0,
  },
  attached () {
    let groupId = 'group' + Math.random()
    if (this.data.type === 'radio') {
      this.setData({maxCount: 1})
    } else {
      this.setData({maxCount: this.data.max})
    }
    this.setData({groupId})
    this.$on('change',this.childChange.bind(this))
  },
  methods: {
    updateChildren: function updateChildren(childPath) {
      let elements = this.getRelationNodes(childPath);
      let count = 0
      elements.forEach((checkbox, index) => {
        checkbox.data.checked && count++
        checkbox.updateData({ isInGroup: true, groupId: this.data.groupId, isRadio: this.data.type === 'radio'})
      })
      this.setData({count})
    },
    clearChecked: function () {
      let elements = this.getRelationNodes(CHECKBOX_PATH)
      elements.forEach((checkbox, index) => {
        checkbox.updateData({checked: false})
      })
      this.setData({count: 0})
    },
    childChange: function (item, groupId) {
      let elements = this.getRelationNodes(CHECKBOX_PATH);
      let data = []
      elements.forEach(item => {
        item.data.checked && data.push(item.data.key)
      })
      this.setData({count: data.length})
      groupId === this.data.groupId && this.triggerEvent('change', data)
    }
  }
});
