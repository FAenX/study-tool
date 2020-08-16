import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "../components/landing/Landing";
import Login from "../components/clients/auth/Login";
import Register from "../components/clients/auth/Register";
import ForgotPassword from "../components/clients/auth/ForgotPassword";
import Profile from "../components/clients/profile/Profile";
import RouteGuard from "./RouteGuard";
import CreateAd from "../components/ad/CreateAd";
import EditAd from "../components/ad/EditAd";
import ViewAd from "../components/ad/ViewAd";
import Stats from "../components/ad/Stats";
import MT from "../components/layout/MT";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/adverts/:fingerprint" exact component={ViewAd} />
      <Route path="/edit/:id" exact component={EditAd} />
      <Route path="/receipts/:id" exact component={MT} />
      <RouteGuard path="/profile" component={Profile} exact />
      <RouteGuard path="/ad" component={CreateAd} exact />
      <RouteGuard path="/ad/:id/stats" component={Stats} exact />
    </Switch>
  );
};

export default Routes;
