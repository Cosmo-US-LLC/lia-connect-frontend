import React, { Fragment, useEffect, useState } from "react";
// import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { H6 } from "../../../../AbstractElements";
import DataTableComponent from "./DataTableComponent";
import Select from "react-select";
import { Form, InputGroup, InputGroupText } from "reactstrap";
import { ChevronDown, FileText, Filter, Map, Sliders, X } from "react-feather";
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
import { fetchJobs } from "../../../../redux/Job/jobActions";
import JobList from "Components/Alfren/Job/list";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { CiCircleInfo } from "react-icons/ci";

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
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

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

  const [selectedJob, setSelectedJob] = useState([]);

  const [name, setName] = useState("");
  const [nameDropdown, setNameDropdown] = useState(false);
  // function handle dropdown states
  const statuses = ["Shortlisted", "Rejected", "Pending"];
  // const [status, setStatus] = useState("");
  const [isStatusSelected, setIsStatusSelected] = useState("");
  const [statusDropdown, setStatusDropdown] = useState(false);

  const toggleSearchDropdown = () => {
    setsSearchDropdown(!searchDropdown);
    statusDropdown && setStatusDropdown(false);
    nameDropdown && setNameDropdown(false);
  };
  const toggleNameDropdown = () => {
    setNameDropdown(!nameDropdown);
    statusDropdown && setStatusDropdown(false);
    searchDropdown && setsSearchDropdown(false);
  };
  const toggleStatusDropdown = () => {
    setStatusDropdown(!statusDropdown);
    nameDropdown && setNameDropdown(false);
    searchDropdown && setsSearchDropdown(false);
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
  const [jobSearchText, setJobSearchText] = useState("");
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

  const addSelectedJobs = () => {
    console.log("Adding Jobs", selectedJob);
    setSearchJobs(selectedJob);
    setsSearchDropdown(false);
    setIsJobSelected(true);
  };

  const updateName = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    setName(name);
    setNameDropdown(false);
  };

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
  }, [paginatedUpdated, searchJobs, name, isStatusSelected, activeOnly]);

  const fetchCandidatePaginated = async (e) => {
    const urlParams = "page=" + pagination.page + "&limit=" + pagination.limit;
    let formPayload = {
      urlParams,
      body: {},
    };

    if (searchJobs && searchJobs?.length > 0) {
      formPayload.body.jobId = searchJobs;
    }
    if (name && name?.length > 0) {
      formPayload.body.name = name;
    }
    if (isStatusSelected && isStatusSelected?.length > 0) {
      formPayload.body.status = isStatusSelected;
    }
    if (activeOnly) {
      formPayload.body.isBlackListed = activeOnly;
    }

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
            // {
            //   name: "Blacklist",
            //   selector: (row) => row["blacklist"],
            //   sortable: true,
            //   center: true,
            // },
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

  const fetchJobPaginated = async (e) => {
    const urlParams = "page=1&limit=100";
    const formPayload = {
      urlParams,
      body: {},
    };
    dispatch(
      fetchJobs(formPayload, (resp) => {
        if (resp?.status == 200) {
          const results = resp.data.results;
          setJobsList(results);
        } else {
          const err = resp?.message;
          toast.error(err);
        }
      })
    );
  };

  useEffect(() => {
    fetchJobPaginated();
  }, []);

  // console.log("candidateList", candidateList);

  const mapTableData = (results) => {
    let candidateMappedList = results.map((item, index) => {
      // console.log("item", item);
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
          <a href={`/jobs/detail/${item?.jobId}`}>
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
                border: "0px",
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  objectFit: "cover",
                  backgroundColor: "#F0F0F0",
                  border: "0px",
                }}
                src={item.image || user1}
                // alt={item.name}
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
              {/* <div className="badge badge-light-warning">Average</div> */}
              <div
                style={{
                  color: "#819ACB",
                  paddingBottom: "6px",
                  cursor: "pointer",
                }}
              >
                {/* Score */}
                <CiCircleInfo
                  style={{
                    color: "black",
                    fontSize: "large",
                    position: "relative",
                    top: "5px",
                    cursor: "pointer",
                    left: "1px",
                  }}
                  onClick={toggleModal}
                />
              </div>
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
              width: "150px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.status == "Shortlisted" ? (
              <div
                style={{
                  color: "green",
                  backgroundColor: "#E6F9E6",
                  padding: "0px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  display: "inline-flex",
                }}
                className="gap-2 align-items-center"
                title="The candidate's profile matches job requirement."
              >
                {item.status}
                <div
                  style={{
                    color: "#819ACB",
                    paddingBottom: "6px",
                    cursor: "pointer",
                  }}
                >
                  <CiCircleInfo
                    style={{
                      color: "black",
                      fontSize: "large",
                      position: "relative",
                      top: "5px",
                      cursor: "pointer",
                      left: "1px",
                    }}
                  />
                </div>
              </div>
            ) : item.status == "Rejected" ? (
              <div
                style={{
                  color: "red",
                  backgroundColor: "#F9E6E6",
                  padding: "0px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  display: "inline-flex",
                }}
                className="gap-2 align-items-center"
                title="The candidate's profile does not match job requirement."
              >
                {item.status}
                <div
                  style={{
                    color: "#819ACB",
                    paddingBottom: "6px",
                    cursor: "pointer",
                  }}
                >
                  <CiCircleInfo
                    style={{
                      color: "black",
                      fontSize: "large",
                      position: "relative",
                      top: "5px",
                      cursor: "pointer",
                      left: "1px",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  color: "grey",
                  backgroundColor: "#F0F0F0",
                  padding: "0px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  display: "inline-flex",
                }}
                className="gap-2 align-items-center"
                title="The candidate's profile has not been ranked yet."
              >
                {item.status}
                <div
                  style={{
                    color: "#819ACB",
                    paddingBottom: "6px",
                    cursor: "pointer",
                  }}
                >
                  <CiCircleInfo
                    style={{
                      color: "black",
                      fontSize: "large",
                      position: "relative",
                      top: "5px",
                      cursor: "pointer",
                      left: "1px",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          "N/A"
        ),

        // blacklist: (
        //   <Media key="1">
        //     <Media
        //       body
        //       className="  switch-sm  "
        //       style={{
        //         width: "110px",
        //         display: "flex",
        //         justifyContent: "center",
        //         alignItems: "center",
        //       }}
        //     >
        //       <Label className="switch">
        //         <Input
        //           type="checkbox"
        //           checked={item.blacklisted ? true : false}
        //         />
        //         <span className="switch-state"></span>
        //       </Label>
        //     </Media>
        //   </Media>
        // ),
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
                        minWidth: "200px",
                      }}
                      onClick={toggleSearchDropdown}
                    >
                      <Search strokeWidth={1} size={16} />
                      <span className="ms-2 me-4" style={{ fontSize: "12px" }}>
                        Job Title
                      </span>
                    </button>
                    {searchDropdown && (
                      // <Jobs
                      //   jobs={searchJobs}
                      //   setJobs={setSearchJobs}
                      //   closeSearchDropdown={closeSearchDropdown}
                      //   setSelectedJobs={setSelectedJobs}
                      //   setIsJobSelected={setIsJobSelected}
                      // />

                      <div
                        style={{
                          position: "absolute",
                          top: "40px",
                          padding: "10px",
                          // position: "absolute",
                          boxShadow: "0px 10px 26px 0px #0000001A",
                          zIndex: 2,
                          backgroundColor: "white",
                          borderRadius: "8px",
                          width: "300px",
                          maxHeight: "400px",
                          overflow: "auto",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Search Job"
                          style={{
                            width: "90%",
                            padding: "5px 10px",
                            border: "1px solid #F0F0F0",
                            borderRadius: "4px",
                            marginBottom: "10px",
                            marginLeft: "10px",
                          }}
                          value={jobSearchText}
                          onChange={(e) => {
                            setJobSearchText(e.target.value);
                            // const filteredJobs = jobsList.filter((job) =>
                            //   job.name
                            //     .toLowerCase()
                            //     .includes(e.target.value.toLowerCase())
                            // );
                            // setJobsList(filteredJobs);
                          }}
                        />
                        <div
                          style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                            padding: "5px 10px",
                            margin: "5px 0",
                          }}
                        >
                          {jobsList.map((job, index) => {
                            if (
                              jobSearchText &&
                              !job.name
                                .toLowerCase()
                                .includes(jobSearchText.toLowerCase())
                            ) {
                              return null;
                            }
                            return (
                              <div key={job.id}>
                                <input
                                  type="checkbox"
                                  checked={selectedJob.includes(job.id)}
                                  onChange={(e) => {
                                    setSelectedJob((prev) => {
                                      if (prev.includes(job.id)) {
                                        console.log(
                                          "Removing job",
                                          job.name,
                                          prev.filter((id) => id !== job.id)
                                            .length
                                        );
                                        return prev.filter(
                                          (id) => id !== job.id
                                        );
                                      } else {
                                        console.log(
                                          "Adding job",
                                          job.name,
                                          [...prev, job.id].length
                                        );
                                        return [...prev, job.id];
                                      }
                                    });
                                  }}
                                  id={`job-${index}`}
                                  name={`job-${index}`}
                                />
                                <label
                                  htmlFor={`job-${index}`}
                                  style={{
                                    marginLeft: "10px",
                                    userSelect: "none",
                                  }}
                                >
                                  {job.name || job.id}
                                </label>
                                <br />
                              </div>
                            );
                          })}
                        </div>
                        <button
                          style={{
                            backgroundColor: "#337CC7",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "5px 16px",
                            marginLeft: "10px",
                            height: "33px",
                          }}
                          onClick={addSelectedJobs}
                        >
                          Filter Candidates
                        </button>
                      </div>
                    )}
                    <button
                      style={{
                        display: "inline-flex",
                        border:
                          nameDropdown || name
                            ? "1px solid #337CC7"
                            : "1px solid #F0F0F0",
                        color: nameDropdown || name ? "#337CC7" : "#595959",
                        backgroundColor:
                          nameDropdown || name ? "#F5F9FF" : "white",
                        borderRadius: "4px",
                        padding: "8px",
                        marginRight: "8px",
                        minWidth: "200px",
                      }}
                      onClick={toggleNameDropdown}
                    >
                      <Search strokeWidth={1} size={16} />
                      <span className="ms-2 me-4" style={{ fontSize: "12px" }}>
                        Name
                      </span>
                    </button>
                    {nameDropdown && (
                      <div
                        style={{
                          position: "absolute",
                          top: "40px",
                          padding: "10px",
                          // position: "absolute",
                          boxShadow: "0px 10px 26px 0px #0000001A",
                          zIndex: 2,
                          backgroundColor: "white",
                          borderRadius: "8px",
                          width: "50%",
                          maxWidth: "410px",
                          maxHeight: "400px",
                          overflow: "auto",
                        }}
                      >
                        <form
                          action=""
                          onSubmit={updateName}
                          style={{ display: "flex", paddingTop: "5px" }}
                        >
                          <label htmlFor="name" style={{ width: "100%" }}>
                            <input
                              type="text"
                              name="name"
                              placeholder="Search Name"
                              style={{
                                width: "100%",
                                padding: "5px 10px",
                                border: "1px solid #F0F0F0",
                                borderRadius: "4px",
                              }}
                            />
                          </label>

                          <button
                            type="submit"
                            style={{
                              backgroundColor: "#337CC7",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              padding: "5px 16px",
                              marginLeft: "10px",
                              height: "33px",
                            }}
                          >
                            Search
                          </button>
                        </form>
                      </div>
                      // <Jobs
                      //   jobs={searchJobs}
                      //   setJobs={setSearchJobs}
                      //   closeSearchDropdown={closeSearchDropdown}
                      //   setSelectedJobs={setSelectedJobs}
                      //   setIsJobSelected={setIsJobSelected}
                      // />
                    )}
                    <div
                      style={{
                        display: "inline-flex",
                        position: "relative",
                        bottom: "3px",
                        marginRight: "8px",
                      }}
                    >
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          border:
                            statusDropdown || isStatusSelected
                              ? "1px solid #337CC7"
                              : "1px solid #F0F0F0",
                          color:
                            statusDropdown || isStatusSelected
                              ? "#337CC7"
                              : "#595959",
                          backgroundColor:
                            statusDropdown || isStatusSelected
                              ? "#F5F9FF"
                              : "white",
                          borderRadius: "4px",
                          padding: "8px",
                          minWidth: "150px",
                        }}
                        onClick={toggleStatusDropdown}
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
                        <div
                          style={{
                            position: "absolute",
                            top: "40px",
                            backgroundColor: "white",
                            border: "1px solid #F0F0F0",
                            borderRadius: "4px",
                            padding: "2px 4px",
                            zIndex: 1,
                            minWidth: "150px",
                          }}
                        >
                          {statuses.map((status) => (
                            <div
                              key={status}
                              onClick={() => {
                                // setStatus(status);
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
                    <div
                      style={{
                        display: "inline-flex",
                        position: "relative",
                        bottom: "3px",
                        marginRight: "8px",
                      }}
                    >
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          border:
                            statusDropdown || isStatusSelected
                              ? "1px solid #337CC7"
                              : "1px solid #F0F0F0",
                          color:
                            statusDropdown || isStatusSelected
                              ? "#337CC7"
                              : "#595959",
                          backgroundColor:
                            statusDropdown || isStatusSelected
                              ? "#F5F9FF"
                              : "white",
                          borderRadius: "4px",
                          padding: "8px",
                          minWidth: "150px",
                        }}
                        onClick={toggleStatusDropdown}
                      >
                        <span
                          className="ms-2"
                          style={{ fontSize: "12px", marginRight: "5px" }}
                        >
                          {isStatusSelected ? isStatusSelected : "Last Action"}
                        </span>
                        <ChevronDown strokeWidth={1} size={16} />
                      </button>
                      {statusDropdown && (
                        <div
                          style={{
                            position: "absolute",
                            top: "40px",
                            backgroundColor: "white",
                            border: "1px solid #F0F0F0",
                            borderRadius: "4px",
                            padding: "2px 4px",
                            zIndex: 1,
                            minWidth: "150px",
                          }}
                        >
                          {statuses.map((status) => (
                            <div
                              key={status}
                              onClick={() => {
                                // setStatus(status);
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
                    {/* <button
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
                    </button> */}
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    {/* <span
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
                    </button> */}
                  </Col>
                </Row>
                <Row>
                  {isJobSelected && searchJobs.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {searchJobs.map((jobId, index) => {
                        const job = jobsList.find((job) => job.id === jobId);
                        return (
                          <div
                            key={jobId}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "#F0F0F0",
                              padding: "5px 10px",
                              borderRadius: "20px",
                              width: "fit-content",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12px",
                                marginRight: "5px",
                              }}
                            >
                              Job: <strong>{job?.name || jobId}</strong>
                            </span>
                            <button
                              onClick={() => {
                                setSearchJobs((prev) =>
                                  prev.filter((id) => id !== jobId)
                                );
                                setSelectedJob((prev) =>
                                  prev.filter((id) => id !== jobId)
                                );
                                if (searchJobs.length === 1) {
                                  setIsJobSelected(false);
                                }
                              }}
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: "0 5px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {name && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                        backgroundColor: "#F0F0F0",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        width: "fit-content",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          marginRight: "5px",
                        }}
                      >
                        Name: <strong>{name}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setName("");
                          setNameDropdown(false);
                        }}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          paddingTop: "5px",
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  {isStatusSelected && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                        backgroundColor: "#F0F0F0",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        width: "fit-content",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          marginRight: "5px",
                        }}
                      >
                        Status: <strong>{isStatusSelected}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setIsStatusSelected(false);
                          setStatusDropdown(false);
                        }}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          paddingTop: "5px",
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
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
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          style={{
            maxWidth: "1000px",
            width: "80%",
            margin: "auto",
          }}
          centered
        >
          <ModalHeader
            style={{
              position: "relative",
              padding: "1rem",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            How Scores Are Calculated
            <button
              type="button"
              onClick={toggleModal}
              style={{
                position: "absolute",
                right: "20px",
                top: "15px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#6c757d",
                padding: "0",
                margin: "0",
              }}
            >
              &times;
            </button>
          </ModalHeader>
          <ModalBody style={{ padding: "2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  width: "100%",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src="../../score-tip1.png"
                  alt="Skill Matching"
                  style={{ width: "100%", maxWidth: "350px", height: "auto" }}
                />
                <span style={{ fontWeight: "bold", fontSize: "32px" }}>+</span>
                <img
                  src="../../score-tip2.png"
                  alt="Experience Matching"
                  style={{ width: "100%", maxWidth: "150px", height: "auto" }}
                />
                <span style={{ fontWeight: "bold", fontSize: "32px" }}>=</span>
                <img
                  src="../../score-tip3.png"
                  alt="Total Score"
                  style={{ width: "100%", maxWidth: "270px", height: "auto" }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter
            style={{ padding: "1rem 2rem", borderTop: "1px solid #dee2e6" }}
          >
            <Button
              color="primary"
              onClick={toggleModal}
              style={{
                padding: "0.375rem 0.75rem",
                fontSize: "1rem",
                borderRadius: "0.25rem",
              }}
            >
              Got It
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default DataTables;
