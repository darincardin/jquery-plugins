"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* Converts a number into an array of individual digits */
Number.prototype.toArray = function () {
  return this.toString().split('').map(function (i) {
    return parseInt(i);
  });
};

/* Converts an array of strings to a single number  */
Array.prototype.toNumber = function () {
  return parseInt(this.join(""));
};
var defaults = {
  length: 5,
  setTime: 12345,
  increment: 1
};
var Counter = /*#__PURE__*/_createClass(function Counter(element, opts) {
  var _this2 = this;
  _classCallCheck(this, Counter);
  _defineProperty(this, "main", null);
  _defineProperty(this, "opts", null);
  _defineProperty(this, "counters", null);
  _defineProperty(this, "setTime", function (v) {
    var counterArr = v.toArray();
    for (var i = _this2.opts.length - 1; i >= 0; i--) {
      var newValue = counterArr.pop() || 0;
      if (_this2.counters[i] != newValue) {
        _this2.counters[i] = newValue;
        _this2.animate(i, newValue);
      }
    }
  });
  _defineProperty(this, "increment", function () {
    var value = _this2.counters.toNumber();
    value += _this2.opts.increment;
    _this2.setTime(value);
  });
  _defineProperty(this, "animate", function (i, newValue) {
    var _this = _this2;
    _this2.main.find(".".concat(i)).prepend(newValue + " ").addClass('out');
    setTimeout(function () {
      _this.main.find(".".concat(i)).html(newValue).removeClass('out');
    }, 100);
  });
  _defineProperty(this, "set", function (v) {
    _this2.setTime(v);
  });
  _defineProperty(this, "clear", function (v) {
    _this2.setTime(0);
  });
  _defineProperty(this, "reset", function (v) {
    _this2.setTime(_this2.opts.setTime);
  });
  this.opts = $.extend(true, {}, defaults, opts);
  this.counters = new Array(this.opts.length);
  this.main = $(element).addClass('counter');
  var _counterArr = this.opts.setTime.toArray();
  for (var _i = 0; _i < this.opts.length; _i++) {
    this.counters[_i] = _counterArr[_i] || 0;
    this.main.append("<span><b class='".concat(_i, "'>").concat(this.counters[_i], "</b></span>"));
  }
});
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  "use strict";

  // Wrapper for the plugin
  $.fn.counter = function (options) {
    var pluginName = "myPlugin";
    if (options === undefined || _typeof(options) === 'object') {
      return new Counter(this, options);

      // return this.each(function () {
      //  if (!$.data(this, pluginName)) {
      //      $.data(this, pluginName, new MyPlugin(this, options));
      //   }
      //});
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      var instance = $.data(this[0], pluginName);
      if (options === 'destroy') {
        $.data(this, pluginName, null);
      }
      if (instance instanceof MyPlugin && typeof instance[options] === 'function') {
        return instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
      } else {
        return this;
      }
    }
  };
});