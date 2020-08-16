"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
require("./CellsTable.scss");
var react_redux_1 = require("react-redux");
var client_1 = require("@apollo/client");
var studyData_1 = require("../../backend/studyData");
var client = new studyData_1.studyDataFunctions().client;
var data = client.query({
    query: client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query tabledatas {\n  tabledata {\n    day\n    data\n  }}\n"], ["\n  query tabledatas {\n  tabledata {\n    day\n    data\n  }}\n"])))
}).then(function (res) { return console.log(res); })["catch"](function (err) { return console.log(err); });
//redux 
var cell_1 = __importDefault(require("./cell"));
var makeList = function (num) {
    var list = [];
    for (var i = 0; i < num; i += 1) {
        list.push(i);
    }
    return list;
};
function Table(_a) {
    var dispatch = _a.dispatch, state = _a.state;
    console.log(data);
    return (react_1["default"].createElement(core_1.Paper, { variant: "outlined", className: "pomodoro-table" },
        react_1["default"].createElement("div", { className: "cells" }, makeList(24).map(function (i) { return (react_1["default"].createElement(cell_1["default"], { key: i, id: i, data: data, dispatch: dispatch, state: state })); }))));
}
exports["default"] = react_redux_1.connect(function (state, dispatch) { return ({ state: state, dispatch: dispatch }); })(Table);
var templateObject_1;
