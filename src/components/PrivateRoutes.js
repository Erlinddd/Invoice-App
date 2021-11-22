import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  var token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoutes;
