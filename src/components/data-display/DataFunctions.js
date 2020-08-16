"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DataFactory = void 0;
var moment_1 = __importDefault(require("moment"));
var DataFactory = /** @class */ (function () {
    function DataFactory(data, length) {
        var _this = this;
        this.getDataPoint = function (day) { return (_this.data.find(function (item) { return item.day === day; })); };
        //takes an array retruns an average
        this.getaverage = function (arr, period) { return (arr.reduce(function (a, b) { return a + b; }, 0) / period); };
        this.length = length;
        this.data = data;
    }
    DataFactory.prototype.makeHistoryKeysArr = function () {
        var historyKeysArr = [];
        for (var i = 0; i < this.length; i++) {
            historyKeysArr.push(moment_1["default"]().subtract(i, 'days').format("YYYYMMMMDD"));
        }
        historyKeysArr = historyKeysArr.reverse();
        return historyKeysArr;
    };
    ;
    DataFactory.prototype.makeDaysArr = function () {
        var days = [];
        for (var i = 0; i < this.length; i++) {
            days.push(moment_1["default"]().subtract(i, 'days').format("dd"));
        }
        days = days.reverse();
        return days;
    };
    // filter history by key && multiply returned array.length by 30 mins
    // to get total time on that day 
    DataFactory.prototype.dailyData = function (key) {
        var dataPoint = this.getDataPoint(key);
        if (!dataPoint) {
            return 0;
        }
        return dataPoint.data.length * 30;
    };
    ;
    DataFactory.prototype.average = function (day) {
        var earliestData = this.data[0].day;
        var period = moment_1["default"](day)
            .diff(moment_1["default"](earliestData), 'days');
        var cleanData = [];
        for (var i = 0; i <= period; i++) {
            var forDay = moment_1["default"](earliestData).add(i, 'day').format('YYYYMMMMDD');
            var dailyData = this.dailyData(forDay);
            cleanData.push(dailyData);
        }
        var average = this.getaverage(cleanData, period);
        return average;
    };
    return DataFactory;
}());
exports.DataFactory = DataFactory;
