import React, { Fragment } from "react";
import { Input } from "reactstrap";
import { H4, H6, LI, ToolTip, UL } from "../../../../../AbstractElements";

import { InputGroup, InputGroupText } from "reactstrap";
import { Check, Search } from "react-feather";
const DataTables = ({ closeSearchDropdown }) => {
  return (
    <Fragment>
      <div
        style={{
          padding: "10px",
          position: "absolute",
          boxShadow: "0px 10px 26px 0px #0000001A",
          zIndex: 2,
          backgroundColor: "white",
          borderRadius: "8px",
          width: "50%",
        }}
      >
        <InputGroup style={{ boxShadow: "0px 2px 12px 0px #00000014" }}>
          <InputGroupText
            style={{
              borderRight: "none",
              backgroundColor: "white",
              color: "#585DDB",
            }}
          >
            <Search strokeWidth={0.5} />
          </InputGroupText>
          <Input
            placeholder="All Campaigns"
            className="js-example-basic-single col-sm-3"
          />
        </InputGroup>
        <div className="mt-3">
          <UL attrUL={{ className: "flex-row" }}>
            <LI
              attrLI={{
                className:
                  "ms-4 me-4 border-bottom mb-2 d-flex align-items-center",
                style: { borderRadius: 0 },
              }}
            >
              <span className="ps-3 flex-grow-1">Marketing Manager</span>
              <span className="ms-auto pe-3">
                <Check strokeWidth={1} color="#299A16" />
              </span>
            </LI>
            <LI
              attrLI={{
                className:
                  "ms-4 me-4 border-bottom mb-2 d-flex align-items-center",
                style: { borderRadius: 0 },
              }}
            >
              <span className="ps-3 flex-grow-1">Sn. Graphic Designer </span>
              <span className="ms-auto pe-3">
                <Check strokeWidth={1} color="#299A16" />
              </span>
            </LI>
            <LI
              attrLI={{
                className:
                  "ms-4 me-4  border-bottom mb-2 d-flex align-items-center",
                style: { borderRadius: 0 },
              }}
            >
              <span className="ps-3 flex-grow-1">Front-End Developers </span>
              <span className="ms-auto pe-3">
                <Check strokeWidth={1} color="white" />
              </span>
            </LI>
            <LI
              attrLI={{
                className:
                  "ms-4 me-4 border-bottom mb-2 d-flex align-items-center",
                style: { borderRadius: 0 },
              }}
            >
              <span className="ps-3 flex-grow-1">Jr. Seo Specialist </span>
              <span className="ms-auto pe-3">
                <Check strokeWidth={1} color="#299A16" />
              </span>
            </LI>
            <LI
              attrLI={{
                className:
                  "ms-4 me-4 border-bottom mb-2 d-flex align-items-center",
                style: { borderRadius: 0 },
              }}
            >
              <span className="ps-3 flex-grow-1">Social Media Manager</span>
              <span className="ms-auto pe-3">
                <Check strokeWidth={1} color="white" />
              </span>
            </LI>
          </UL>
          <div style={{ textAlign: "right" }}>
            <button className="btn  pe-4 ps-4 me-1 border-dark">
              <span>Reset</span>
            </button>
            <button
              className="btn btn-primary pe-4 ps-4 ms-1"
              onClick={closeSearchDropdown}
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DataTables;
