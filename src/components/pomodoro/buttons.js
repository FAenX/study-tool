"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AddButton = exports.ResetButton = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
function ResetButton(props) {
    var handleTableReset = props.handleTableReset;
    return (react_1["default"].createElement(core_1.Button, { variant: "outlined", color: "primary", onClick: handleTableReset }, "reset"));
}
exports.ResetButton = ResetButton;
;
function AddButton(props) {
    return (react_1["default"].createElement(core_1.Button, { variant: "outlined", color: "primary", onClick: props.addCells },
        react_1["default"].createElement(icons_1.Add, null)));
}
exports.AddButton = AddButton;
