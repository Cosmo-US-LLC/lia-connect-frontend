import React, { useContext } from "react";
import { Grid } from "react-feather";
import { Link } from "react-router-dom";
import { Image } from "../../AbstractElements";
import CubaIcon from "../../assets/images/logo/logo.png";
import CustomizerContext from "../../_helper/Customizer";

const SidebarLogo = () => {
  const { mixLayout, toggleSidebar, toggleIcon, layout, layoutURL } =
    useContext(CustomizerContext);

  const openCloseSidebar = () => {
    toggleSidebar(!toggleIcon);
  };

  return (
    <div className="logo-wrapper" style={{ backgroundColor: "#F9F9F9" }}>
      <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
        <Image
          attrImage={{
            className: "img-fluid d-inline",
            src: `${require("../../assets/images/logo/logo.png")}`,
            alt: "",
          }}
        />
      </Link>

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
