import React, { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Col, Media, Row } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, H6, Image, LI, P, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
import { Codepen } from "react-feather";
import linkedin from "../../../../assets/used-files/images/jobDetail/linkedin.svg";
import message from "../../../../assets/used-files/images/jobDetail/message.svg";

const TopCandidate = () => {
  return (
    <Fragment>
      <Card style={{ height: "90%" }}>
        <CardBody style={{ padding: "20px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 400,
              position: "relative",
              width: "100%",
              color: "#595959",
            }}
          >
            Top Candidates
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "10%",
                borderBottom: "1px solid #1264FD",
              }}
            ></span>
          </p>
          <div
            style={{ overflow: "auto", maxHeight: "430px" }}
            className="custom-scrollbar p-3"
          >
            <Card
              style={{
                border: "1px solid #EBF1FC",
                boxShadow: "3px 3px 3px 0px #BA9FC914",
              }}
            >
              <CardBody style={{ padding: "10px" }}>
                <div className="media">
                  <div className="avatar me-3 ms-1">
                    <Image
                      attrImage={{
                        body: true,
                        className: "img-50 rounded-circle",
                        src: `${require("../../../../assets/images/user/1.jpg")}`,
                        alt: "#",
                      }}
                    />
                  </div>
                  <Media body className="d-flex justify-content-between">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <p
                          style={{ fontSize: "14px", fontWeight: 400 }}
                          className="mb-0"
                        >
                          {"Brooklyn Simmons"}
                        </p>
                        <p
                          style={{
                            color: "#819ACB",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                          className="mt-0 mb-3"
                        >
                          Apple
                        </p>
                      </div>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 400,
                        }}
                      >
                        Overall{" "}
                        <span
                          style={{
                            color: "#299A16",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          89%
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: "#595959",
                            fontSiz: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {"6 Years"}
                        </p>
                      </div>
                      <div>
                        <Image
                          attrImage={{
                            body: true,
                            className: "me-2",
                            src: linkedin,
                            alt: "#",
                          }}
                        />
                        <Image
                          attrImage={{
                            src: message,
                          }}
                        />
                      </div>
                    </div>
                  </Media>
                </div>
              </CardBody>
            </Card>
            <Card
              style={{
                border: "1px solid #EBF1FC",
                boxShadow: "3px 3px 3px 0px #BA9FC914",
              }}
            >
              <CardBody style={{ padding: "10px" }}>
                <div className="media">
                  <div className="avatar me-3 ms-1">
                    <Image
                      attrImage={{
                        body: true,
                        className: "img-50 rounded-circle",
                        src: `${require("../../../../assets/images/user/1.jpg")}`,
                        alt: "#",
                      }}
                    />
                  </div>
                  <Media body className="d-flex justify-content-between">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <p
                          style={{ fontSize: "14px", fontWeight: 400 }}
                          className="mb-0"
                        >
                          {"Brooklyn Simmons"}
                        </p>
                        <p
                          style={{
                            color: "#819ACB",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                          className="mt-0 mb-3"
                        >
                          Apple
                        </p>
                      </div>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 400,
                        }}
                      >
                        Overall{" "}
                        <span
                          style={{
                            color: "#299A16",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          89%
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: "#595959",
                            fontSiz: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {"6 Years"}
                        </p>
                      </div>
                      <div>
                        <Image
                          attrImage={{
                            body: true,
                            className: "me-2",
                            src: linkedin,
                            alt: "#",
                          }}
                        />
                        <Image
                          attrImage={{
                            src: message,
                          }}
                        />
                      </div>
                    </div>
                  </Media>
                </div>
              </CardBody>
            </Card>
            <Card
              style={{
                border: "1px solid #EBF1FC",
                boxShadow: "3px 3px 3px 0px #BA9FC914",
              }}
            >
              <CardBody style={{ padding: "10px" }}>
                <div className="media">
                  <div className="avatar me-3 ms-1">
                    <Image
                      attrImage={{
                        body: true,
                        className: "img-50 rounded-circle",
                        src: `${require("../../../../assets/images/user/1.jpg")}`,
                        alt: "#",
                      }}
                    />
                  </div>
                  <Media body className="d-flex justify-content-between">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <p
                          style={{ fontSize: "14px", fontWeight: 400 }}
                          className="mb-0"
                        >
                          {"Brooklyn Simmons"}
                        </p>
                        <p
                          style={{
                            color: "#819ACB",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                          className="mt-0 mb-3"
                        >
                          Apple
                        </p>
                      </div>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 400,
                        }}
                      >
                        Overall{" "}
                        <span
                          style={{
                            color: "#299A16",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          89%
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: "#595959",
                            fontSiz: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {"6 Years"}
                        </p>
                      </div>
                      <div>
                        <Image
                          attrImage={{
                            body: true,
                            className: "me-2",
                            src: linkedin,
                            alt: "#",
                          }}
                        />
                        <Image
                          attrImage={{
                            src: message,
                          }}
                        />
                      </div>
                    </div>
                  </Media>
                </div>
              </CardBody>
            </Card>
            <Card
              style={{
                border: "1px solid #EBF1FC",
                boxShadow: "3px 3px 3px 0px #BA9FC914",
              }}
            >
              <CardBody style={{ padding: "10px" }}>
                <div className="media">
                  <div className="avatar me-3 ms-1">
                    <Image
                      attrImage={{
                        body: true,
                        className: "img-50 rounded-circle",
                        src: `${require("../../../../assets/images/user/1.jpg")}`,
                        alt: "#",
                      }}
                    />
                  </div>
                  <Media body className="d-flex justify-content-between">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <p
                          style={{ fontSize: "14px", fontWeight: 400 }}
                          className="mb-0"
                        >
                          {"Brooklyn Simmons"}
                        </p>
                        <p
                          style={{
                            color: "#819ACB",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                          className="mt-0 mb-3"
                        >
                          Apple
                        </p>
                      </div>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 400,
                        }}
                      >
                        Overall{" "}
                        <span
                          style={{
                            color: "#299A16",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          89%
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: "#595959",
                            fontSiz: "12px",
                            fontWeight: 400,
                          }}
                        >
                          {"6 Years"}
                        </p>
                      </div>
                      <div>
                        <Image
                          attrImage={{
                            body: true,
                            className: "me-2",
                            src: linkedin,
                            alt: "#",
                          }}
                        />
                        <Image
                          attrImage={{
                            src: message,
                          }}
                        />
                      </div>
                    </div>
                  </Media>
                </div>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default TopCandidate;
