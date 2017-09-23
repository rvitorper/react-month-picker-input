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
var Head = (function (_super) {
    __extends(Head, _super);
    function Head() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Head.prototype.selectedValue = function () {
        var _a = this.props, month = _a.month, year = _a.year;
        if (typeof year != 'number') {
            return '';
        }
        else if (typeof month != 'number') {
            return year;
        }
        else {
            var monthVal = month < 10 ? '0' + month : month;
            return monthVal + '/' + year;
        }
    };
    ;
    Head.prototype.render = function () {
        return (<div className="section_mp group_mp">
        <div className="col_mp span_1_of_3_mp arrows_mp" onClick={this.props.onPrev}>&lt;</div>

        <div className="col_mp span_1_of_3_mp selected_date_mp" onClick={this.props.onValueClick}>
          {this.selectedValue()}
        </div>

        <div className="col_mp span_1_of_3_mp arrows_mp" onClick={this.props.onNext}>&gt;</div>
      </div>);
    };
    return Head;
}(react_1.PureComponent));
exports.default = Head;
