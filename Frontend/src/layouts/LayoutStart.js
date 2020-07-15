import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./LayoutStart.css";

export default function LayoutStart(props) {
  const { routes } = props;

  return (
    <Container className="start">
      <LoadRoutes routes={routes} />
    </Container>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
