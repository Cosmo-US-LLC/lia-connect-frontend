import React, { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import SvgIcon from "../../Components/Common/Component/SvgIcon";
import CustomizerContext from "../../_helper/Customizer";
import { MENUITEMSBOTTOM } from "./menu";
import { Image, P } from "../../AbstractElements";
import defaultAvatar from "../../assets/used-files/profile/default.png";
import { MoreVertical, LogOut } from "react-feather";

const SidebarBottomMENUITEMSBOTTOM = ({
  setMainMenu,
  sidebartoogle,
  setNavActive,
  activeClass,
  toggleIcon,
}) => {
  const { layout } = useContext(CustomizerContext);
  const layout1 = localStorage.getItem("sidebar_layout") || layout;

  const id = window.location.pathname.split("/").pop();
  const layoutId = id;
  const CurrentPath = window.location.pathname;
  const history = useNavigate();

  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState(defaultAvatar);
  const [name, setName] = useState(user.first_name + " " + user.last_name);
  const [email, setEmail] = useState(user.email);

  const { t } = useTranslation();
  const toggletNavActive = (item) => {
    if (window.innerWidth <= 991) {
      document.querySelector(".page-header").className =
        "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className =
        "sidebar-wrapper close_icon ";
      // document.querySelector('.mega-menu-container').classList.remove('d-block');
      if (item.type === "sub") {
        document.querySelector(".page-header").className = "page-header";
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper";
      }
    }
    if (!item.active) {
      MENUITEMSBOTTOM.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = false;
          if (!Items.children) return false;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMSBOTTOM });
  };
  const Logout = () => {
    localStorage.clear()
    history(`${process.env.PUBLIC_URL}/auth/login`);
  };

  return (
    <>
      {MENUITEMSBOTTOM.map((Item, i) => (
        <Fragment key={i + 10}>
          {Item.Items.map((menuItem, i) => (
            <li
              className="sidebar-list"
              key={i}
              style={
                menuItem.profile
                  ? {
                      borderTop: "1px solid #F5F5F5",
                      borderBottom: "1px solid #EBF1FC ",
                      paddingTop: "10%",
                    }
                  : {}
              }
            >
              {menuItem.type === "sub" ? (
                <a
                  href="javascript"
                  className={`sidebar-link sidebar-title ${
                    CurrentPath.includes(menuItem.title.toLowerCase())
                      ? "active"
                      : ""
                  } ${menuItem.active && "active"}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setNavActive(menuItem);
                    activeClass(menuItem.active);
                  }}
                >
                  {menuItem.profile ? (
                    <div className="media profile-media">
                      <Image
                        attrImage={{
                          className: "b-r-40 m-0",
                          src: `${
                            authenticated
                              ? user.picture
                                ? user.profile
                                : profile
                              : profile
                          }`,
                          alt: "",
                        }}
                      />
                      <div
                        className="media-body m-l-10"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ fontSize: "12px" }}>
                          {authenticated
                            ? user.firstName + " " + user.lastName
                            : name}
                        </span>
                        <span style={{ fontSize: "9px" }}>
                          {authenticated ? user.email : email}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Image
                      attrImage={{
                        src: menuItem.icon,
                        className: `sidebar-icon-margin`,
                        alt: "",
                      }}
                    />
                  )}

                  {menuItem.badge ? (
                    <label className={menuItem.badge}>
                      {menuItem.badgetxt}
                    </label>
                  ) : (
                    ""
                  )}
                  <div className="according-menu">
                    <MoreVertical strokeWidth={0.5} />
                  </div>
                </a>
              ) : (
                ""
              )}

              {menuItem.type === "link" ? (
                <Link
                  to={menuItem.path + "/" + layoutId}
                  className={`sidebar-link sidebar-title link-nav  ${
                    CurrentPath.includes(menuItem.title.toLowerCase())
                      ? "active"
                      : ""
                  }`}
                  onClick={() => toggletNavActive(menuItem)}
                >
                  {menuItem.icon}
                  <span style={{ color: menuItem.color }}>
                    {t(menuItem.title)}
                  </span>
                  {menuItem.badge ? (
                    <label className={menuItem.badge}>
                      {menuItem.badgetxt}
                    </label>
                  ) : (
                    ""
                  )}
                </Link>
              ) : (
                ""
              )}

              {menuItem.children ? (
                <ul
                  className="sidebar-submenu"
                  style={
                    layout1 !== "compact-sidebar compact-small"
                      ? menuItem?.active ||
                        CurrentPath.includes(menuItem?.title?.toLowerCase())
                        ? sidebartoogle
                          ? { opacity: 1, transition: "opacity 500ms ease-in" }
                          : { display: "block" }
                        : { display: "none" }
                      : { display: "none" }
                  }
                >
                  {menuItem.children.map((childrenItem, index) => {
                    return (
                      <li key={index}>
                        {childrenItem.type === "sub" ? (
                          <a
                            href="javascript"
                            className={`${
                              CurrentPath.includes(
                                childrenItem?.title?.toLowerCase()
                              )
                                ? "active"
                                : ""
                            }`}
                            // className={`${childrenItem.active ? 'active' : ''}`}
                            onClick={(event) => {
                              event.preventDefault();
                              toggletNavActive(childrenItem);
                            }}
                          >
                            {t(childrenItem.title)}
                            <span className="sub-arrow">
                              <i className="fa fa-chevron-right"></i>
                            </span>
                            <div className="according-menu">
                              {childrenItem.active ? (
                                <i className="fa fa-angle-down"></i>
                              ) : (
                                <i className="fa fa-angle-right"></i>
                              )}
                            </div>
                          </a>
                        ) : (
                          ""
                        )}

                        {childrenItem.type === "link" ? (
                          <Link
                            to={childrenItem.path + "/" + layoutId}
                            className={`${
                              CurrentPath.includes(
                                childrenItem?.title?.toLowerCase()
                              )
                                ? "active"
                                : ""
                            }`}
                            // className={`${childrenItem.active ? 'active' : ''}`} bonusui
                            onClick={() => toggletNavActive(childrenItem)}
                          >
                            {t(childrenItem.title)}
                          </Link>
                        ) : (
                          ""
                        )}

                        {childrenItem.children ? (
                          <ul
                            className="nav-sub-childmenu submenu-content"
                            style={
                              CurrentPath.includes(
                                childrenItem?.title?.toLowerCase()
                              ) || childrenItem.active
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            {childrenItem.children.map(
                              (childrenSubItem, key) => (
                                <li key={key}>
                                  {childrenSubItem.type === "link" ? (
                                    <Link
                                      to={childrenSubItem.path + "/" + layoutId}
                                      className={`${
                                        CurrentPath.includes(
                                          childrenSubItem?.title?.toLowerCase()
                                        )
                                          ? "active"
                                          : ""
                                      }`}
                                      // className={`${childrenSubItem.active ? 'active' : ''}`}
                                      onClick={() =>
                                        toggletNavActive(childrenSubItem)
                                      }
                                    >
                                      {t(childrenSubItem.title)}
                                    </Link>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
            </li>
          ))}
        </Fragment>
      ))}
      <Fragment key={"logout"}>
        <li className="sidebar-list" key={"logoutLI"} onClick={() => Logout()}>
          <Link
            className={`sidebar-link sidebar-title link-nav  ${
              CurrentPath.includes("logout") ? "active" : ""
            }`}
          >
            <LogOut strokeWidth={0.5} color={"rgb(170, 19, 19)"} />
            <span style={{ color: "#AA1313" }}>Logout</span>
          </Link>
        </li>
      </Fragment>
    </>
  );
};

export default SidebarBottomMENUITEMSBOTTOM;
