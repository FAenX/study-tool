"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Landing_1 = __importDefault(require("../components/landing/Landing"));
var Login_1 = __importDefault(require("../components/clients/auth/Login"));
var Register_1 = __importDefault(require("../components/clients/auth/Register"));
var ForgotPassword_1 = __importDefault(require("../components/clients/auth/ForgotPassword"));
var Profile_1 = __importDefault(require("../components/clients/profile/Profile"));
var RouteGuard_1 = __importDefault(require("./RouteGuard"));
var CreateAd_1 = __importDefault(require("../components/ad/CreateAd"));
var EditAd_1 = __importDefault(require("../components/ad/EditAd"));
var ViewAd_1 = __importDefault(require("../components/ad/ViewAd"));
var Stats_1 = __importDefault(require("../components/ad/Stats"));
var MT_1 = __importDefault(require("../components/layout/MT"));
var Routes = function () {
    return (react_1["default"].createElement(react_router_dom_1.Switch, null,
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/", exact: true, component: Landing_1["default"] }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", exact: true, component: Login_1["default"] }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/register", exact: true, component: Register_1["default"] }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/forgot-password", exact: true, component: ForgotPassword_1["default"] }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/adverts/:fingerprint", exact: true, component: ViewAd_1["default"] }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/edit/:id", exact: true, component: EditAd_1["default"] }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: "/receipts/:id", exact: true, component: MT_1["default"] }),
        react_1["default"].createElement(RouteGuard_1["default"], { path: "/profile", component: Profile_1["default"], exact: true }),
        react_1["default"].createElement(RouteGuard_1["default"], { path: "/ad", component: CreateAd_1["default"], exact: true }),
        react_1["default"].createElement(RouteGuard_1["default"], { path: "/ad/:id/stats", component: Stats_1["default"], exact: true })));
};
exports["default"] = Routes;
