"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valuesToMask = function (month, year) {
    var monthNum = month + 1;
    var monthVal = monthNum < 10 ? '0' + monthNum : monthNum;
    var yearVal = year.toString().slice(2);
    return monthVal + '/' + yearVal;
};
exports.valuesFromMask = function (mask) {
    var _a = mask.split('/'), monthVal = _a[0], yearVal = _a[1];
    var rawMonth = parseInt(monthVal);
    var monthNum = rawMonth > 12 ? 12 : (rawMonth == 0 ? 1 : rawMonth);
    var month = monthNum - 1;
    // TODO: make base dynamic
    var year = 2000 + parseInt(yearVal);
    return [month, year];
};
