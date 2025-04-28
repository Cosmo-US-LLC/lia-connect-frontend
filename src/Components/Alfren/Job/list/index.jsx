import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Input,
  Media,
  Label,
  UncontrolledTooltip,
  CardBody,
} from "reactstrap";
import { Progressbar, UL } from "../../../../AbstractElements";
import DataTableComponent from "./DataTableComponent";
import {
  Check,
  ChevronDown,
  Clock,
  Flag,
  Info,
  Plus,
  Search,
  Trash2,
  User,
  Users,
  X,
} from "react-feather";
import { Modal, Button } from "react-bootstrap";
import { FaTimes, FaTrash } from "react-icons/fa";
import Jobs from "./modals/jobs";
import Priority from "./modals/priority";
import DateModal from "./modals/date";
import { Link } from "react-router-dom";
import {
  fetchJobs,
  updateJob,
  deleteJobAction,
} from "../../../../redux/Job/jobActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ConfirmationModal from "CommonElements/ConfirmationBox";
import usePagination from "Hooks/usePagination";

const JobList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  //states
  const [jobsList, setJobsList] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [paginatedUpdated, setPaginatedUpdated] = useState(false);
  const [searchJobs, setSearchJobs] = useState([]);
  const [isJobSelected, setIsJobSelected] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [activeOnly, setActiveOnly] = useState(false);
  const [jobNamePagination] = usePagination(100);
  const [pagination, setPagination] = usePagination(10);

  //dropdown states
  const [searchDropdown, setsSearchDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [priorityDropdownRow, setPriorityDropdownRow] = useState([]);
  const [jobAPIResult, setJobAPIResult] = useState([]);
  const [show, setShow] = useState(false);
  const [getJobId, setGetJobId] = useState(null);
  const handleClose = () => setShow(false);

  // function handle dropdown states

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

  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleCheckboxChange = () => {
    setActiveOnly(!activeOnly);
  };

  const removeJob = (jobId) => {
    const updatedJobs = selectedJobs.filter((job) => job.id !== jobId);
    // Update the state with the updatedJobs array
    setSelectedJobs(updatedJobs);
    if (!updatedJobs.length) {
      setIsJobSelected(false);
    }
  };

  const removePriority = (priorityId) => {
    const updatedPriorities = priorities.map((priority) => {
      if (priority.id === priorityId) {
        return {
          ...priority,
          isChecked: false,
        };
      }
      return priority;
    });

    setPriorities(updatedPriorities);
    const checkedPrioritiesCount = updatedPriorities.filter(
      (priority) => priority.isChecked
    ).length;

    if (!checkedPrioritiesCount) {
      setIsPrioritySelected(false);
    }
  };

  const fetchJobPaginated = async (e) => {
    const urlParams =
      "page=" +
      pagination.page +
      "&limit=" +
      pagination.limit +
      "&includeCandidateStats=" +
      true;
    const ids =
      selectedJobs.length > 0 ? selectedJobs.map((item) => item.id) : [];
    const jobPriority = priorities
      .filter((item) => item.isChecked)
      .map((item) => item.title);
    const isActive = activeOnly;
    const [startDate, endDate] = isDateSelected
      ? isDateSelected.split("-").map((date) => date.trim())
      : ["", ""];

    const formPayload = {
      urlParams,
      body: {
        ...(selectedJobs.length > 0 && { id: ids }),
        ...(jobPriority.length > 0 && { jobPriority }),
        ...(isDateSelected && { startDate, endDate }),
        isActive,
      },
    };

    dispatch(
      fetchJobs(formPayload, (resp) => {
        if (resp?.status == 200) {
          // toast.success("JobsFetched successfully");
          setPagination(resp.data.pagination);
          const results = resp.data.results;
          setTableColumns([
            {
              name: (
                <>
                  {resp.data.pagination.totalResults}{" "}
                  {resp.data.pagination.totalResults === 1 ? "Job" : "Jobs"}
                </>
              ),
              selector: (row) => row["name"],
              sortable: false,
              center: false,
            },
            // {
            //   name: (
            //     <>
            //       <button
            //         id="potentialToolTip"
            //         className="d-flex"
            //         style={{
            //           cursor: "pointer",
            //           backgroundColor: "white",
            //           border: "none",
            //           fontWeight: "600",
            //           color: "black",
            //           textAlign:'start',
            //           padding:'0px',
            //           display:'flex',
            //           justifyContent:'center',
            //           alignItems:'center',
            //           gap:.2
            //         }}
            //       >
            //         Potential Candidates{" "}
            //         <Info
            //           className="ms-1"
            //           strokeWidth={1}
            //           size={16}
            //           color="#8FA8D7"
            //         />
            //         <UncontrolledTooltip
            //           target="potentialToolTip"
            //           placement="bottom"
            //           style={{
            //             backgroundColor: "#595959",
            //             boxShadow: "0px 6px 26px -3.89px #0000001A",
            //           }}
            //         >
            //           <div
            //             style={{
            //               width: "100%",
            //               left: "300px",
            //               backgroundColor: "#595959",
            //             }}
            //             className="d-flex"
            //           >
            //             <Info color="#8FA8D7" size={70} />
            //             <span className="ms-2 text-white">
            //               The total number of unique candidate profiles the tool
            //               has interacted with.
            //             </span>
            //           </div>
            //         </UncontrolledTooltip>
            //       </button>
            //     </>
            //   ),
            //   selector: (row) => row["potentialCandidates"],
            //   sortable: false,
            //   center: true,
            // },
            // {
            //   name: (
            //     <>
            //       <button
            //         id="potentialToolTip"
            //         className="d-flex"
            //         style={{
            //           cursor: "pointer",
            //           backgroundColor: "white",
            //           border: "none",
            //           fontWeight: "600",
            //           color: "black",
            //           display:'flex',
            //           justifyContent:'center',
            //           alignItems:'center',
            //           gap:.2
            //         }}
            //       >
            //         Outreach{" "}
            //         <Info
            //           className="ms-1"
            //           strokeWidth={1}
            //           size={16}
            //           color="#8FA8D7"
            //         />
            //         <UncontrolledTooltip
            //           target="potentialToolTip"
            //           placement="bottom"
            //           style={{
            //             backgroundColor: "#595959",
            //             boxShadow: "0px 6px 26px -3.89px #0000001A",
            //           }}
            //         >
            //           <div
            //             style={{
            //               width: "100%",
            //               left: "300px",
            //               backgroundColor: "#595959",
            //             }}
            //             className="d-flex"
            //           >
            //             <Info color="#8FA8D7" size={70} />
            //             <span className="ms-2 text-white">
            //               The total number of unique candidate profiles the tool
            //               has interacted with.
            //             </span>
            //           </div>
            //         </UncontrolledTooltip>
            //       </button>
            //     </>
            //   ),
            //   selector: (row) => row["outreach"],
            //   sortable: false,
            //   center: true,
            // },
            // {
            //   name: (
            //     <>
            //       <button
            //         id="responseToolTip"
            //         className="d-flex"
            //         style={{
            //           cursor: "pointer",
            //           backgroundColor: "white",
            //           border: "none",
            //           fontWeight: "600",
            //           color: "black",
            //           display:'flex',
            //           justifyContent:'center',
            //           alignItems:'center',
            //           gap:.2
            //         }}
            //       >
            //         Response Rate
            //         <Info
            //           className="ms-1"
            //           strokeWidth={1}
            //           size={16}
            //           color="#8FA8D7"
            //         />
            //         <UncontrolledTooltip
            //           target="responseToolTip"
            //           placement="bottom"
            //           style={{
            //             backgroundColor: "#595959",
            //             boxShadow: "0px 6px 26px -3.89px #0000001A",
            //           }}
            //         >
            //           <div
            //             style={{
            //               width: "100%",
            //               left: "300px",
            //               backgroundColor: "#595959",
            //             }}
            //             className="d-flex"
            //           >
            //             <Info color="#8FA8D7" size={70} />
            //             <span className="ms-2 text-white">
            //               The total number of unique candidate profiles the tool
            //               has interacted with.
            //             </span>
            //           </div>
            //         </UncontrolledTooltip>
            //       </button>
            //     </>
            //   ),
            //   selector: (row) => row["responseRate"],
            //   sortable: false,
            //   center: true,
            // },
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
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 0.2,
                    }}
                  >
                    Priority
                    <Info
                      className="ms-1"
                      strokeWidth={1}
                      size={16}
                      color="#8FA8D7"
                    />
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
                          The total number of unique candidate profiles the tool
                          has interacted with.
                        </span>
                      </div>
                    </UncontrolledTooltip>
                  </button>
                </>
              ),
              selector: (row) => row["priority"],
              sortable: false,
              center: true,
              width: "14%",
            },
            {
              name: <>Date Created</>,
              selector: (row) => row["dateCreated"],
              sortable: false,
              center: true,
            },
            {
              name: <>Actions</>,
              selector: (row) => row["actions"],
              sortable: false,
              center: true,
              width: "10%",
            },
          ]);
          setJobAPIResult(results);
          const mappedRecords = mapTableData(results);
          setJobsList(mappedRecords);
        } else {
          const err = resp?.message;
          toast.error(err);
        }
      })
    );
  };

  const fetchJobNames = async (e) => {
    setIsLoading(true);
    const urlParams =
      "page=" + jobNamePagination.page + "&limit=" + jobNamePagination.limit;
    const formPayload = {
      urlParams,
    };
    dispatch(
      fetchJobs(formPayload, (resp) => {
        setIsLoading(false);
        if (resp?.status == 200) {
          // toast.success("JobsFetched successfully");
          const results = resp.data.results;
          const mappedResult = mapSearchJobList(results);
          setSearchJobs(mappedResult);
        } else {
          const err = resp?.message;
          toast.error(err);
        }
      })
    );
  };

  const changeJobStatus = (jobId, status) => {
    const formData = {
      jobId,
      body: {
        isJobActive: !status,
      },
    };
    dispatch(
      updateJob(formData, (resp) => {
        if (resp.status == 201) {
          toast.success("Job Updated Successfully");
          setPaginatedUpdated(!paginatedUpdated);
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };

  const changeJobPriority = (jobId, priority) => {
    const formData = {
      jobId,
      body: {
        jobPriority: priority,
      },
    };
    dispatch(
      updateJob(formData, (resp) => {
        if (resp.status == 201) {
          toast.success("Job Updated Successfully");
          setPaginatedUpdated(!paginatedUpdated);
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };

  const deleteJob = () => {
    console.log("yes i runnnnnnnnnnnnnnnnnnnnn");
    setIsLoading(true); // Set loading to true before dispatching the action
    dispatch(
      deleteJobAction(getJobId, (resp) => {
        setIsLoading(false); // Set loading to true before dispatching the action
        if (resp.status == 204) {
          setShow(false);
          toast.success("Job Deleted Successfully");
          setPaginatedUpdated(!paginatedUpdated);
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };
  const handleOpenConfirmation = (jobId) => {
    setGetJobId(jobId);
    setShow(true);
  };
  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...priorityDropdownRow];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setPriorityDropdownRow(updatedDropdownStates);
  };

  console.log({ jobsList });

  const calculateWidth = (item, bar) => {
    const total =
      item?.candidateStats?.messageStatus?.replied +
      item?.candidateStats?.isConnectionRequestSent?.sent +
      item?.candidateStats?.isConnectionRequestSent?.not_sent;

    let width = 0;

    if (bar == 1) {
      width = 
        (item?.candidateStats?.messageStatus?.replied / total) * 100;
    } else if (bar == 2) {
      width =
        (item?.candidateStats?.isConnectionRequestSent?.sent / total) * 100;
    } else if (bar == 3) {
      width =
        (item?.candidateStats?.isConnectionRequestSent?.not_sent / total) * 100;
    }

    if (width > 90) width = 90;
    if (width < 5) width = 5;

    if (total == 0) {
      return "33.33%";
    }
    return `${width}%`;
  };

  const mapTableData = (results) => {
    let currentDate = new Date();
    let jobMappedList = results.map((item, index) => {
      let date = new Date(item.createdAt);

      let differenceInMs = currentDate - date;
      let differenceInDays = (differenceInMs / (1000 * 60 * 60 * 24)).toFixed(
        1
      );
      differenceInDays = Math.round(differenceInDays);

      differenceInDays = +differenceInDays < 1 ? 0 : differenceInDays;

      date = date.toDateString();
      console.log({ item });
      return {
        id: item.id,
        name: (
          <>
            <Link to={"detail/" + item.id} key={item.id}>
              <div
                style={{
                  width: "50ch",
                  overflow: "hidden",
                  whiteSpace: "pre-wrap",
                }}
              >
                {item.name}
              </div>
              <div className="progress-showcase">
                <Col
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* {item?.candidateStats?.totalCandidates} */}
                  {/* {calculateWidth(item, 1)}
                  {calculateWidth(item, 2)}
                  {calculateWidth(item, 3)} */}
                  {/* {item?.candidateStats?.messageStatus} */}
                  {/* {item?.candidateStats?.degreeOfConnection} */}
                  {/* {item?.candidateStats?.isConnectionRequestSent} */}
                  <div
                    style={{
                      width: calculateWidth(item, 3),
                    }}
                    title="Pending Candidates"
                  >
                    {" "}
                    <Progressbar
                      attrProgress={{
                        value: "100",
                        color: "progress1",
                        className: "sm-progress-bar me-1 mb-0",
                      }}
                    />
                    <span style={{ fontSize: "8px", color: "#b8d1fe" }}>
                      {item?.candidateStats?.isConnectionRequestSent?.not_sent}
                    </span>
                  </div>
                  <div
                    style={{
                      width: calculateWidth(item, 2),
                    }}
                    title="Processing Candidates"
                  >
                    <Progressbar
                      attrProgress={{
                        value: "100",
                        color: "progress2",
                        className: "sm-progress-bar me-1 mb-0 ",
                      }}
                    />
                    <span style={{ fontSize: "8px", color: "#ffe699" }}>
                      {item?.candidateStats?.isConnectionRequestSent?.sent}
                    </span>
                  </div>
                  <div
                    style={{
                      width: calculateWidth(item, 1),
                    }}
                    title="Processed Candidates"
                  >
                    <Progressbar
                      attrProgress={{
                        value: "100",
                        color: "progress3",
                        barAriaLabelledBy: "75",
                        className: "sm-progress-bar me-1 mb-0",
                      }}
                    />
                    <span style={{ fontSize: "8px", color: "#fba14d" }}>
                      {item?.candidateStats?.messageStatus?.replied}
                    </span>
                  </div>
                </Col>
              </div>
            </Link>
          </>
        ),
        // potentialCandidates: (
        //   <div className="d-flex">
        //     <Users strokeWidth={1} size={16} />
        //     <div className="ms-2 font-secondary">
        //       <strong>
        //         {item.potentialCandidates ? item.potentialCandidates : "N/A"}
        //       </strong>
        //     </div>
        //   </div>
        // ),
        // outreach: (
        //   <div className="d-flex">
        //     <User strokeWidth={1} size={16} />
        //     <div className="ms-2 font-secondary">
        //       <strong>{item.outreach ? item.outreach : "N/A"}</strong>
        //     </div>
        //   </div>
        // ),
        // responseRate: (
        //   <div>
        //     <div className="font-secondary">
        //       <strong>
        //         {item.responseRate ? item.responseRate + "%" : "N/A"}
        //       </strong>
        //     </div>
        //   </div>
        // ),
        priority: (
          <div
            className="custom-dropdown"
            onClick={() => toggleDropdown(index)}
          >
            <div className="selected-option">
              <Flag
                fill={
                  item.jobPriority == "HIGH"
                    ? "#DE3E3E"
                    : item.jobPriority == "LOW"
                    ? "#CECECE"
                    : "#FECF41"
                }
                color={
                  item.jobPriority == "HIGH"
                    ? "#AA1313"
                    : item.jobPriority == "LOW"
                    ? "#ABABAB"
                    : "#E2B323"
                }
                size={14}
                strokeWidth={1.5}
              />
              <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
                {item.jobPriority}
              </span>
              <ChevronDown color="#8FA8D7" size={14} strokeWidth={1.5} />
            </div>
            {priorityDropdownRow[index] && (
              <ul
                className="options"
                style={{
                  padding: "10px",
                  position: "absolute",
                  boxShadow: "0px 10px 26px 0px #0000001A",
                  zIndex: 2,
                  backgroundColor: "white",
                  borderRadius: "8px",
                  width: "100%",
                  paddingBottom: "3px",
                  cursor: "pointer",
                }}
              >
                {priorities.map((option, index) => (
                  <li
                    key={index}
                    style={{
                      borderBottom: "1px solid #0000001f",
                      padding: "8px",
                    }}
                    onClick={() => changeJobPriority(item.id, option.title)}
                  >
                    <Flag
                      style={{ cursor: "pointer" }}
                      fill={option.fill}
                      color={option.color}
                      size={14}
                      strokeWidth={1.5}
                    />
                    {option.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ),
        dateCreated: (
          <div>
            <span>{date}</span>
            <span style={{ color: "#299A16" }}>
              {" "}
              ( {differenceInDays ? differenceInDays + " Days" : "Today"})
            </span>
          </div>
        ),
        actions: (
          <div className="d-flex align-items-center">
            {item.isJobCompleted ? (
              <div className="d-block">
                <span>Active</span>
                <Media key="1">
                  <Media body className="text-start switch-sm ">
                    <Label className="switch">
                      <Input
                        type="checkbox"
                        style={{ background: "black" }}
                        checked={item.isJobActive ? true : false}
                        onClick={() =>
                          changeJobStatus(item.id, item.isJobActive)
                        }
                      />
                      <span
                        className="switch-state"
                        style={{ backgroundColor: "black" }}
                      ></span>
                    </Label>
                  </Media>
                </Media>
              </div>
            ) : (
              "Draft"
            )}
            <Trash2
              strokeWidth={1}
              color="#9B9999"
              size={20}
              className="ms-2"
              onClick={() => handleOpenConfirmation(item.id)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ),
      };
    });

    return jobMappedList;
  };
  const mapSearchJobList = (results) => {
    let jobList = results.map((item, index) => {
      return {
        id: item.id,
        title: item.name,
        isChecked: false,
      };
    });

    return jobList;
  };

  useEffect(() => {
    fetchJobPaginated();
    setPriorityDropdownRow(Array(jobAPIResult.length).fill(false));
  }, [paginatedUpdated, selectedJobs, priorities, activeOnly, isDateSelected]);

  useEffect(() => {
    fetchJobNames();
  }, [priorityDropdownRow]);

  useEffect(() => {
    const mappedRecords = mapTableData(jobAPIResult);
    setJobsList(mappedRecords);
  }, [priorityDropdownRow]);

  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 300);

  return (
    <Fragment>
      <Container fluid={true}>
        <ConfirmationModal
          deleteJob={deleteJob}
          handleClose={handleClose}
          show={show}
          isLoading={isLoading}
        />
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
                        border:
                          dateDropdown || isDateSelected
                            ? "1px solid #337CC7"
                            : "1px solid #F0F0F0",
                        color:
                          dateDropdown || isDateSelected
                            ? "#337CC7"
                            : "#595959",
                        backgroundColor:
                          dateDropdown || isDateSelected ? "#F5F9FF" : "white",
                        borderRadius: "4px",
                        padding: "8px",
                        marginRight: "8px",
                      }}
                      onClick={toggleDateDropdown}
                    >
                      <Clock strokeWidth={1} size={16} />
                      <span className="ms-2" style={{ fontSize: "12px" }}>
                        {isDateSelected ? isDateSelected : "Date Created"}
                      </span>
                    </button>
                    {dateDropdown && (
                      <DateModal
                        isDateSelected={isDateSelected}
                        setIsDateSelected={setIsDateSelected}
                        closeDateDropdown={closeDateDropdown}
                      />
                    )}
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
                        Active Only
                      </span>
                    </button>
                  </Col>
                  <Col xl="3" style={{ textAlign: "end" }}>
                    <Link
                      to={"create"}
                      className="btn btn-primary pe-2 ps-2"
                      style={{ display: "inline-flex" }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: 400 }}>
                        Add New Job
                      </span>
                      <Plus strokeWidth={1.5} size={20} />
                    </Link>
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
                          <X
                            strokeWidth={1.5}
                            size={16}
                            onClick={() => removeJob(job.id)}
                          />
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
                            <X
                              strokeWidth={1.5}
                              size={16}
                              onClick={() => removePriority(priority.id)}
                            />
                          </button>
                        ))}
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <div
                style={{
                  boxShadow: "none",
                  maxHeight: `${maxHeight}px`,
                  overflowY: "auto",
                }}
              >
                <DataTableComponent
                  isLoading={isLoading}
                  paginatedUpdated={paginatedUpdated}
                  data={jobsList}
                  paginationDetails={pagination}
                  tableColumns={tableColumns}
                  setPagination={setPagination}
                  setPaginatedUpdated={setPaginatedUpdated}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default JobList;