"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var moment_1 = __importDefault(require("moment"));
require("./Timer.scss");
var timerReducer_1 = require("../../store/timerReducer");
var tableReducer_1 = require("../../store/tableReducer");
var Progress = function (_a) {
    var progress = _a.progress;
    return (react_1["default"].createElement(core_1.LinearProgress, { className: "linear-progress", variant: "determinate", color: progress < 10 ? "secondary" : "primary", value: progress }));
};
var Timer = function (_a) {
    var state = _a.state, dispatch = _a.dispatch;
    var timerReducer = state.timerReducer;
    var tableReducer = state.tableReducer;
    react_1.useEffect(function () {
        var timer = setInterval(function () { return updateClock(); }, 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    });
    var updateClock = function () {
        if (moment_1["default"]() < moment_1["default"](timerReducer.endTime)) {
            // set up
            var start = moment_1["default"](timerReducer.startTime);
            var end = moment_1["default"](timerReducer.endTime);
            var diff = end.diff(start);
            var countDown = moment_1["default"].utc(diff).format("mm:ss");
            // progress percentage
            var t = parseFloat(moment_1["default"].utc(diff).format("mm.ss"));
            var progress = (t / 30) * 100;
            console.log(t);
            dispatch(timerReducer_1.timerAction({
                startTime: moment_1["default"]().format(),
                active: timerReducer.active,
                progress: progress,
                countDown: countDown,
                endTime: timerReducer.endTime
            }));
        }
        else if (moment_1["default"]().format('mm') === moment_1["default"](timerReducer.endTime).format('mm')) {
            dispatch(timerReducer_1.timerAction({
                startTime: null,
                active: false,
                progress: 0,
                countDown: '00:00',
                endTime: null
            }));
            dispatch(tableReducer_1.tableAction({
                done: tableReducer.done.concat(tableReducer.activeId),
                active: false,
                activeId: null
            }));
            // write data to db
            //here      
        }
    };
    return (react_1["default"].createElement("div", { id: "progress-bar" },
        react_1["default"].createElement(Progress, { progress: timerReducer.progress }),
        react_1["default"].createElement("div", null, timerReducer.countDown)));
};
exports["default"] = Timer;
