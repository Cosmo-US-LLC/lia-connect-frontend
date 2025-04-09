import React, { useContext, useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "react-feather";
import CustomizerContext from "../../_helper/Customizer";
import SidebarMenuItems from "./SidebarMenuItems";
import upgradeAlert from "../../assets/used-files/sidebar/upgradeMessage.png";
import { Image } from "../../AbstractElements";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import SidebarBottomMenuItems from "./SidebarBottomMenuItems";
import { MarginTop } from "constant";
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
  // const UserMenuRedirect = (redirect) => {
  //   history(redirect);
  // };
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
        <ul className="sidebar-links">
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
          <li className="sidebar-list text-center trailDiv">
            <Image
              attrImage={{
                src: upgradeAlert,
                className: `sidebar-icon-margin  `,
                alt: "",
                style: { width: "100px", height: "100px" },
              }}
            />
            <div className="upgradeAlert text-center">
              <h4
                style={{ color: "#000000", fontSize: "14px", fontWeight: 600 }}
              >
                3 Days Left
              </h4>
              <p
                style={{ color: "#545454", fontSize: "10px", fontWeight: 400 }}
              >
                Your Free Trial Will End In 3 Days.
              </p>
            </div>
            <Button
              style={{
                padding: "2% 9% 2% 9%",
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
