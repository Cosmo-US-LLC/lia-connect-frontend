import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { H6 } from "../../../../AbstractElements";
import DataTableComponent from "./DataTableComponent";
import Select from "react-select";
import { Form, InputGroup, InputGroupText } from "reactstrap";
import { ChevronDown, FileText, Filter, Map, Sliders } from "react-feather";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchCandidates } from "../../../../redux/candidate/candidateActions";
import { Input, Label, Media } from "reactstrap";
import { Image } from "../../../../AbstractElements";
import user1 from "../../../../assets/images/user/user.png";
import { Mail } from "react-feather";
import { Link } from "react-router-dom";
import { Check, Search, User, MapPin } from "react-feather";
import Jobs from "Components/Alfren/Job/list/modals/jobs";
import Priority from "Components/Alfren/Job/list/modals/priority";
import DateModal from "Components/Alfren/Job/list/modals/date";
import { IoFilterOutline } from "react-icons/io5";

const DataTables = () => {
  const dispatch = useDispatch();
  const [candidateList, setCandidateList] = useState([]);
  const [searchDropdown, setsSearchDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [priorityDropdownRow, setPriorityDropdownRow] = useState([]);
  const [jobAPIResult, setJobAPIResult] = useState([]);
  const [show, setShow] = useState(false);
  const [getJobId, setGetJobId] = useState(null);

  const [jobsList, setJobsList] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [paginatedUpdated, setPaginatedUpdated] = useState(false);
  const [searchJobs, setSearchJobs] = useState([]);
  const [isJobSelected, setIsJobSelected] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [activeOnly, setActiveOnly] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    totalPages: null,
    totalResults: null,
  });

  // function handle dropdown states
  const statuses = [
    "Shortlisted",
    "Rejected",
    "Pending",
  ];
  const [status, setStatus] = useState("");
  const [isStatusSelected, setIsStatusSelected] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);

  const toggleSearchDropdown = () => {
    setsSearchDropdown(!searchDropdown);
  };
  const closeSearchDropdown = () => {
    setsSearchDropdown(false);
  };
  const togglePriorityDropdown = () => {
    setPriorityDropdown(!priorityDropdown);
  };
  const toggleDateDropdown = () => {
    setDateDropdown(!dateDropdown);
  };
  const closeDateDropdown = () => {
    setDateDropdown(false);
  };

  const handleCheckboxChange = () => {
    setActiveOnly(!activeOnly);
  };
  const handleClose = () => setShow(false);
  const [isPrioritySelected, setIsPrioritySelected] = useState(false);
  const [priorities, setPriorities] = useState([
    {
      id: 1,
      title: "HIGH",
      isChecked: false,
      fill: "#DE3E3E",
      color: "#AA1313",
    },
    {
      id: 2,
      title: "MEDIUM",
      isChecked: false,
      fill: "#FECF41",
      color: "#E2B323",
    },
    {
      id: 3,
      title: "LOW",
      isChecked: false,
      fill: "#CECECE",
      color: "#ABABAB",
    },
  ]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: state.isSelected ? "#333" : "#ECEDFC",
      border: "none",
      boxShadow: state.isFocused ? "0 0 0 1px #ccc" : "none",
      minHeight: "38px",
      padding: "0 10px",
      color: "#8E92ED",
      borderRadius: "0px 30px 30px 0px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#222" : "#ECEDFC",
      color: "#8E92ED",
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
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#8E92ED",
    }),
  };

  useEffect(() => {
    fetchCandidatePaginated();
  }, [paginatedUpdated]);

  const fetchCandidatePaginated = async (e) => {
    const urlParams = "page=" + pagination.page + "&limit=" + pagination.limit;
    const formPayload = {
      urlParams,
      body: {},
    };

    dispatch(
      fetchCandidates(formPayload, (resp) => {
        if (resp?.status == 200) {
          // toast.success("JobsFetched successfully");
          setPagination(resp.data.pagination);
          const results = resp.data.results;
          setTableColumns([
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
              name: "Overall Score",
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
              name: "Status",
              selector: (row) => row["status"],
              sortable: true,
              center: true,
            },
            {
              name: "Blacklist",
              selector: (row) => row["blacklist"],
              sortable: true,
              center: true,
            },
          ]);
          const mappedRecords = mapTableData(results);
          console.log("mappedRecords", mappedRecords);
          setCandidateList(mappedRecords);
        } else {
          const err = resp?.message;
          toast.error(err);
        }
      })
    );
  };

  console.log("candidateList", candidateList);

  const mapTableData = (results) => {
    let candidateMappedList = results.map((item, index) => {
      console.log("item", item);
      return {
        id: index,
        name: (
          <Link to={"detail/" + item.id} key={item.id}>
            <Media className="d-flex">
              {/* <Image
                attrImage={{
                  className: "rounded-circle img-30 me-3",
                  src: item.image ? item.image : `${user1}`,
                  alt: "Generic placeholder image",
                }}
              /> */}
              <Media body className="align-self-center">
                <div>{item.name}</div>
              </Media>
            </Media>
          </Link>
        ),
        jobTitle: item.jobTitle ? (
          // item?.jobTitle.split(" @")[0]
          <a href={`http://localhost:3000/v1/jobs/detail/${item?.jobId}`}>
            {item?.jobTitle}
            {/* {item?.jobTitle.split(" @")[0]} */}
          </a>
        ) : (
          "N/A"
        ),
        linkedin: (
          <Link
            to={item.linkedProfile}
            target="_blank"
            style={{
              width: "130px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "visible",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                position: "relative",
                overflow: "visible",
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                src={item.image || user1}
                alt={item.name}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  backgroundColor: "#FFF",
                  // backgroundColor: "#0a66c2",
                  padding: "3px",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="#bdbdbd"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"></path>
                </svg>
              </div>
            </div>
          </Link>
        ),

        // linkedin: <Link to={(item.linkedProfile)} target="_blank">{item.linkedProfile}</Link>,
        profileScore: item.profileScore ? (
          <div
            style={{
              width: "100px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="d-flex gap-2 align-items-center">
              <div className="font-secondary">{item.profileScore}%</div>
              <div className="badge badge-light-warning">Average</div>
            </div>
          </div>
        ) : (
          "N/A"
        ),
        lastAction: item.lastAction
          ? (() => {
              const [actionName, actionDate] = item.lastAction.split(" on ");
              return (
                <div style={{}}>
                  <span
                    className="f-w-700"
                    style={{
                      color: "#299A16",
                      display: "inline-flex",
                      fontSize: "11px",
                    }}
                  >
                    {/* <Mail strokeWidth={0.5} size={15} />{" "} */}
                    <span style={{}}>{actionName}</span>
                    {/* <Check strokeWidth={0.5} size={15} /> */}
                  </span>
                  <div
                    className=""
                    style={{ color: "#C6C9F0", fontSize: "11px" }}
                  >
                    {actionDate}
                  </div>
                </div>
              );
            })()
          : "N/A",

        status: item.status ? (
          <div
            style={{
              width: "100px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.status == "Shortlisted" ? (
              <div style={{
                color: "green",
                backgroundColor: "#E6F9E6",
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "12px",
              }}>{item.status}</div>
            ) : item.status == "Rejected" ? (
              <div style={{
                color: "red",
                backgroundColor: "#F9E6E6",
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "12px",
              }}>{item.status}</div>
            ) : (
              <div style={{
                color: "grey",
                backgroundColor: "#F0F0F0",
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "12px",
              }}>
                {item.status}
              </div>
            )}
          </div>
        ) : (
          "N/A"
        ),

        blacklist: (
          <Media key="1">
            <Media
              body
              className="  switch-sm  "
              style={{
                width: "110px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Label className="switch">
                <Input
                  type="checkbox"
                  checked={item.blacklisted ? true : false}
                />
                <span className="switch-state"></span>
              </Label>
            </Media>
          </Media>
        ),
      };
    });

    return candidateMappedList;
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card style={{ boxShadow: "none" }}>
              <CardHeader>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
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
                        Job Title
                      </span>
                    </button>
                    {searchDropdown && (
                      <Jobs
                        jobs={searchJobs}
                        setJobs={setSearchJobs}
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
                      <User strokeWidth={1} size={16} />
                      <span className="ms-2" style={{ fontSize: "12px" }}>
                        Name
                      </span>
                    </button>
                    <div style={{
                      display: "inline-flex",
                      position: "relative",
                      bottom: "3px",
                      marginRight: "8px",
                    }}>
                      <button
                        style={{
                          display: "inline-flex",
                          border:
                            statusDropdown || isStatusSelected
                              ? "1px solid #337CC7"
                              : "1px solid #F0F0F0",
                          color:
                            statusDropdown || isStatusSelected
                              ? "#337CC7"
                              : "#595959",
                          backgroundColor:
                            statusDropdown || isStatusSelected ? "#F5F9FF" : "white",
                          borderRadius: "4px",
                          padding: "8px",
                        }}
                        onClick={()=>setStatusDropdown(!statusDropdown)}
                      >
                        <span
                          className="ms-2"
                          style={{ fontSize: "12px", marginRight: "5px" }}
                        >
                          {isStatusSelected ? isStatusSelected : "Status"}
                        </span>
                        <ChevronDown strokeWidth={1} size={16} />
                      </button>
                      {statusDropdown && (
                        <div style={{
                          position: "absolute",
                          top: "40px",
                          backgroundColor: "white",
                          border: "1px solid #F0F0F0",
                          borderRadius: "4px",
                          padding: "2px 4px",
                          zIndex: 1,
                        }}>
                          {statuses.map((status) => (
                            <div
                              key={status}
                              onClick={() => {
                                setStatus(status);
                                setIsStatusSelected(status);
                                setStatusDropdown(false);
                              }}
                              style={{
                                padding: "4px",
                                cursor: "pointer",
                                color: "#595959",
                              }}
                            >
                              {status}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
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
                      <span
                        className="ms-2 me-2"
                        style={{
                          opacity: activeOnly ? "40%" : "100%",
                          fontSize: "12px",
                        }}
                      >
                        All{" "}
                      </span>
                      <Media body className="text-end switch-sm ">
                        <Label
                          className="switch"
                          style={{
                            marginTop: "0px",
                          }}
                        >
                          <Input
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            checked={activeOnly}
                          />
                          <span
                            className="switch-state"
                            style={{ background: "black" }}
                          ></span>
                        </Label>
                      </Media>
                      <span
                        style={{
                          opacity: activeOnly ? "100%" : "40%",
                          fontSize: "12px",
                          marginLeft: "4px",
                        }}
                      >
                        Blacklisted Only
                      </span>
                    </button>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <span
                      style={{
                        opacity: activeOnly ? "100%" : "40%",
                        fontSize: "12px",
                        marginLeft: "4px",
                      }}
                    >
                      Sort By:
                    </span>
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
                      <IoFilterOutline size={16} />
                      <span className="ms-2 me-2" style={{ fontSize: "12px" }}>
                        Date Added
                      </span>
                      <ChevronDown strokeWidth={1} size={16} />
                    </button>
                  </Col>
                </Row>
              </CardHeader>
              <DataTableComponent
                paginatedUpdated={paginatedUpdated}
                data={candidateList}
                paginationDetails={pagination}
                tableColumns={tableColumns}
                setPagination={setPagination}
                setPaginatedUpdated={setPaginatedUpdated}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DataTables;
