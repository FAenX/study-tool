"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var redux_1 = require("redux");
var tableReducer_1 = __importDefault(require("./tableReducer"));
var timerReducer_1 = __importDefault(require("./timerReducer"));
var rootReducer = redux_1.combineReducers({ tableReducer: tableReducer_1["default"], timerReducer: timerReducer_1["default"] });
exports["default"] = rootReducer;
