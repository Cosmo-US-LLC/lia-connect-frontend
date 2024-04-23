import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Input,
  FormGroup,
  Media,
  Label,
  Tooltip,
  UncontrolledTooltip,
} from "reactstrap";
import { H4, H6, LI, ToolTip, UL } from "../../../../AbstractElements";
import DataTableComponent from "./DataTableComponent";
import Select from "react-select";
import { Form, InputGroup, InputGroupText } from "reactstrap";
import {
  Check,
  Clock,
  FileText,
  Filter,
  Flag,
  Info,
  Plus,
  Search,
  X,
} from "react-feather";
import Jobs from "./modals/jobs";
import Priority from "./modals/priority";

const DataTables = () => {
  const [searchDropdown, setsSearchDropdown] = useState(false);

  const [selectedJobs, setSelectedJobs] = useState([]);

  const toggleSearchDropdown = () => {
    setsSearchDropdown(!searchDropdown);
  };
  const closeSearchDropdown = () => {
    setsSearchDropdown(false);
  };
  const [jobs, setJobs] = useState([
    { id: 1, title: "Marketing Manager", isChecked: false },
    { id: 2, title: "Social Media Manager ", isChecked: false },
    { id: 3, title: "Digital Strategist", isChecked: false },
    { id: 4, title: "Jr. Seo Specialist", isChecked: false },
    { id: 5, title: "Content Writer", isChecked: false },
    { id: 6, title: "Sr. Graphic Designer", isChecked: false },
    { id: 7, title: "Front-End Developers", isChecked: false },
    { id: 8, title: "Marketing Executive", isChecked: false },
    { id: 9, title: "Sr. Backend Engineer", isChecked: false },
    { id: 10, title: "Web Designer", isChecked: false },
  ]);
  const [isJobSelected, setIsJobSelected] = useState(false);

  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [isPrioritySelected, setIsPrioritySelected] = useState(false);

  const [priorities, setPriorities] = useState([
    {
      id: 1,
      title: "High",
      isChecked: true,
      fill: "#DE3E3E",
      color: "#AA1313",
    },
    {
      id: 2,
      title: "Medium",
      isChecked: true,
      fill: "#FECF41",
      color: "#E2B323",
    },
    {
      id: 3,
      title: "Low",
      isChecked: false,
      fill: "#CECECE",
      color: "#ABABAB",
    },
  ]);

  const togglePriorityDropdown = () => {
    setPriorityDropdown(!priorityDropdown);
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card style={{ boxShadow: "none" }}>
              <CardHeader className="pb-3">
                <Row>
                  <Col xl="9">
                    {" "}
                    <button
                      style={{
                        display: "inline-flex",
                        border:
                          searchDropdown || isJobSelected
                            ? "1px solid #337CC7"
                            : "1px solid #F0F0F0",
                        color:
                          searchDropdown || isJobSelected
                            ? "#337CC7"
                            : "#595959",
                        backgroundColor:
                          searchDropdown || isJobSelected ? "#F5F9FF" : "white",
                        borderRadius: "4px",
                        padding: "8px",
                        marginRight: "8px",
                      }}
                      onClick={toggleSearchDropdown}
                    >
                      <Search strokeWidth={1} size={16} />
                      <span className="ms-2 me-4" style={{ fontSize: "12px" }}>
                        Search Jobs
                      </span>
                    </button>
                    {searchDropdown && (
                      <Jobs
                        jobs={jobs}
                        setJobs={setJobs}
                        closeSearchDropdown={closeSearchDropdown}
                        setSelectedJobs={setSelectedJobs}
                        setIsJobSelected={setIsJobSelected}
                      />
                    )}
                    <button
                      style={{
                        display: "inline-flex",
                        border:
                          priorityDropdown || isPrioritySelected
                            ? "1px solid #337CC7"
                            : "1px solid #F0F0F0",
                        color:
                          priorityDropdown || isPrioritySelected
                            ? "#337CC7"
                            : "#595959",
                        backgroundColor:
                          priorityDropdown || isPrioritySelected
                            ? "#F5F9FF"
                            : "white",
                        borderRadius: "4px",
                        padding: "8px",
                        marginRight: "8px",
                      }}
                      onClick={togglePriorityDropdown}
                    >
                      <Flag strokeWidth={1} size={16} />
                      <span className="ms-2" style={{ fontSize: "12px" }}>
                        Priority
                      </span>
                    </button>
                    {priorityDropdown && (
                      <Priority
                        priorities={priorities}
                        setPriorities={setPriorities}
                        setIsPrioritySelected={setIsPrioritySelected}
                      />
                    )}
                    <button
                      style={{
                        display: "inline-flex",
                        border: "1px solid #F0F0F0",
                        color: "#595959",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        padding: "8px",
                        marginRight: "8px",
                      }}
                    >
                      <Clock strokeWidth={1} size={16} />
                      <span className="ms-2" style={{ fontSize: "12px" }}>
                        Date Created
                      </span>
                    </button>
                    <button
                      style={{
                        display: "inline-flex",
                        border: "none",
                        color: "#595959",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        padding: "8px",
                        marginRight: "8px",
                      }}
                    >
                      <span className="ms-2 me-2" style={{ fontSize: "12px" }}>
                        All{" "}
                      </span>
                      <Media body className="text-end switch-sm ">
                        <Label
                          className="switch"
                          style={{
                            marginTop: "0px",
                          }}
                        >
                          <Input type="checkbox" />
                          <span className="switch-state"></span>
                        </Label>
                      </Media>
                      <span
                        className="ms-2"
                        style={{ opacity: "40%", fontSize: "12px" }}
                      >
                        Active Only
                      </span>
                    </button>
                  </Col>
                  <Col xl="3" style={{ textAlign: "end" }}>
                    <button
                      className="btn btn-primary pe-2 ps-2"
                      style={{ display: "inline-flex" }}
                    >
                      <span>Add New Job</span>
                      <Plus strokeWidth={2} size={20} />
                    </button>
                  </Col>
                  <Col xl="9">
                    <div>
                      {selectedJobs.slice(0, 4).map((job, index) => (
                        <button
                          key={index}
                          style={{
                            display: "inline-flex",
                            border: "none",
                            color: "#595959",
                            backgroundColor: "#F7F7F7",
                            borderRadius: "4px",
                            padding: "6px",
                            marginRight: "8px",
                          }}
                        >
                          <span
                            className="ms-2 me-2"
                            style={{ fontSize: "12px" }}
                          >
                            {job.title}
                          </span>
                          <X strokeWidth={1.5} size={16} />
                        </button>
                      ))}

                      {/* Rendering remaining count if more than 4 jobs are selected */}
                      {selectedJobs.length > 4 && (
                        <button
                          style={{
                            display: "inline-flex",
                            border: "none",
                            color: "#595959",
                            backgroundColor: "white",
                            borderRadius: "4px",
                            padding: "6px",
                            marginRight: "8px",
                          }}
                        >
                          <span
                            className="ms-1 me-2"
                            style={{ fontSize: "12px" }}
                          >
                            +{selectedJobs.length - 4} more
                          </span>
                        </button>
                      )}
                    </div>
                    <div className="mt-2">
                      {priorities
                        .filter((priority) => priority.isChecked)
                        .map((priority, index) => (
                          <button
                            style={{
                              display: "inline-flex",
                              border: "none",
                              color: "#595959",
                              backgroundColor: "#F7F7F7",
                              borderRadius: "4px",
                              padding: "6px",
                              marginRight: "8px",
                            }}
                          >
                            <Flag
                              fill={priority.fill}
                              color={priority.color}
                              size={14}
                              strokeWidth={1.5}
                            />
                            <span
                              className="ms-1 me-2"
                              style={{ fontSize: "12px" }}
                            >
                              {priority.title}
                            </span>
                            <X strokeWidth={1.5} size={16} />
                          </button>
                        ))}
                    </div>
                  </Col>

                  <Col xl="3" className="mt-2" style={{ textAlign: "end" }}>
                    <H6>
                      <strong>263 Jobs</strong>
                    </H6>
                  </Col>
                </Row>
              </CardHeader>
              <DataTableComponent />
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DataTables;
