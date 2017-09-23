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
var OutsideClickWrapper_1 = require("../OutsideClickWrapper");
var Head_1 = require("./Head");
var constants_1 = require("./constants");
var MonthCalendar = (function (_super) {
    __extends(MonthCalendar, _super);
    function MonthCalendar(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (selectedYear, selectedMonth) {
            if (typeof selectedYear == 'number' && typeof selectedMonth == 'number') {
                _this.props.onChange(selectedYear, selectedMonth);
            }
        };
        _this.selectYear = function (selectedYear) {
            _this.setState({ selectedYear: selectedYear, currentView: constants_1.VIEW_MONTHS });
            _this.onChange(selectedYear, _this.state.selectedMonth);
        };
        _this.selectMonth = function (selectedMonth) {
            _this.setState({ selectedMonth: selectedMonth });
            _this.onChange(_this.state.selectedYear, selectedMonth);
        };
        _this.previous = function () {
            var startYear = _this.state.years[0] - 12;
            _this.updateYears(startYear);
        };
        _this.next = function () {
            var startYear = _this.state.years[11] + 1;
            _this.updateYears(startYear);
        };
        _this.updateYears = function (startYear) {
            var years = Array.from({ length: 12 }, function (v, k) { return k + startYear; });
            _this.setState({ years: years, currentView: constants_1.VIEW_YEARS });
        };
        _this.isYears = function () {
            return _this.state.currentView === constants_1.VIEW_YEARS;
        };
        _this.renderMonths = function () {
            var selectedMonth = _this.state.selectedMonth;
            return constants_1.MONTHS_NAMES.map(function (month, index) {
                var selectedKlass = selectedMonth === index ? 'selected_cell' : '';
                return (<div key={index} onClick={function () { return _this.selectMonth(index); }} className={"col_mp span_1_of_3_mp " + selectedKlass}>{month}</div>);
            });
        };
        _this.renderYears = function () {
            var selectedYear = _this.state.selectedYear;
            return _this.state.years.map(function (year, i) {
                var selectedKlass = selectedYear === year ? 'selected_cell' : '';
                return (<div key={i} onClick={function () { return _this.selectYear(year); }} className={"col_mp span_1_of_3_mp " + selectedKlass}>{year}</div>);
            });
        };
        var _a = _this.props, year = _a.year, month = _a.month;
        var startYear = _this.props.startYear || new Date().getFullYear() - 6;
        _this.state = {
            years: Array.from({ length: 12 }, function (v, k) { return k + startYear; }),
            selectedYear: year,
            selectedMonth: month,
            currentView: year ? constants_1.VIEW_MONTHS : constants_1.VIEW_YEARS,
        };
        return _this;
    }
    MonthCalendar.prototype.componentWillReceiveProps = function (nextProps) {
        var year = nextProps.year, month = nextProps.month;
        var _a = this.state, selectedYear = _a.selectedYear, selectedMonth = _a.selectedMonth;
        if (typeof year == 'number' &&
            typeof month == 'number' &&
            (year !== selectedYear || month !== selectedMonth)) {
            this.setState({
                selectedYear: year,
                selectedMonth: month,
                currentView: constants_1.VIEW_MONTHS
            });
        }
    };
    MonthCalendar.prototype.render = function () {
        var _this = this;
        var _a = this.state, selectedYear = _a.selectedYear, selectedMonth = _a.selectedMonth;
        return (<OutsideClickWrapper_1.default onOutsideClick={this.props.onOutsideClick} className="calendar-container">
        <Head_1.default year={selectedYear} month={selectedMonth ? selectedMonth + 1 : undefined} onValueClick={function () { return _this.setState({ currentView: constants_1.VIEW_YEARS }); }} onPrev={this.previous} onNext={this.next}/>

        {this.isYears() ? this.renderYears() : this.renderMonths()}
      </OutsideClickWrapper_1.default>);
    };
    return MonthCalendar;
}(react_1.Component));
;
exports.default = MonthCalendar;
