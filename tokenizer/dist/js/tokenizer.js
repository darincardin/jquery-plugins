"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Tokenizer = /*#__PURE__*/_createClass(function Tokenizer(elem, opts) {
  var _this = this;
  _classCallCheck(this, Tokenizer);
  _defineProperty(this, "HTML", "\n\t\t\t\t<div class=\"tokenizer\" >\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<input  class='form-control error' type=\"text\" value=\"\" />\n\t\t\t\t\t\t<button type=\"text\" class=\"btn btn-primary\" >\n\t\t\t\t\t\t\t<span>Add</span>\n\t\t\t        \t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class=\"tokens\"></div>\n\t\t\t\t</div>\n\t");
  _defineProperty(this, "elem", null);
  _defineProperty(this, "props", null);
  _defineProperty(this, "onAdd", function () {
    var input = _this.elem.find('input');
    var val = input.val().trim();
    if (_this.isValid(val)) {
      input.val("");
      _this.props.tokens.push(val);
      _this.update();
    } else {
      input.addClass('error');
    }
    input.focus();
  });
  _defineProperty(this, "onRemove", function (i) {
    _this.props.tokens.splice(i, 1);
    _this.update();
  });
  _defineProperty(this, "onKeyDown", function (e) {
    return _this.onEnter(e);
  });
  _defineProperty(this, "render", function () {
    _this.update();
    _this.elem.find('button').click(_this.onAdd);
    _this.elem.find('input').keydown(_this.onKeyDown);
  });
  _defineProperty(this, "update", function () {
    var tokens = [];
    _this.props.tokens.forEach(function (v, i) {
      var TOKEN = $(_this.getToken(v));
      TOKEN.click(function () {
        _this.onRemove(i);
      });
      tokens.push(TOKEN);
    });
    _this.elem.find('.tokens').html(tokens);
  });
  _defineProperty(this, "onEnter", function (e) {
    if (e.key == "Enter") this.onAdd();
  });
  _defineProperty(this, "throwRequiredError", function () {
    throw new Error("Tokenizer: tokens option required!");
  });
  _defineProperty(this, "isValid", function (v) {
    if (v == undefined || v == "") return false;
    if (this.props.allowDupes) return true;
    return !this.props.tokens.includes(v);
  });
  _defineProperty(this, "getToken", function (v) {
    return "<span  class=\"token\" >\n\t\t\t\t\t\t\t<span>".concat(v, "</span>\n\t\t\t\t\t\t\t<span class=\"close-btn\" /> \n\t\t\t\t\t </span>");
  });
  if (!opts || !opts.tokens) this.throwRequiredError();
  this.elem = elem;
  this.props = opts; //$.extend(true, opts, util.defaults, opts);	

  this.elem.html(this.HTML);
  this.render();
});
$.fn.tokenizer = function (opts) {
  return new Tokenizer(this, opts);
};