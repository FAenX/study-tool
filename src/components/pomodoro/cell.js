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
var tableReducer_1 = require("../../store/tableReducer");
var timerReducer_1 = require("../../store/timerReducer");
var moment_1 = __importDefault(require("moment"));
function Cell(_a) {
    var id = _a.id, dispatch = _a.dispatch, data = _a.data, state = _a.state;
    var tableReducer = state.tableReducer;
    var done;
    try {
        done = data.allMongodbTestTabledatas.edges[0].node.data;
    }
    catch (e) {
        done = [];
    }
    react_1.useEffect(function () { return dispatch(tableReducer_1.tableAction({
        done: done,
        activeId: null,
        active: false
    })); }, []);
    var clickFunction = function () {
        // start timer
        if (!tableReducer.active) {
            dispatch(timerReducer_1.timerAction({
                startTime: moment_1["default"]().format(),
                active: true,
                progress: 0,
                countDown: 'started',
                endTime: moment_1["default"]().add(1, 'minutes').format()
            }));
            // change state
            dispatch(tableReducer_1.tableAction({
                activeId: id,
                active: true,
                done: done
            }));
        }
    };
    var color = function () {
        if (tableReducer.activeId === id) {
            return "green";
        }
        return done.includes(id) ? "maroon" : "grey";
    };
    var cardStyle = {
        width: "50px",
        height: "50px",
        backgroundColor: color()
    };
    return (react_1["default"].createElement(core_1.Button, { onClick: function () { return clickFunction(); } },
        react_1["default"].createElement(core_1.Card, { id: id, variant: "elevation", elevation: 5, style: cardStyle })));
}
exports["default"] = Cell;
