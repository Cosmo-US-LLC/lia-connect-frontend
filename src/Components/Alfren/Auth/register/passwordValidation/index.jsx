import React, { Fragment, useState } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { Btn, H5, ToolTip } from "../../../../../AbstractElements";
import { HTMLElements } from "../../../../../Constant";
import HtmlContentTooltip from "./HtmlContentTooltip";

const HtmlElement = ({ errorMessage }) => {
  const [tooltip, setTooltip] = useState(false);
  const toggle = () => setTooltip(!tooltip);
  const tooltips = (
    <>
      {"Tooltip"} <b>with</b> <code>HTML</code>
    </>
  );
  const Data = [
    {
      id: 6,
      placement: "right",
      btntext: "Click me",
      tooltip: tooltips,
    },
    {
      id: 7,
      placement: "bottom",
      btntext: "Click me",
      tooltip: tooltips,
    },
    {
      id: 8,
      placement: "left",
      btntext: "Click me",
      tooltip: tooltips,
    },
  ];
  return (
    <Fragment>
      <ToolTip
        attrToolTip={{
          placement: "bottom",
          isOpen: true,
          target: "passwordValidation",
          style: {
            backgroundColor: "#595959",
            boxShadow: "0px 5px 10px -3.89px #00000040",
            width: "416px",
            // height: "98px",
            // top: " 141px",
            // left: "994px",
            // padding: "12px 16px 16px 16px",
            // gap: "12px",
            // borderRadius: "4px",
            // opacity: "0px",
          },
        }}
      >
        {errorMessage}
      </ToolTip>
    </Fragment>
  );
};

export default HtmlElement;
