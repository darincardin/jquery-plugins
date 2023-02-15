"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var util = {
  defaults: {
    allowDupes: false
  },
  functions: {
    onEnter: function onEnter(e) {
      if (e.key == "Enter") this.onAdd();
    },
    throwRequiredError: function throwRequiredError() {
      throw new Error("Tokenizer: tokens option required!");
    },
    isValid: function isValid(v) {
      if (v == undefined || v == "") return false;
      if (this.props.allowDupes) return true;
      return !this.props.tokens.includes(v);
    },
    getAddBtn: function getAddBtn() {
      return "<button type=\"text\" class=\"btn btn-primary\" >\n\t\t\t\t\t\t<span>Add</span><i className=\"glyphicon glyphicon-ban-circle\"></i>\n\t\t\t        </button>";
    },
    getToken: function getToken(v) {
      return "<span  class=\"token\" >\n\t\t\t\t\t\t\t<span>".concat(v, "</span>\n\t\t\t\t\t\t\t<i class=\"close-btn glyphicon glyphicon-remove\" >X</i> \n\t\t\t\t\t </span>");
    }
  }
};
var _default = util;
exports["default"] = _default;