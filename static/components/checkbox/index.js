/* eslint-disable */
'use strict';

var _relations;

var CHECKBOX_GROUP_PATH = '../checkbox-group/index';
var behavior = require('../behaviors')

Component({
  externalClasses: ['class-name'],
  behaviors: [behavior],
  relations: (_relations = {}, _relations[CHECKBOX_GROUP_PATH] = {
    type: 'parent'
  }, _relations),

  properties: {
    checked: Boolean,
    disabled: Boolean,
    isInGroup: Boolean,
    labelDisabled: Boolean,
    type: String,
    key: String,
  },

  data: function data() {
    return {
      isInGroup: false,
      isInCell: false,
      groupId: 0,
    };
  },


  methods: {
    handleClick: function handleClick(e) {
      let parent = this.getRelationNodes(CHECKBOX_GROUP_PATH)[0]
      if (this.data.disabled) return
      if (this.data.isInGroup && parent) {
        if (parent.data.type === 'radio') parent.clearChecked()
        if (parent.data.maxCount > 0 && parent.data.count >= parent.data.maxCount && !this.data.checked) return
      }
      let checked = !this.data.checked;
      let data = {index: this.dataset.index, checked, key: this.data.key}
      this.setData({ checked: checked }, () => {
        this.triggerEvent('change', data);
        this.data.isInGroup && this.$emit('change', data, this.data.groupId)
      })
    },
    updateData: function updateData(data) {
      this.setData(data);
    }
  }
});
