import React, { useState } from "react";
import { Col, Input, Label, Media, Row, UncontrolledTooltip } from "reactstrap";
import { Image, LI, Progressbar, UL } from "../../../../AbstractElements";
import user1 from "../../../../assets/images/user/1.jpg";
import {
  Check,
  Mail,
  Info,
  Trash,
  Trash2,
  Flag,
  User,
  Users,
  ChevronsDown,
  ChevronDown,
} from "react-feather";
import { Link } from "react-router-dom";
import { Tooltip } from "reactstrap";
import Select from "react-select";
import { max } from "date-fns";
import DropdownCommon from "../../../Common/Dropdown/index";

export const dummytabledata = [
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <div>Senior Product Design Lead</div>
        <div className="progress-showcase">
          <Col style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "42%" }}>
              {" "}
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress1",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#b8d1fe" }}>42</span>
            </div>
            <div style={{ width: "20%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress2",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#ffe699" }}>20</span>
            </div>
            <div style={{ width: "36%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress3",
                  barAriaLabelledBy: "75",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#fba14d" }}>36</span>
            </div>
          </Col>
        </div>{" "}
      </Link>
    ),
    potentialCandidates: (
      <div className="d-flex">
        <Users strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>60</strong>
        </div>
      </div>
    ),
    outreach: (
      <div className="d-flex">
        <User strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>30</strong>
        </div>
      </div>
    ),
    responseRate: (
      <div>
        <div className="font-secondary">
          <strong>52 %</strong>
        </div>
      </div>
    ),
    priority: (
      <div className="d-flex">
        <Flag fill="#DE3E3E" color="#AA1313" size={14} strokeWidth={1.5} />
        <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
          High
        </span>
        <ChevronDown color="#8FA8D7" size={14} strokeWidth={1.5} />
      </div>
    ),
    dateCreated: (
      <div>
        <span>Aug 24, 2023</span>
        <span style={{ color: "#299A16" }}>( 18 Days)</span>
      </div>
    ),
    status: (
      <div>
        <span>Active</span>
        <Media key="1">
          <Media body className="text-start switch-sm ">
            <Label className="switch">
              <Input type="checkbox" />
              <span className="switch-state"></span>
            </Label>
          </Media>
        </Media>
      </div>
    ),
    remove: <Trash2 strokeWidth={0.5} color="#9B9999" size={20} />,
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <div>Senior Product Design Lead</div>
        <div className="progress-showcase">
          <Col style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "5%" }}>
              {" "}
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress1",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#b8d1fe" }}>0</span>
            </div>
            <div style={{ width: "5%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress2",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#ffe699" }}>0</span>
            </div>
            <div style={{ width: "100%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress3",
                  barAriaLabelledBy: "75",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#fba14d" }}>100</span>
            </div>
          </Col>
        </div>
      </Link>
    ),
    potentialCandidates: (
      <div className="d-flex">
        <Users strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>60</strong>
        </div>
      </div>
    ),
    outreach: (
      <div className="d-flex">
        <User strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>30</strong>
        </div>
      </div>
    ),
    responseRate: (
      <div>
        <div className="font-secondary">
          <strong>52 %</strong>
        </div>
      </div>
    ),
    priority: (
      <div className="d-flex">
        <Flag fill="#DE3E3E" color="#AA1313" size={14} strokeWidth={1.5} />
        <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
          High
        </span>
        <ChevronDown color="#8FA8D7" size={14} strokeWidth={1.5} />
      </div>
    ),
    dateCreated: (
      <div>
        <span>Aug 24, 2023</span>
        <span style={{ color: "#299A16" }}>( 18 Days)</span>
      </div>
    ),
    status: (
      <div>
        <span>Active</span>
        <Media key="1">
          <Media body className="text-start switch-sm ">
            <Label className="switch">
              <Input type="checkbox" checked />
              <span className="switch-state"></span>
            </Label>
          </Media>
        </Media>
      </div>
    ),
    remove: <Trash2 strokeWidth={0.5} color="#9B9999" size={20} />,
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <div>Senior Product Design Lead</div>
        <div className="progress-showcase">
          <Col style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "10%" }}>
              {" "}
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress1",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#b8d1fe" }}>10</span>
            </div>
            <div style={{ width: "30%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress2",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#ffe699" }}>30</span>
            </div>
            <div style={{ width: "56%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress3",
                  barAriaLabelledBy: "75",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#fba14d" }}>56</span>
            </div>
          </Col>
        </div>{" "}
      </Link>
    ),
    potentialCandidates: (
      <div className="d-flex">
        <Users strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>60</strong>
        </div>
      </div>
    ),
    outreach: (
      <div className="d-flex">
        <User strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>30</strong>
        </div>
      </div>
    ),
    responseRate: (
      <div>
        <div className="font-secondary">
          <strong>52 %</strong>
        </div>
      </div>
    ),
    priority: (
      <div className="d-flex">
        <Flag fill="#DE3E3E" color="#AA1313" size={14} strokeWidth={1.5} />
        <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
          High
        </span>
        <ChevronDown color="#8FA8D7" size={14} strokeWidth={1.5} />
      </div>
    ),
    dateCreated: (
      <div>
        <span>Aug 24, 2023</span>
        <span style={{ color: "#299A16" }}>( 18 Days)</span>
      </div>
    ),
    status: (
      <div>
        <span>Active</span>
        <Media key="1">
          <Media body className="text-start switch-sm ">
            <Label className="switch">
              <Input type="checkbox" checked />
              <span className="switch-state"></span>
            </Label>
          </Media>
        </Media>
      </div>
    ),
    remove: <Trash2 strokeWidth={0.5} color="#9B9999" size={20} />,
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <div>Senior Product Design Lead</div>
        <div className="progress-showcase">
          <Col style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "42%" }}>
              {" "}
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress1",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#b8d1fe" }}>42</span>
            </div>
            <div style={{ width: "20%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress2",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#ffe699" }}>20</span>
            </div>
            <div style={{ width: "36%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress3",
                  barAriaLabelledBy: "75",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#fba14d" }}>36</span>
            </div>
          </Col>
        </div>{" "}
      </Link>
    ),
    potentialCandidates: (
      <div className="d-flex">
        <Users strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>60</strong>
        </div>
      </div>
    ),
    outreach: (
      <div className="d-flex">
        <User strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>30</strong>
        </div>
      </div>
    ),
    responseRate: (
      <div>
        <div className="font-secondary">
          <strong>52 %</strong>
        </div>
      </div>
    ),
    priority: (
      <div className="d-flex">
        <Flag fill="#DE3E3E" color="#AA1313" size={14} strokeWidth={1.5} />
        <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
          High
        </span>
        <ChevronDown color="#8FA8D7" size={14} strokeWidth={1.5} />
      </div>
    ),
    dateCreated: (
      <div>
        <span>Aug 24, 2023</span>
        <span style={{ color: "#299A16" }}>( 18 Days)</span>
      </div>
    ),
    status: (
      <div>
        <span>Active</span>
        <Media key="1">
          <Media body className="text-start switch-sm ">
            <Label className="switch">
              <Input type="checkbox" />
              <span className="switch-state"></span>
            </Label>
          </Media>
        </Media>
      </div>
    ),
    remove: <Trash2 strokeWidth={0.5} color="#9B9999" size={20} />,
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <div>Senior Product Design Lead</div>
        <div className="progress-showcase">
          <Col style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "42%" }}>
              {" "}
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress1",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#b8d1fe" }}>42</span>
            </div>
            <div style={{ width: "20%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress2",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#ffe699" }}>20</span>
            </div>
            <div style={{ width: "36%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress3",
                  barAriaLabelledBy: "75",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#fba14d" }}>36</span>
            </div>
          </Col>
        </div>{" "}
      </Link>
    ),
    potentialCandidates: (
      <div className="d-flex">
        <Users strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>60</strong>
        </div>
      </div>
    ),
    outreach: (
      <div className="d-flex">
        <User strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>30</strong>
        </div>
      </div>
    ),
    responseRate: (
      <div>
        <div className="font-secondary">
          <strong>52 %</strong>
        </div>
      </div>
    ),
    priority: (
      <div className="d-flex">
        <Flag fill="#DE3E3E" color="#AA1313" size={14} strokeWidth={1.5} />
        <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
          High
        </span>
        <ChevronDown color="#8FA8D7" size={14} strokeWidth={1.5} />
      </div>
    ),
    dateCreated: (
      <div>
        <span>Aug 24, 2023</span>
        <span style={{ color: "#299A16" }}>( 18 Days)</span>
      </div>
    ),
    status: (
      <div>
        <span>Active</span>
        <Media key="1">
          <Media body className="text-start switch-sm ">
            <Label className="switch">
              <Input type="checkbox" checked />
              <span className="switch-state"></span>
            </Label>
          </Media>
        </Media>
      </div>
    ),
    remove: <Trash2 strokeWidth={0.5} color="#9B9999" size={20} />,
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <div>Senior Product Design Lead</div>
        <div className="progress-showcase">
          <Col style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "42%" }}>
              {" "}
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress1",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#b8d1fe" }}>42</span>
            </div>
            <div style={{ width: "20%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress2",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#ffe699" }}>20</span>
            </div>
            <div style={{ width: "36%" }}>
              <Progressbar
                attrProgress={{
                  value: "100",
                  color: "progress3",
                  barAriaLabelledBy: "75",
                  className: "sm-progress-bar me-1 mb-0",
                }}
              />
              <span style={{ fontSize: "8px", color: "#fba14d" }}>36</span>
            </div>
          </Col>
        </div>{" "}
      </Link>
    ),
    potentialCandidates: (
      <div className="d-flex">
        <Users strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>60</strong>
        </div>
      </div>
    ),
    outreach: (
      <div className="d-flex">
        <User strokeWidth={1} size={16} />
        <div className="ms-2 font-secondary">
          <strong>30</strong>
        </div>
      </div>
    ),
    responseRate: (
      <div>
        <div className="font-secondary">
          <strong>52 %</strong>
        </div>
      </div>
    ),
    priority: (
      <div className="d-flex">
        <Flag fill="#DE3E3E" color="#AA1313" size={14} strokeWidth={1.5} />
        <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
          High
        </span>
        <ChevronDown color="#8FA8D7" size={14} strokeWidth={1.5} />
      </div>
    ),
    dateCreated: (
      <div>
        <span>Aug 24, 2023</span>
        <span style={{ color: "#299A16" }}>( 18 Days)</span>
      </div>
    ),
    status: (
      <div>
        <span>Active</span>
        <Media key="1">
          <Media body className="text-start switch-sm ">
            <Label className="switch">
              <Input type="checkbox" />
              <span className="switch-state"></span>
            </Label>
          </Media>
        </Media>
      </div>
    ),
    remove: <Trash2 strokeWidth={0.5} color="#9B9999" size={20} />,
  },
];

export const tableColumns = [
  {
    name: <>Name</>,
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: (
      <>
        <button
          id="potentialToolTip"
          className="d-flex"
          style={{
            cursor: "pointer",
            backgroundColor: "white",
            border: "none",
            fontWeight: "600",
            color: "black",
          }}
        >
          Potential Candidates{" "}
          <Info className="ms-1" strokeWidth={1} size={16} color="#8FA8D7" />
          <UncontrolledTooltip
            target="potentialToolTip"
            placement="bottom"
            style={{
              backgroundColor: "#595959",
              boxShadow: "0px 6px 26px -3.89px #0000001A",
            }}
          >
            <div
              style={{
                width: "100%",
                left: "300px",
                backgroundColor: "#595959",
              }}
              className="d-flex"
            >
              <Info color="#8FA8D7" size={70} />
              <span className="ms-2 text-white">
                The total number of unique candidate profiles the tool has
                interacted with.
              </span>
            </div>
          </UncontrolledTooltip>
        </button>
      </>
    ),
    selector: (row) => row["potentialCandidates"],
    sortable: true,
    center: true,
    width: "15%",
  },
  {
    name: (
      <>
        <button
          id="potentialToolTip"
          className="d-flex"
          style={{
            cursor: "pointer",
            backgroundColor: "white",
            border: "none",
            fontWeight: "600",
            color: "black",
          }}
        >
          Outreach{" "}
          <Info className="ms-1" strokeWidth={1} size={16} color="#8FA8D7" />
          <UncontrolledTooltip
            target="potentialToolTip"
            placement="bottom"
            style={{
              backgroundColor: "#595959",
              boxShadow: "0px 6px 26px -3.89px #0000001A",
            }}
          >
            <div
              style={{
                width: "100%",
                left: "300px",
                backgroundColor: "#595959",
              }}
              className="d-flex"
            >
              <Info color="#8FA8D7" size={70} />
              <span className="ms-2 text-white">
                The total number of unique candidate profiles the tool has
                interacted with.
              </span>
            </div>
          </UncontrolledTooltip>
        </button>
      </>
    ),
    selector: (row) => row["outreach"],
    sortable: true,
    center: true,
    width: "12%",
  },
  {
    name: (
      <>
        <button
          id="responseToolTip"
          className="d-flex"
          style={{
            cursor: "pointer",
            backgroundColor: "white",
            border: "none",
            fontWeight: "600",
            color: "black",
          }}
        >
          Response Rate
          <Info className="ms-1" strokeWidth={1} size={16} color="#8FA8D7" />
          <UncontrolledTooltip
            target="responseToolTip"
            placement="bottom"
            style={{
              backgroundColor: "#595959",
              boxShadow: "0px 6px 26px -3.89px #0000001A",
            }}
          >
            <div
              style={{
                width: "100%",
                left: "300px",
                backgroundColor: "#595959",
              }}
              className="d-flex"
            >
              <Info color="#8FA8D7" size={70} />
              <span className="ms-2 text-white">
                The total number of unique candidate profiles the tool has
                interacted with.
              </span>
            </div>
          </UncontrolledTooltip>
        </button>
      </>
    ),
    selector: (row) => row["responseRate"],
    sortable: true,
    center: true,
    width: "12%",
  },
  {
    name: (
      <>
        <button
          id="priorityToolTip"
          className="d-flex"
          style={{
            cursor: "pointer",
            backgroundColor: "white",
            border: "none",
            fontWeight: "600",
            color: "black",
          }}
        >
          Priority
          <Info className="ms-1" strokeWidth={1} size={16} color="#8FA8D7" />
          <UncontrolledTooltip
            target="priorityToolTip"
            placement="bottom"
            style={{
              backgroundColor: "#595959",
              boxShadow: "0px 6px 26px -3.89px #0000001A",
            }}
          >
            <div
              style={{
                width: "100%",
                left: "300px",
                backgroundColor: "#595959",
              }}
              className="d-flex"
            >
              <Info color="#8FA8D7" size={70} />
              <span className="ms-2 text-white">
                The total number of unique candidate profiles the tool has
                interacted with.
              </span>
            </div>
          </UncontrolledTooltip>
        </button>
      </>
    ),
    selector: (row) => row["priority"],
    sortable: true,
    center: true,
    width: "8%",
  },
  {
    name: <>Date Created</>,
    selector: (row) => row["dateCreated"],
    sortable: true,
    center: true,
  },
  {
    name: <>Status</>,
    selector: (row) => row["status"],
    sortable: true,
    center: true,
    width: "6%",
  },
  {
    name: <>Remove</>,
    selector: (row) => row["remove"],
    center: true,
    width: "6%",
  },
];
