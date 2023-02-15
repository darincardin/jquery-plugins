"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var util = {
  defaults: {
    array: [],
    index: 1
  },
  functions: {
    segLength: function segLength() {
      return 100 / this.props.array.length;
    },
    highlightWidth: function highlightWidth() {
      return this.props.index * this.segLength() - this.segLength() / 2 + '%';
    },
    activeStatus: function activeStatus(i) {
      return i + 1 <= this.props.index ? 'active' : '';
    }
  }
};
var _default = util;
exports["default"] = _default;