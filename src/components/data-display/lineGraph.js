"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var DataFunctions_1 = require("./DataFunctions");
require("./lineGraph.scss");
var react_chartjs_2_1 = __importDefault(require("react-chartjs-2"));
var core_1 = require("@material-ui/core");
var variables_1 = require("./variables");
var Chart = function () {
    var data = [{ day: '2020July10', data: [1, 2] }];
    var dataFactory = new DataFunctions_1.DataFactory(data, 10);
    // console.log(dataFactory.)
    //alldata
    var keys = dataFactory.makeHistoryKeysArr();
    var days = dataFactory.makeDaysArr();
    var dailyData = keys.map(function (key) { return dataFactory.dailyData(key); });
    console.log(keys);
    //averages 
    var averageData = keys.map(function (key) { return dataFactory.average(key); });
    var chartData = variables_1.chart1data(days, dailyData, averageData);
    return (react_1["default"].createElement(core_1.Card, { variant: "outlined", className: "chart-wrapper" },
        react_1["default"].createElement(react_chartjs_2_1["default"], { type: "line", label: "Productivity", height: 300, width: 400, data: chartData.dailyData, options: chartData.options })));
};
exports["default"] = Chart;
