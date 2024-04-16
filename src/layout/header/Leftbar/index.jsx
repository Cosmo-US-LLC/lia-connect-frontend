import React, {
  Fragment,
  useState,
  useLayoutEffect,
  useContext,
  useEffect,
} from "react";
import { Col } from "reactstrap";
import { AlignCenter } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Image } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
import NotificationSlider from "./NotificationSlider";
import CandidateIcon from "../../../assets/used-files/icons/candidate.svg";
import { breadcrumbData } from "./breadcrumbConfig";
const Leftbar = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  console.log("current path", currentRoute);

  const { layoutURL, setToggleIcon, toggleSidebar } =
    useContext(CustomizerContext);
  const [sidebartoggle, setSidebartoggle] = useState(true);
  const width = useWindowSize();

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
        if (window.innerWidth <= 991) {
          setToggleIcon(true);
        } else {
          setToggleIcon(false);
        }
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const responsive_openCloseSidebar = (toggle) => {
    if (width <= 991) {
      toggleSidebar(!toggle);
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
      document.querySelector(".bg-overlay1").classList.add("active");
    } else {
      if (toggle) {
        toggleSidebar(!toggle);
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper close_icon ";
      } else {
        console.log("991 54 else", toggle);
        toggleSidebar(!toggle);
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper ";
      }
    }
  };

  function getActiveBreadcrumbs(currentRoute) {
    let activeBreadcrumbs = [];

    for (const item of breadcrumbData) {
      const fullPath = item.path;
      if (fullPath === currentRoute) {
        activeBreadcrumbs.push({ ...item, isActive: true });
      }
    }

    return activeBreadcrumbs;
  }

  const [breadcrumbActive, setBreadcrumbActive] = useState(null);

  useEffect(() => {
    setBreadcrumbActive(getActiveBreadcrumbs(currentRoute));
  }, [currentRoute]);

  return (
    <Fragment>
      <Col className="header-logo-wrapper col-auto p-0" id="out_side_click">
        <div className="logo-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`}>
            <Image
              attrImage={{
                className: "img-fluid for-light",
                src: `${require("../../../assets/images/logo/logo.png")}`,
                alt: "",
              }}
            />
            <Image
              attrImage={{
                className: "img-fluid for-dark",
                src: `${require("../../../assets/images/logo/logo_dark.png")}`,
                alt: "",
              }}
            />
          </Link>
        </div>
        <div
          className="toggle-sidebar"
          onClick={() => responsive_openCloseSidebar(sidebartoggle)}
          style={
            window.innerWidth <= 991
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <AlignCenter
            className="status_toggle middle sidebar-toggle"
            id="sidebar-toggle"
          />
        </div>
      </Col>
      <Col xxl="5" xl="6" lg="5" md="4" sm="3" className="left-header p-0">
        {/* <NotificationSlider /> */}
        {breadcrumbActive ? (
          <Breadcrumbs
            parent="Candidates"
            title="All Candidates"
            icon={CandidateIcon}
          />
        ) : null}
      </Col>
    </Fragment>
  );
};

export default Leftbar;
