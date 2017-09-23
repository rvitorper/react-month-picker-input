"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_input_mask_1 = require("react-input-mask");
var DATE_FORMAT = 'MM/YY';
var calendar_1 = require("./calendar");
var utils_1 = require("./utils");
require("./styles/index.css");
;
;
var MonthPickerInput = (function (_super) {
    __extends(MonthPickerInput, _super);
    function MonthPickerInput(props) {
        var _this = _super.call(this, props) || this;
        _this.onCalendarChange = function (year, month) {
            var inputValue = utils_1.valuesToMask(month, year);
            _this.setState({ inputValue: inputValue, year: year, month: month });
            _this.onChange(inputValue, year, month);
        };
        _this.onInputChange = function (e) {
            var mask = e.target.value;
            if (mask.length && mask.indexOf('_') === -1) {
                var _a = utils_1.valuesFromMask(mask), month = _a[0], year = _a[1];
                var inputValue = utils_1.valuesToMask(month, year);
                _this.setState({ year: year, month: month, inputValue: inputValue });
                _this.onChange(inputValue, year, month);
            }
            else
                _this.setState({ inputValue: mask });
        };
        _this.onChange = function (inputValue, year, month) {
            if (_this.props.onChange) {
                _this.props.onChange(inputValue, year, month);
            }
        };
        _this.onInputBlur = function (e) {
            if (!_this.wrapper.contains(e.target)) {
                _this.setState({ showCalendar: false });
            }
        };
        _this.onInputFocus = function (e) {
            if (_this.wrapper.contains(e.target)) {
                _this.setState({ showCalendar: true });
            }
        };
        _this.onCalendarOutsideClick = function (e) {
            _this.setState({ showCalendar: _this.input.input == e.target });
        };
        _this.calendar = function () {
            var _a = _this.state, year = _a.year, month = _a.month;
            return (<div style={{ position: 'relative' }}>
        <calendar_1.default year={year} month={month} onChange={_this.onCalendarChange} onOutsideClick={_this.onCalendarOutsideClick}/>
      </div>);
        };
        _this.inputProps = function () {
            return Object.assign({}, {
                ref: function (input) { if (input)
                    _this.input = input; },
                mask: "99/99",
                placeholder: DATE_FORMAT,
                className: "calendar-input-field",
                type: 'text',
                onBlur: _this.onInputBlur,
                onFocus: _this.onInputFocus,
                onChange: _this.onInputChange,
            }, _this.props.inputProps);
        };
        var _a = _this.props, year = _a.year, month = _a.month;
        var inputValue = '';
        if (typeof year == 'number' && typeof month == 'number') {
            inputValue = utils_1.valuesToMask(month, year);
        }
        _this.state = {
            year: year,
            month: month,
            inputValue: inputValue,
            showCalendar: false
        };
        return _this;
    }
    ;
    MonthPickerInput.prototype.render = function () {
        var _this = this;
        var _a = this.state, inputValue = _a.inputValue, showCalendar = _a.showCalendar;
        return (<div className="calendar-input-wrapper" ref={function (wrap) { if (wrap)
            _this.wrapper = wrap; }}>
        <react_input_mask_1.default value={inputValue} {...this.inputProps()}/>

        {showCalendar && this.calendar()}
      </div>);
    };
    ;
    return MonthPickerInput;
}(react_1.Component));
MonthPickerInput.defaultProps = {
    inputProps: {}
};
;
exports.default = MonthPickerInput;
