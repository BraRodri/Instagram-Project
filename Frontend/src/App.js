import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop>
          <Switch>
            {routes.map((route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))}
          </Switch>
        </ScrollToTop>
      </Router>
    </AuthProvider>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    ></Route>
  );
}

export default App;
