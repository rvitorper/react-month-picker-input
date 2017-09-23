"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @flow
var react_1 = require("react");
;
var OutsideClickWrapper = function (_a) {
    var onOutsideClick = _a.onOutsideClick, _b = _a.className, className = _b === void 0 ? '' : _b, children = _a.children;
    var wrapperContainer;
    var handleOutsideClick = function (e) {
        if (wrapperContainer && !wrapperContainer.contains(e.target)) {
            onOutsideClick(e);
        }
    };
    var wrapperMounted = function (container) {
        wrapperContainer = container;
        if (wrapperContainer) {
            window.addEventListener('click', handleOutsideClick, false);
        }
        else {
            window.removeEventListener('click', handleOutsideClick, false);
        }
    };
    return (<div ref={wrapperMounted} className={className}>{children}</div>);
};
exports.default = OutsideClickWrapper;
