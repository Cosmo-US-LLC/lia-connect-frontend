import React, { Fragment, useState } from "react";
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
const DataTables = () => {
  const [searchDropdown, setsSearchDropdown] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const showSearchDropdown = () => {
    setsSearchDropdown(true);
  };
  const closeSearchDropdown = () => {
    setsSearchDropdown(false);
  };

  const options = [
    { value: "AL", label: "Campaign A" },
    { value: "AL", label: "Campaign A" },
    { value: "WY", label: "Campaign B" },
    { value: "WY", label: "Campaign C" },
    { value: "WY", label: "Campaign D" },
    { value: "WY", label: "Campaign E" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #F0F0F0",
      borderLeft: "none",
      boxShadow: state.isFocused ? "0 0 0 1px #ccc" : "none",
      minHeight: "38px",
      padding: "0 10px",
      color: "#595959", // Text color for both regular and selected states
      borderRadius: "0px 4px 4px 0px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#222" : "white", // Adjust for selection state
      color: "#595959",
      cursor: "pointer",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0 10px",
      color: "#8E92ED",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#8E92ED",
    }),
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
                        border: "1px solid #F0F0F0",
                        color: "#595959",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        padding: "8px",
                        marginRight: "8px",
                      }}
                      onClick={showSearchDropdown}
                    >
                      <Search strokeWidth={1} size={16} />
                      <span className="ms-2 me-4" style={{ fontSize: "12px" }}>
                        Search Jobs
                      </span>
                    </button>
                    {searchDropdown && (
                      <Jobs
                        closeSearchDropdown={closeSearchDropdown}
                        setSelectedJobs={setSelectedJobs}
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
                      <Flag strokeWidth={1} size={16} />
                      <span className="ms-2" style={{ fontSize: "12px" }}>
                        Priority
                      </span>
                    </button>
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
                  </Col>
                  <Col xl="3" className="mt-2" style={{ textAlign: "end" }}>
                    <H6>
                      <strong>263 Jobs</strong>
                    </H6>
                  </Col>
                  <Col xl="9">
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
                        fill="#DE3E3E"
                        color="#AA1313"
                        size={14}
                        strokeWidth={1.5}
                      />
                      <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
                        High
                      </span>
                      <X strokeWidth={1.5} size={16} />
                    </button>
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
                        fill="#FECF41"
                        color="#E2B323"
                        size={14}
                        strokeWidth={1.5}
                      />
                      <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
                        Medium
                      </span>
                      <X strokeWidth={1.5} size={16} />
                    </button>
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
