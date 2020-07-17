import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navbar from "../components/Home/NavbarHome";

import "./LayoutHome.css";

export default function LayoutHome(props) {
  const { routes } = props;

  return (
    <div>
      <Navbar />
      <Container className="home">
        <LoadRoutes routes={routes} />
      </Container>
    </div>
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
