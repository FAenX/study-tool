"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
require("./summary.scss");
var timer_1 = __importDefault(require("./timer"));
var react_redux_1 = require("react-redux");
var makeList = function (num) {
    var list = [];
    for (var i = 0; i < num; i += 1) {
        list.push(i);
    }
    return list;
};
function TotalTime() {
    return (react_1["default"].createElement("div", null,
        " ",
        " days"));
}
function Summary(_a) {
    var dispatch = _a.dispatch, state = _a.state;
    return (react_1["default"].createElement(core_1.Card, { variant: "outlined", className: "summary-wrapper" },
        react_1["default"].createElement(core_1.List, null,
            react_1["default"].createElement("div", null, "Timer:"),
            react_1["default"].createElement(timer_1["default"], { dispatch: dispatch, state: state })),
        react_1["default"].createElement(core_1.List, null,
            react_1["default"].createElement("div", null, "Total time:"),
            react_1["default"].createElement(TotalTime, null)),
        react_1["default"].createElement(core_1.List, null,
            react_1["default"].createElement("div", null, "Streak:"),
            react_1["default"].createElement(TotalTime, null)),
        react_1["default"].createElement(core_1.List, null,
            react_1["default"].createElement("div", null, "Best time:"),
            react_1["default"].createElement(TotalTime, null)),
        react_1["default"].createElement(core_1.List, null,
            react_1["default"].createElement("div", null, "Avarage today:"),
            react_1["default"].createElement(TotalTime, null)),
        react_1["default"].createElement(core_1.List, null,
            react_1["default"].createElement("div", null, "Time to mastery:"),
            react_1["default"].createElement(TotalTime, null))));
}
exports["default"] = react_redux_1.connect(function (state, dispatch) { return ({ state: state, dispatch: dispatch }); })(Summary);
