import React, { Fragment, useState, useEffect } from "react";
import man from "../../assets/images/dashboard/profile.jpg";
import { LogIn, User, Bell, Minimize, Search } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Notification,
  DeliveryProcessing,
  OrderComplete,
  TicketsGenerated,
  DeliveryComplete,
  CheckAllNotification,
  Admin,
  Account,
  LogOut,
} from "../../constant";

const Rightbar = (props) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [searchresponsive, setSearchresponsive] = useState(false);
  const [moonlight, setMoonlight] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);

  // auth0 profile
  const { logout } = useAuth0();
  const authenticated = localStorage.getItem("authenticated");
  const auth0_profile = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setProfile(localStorage.getItem("profileURL") || man);
    if (localStorage.getItem("layout_version") === "dark-only") {
      setMoonlight(true);
    }
  }, []);

  const Logout_From_Auth0 = () => {
    localStorage.removeItem("auth0_profile");
    localStorage.setItem("authenticated", false);
    navigate.push(`${process.env.PUBLIC_URL}/login`);
    logout();
  };

  const UserMenuRedirect = (redirect) => {
    navigate.push(redirect);
  };

  //full screen function
  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive);
      document.querySelector(".search-full").classList.add("open");
      document.querySelector(".more_lang").classList.remove("active");
    } else {
      setSearchresponsive(!searchresponsive);
      document.querySelector(".search-full").classList.remove("open");
    }
  };

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light);
      document.body.className = "light";
      localStorage.setItem("layout_version", "light");
    } else {
      setMoonlight(!light);
      document.body.className = "dark-only";
      localStorage.setItem("layout_version", "dark-only");
    }
  };

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li>
            <span className="header-search">
              <Search onClick={() => SeacrhResposive(searchresponsive)} />
            </span>
          </li>
          <li className="onhover-dropdown">
            <div
              className="notification-box"
              onClick={() => setNotificationDropDown(!notificationDropDown)}
            >
              <Bell />
              <span className="badge badge-pill badge-secondary">2</span>
            </div>
            <ul
              className={`notification-dropdown onhover-show-div ${
                notificationDropDown ? "active" : ""
              }`}
            >
              <li>
                <Bell />
                <h6 className="f-18 mb-0">{Notification}</h6>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-primary"> </i>
                  {DeliveryProcessing}{" "}
                  <span className="pull-right">{"10 min."}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-success"></i>
                  {OrderComplete}
                  <span className="pull-right">{"1 hr"}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-info"></i>
                  {TicketsGenerated}
                  <span className="pull-right">{"3 hr"}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-danger"></i>
                  {DeliveryComplete}
                  <span className="pull-right">{"6 hr"}</span>
                </p>
              </li>
              <li>
                <button className="btn btn-primary">
                  {CheckAllNotification}
                </button>
              </li>
            </ul>
          </li>
          <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}>
              <i
                className={`fa ${moonlight ? "fa-lightbulb-o" : "fa-moon-o"}`}
              ></i>
            </div>
          </li>

          <li className="maximize">
            <a className="text-dark" href="#javascript" onClick={goFull}>
              <Minimize />
            </a>
          </li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img
                className="b-r-10"
                src={authenticated ? auth0_profile.image : profile}
                alt=""
              />
              <div className="media-body">
                <span>{`${auth0_profile?.name}`}</span>
                <p className="mb-0 font-roboto">
                  {Admin} <i className="middle fa fa-angle-down"></i>
                </p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li
                onClick={() =>
                  UserMenuRedirect(
                    `${process.env.PUBLIC_URL}/app/users/userProfile`
                  )
                }
              >
                <User />
                <span>{Account} </span>
              </li>
              <li onClick={authenticated ? Logout_From_Auth0 : "na"}>
                <LogIn />
                <span>{LogOut}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default Rightbar;
