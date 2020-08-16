"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.timerAction = void 0;
var initialState = {
    startTime: null,
    active: false,
    progress: 0,
    countDown: "00:00",
    endTime: null
};
//action
var TOGGLE_TIMER = 'TOGGLE_TIMER';
//action -----
exports.timerAction = function (state) { return ({
    type: TOGGLE_TIMER,
    state: state
}); };
//reducer
exports["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case TOGGLE_TIMER:
            return __assign({}, action.state);
        default:
            return state;
    }
});
