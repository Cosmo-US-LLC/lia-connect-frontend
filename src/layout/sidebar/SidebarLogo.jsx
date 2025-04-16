import React, { useContext } from "react";
import { Grid } from "react-feather";
import { Link } from "react-router-dom";
import { Image } from "../../AbstractElements";
import CubaIcon from "../../assets/images/logo/logo.svg";
import CustomizerContext from "../../_helper/Customizer";
import logoWebp from "../../assets/images/logo/sidebar-Logo.webp";

const SidebarLogo = () => {
  const { mixLayout, toggleSidebar, toggleIcon, layout, layoutURL } =
    useContext(CustomizerContext);

  const openCloseSidebar = () => {
    toggleSidebar(!toggleIcon);
  };

  return (
    <div className="logo-wrapper" style={{ backgroundColor: "#F9F9F9" }}>
      <Link
        to={`${process.env.PUBLIC_URL}/home`}
        className="d-flex align-items-center gap-2 text-decoration-none"
      >
        <img
          src={logoWebp}
          alt="Company Logo"
          className="img-fluid d-inline"
          style={{ height: "32px", width: "auto" }}
        />
        <span style={{ fontSize: "22px", fontWeight: "600", color: "#000" }}>
          Alfren HR
        </span>
      </Link>

      {/* <Link to={`${process.env.PUBLIC_URL}/home`}>
        <Image
          attrImage={{
            className: "img-fluid d-inline",
            src: `${require("../../assets/images/logo/logo.svg")}`,
            alt: "",
          }}
        />
      </Link> */}

      <div className="back-btn" onClick={() => openCloseSidebar()}>
        <i className="fa fa-angle-left"></i>
      </div>
      <div className="toggle-sidebar" onClick={openCloseSidebar}>
        <Grid className="status_toggle middle sidebar-toggle" />
      </div>
    </div>
  );
};

export default SidebarLogo;
