import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import Login from "../pages/Start/Login";
import { getAccessTokenApi } from "../api/auth";
import jwtDecode from "jwt-decode";

import Navbar from "../components/Home/NavbarHome";

import "./LayoutHome.css";

export default function LayoutHome(props) {
  const { routes } = props;
  const { user, isLoading } = useAuth();

  const [reload, setReload] = useState(false);

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/" component={Login} />
        <Redirect to="/" />
      </>
    );
  }

  if (user && !isLoading) {
    const token = getAccessTokenApi();
    const person = jwtDecode(token);
    return (
      <div>
        <Navbar person={person} reload={reload} setReload={setReload} />
        <Container className="home">
          <LoadRoutes routes={routes} person={person} setReload={setReload} />
        </Container>
      </div>
    );
  }

  return null;
}

function LoadRoutes({ routes, person, setReload }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={() => (
            <route.component person={person} setReload={setReload} />
          )}
        />
      ))}
    </Switch>
  );
}
