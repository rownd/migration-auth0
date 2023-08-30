import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useRownd } from "@rownd/react";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import { useAuth0 } from "@auth0/auth0-react";
initFontAwesome();

const App = () => {
  const { is_initializing, is_authenticated, getAccessToken } = useRownd();
  const auth0 = useAuth0();

  // Sign users into Rownd that were previously signed in with auth0. This requires a Token
  // Validator integration attached to your Rownd app.
  // See the Rownd documentation for more details: https://docs.rownd.io/configuration/integrations/token-validator
  useEffect(() => {
    if (!is_initializing && !is_authenticated && !auth0.isLoading && auth0.isAuthenticated) {
      auth0.getAccessTokenSilently().then((auth0Token) => {
        getAccessToken({ token: auth0Token })
      });
    }
  }, [getAccessToken, is_authenticated, is_initializing, auth0])

  if (is_initializing) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
