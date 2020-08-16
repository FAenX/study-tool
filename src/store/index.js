"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var redux_1 = require("redux");
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
var rootReducer_js_1 = __importDefault(require("./rootReducer.js"));
// preloadedState will be passed in by the plugin
exports["default"] = (function (store) {
    return redux_1.createStore(rootReducer_js_1["default"], store);
});
