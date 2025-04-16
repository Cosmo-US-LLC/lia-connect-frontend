import React, { useContext } from "react";
import { Link } from "react-router-dom";
import cubaimg from "../../assets/images/logo/sidebar-Logo.webp";
import CustomizerContext from "../../_helper/Customizer";

const SidebarIcon = () => {
  const { layoutURL } = useContext(CustomizerContext);
  return (
    // <div className="logo-icon-wrapper">

    //   <Link to={`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`}>
    //     <img className="logo-img" src={cubaimg} alt="Logo" />
    //   </Link>
    // </div>
    <div className="logo-icon-wrapper">
      <Link to={`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`}>
        <img
          src={cubaimg}
          alt="Company Logo"
          className="img-fluid d-inline"
          style={{ height: "32px", width: "auto" }}
        />
      </Link>
    </div>
  );
};

export default SidebarIcon;
