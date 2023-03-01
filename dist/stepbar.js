"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HTML = "\n\t<div class=\"step-bar\" > \n\t\t<div class=\"step-highlight\" ></div>\n\t\t<ul></ul>\n\t</div> \t";
var defaults = {
  array: [],
  index: 1
};
var StepBar = /*#__PURE__*/_createClass(function StepBar(elem, opts) {
  var _this = this;
  _classCallCheck(this, StepBar);
  _defineProperty(this, "elem", null);
  _defineProperty(this, "props", null);
  _defineProperty(this, "render", function () {
    _this.updateBar();
    _this.props.array.forEach(function (v, i) {
      var li = $("<li>").html(v.label || v);
      li.css('width', _this.segLength() + '%');
      li.attr('class', _this.activeStatus(i));
      _this.elem.find('ul').append(li);
    });
  });
  _defineProperty(this, "update", function () {
    _this.updateBar();
    _this.props.array.forEach(function (v, i) {
      var li = $("li:nth-child(".concat(i + 1, ")"));
      li.attr('class', _this.activeStatus(i));
    });
  });
  _defineProperty(this, "updateBar", function () {
    _this.elem.find('.step-highlight').css('width', _this.highlightWidth());
  });
  _defineProperty(this, "next", function () {
    var i = _this.props.index < _this.props.array.length ? ++_this.props.index : 1;
    _this.set(i);
  });
  _defineProperty(this, "set", function (v) {
    _this.props.index = v;
    _this.update();
  });
  _defineProperty(this, "segLength", function () {
    return 100 / this.props.array.length;
  });
  _defineProperty(this, "highlightWidth", function () {
    return this.props.index * this.segLength() - this.segLength() / 2 + '%';
  });
  _defineProperty(this, "activeStatus", function (i) {
    return i + 1 <= this.props.index ? 'active' : '';
  });
  this.elem = elem;
  this.props = $.extend(true, {}, defaults, opts);
  this.elem.html(HTML);
  this.render();
});
$.fn.stepbar = function (opts) {
  return new StepBar(this, opts);
};