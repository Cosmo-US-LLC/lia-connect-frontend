import React, { Fragment, useState, useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  BrowserRouter,
  Route,
  Switch,
  Navigate,
  Routes,
  Router,
  Outlet,
} from "react-router-dom";
import UserRegister from "./components/auth/user-register";
import UserLogin from "./components/auth/user-login";
import ForgotPassword from "./components/auth/forgot-password";
import ResetPassword from "./components/auth/reset-password";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { auth0 } from "./data/config";
import ConfigDB from "./data/customizer/config";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for default styling

import store from "./store";
import { routes } from "./routes";
import logo from "./logo.svg";
import "./App.css";
import "./style/common.css";
import Layout from "./layout/layout";
import Dashboard from "./components/dashboard";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [anim, setAnim] = useState("");
  const [currentUser, setCurrentUser] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const animation =
    localStorage.getItem("animation") ||
    ConfigDB.data.router_animation ||
    "fade";

  const jwt_token = localStorage.getItem("token");
  useEffect(() => {
    setAnim(animation);
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
        stacked
      />
      <Auth0Provider
        domain={auth0.domain}
        clientId={auth0.clientId}
        redirectUri={auth0.redirectUri}
      >
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<UserRegister />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/"
                element={
                  jwt_token || authenticated ? (
                    <Layout>
                      <Outlet />
                      <Route
                        exact
                        path="/"
                        render={() => {
                          return <Navigate to="/dashboard" />;
                        }}
                      />
                      <TransitionGroup>
                        {routes.map(({ path, Component }) => (
                          <Route
                            key={path}
                            exact
                            path={`${process.env.PUBLIC_URL}${path}`}
                          >
                            {({ match }) => (
                              <CSSTransition
                                in={match?.path != null}
                                timeout={100}
                                classNames={anim}
                                unmountOnExit
                              >
                                <div>
                                  <Component />
                                </div>
                              </CSSTransition>
                            )}
                          </Route>
                        ))}
                      </TransitionGroup>
                    </Layout>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </BrowserRouter>
        </Provider>
      </Auth0Provider>
    </Fragment>
  );
}

export default App;
