import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home/Home";
import User from "./components/pages/User/User";
import OfferDetails from "./components/pages/OfferDetails/OfferDetails";
import NotFound from "./components/pages/NotFound";
import About from "./components/pages/About";
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
import { ParallaxProvider } from "react-scroll-parallax";

setAuthToken(localStorage.token);

const App = () => {
  const location = useLocation();

  return (
    <AuthState>
      <OfferState>
        <AlertState>
          <Alerts />
          <Navbar />
          <ParallaxProvider>
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                timeout={500}
                classNames="page"
              >
                <Switch location={location}>
                  <Route exact path="/" component={Home} />
                  <PrivateRoute exact path="/user" component={User} />
                  <Route path="/offer/:id" component={OfferDetails} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/login" component={Login} />
                  <Route render={() => <NotFound />} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </ParallaxProvider>
        </AlertState>
      </OfferState>
    </AuthState>
  );
};

export default App;
