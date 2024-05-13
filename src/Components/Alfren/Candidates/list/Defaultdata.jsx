import React from "react";
import { Input, Label, Media } from "reactstrap";
import { Image } from "../../../../AbstractElements";
import user1 from "../../../../assets/images/user/1.jpg";
import { Check, Mail } from "react-feather";
import { Link } from "react-router-dom";

export const dummytabledata = [
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <Media className="d-flex">
          <Image
            attrImage={{
              className: "rounded-circle img-30 me-3",
              src: `${user1}`,
              alt: "Generic placeholder image",
            }}
          />
          <Media body className="align-self-center">
            <div>Airi Satou</div>
          </Media>
        </Media>
      </Link>
    ),
    jobTitle: "System Architect",
    linkedin: "https://www.linkedin.com/in/mueedsajjad/",
    profileScore: (
      <div>
        <div className="font-secondary">52/100</div>
        <div className="badge badge-light-warning">Average</div>
      </div>
    ),
    lastAction: (
      <div>
        <span
          className="f-w-700 "
          style={{ color: "#299A16", display: "inline-flex" }}
        >
          <Mail strokeWidth={0.5} size={15} />{" "}
          <span className="pe-1 ps-2">Send a message</span>
          <Check strokeWidth={0.5} size={15} />
        </span>
        <div className="mt-1" style={{ color: "#C6C9F0" }}>
          May 29, 2017
        </div>
      </div>
    ),
    blacklist: (
      <Media key="1">
        <Media body className="text-end switch-sm ">
          <Label className="switch">
            <Input type="checkbox" checked />
            <span className="switch-state"></span>
          </Label>
        </Media>
      </Media>
    ),
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <Media className="d-flex">
          <Image
            attrImage={{
              className: "rounded-circle img-30 me-3",
              src: `${user1}`,
              alt: "Generic placeholder image",
            }}
          />
          <Media body className="align-self-center">
            <div>Airi Satou</div>
          </Media>
        </Media>
      </Link>
    ),
    jobTitle: "System Architect",
    linkedin: "https://www.linkedin.com/in/mueedsajjad/",
    profileScore: (
      <div>
        <div className="font-secondary">52/100</div>
        <div className="badge badge-light-warning">Average</div>
      </div>
    ),
    lastAction: (
      <div>
        <span
          className="f-w-700 "
          style={{ color: "#299A16", display: "inline-flex" }}
        >
          <Mail strokeWidth={0.5} size={15} />{" "}
          <span className="pe-1 ps-2">Send a message</span>
          <Check strokeWidth={0.5} size={15} />
        </span>
        <div className="mt-1" style={{ color: "#C6C9F0" }}>
          May 29, 2017
        </div>
      </div>
    ),
    blacklist: (
      <Media key="1">
        <Media body className="text-end switch-sm ">
          <Label className="switch">
            <Input type="checkbox" />
            <span className="switch-state"></span>
          </Label>
        </Media>
      </Media>
    ),
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <Media className="d-flex">
          <Image
            attrImage={{
              className: "rounded-circle img-30 me-3",
              src: `${user1}`,
              alt: "Generic placeholder image",
            }}
          />
          <Media body className="align-self-center">
            <div>Airi Satou</div>
          </Media>
        </Media>
      </Link>
    ),
    jobTitle: "System Architect",
    linkedin: "https://www.linkedin.com/in/mueedsajjad/",
    profileScore: (
      <div>
        <div className="font-secondary">52/100</div>
        <div className="badge badge-light-warning">Average</div>
      </div>
    ),
    lastAction: (
      <div>
        <span
          className="f-w-700 "
          style={{ color: "#299A16", display: "inline-flex" }}
        >
          <Mail strokeWidth={0.5} size={15} />{" "}
          <span className="pe-1 ps-2">Send a message</span>
          <Check strokeWidth={0.5} size={15} />
        </span>
        <div className="mt-1" style={{ color: "#C6C9F0" }}>
          May 29, 2017
        </div>
      </div>
    ),
    blacklist: (
      <Media key="1">
        <Media body className="text-end switch-sm ">
          <Label className="switch">
            <Input type="checkbox" />
            <span className="switch-state"></span>
          </Label>
        </Media>
      </Media>
    ),
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <Media className="d-flex">
          <Image
            attrImage={{
              className: "rounded-circle img-30 me-3",
              src: `${user1}`,
              alt: "Generic placeholder image",
            }}
          />
          <Media body className="align-self-center">
            <div>Airi Satou</div>
          </Media>
        </Media>
      </Link>
    ),
    jobTitle: "System Architect",
    linkedin: "https://www.linkedin.com/in/mueedsajjad/",
    profileScore: (
      <div>
        <div className="font-secondary">52/100</div>
        <div className="badge badge-light-warning">Average</div>
      </div>
    ),
    lastAction: (
      <div>
        <span
          className="f-w-700 "
          style={{ color: "#299A16", display: "inline-flex" }}
        >
          <Mail strokeWidth={0.5} size={15} />{" "}
          <span className="pe-1 ps-2">Send a message</span>
          <Check strokeWidth={0.5} size={15} />
        </span>
        <div className="mt-1" style={{ color: "#C6C9F0" }}>
          May 29, 2017
        </div>
      </div>
    ),
    blacklist: (
      <Media key="1">
        <Media body className="text-end switch-sm ">
          <Label className="switch">
            <Input type="checkbox" />
            <span className="switch-state"></span>
          </Label>
        </Media>
      </Media>
    ),
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <Media className="d-flex">
          <Image
            attrImage={{
              className: "rounded-circle img-30 me-3",
              src: `${user1}`,
              alt: "Generic placeholder image",
            }}
          />
          <Media body className="align-self-center">
            <div>Airi Satou</div>
          </Media>
        </Media>
      </Link>
    ),
    jobTitle: "System Architect",
    linkedin: "https://www.linkedin.com/in/mueedsajjad/",
    profileScore: (
      <div>
        <div className="font-secondary">52/100</div>
        <div className="badge badge-light-warning">Average</div>
      </div>
    ),
    lastAction: (
      <div>
        <span
          className="f-w-700 "
          style={{ color: "#299A16", display: "inline-flex" }}
        >
          <Mail strokeWidth={0.5} size={15} />{" "}
          <span className="pe-1 ps-2">Send a message</span>
          <Check strokeWidth={0.5} size={15} />
        </span>
        <div className="mt-1" style={{ color: "#C6C9F0" }}>
          May 29, 2017
        </div>
      </div>
    ),
    blacklist: (
      <Media key="1">
        <Media body className="text-end switch-sm ">
          <Label className="switch">
            <Input type="checkbox" checked />
            <span className="switch-state"></span>
          </Label>
        </Media>
      </Media>
    ),
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <Media className="d-flex">
          <Image
            attrImage={{
              className: "rounded-circle img-30 me-3",
              src: `${user1}`,
              alt: "Generic placeholder image",
            }}
          />
          <Media body className="align-self-center">
            <div>Airi Satou</div>
          </Media>
        </Media>
      </Link>
    ),
    jobTitle: "System Architect",
    linkedin: "https://www.linkedin.com/in/mueedsajjad/",
    profileScore: (
      <div>
        <div className="font-secondary">52/100</div>
        <div className="badge badge-light-warning">Average</div>
      </div>
    ),
    lastAction: (
      <div>
        <span
          className="f-w-700 "
          style={{ color: "#299A16", display: "inline-flex" }}
        >
          <Mail strokeWidth={0.5} size={15} />{" "}
          <span className="pe-1 ps-2">Send a message</span>
          <Check strokeWidth={0.5} size={15} />
        </span>
        <div className="mt-1" style={{ color: "#C6C9F0" }}>
          May 29, 2017
        </div>
      </div>
    ),
    blacklist: (
      <Media key="1">
        <Media body className="text-end switch-sm ">
          <Label className="switch">
            <Input type="checkbox" />
            <span className="switch-state"></span>
          </Label>
        </Media>
      </Media>
    ),
  },
  {
    id: 1,
    name: (
      <Link to="detail/1">
        <Media className="d-flex">
          <Image
            attrImage={{
              className: "rounded-circle img-30 me-3",
              src: `${user1}`,
              alt: "Generic placeholder image",
            }}
          />
          <Media body className="align-self-center">
            <div>Airi Satou</div>
          </Media>
        </Media>
      </Link>
    ),
    jobTitle: "System Architect",
    linkedin: "https://www.linkedin.com/in/mueedsajjad/",
    profileScore: (
      <div>
        <div className="font-secondary">52/100</div>
        <div className="badge badge-light-warning">Average</div>
      </div>
    ),
    lastAction: (
      <div>
        <span
          className="f-w-700 "
          style={{ color: "#299A16", display: "inline-flex" }}
        >
          <Mail strokeWidth={0.5} size={15} />{" "}
          <span className="pe-1 ps-2">Send a message</span>
          <Check strokeWidth={0.5} size={15} />
        </span>
        <div className="mt-1" style={{ color: "#C6C9F0" }}>
          May 29, 2017
        </div>
      </div>
    ),
    blacklist: (
      <Media key="1">
        <Media body className="text-end switch-sm ">
          <Label className="switch">
            <Input type="checkbox" />
            <span className="switch-state"></span>
          </Label>
        </Media>
      </Media>
    ),
  },
];

export const tableColumns = [
  {
    name: "Name",
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: "Job Title",
    selector: (row) => row["jobTitle"],
    sortable: true,
    center: true,
  },
  {
    name: "LinkedIn Profile",
    selector: (row) => row["linkedin"],
    sortable: true,
    center: true,
  },
  {
    name: "Profile Score",
    selector: (row) => row["profileScore"],
    sortable: true,
    center: true,
  },
  {
    name: "Last Action",
    selector: (row) => row["lastAction"],
    sortable: true,
    center: true,
  },
  {
    name: "Blacklist",
    selector: (row) => row["blacklist"],
    sortable: true,
    center: true,
  },
];
