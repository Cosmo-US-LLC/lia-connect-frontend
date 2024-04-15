import React, { useContext, useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "react-feather";
import CustomizerContext from "../../_helper/Customizer";
import SidebarMenuItems from "./SidebarMenuItems";
import upgradeAlert from "../../assets/used-files/sidebar/upgradeMessage.png";
import { Image, P, H4, Btn, UL, LI } from "../../AbstractElements";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/used-files/icons/logout.svg";
import FeedbackIcon from "../../assets/used-files/icons/Feedback.svg";
import man from "../../assets/used-files/profile/default.png";
import { FileText, LogIn, Mail, User } from "react-feather";
import { Account, Admin, Inbox, LogOut, Taskboard } from "../../Constant";
import SidebarBottomMenuItems from "./SidebarBottomMenuItems";
const SidebarMenu = ({
  setMainMenu,
  setBottomMenu,
  props,
  sidebartoogle,
  setNavActive,
  activeClass,
  width,
  toggleIcon,
}) => {
  const { customizer } = useContext(CustomizerContext);
  const history = useNavigate();
  const wrapper = customizer.settings.sidebar.type;
  const [margin, setMargin] = useState(0);
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"));
  const { layoutURL } = useContext(CustomizerContext);
  const { layout } = useContext(CustomizerContext);
  const layout1 = localStorage.getItem("sidebar_layout") || layout;

  const id = window.location.pathname.split("/").pop();
  const layoutId = id;
  const [profile, setProfile] = useState(man);
  const [name, setName] = useState("Amanda White");
  const CurrentPath = window.location.pathname;
  useEffect(() => {
    if (toggleIcon) {
      document.querySelector(".trailDiv").classList.add("d-none");
    }
  }, [toggleIcon]);
  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570);
      } else {
        setMargin(-3464);
      }
      document.querySelector(".right-arrow").classList.add("d-none");
      document.querySelector(".left-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += -width));
      document.querySelector(".left-arrow").classList.remove("d-none");
    }
  };

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0);
      document.querySelector(".left-arrow").classList.add("d-none");
      document.querySelector(".right-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += width));
      document.querySelector(".right-arrow").classList.remove("d-none");
    }
  };
  const UserMenuRedirect = (redirect) => {
    history(redirect);
  };
  return (
    <nav
      className="sidebar-main"
      id="sidebar-main"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="left-arrow" onClick={scrollToLeft}>
        <ArrowLeft />
      </div>
      <div
        id="sidebar-menu"
        style={
          wrapper.split(" ").includes("horizontal-wrapper")
            ? { marginLeft: margin + "px" }
            : { margin: "0px" }
        }
      >
        <ul className="sidebar-links custom-scrollbar">
          <li className="back-btn">
            <div className="mobile-back text-end">
              <span>{"Back"}</span>
              <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
            </div>
          </li>
          <SidebarMenuItems
            setMainMenu={setMainMenu}
            props={props}
            sidebartoogle={sidebartoogle}
            setNavActive={setNavActive}
            activeClass={activeClass}
          />
          <li className="sidebar-list mt-5 text-center trailDiv">
            <Image
              attrImage={{
                src: upgradeAlert,
                className: `sidebar-icon-margin`,
                alt: "",
              }}
            />
            <div className="upgradeAlert text-center">
              <h4 style={{ color: "#000000", fontWeight: "bold" }}>
                3 Days Left
              </h4>
              <p style={{ color: "#545454" }}>
                Your Free Trial Will End In 3 Days.
              </p>
            </div>
            <Button
              style={{
                padding: "3% 16% 3% 16%",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Upgrade
            </Button>
          </li>

          <li style={{ position: "absolute", bottom: "3%" }}>
            <SidebarBottomMenuItems
              setMainMenu={setBottomMenu}
              props={props}
              sidebartoogle={sidebartoogle}
              setNavActive={setNavActive}
              activeClass={activeClass}
              toggleIcon={toggleIcon}
            />
          </li>
        </ul>
      </div>
      <div className="right-arrow" onClick={scrollToRight}>
        <ArrowRight />
      </div>
    </nav>
  );
};

export default SidebarMenu;
