import React, { Fragment, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Taptop from "./TapTop";
import Header from "./header";
import Sidebar from "./sidebar";
import ThemeCustomize from "./ThemeCustomizer";
import Footer from "./footer";
import CustomizerContext from "../_helper/Customizer";
import AnimationThemeContext from "../_helper/AnimationTheme";
import ConfigDB from "../Config/ThemeConfig";
import Loader from "./loader";
import CustomContext from "../_helper/Customizer";
import TrialAlertItem from "./TrialAlertItem";

const AppLayout = ({ children, classNames, ...rest }) => {
  const { toggleIcon } = useContext(CustomContext);

  const [showTrialAlert, setShowTrialAlert] = useState(true);

  const { layout } = useContext(CustomizerContext);
  const { sidebarIconType } = useContext(CustomizerContext);

  const layout1 = localStorage.getItem("sidebar_layout") || layout;
  const sideBarIcon =
    localStorage.getItem("sidebar_icon_type") || sidebarIconType;
  const location = useLocation();
  const { animation } = useContext(AnimationThemeContext);
  const animationTheme =
    localStorage.getItem("animation") ||
    animation ||
    ConfigDB.data.router_animation;

  const handleCloseTrial = () => {
    setShowTrialAlert(false);

 
    setTimeout(() => {
      setShowTrialAlert(true);
    }, 180000);
  };

  return (
    <Fragment>
      <Loader />
      <Taptop />
      <div
        className={`page-wrapper ${layout1}`}
        sidebar-layout={sideBarIcon}
        id="pageWrapper"
      >
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <TransitionGroup {...rest}>
            <CSSTransition
              key={location.key}
              timeout={100}
              classNames={animationTheme}
              unmountOnExit
            >
              <div className={`page-body ${toggleIcon ? "close_icon" : ""}`}>
                <div>
                  <div>
                    <Outlet />
                  </div>
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </div>
      </div>
      {/* {showTrialAlert === true ? (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1050,
          }}
        >
          <TrialAlertItem onClose={handleCloseTrial} />
        </div>
      ): ""} */}
      {/* <ThemeCustomize /> */}
    </Fragment>
  );
};
export default AppLayout;
