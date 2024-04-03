import React, { Fragment, useState } from "react";
import Loader from "../layout/loader";
import TapTop from "../layout/tap-top";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";

const Layout = ({ children }) => {
  const [sideBar, setSideBar] = useState("dashboard");
  return (
    <Fragment>
      <Loader />
      <TapTop />
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header handleSideBar={(value) => setSideBar(value)} />
        <div className="page-body-wrapper sidebar-icon">
          <Sidebar menuType={sideBar} />
          <div className="page-body">{children}</div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};
export default Layout;
