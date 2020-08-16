"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ProgressBlip = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
function ProgressBlip() {
    var progress = {
        backgroundColor: '#002329',
        width: '20px',
        height: '20px',
        borderRadius: '50%'
    };
    return (react_1["default"].createElement(core_1.Card, { variant: "elevation", elevation: 5, style: progress, className: "progress" }));
}
exports.ProgressBlip = ProgressBlip;
