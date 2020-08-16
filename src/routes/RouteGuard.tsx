import React, { FC, ElementType } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AppState } from "../store";
import { connect } from "react-redux";

const RouteGuard: FC<RouteProps & { isAuthenticated: boolean }> = ({
  component,
  isAuthenticated,
  ...rest
}) => {
  const renderFn = (Component?: ElementType) => (props: RouteProps) => {
    if (!Component) {
      return null;
    }

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    const redirectProps = {
      to: {
        pathname: "/",
        state: { from: props.location },
      },
    };

    return <Redirect {...redirectProps} />;
  };

  return <Route {...rest} render={renderFn(component)} />;
};

const mapState = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapState)(RouteGuard);
