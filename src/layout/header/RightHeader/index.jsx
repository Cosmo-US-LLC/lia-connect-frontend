import React, { Fragment } from "react";

import Notificationbar from "./Notificationbar";
import BookmarkHeader from "./BookmarkHeader";
import { UL } from "../../../AbstractElements";
import { Col } from "reactstrap";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";

const RightHeader = () => {
  return (
    <Fragment>
      <Col
        xxl="7"
        xl="6"
        md="7"
        className="nav-right pull-right right-header col-8 p-0 ms-auto"
      >
        <UL attrUL={{ className: "simple-list nav-menus flex-row" }}>
          <Link to={`${process.env.PUBLIC_URL}/jobs/create`}>
            <button
              style={{
                background: "black",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              className="btn"
              type="button"
            >
              Add New Job
            </button>
          </Link>
          {/* <Searchbar /> */}
          {/* <BookmarkHeader /> */}
          {/* <Notificationbar /> */}
        </UL>
      </Col>
    </Fragment>
  );
};

export default RightHeader;
