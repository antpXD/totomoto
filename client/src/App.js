import React, { Fragment } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import User from "./components/pages/User/User";
import OfferDetails from "./components/pages/OfferDetails/OfferDetails";
import NotFound from "./components/pages/NotFound";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";

import OfferState from "./context/offer/offerState";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import setAuthToken from "./utils/setAuthToken";

import "./css/App.scss";
import "./css/settings/fontawesome/scss/fontawesome.scss";
import "./css/settings/fontawesome/scss/solid.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";

setAuthToken(localStorage.token);

const App = () => {
  return (
    <AuthState>
      <OfferState>
        <AlertState>
          <Router>
            <Fragment>
              <Alerts />
              <Route
                render={({ location }) => (
                  <TransitionGroup>
                    <CSSTransition
                      key={location.pathname}
                      timeout={500}
                      classNames="fade"
                    >
                      <Switch location={location}>
                        <Route exact path="/" component={Home} />
                        <PrivateRoute exact path="/user" component={User} />
                        <Route path="/offer/:id" component={OfferDetails} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route render={() => <NotFound />} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )}
              />
            </Fragment>
          </Router>
        </AlertState>
      </OfferState>
    </AuthState>
  );
};

export default App;
