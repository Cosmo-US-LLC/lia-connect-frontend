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
  Spinner,
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
import { Modal, Button, Tab } from "react-bootstrap";
import { FaTimes, FaTrash } from "react-icons/fa";
import { MessageSquare, CheckSquare, Activity } from "react-feather";
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
import "./style.css";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LiaHandshakeSolid } from "react-icons/lia";
import { AiOutlineInteraction } from "react-icons/ai";
import SkeletonCard from "layout/CardSkeleton";
import { Status } from "constant";

const JobList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

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
  // const [selectedJobs, setSelectedJobs] = useState([]);

  const handleSelectJob = (jobId) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedJobs(jobsList.map((job) => job.id));
    } else {
      setSelectedJobs([]);
    }
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

  console.log("jobsList", jobsList);

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

  const getStatusStyles = (status) => {
    switch (status) {
      case "In Progress":
        return {
          backgroundColor: "#007BFF",
          color: "#fff",
          // border: "2px solid #007BFF",
        };
      case "Paused":
        return {
          backgroundColor: "#F0F0F0",
          color: "#383d41",
          // border: "2px solid #D3D3D3",
        };
      case "Completed":
        return {
          backgroundColor: "#28a745",
          color: "#fff",
          // border: "1px solid #c3e6cb",
        };
      default:
        return {
          backgroundColor: "#e2e3e5",
          color: "#fff",
          // border: "1px solid #d6d8db",
        };
    }
  };
  const shouldApplyShimmer = (status) => {
    return status === "In Progress";
  };

  console.log({ selectedJobs });

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
          setPagination(resp.data.pagination);
          const results = resp.data.results;
          setTableColumns([
            {
              name: (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <IoBriefcaseOutline size={16} />
                  {resp.data.pagination.totalResults === 1 ? "Job" : "Jobs"} (
                  {resp.data.pagination.totalResults})
                </div>
              ),
              selector: (row) => row["name"],
              sortable: false,
              center: false,
              width: "20%",
            },
            {
              name: (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Users size={16} />
                  Candidates
                </div>
              ),
              selector: (row) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "1.5",
                  }}
                >
                  {console.log("row", row)}
                  <div
                    style={{
                      fontWeight: 400,
                      color: "#666666",
                      fontSize: "14px",
                    }}
                  >
                    Total:{" "}
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#666666",
                        fontSize: "14px",
                      }}
                    >
                      {row.totalCandidates || 0}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: 400,
                      color: "#666666",
                      fontSize: "14px",
                    }}
                  >
                    Shortlisted:{" "}
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#007BFF",
                        fontSize: "14px",
                      }}
                    >
                      {row.shortListedCandidates || 0}
                    </span>
                  </div>
                </div>
              ),
              sortable: false,
              center: false,
              width: "15%",
            },
            {
              name: (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <LiaHandshakeSolid size={18} />
                  Requests
                </div>
              ),
              selector: (row) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "1.5",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 400,
                      color: "#666666",
                      fontSize: "14px",
                    }}
                  >
                    Sent:{" "}
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#666666",
                        fontSize: "14px",
                      }}
                    >
                      {row.connectionRequestsSent || 0}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: 400,
                      color: "#666666",
                      fontSize: "14px",
                    }}
                  >
                    Accepted:{" "}
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#007BFF",
                        fontSize: "14px",
                      }}
                    >
                      {row.totalConnectedCandidates || 0}
                    </span>
                  </div>
                </div>
              ),
              sortable: false,
              center: false,
              width: "15%",
            },
            {
              name: (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <MessageSquare size={16} />
                  Messages
                </div>
              ),
              selector: (row) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "1.5",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 400,
                      color: "#666666",
                      fontSize: "14px",
                    }}
                  >
                    Sent:{" "}
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#666666",
                        fontSize: "14px",
                      }}
                    >
                      {row.totalMessagesSent || 0}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: 400,
                      color: "#666666",
                      fontSize: "14px",
                    }}
                  >
                    Reply Received:{" "}
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#007BFF",
                        fontSize: "14px",
                      }}
                    >
                      {row.totalReplies || 0}
                    </span>
                  </div>
                </div>
              ),
              sortable: false,
              center: false,
              width: "15%",
            },
            {
              name: (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Activity size={16} />
                  Status
                </div>
              ),
              selector: (row) => (
                <td>
                  <span
                    className={`status-effect ${
                      shouldApplyShimmer(row.Status) ? "shimmer-effect" : ""
                    }`}
                    style={getStatusStyles(row.Status)}
                  >
                    {row.Status || "No Status"}  
                  </span>
                </td>
              ),
              width: "20%",
            },
            // {
            //   name: (
            //     <div
            //       style={{ display: "flex", alignItems: "center", gap: "6px" }}
            //     >
            //       <Activity size={16} />
            //       Status
            //     </div>
            //   ),
            //   selector: (row) => (
            //     <td>
            //       <span
            //       className="status-badge shimmer-effect"
            //       style={{
            //         backgroundColor: "#007BFF",
            //         color: "white"
            //       }}
            //         // className={`status-badge ${
            //         //   row.status === "In Progress" ? "shimmer-effect" : ""
            //         // }`}
            //         // style={getStatusStyles(row.status)}
            //       >
            //         {/* {row.status} */}
            //         In Progress
            //       </span>
            //     </td>
            //   ),
            //   width: "20%",
            // },

            {
              name: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "",
                  }}
                >
                  <AiOutlineInteraction size={16} />
                  Actions
                </div>
              ),
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
    console.log({ jobId, status });
    const formData = {
      jobId,
      body: {
        isJobActive: status,
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

  const calculateWidth = (item, bar) => {
    const total =
      item?.candidateStats?.messageStatus?.replied +
      item?.candidateStats?.isConnectionRequestSent?.sent +
      item?.candidateStats?.isConnectionRequestSent?.not_sent;

    let width = 0;

    if (bar == 1) {
      width = (item?.candidateStats?.messageStatus?.replied / total) * 100;
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
    console.log({ results });
    let jobMappedList = results.map((item, index) => {
      let date = new Date(item.createdAt);

      let differenceInMs = currentDate - date;
      let differenceInDays = (differenceInMs / (1000 * 60 * 60 * 24)).toFixed(
        1
      );
      differenceInDays = Math.round(differenceInDays);

      differenceInDays = +differenceInDays < 1 ? 0 : differenceInDays;

      date = date.toDateString();
      return {
        id: item.id,
        name: (
          <>
            <Link to={"detail/" + item.id} key={item.id}>
              <div
                style={{
                  width: "25ch",
                  overflow: "hidden",
                  whiteSpace: "pre-wrap",
                }}
              >
                {item.name}
              </div>
            </Link>
          </>
        ),
        // priority: (
        //   <div
        //     className="custom-dropdown"
        //     onClick={() => toggleDropdown(index)}
        //   >
        //     <div className="selected-option">
        //       <Flag
        //         fill={
        //           item.jobPriority == "HIGH"
        //             ? "#DE3E3E"
        //             : item.jobPriority == "LOW"
        //             ? "#CECECE"
        //             : "#FECF41"
        //         }
        //         color={
        //           item.jobPriority == "HIGH"
        //             ? "#AA1313"
        //             : item.jobPriority == "LOW"
        //             ? "#ABABAB"
        //             : "#E2B323"
        //         }
        //         size={14}
        //         strokeWidth={1.5}
        //       />
        //       <span className="ms-1 me-2" style={{ fontSize: "12px" }}>
        //         {item.jobPriority}
        //       </span>
        //       <ChevronDown color="#8FA8D7" size={14} strokeWidth={1.5} />
        //     </div>
        //     {priorityDropdownRow[index] && (
        //       <ul
        //         className="options"
        //         style={{
        //           padding: "10px",
        //           position: "absolute",
        //           boxShadow: "0px 10px 26px 0px #0000001A",
        //           zIndex: 2,
        //           backgroundColor: "white",
        //           borderRadius: "8px",
        //           width: "100%",
        //           paddingBottom: "3px",
        //           cursor: "pointer",
        //         }}
        //       >
        //         {priorities.map((option, index) => (
        //           <li
        //             key={index}
        //             style={{
        //               borderBottom: "1px solid #0000001f",
        //               padding: "8px",
        //             }}
        //             onClick={() => changeJobPriority(item.id, option.title)}
        //           >
        //             <Flag
        //               style={{ cursor: "pointer" }}
        //               fill={option.fill}
        //               color={option.color}
        //               size={14}
        //               strokeWidth={1.5}
        //             />
        //             {option.title}
        //           </li>
        //         ))}
        //       </ul>
        //     )}
        //   </div>
        // ),
        // dateCreated: (
        //   <div>
        //     <span>{date}</span>
        //     <span style={{ color: "#299A16" }}>
        //       {" "}
        //       ( {differenceInDays ? differenceInDays + " Days" : "Today"})
        //     </span>
        //   </div>
        // ),
        actions:
          (console.log({ item }),
          (
            <div style={{ display: "flex", gap: "2px", textAlign: "left" }}>
              <div style={{ width: "80px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    // marginBottom: "6px",
                    display: "block",
                    fontWeight: "500",
                  }}
                >
                  {item.isJobActive ? "Active" : "Inactive"}
                </span>

                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "36px",
                    height: "18px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.isJobActive}
                    onChange={() => changeJobStatus(item.id, !item.isJobActive)}
                    style={{
                      opacity: 0,
                      width: 0,
                      height: 0,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: item.isJobActive ? "#299A16" : "#E0E0E0",
                      borderRadius: "34px",
                      transition: "0.2s",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      height: "14px",
                      width: "14px",
                      left: item.isJobActive ? "20px" : "2px",
                      bottom: "2px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.2s",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                  />
                </label>
              </div>

              <Trash2
                strokeWidth={1}
                color="#9B9999"
                size={20}
                onClick={() => handleOpenConfirmation(item.id)}
                style={{ cursor: "pointer", marginTop: "4px" }}
              />
            </div>
          )),

        // actions: (
        //   <div className=" " style={{ display: "flex", gap: "10px" }}>
        //     <div style={{ display: "block", width: "60px", textAlign: "left" }}>
        //       <span
        //         style={{
        //           fontSize: "14px",
        //           marginBottom: "4px",
        //           display: "block",
        //         }}
        //       >
        //         {item.isJobCompleted ? "Active" : "Inactive"}
        //       </span>
        //       <div style={{ display: "flex", alignItems: "center" }}>
        //         <div
        //           style={{
        //             position: "relative",
        //             display: "inline-block",
        //             height: "16px",
        //             width: "32px",
        //           }}
        //         >
        //           <input
        //             type="checkbox"
        //             checked={item.isJobCompleted}
        //             onChange={() => changeJobStatus(item.id, item.isJobActive)}
        //             style={{
        //               position: "absolute",
        //               opacity: 0,
        //               width: 0,
        //               height: 0,
        //             }}
        //           />
        //           <span
        //             style={{
        //               position: "absolute",
        //               top: 0,
        //               left: 0,
        //               right: 0,
        //               bottom: 0,
        //               backgroundColor: item.isJobCompleted
        //                 ? "#299A16"
        //                 : "#E0E0E0",
        //               borderRadius: "16px",
        //               transition: "background-color 0.2s ease",
        //             }}
        //           />
        //           <span
        //             style={{
        //               position: "absolute",
        //               top: "2px",
        //               left: "2px",
        //               height: "12px",
        //               width: "12px",
        //               backgroundColor: "white",
        //               borderRadius: "50%",
        //               transform: item.isJobCompleted
        //                 ? "translateX(16px)"
        //                 : "translateX(0)",
        //               transition: "transform 0.2s ease",
        //               boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        //             }}
        //           />
        //         </div>
        //       </div>
        //     </div>
        //     {/* {item.isJobCompleted ? (
        //       <div className="d-block">
        //         <span>Active</span>
        //         <Media key="1">
        //           <Media body className="text-start switch-sm ">
        //             <Label className="switch">
        //               <Input
        //                 type="checkbox"
        //                 style={{
        //                   background: `${item.isJobActive ? "black" : "red"}`,
        //                 }}
        //                 checked={item.isJobActive ? true : false}
        //                 onClick={() =>
        //                   changeJobStatus(item.id, item.isJobActive)
        //                 }
        //               />
        //               <span
        //                 className="switch-state"
        //                 style={{
        //                   backgroundColor: `${
        //                     item.isJobActive ? "#299A16" : "#E0E0E0"
        //                   }`,
        //                 }}
        //               ></span>
        //             </Label>
        //           </Media>
        //         </Media>
        //       </div>
        //     ) : (
        //       "Draft"
        //     )} */}
        //     <Trash2
        //       strokeWidth={1}
        //       color="#9B9999"
        //       size={24}
        //       // className="ms-2"
        //       onClick={() => handleOpenConfirmation(item.id)}
        //       style={{ cursor: "pointer", paddingTop: "4px" }}
        //     />
        //   </div>
        // ),
        totalCandidates: <span>{item.totalCandidates || 0}</span>,
        shortListedCandidates: <span>{item.shortListedCandidates || 0}</span>,
        connectionRequestsSent: <span>{item.connectionRequestsSent || 0}</span>,
        totalConnectedCandidates: (
          <span>{item.totalConnectedCandidates || 0}</span>
        ),
        totalMessagesSent: <span>{item.totalMessagesSent || 0}</span>,
        totalReplies: <span>{item.totalReplies || 0}</span>,
        Status: item.status,
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

  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 210);

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
          <Col sm="12" style={{ overflow: "hidden", height: "84vh" }}>
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
                    {/* <button
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
                    )} */}
                    {/* <button
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
                    )} */}
                    <button
                      type="button"
                      onClick={handleCheckboxChange}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "none",
                        backgroundColor: "white",
                        color: "#595959",
                        borderRadius: "4px",
                        // padding: "8px",
                        cursor: "pointer",
                        outline: "none",
                        // border: "1px solid red",
                      }}
                    >
                      <span
                        style={{
                          margin: "0 8px",
                          fontSize: "12px",
                          opacity: activeOnly ? 0.4 : 1,
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        All
                      </span>

                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                          height: "16px",
                          width: "32px",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={activeOnly}
                          onChange={handleCheckboxChange}
                          style={{
                            position: "absolute",
                            opacity: 0,
                            width: 0,
                            height: 0,
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: activeOnly ? "#299A16" : "#E0E0E0",
                            borderRadius: "16px",
                            transition: "background-color 0.2s ease",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "2px",
                            left: "2px",
                            height: "12px",
                            width: "12px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            transform: activeOnly
                              ? "translateX(16px)"
                              : "translateX(0)",
                            transition: "transform 0.2s ease",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </div>

                      <span
                        style={{
                          marginLeft: "4px",
                          fontSize: "12px",
                          opacity: activeOnly ? 1 : 0.4,
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        Active Only
                      </span>
                    </button>
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
                            style={{
                              background: `${
                                activeOnly ? "#299A16" : "#E0E0E0"
                              }`,
                            }}
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
                    </button> */}
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
              {/* <CardBody style={{ padding: 0 }}>
                <div
                  style={{
                    // maxHeight: "500px",
                    boxShadow: "none",
                    maxHeight: `${maxHeight}px`,
                    overflowY: "auto",
                    overflowX: "hidden",
                    width: "100%",
                    position: "relative",
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
                    customStyles={{
                      headRow: {
                        style: {
                          position: "sticky",
                          top: 0,
                          zIndex: 2,
                          backgroundColor: "white",
                          borderBottom: "1px solid #e0e0e0",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        },
                      },
                      headCells: {
                        style: {
                          backgroundColor: "white",
                          fontWeight: "bold",
                          padding: "12px 8px",
                          position: "relative",
                          zIndex: 2,
                        },
                      },
                      table: {
                        style: {
                          width: "100%",
                          tableLayout: "fixed",
                        },
                      },
                      cells: {
                        style: {
                          padding: "8px",
                          wordBreak: "break-word",
                        },
                      },
                    }}
                  />
                </div>
              </CardBody> */}
              {/* <CardBody style={{ padding: 0, paddingTop: "10px" }}>
      <div
        style={{
          maxHeight: `${maxHeight}px`,
          overflowY: "auto",
          overflowX: "hidden",
          width: "100%",
          position: "relative",
          paddingBottom: "20px",
        }}
      >
        <table
          style={{
            width: "100%",
            tableLayout: "auto",
            borderCollapse: "separate", // IMPORTANT: Must be separate for spacing to work
            borderSpacing: "0 12px", // 0 horizontal, 12px vertical gap between rows
          }}
        >
          <thead>
            <tr
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "white",
                zIndex: 10,
              }}
            >
              {tableColumns.map((column, index) => (
                <th
                  key={index}
                  style={{
                    padding: "2px 18px 12px 18px",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "14px",
                    color: "#333333",
                    backgroundColor: "white",
                    borderBottom: "2px solid #E0E0E0",
                    // Remove border from individual cells since we're using spacing
                  }}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobsList.map((job, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#F5F9FF" : "#F5F9FF",
                  // Remove borderBottom since we have gaps now
                  // borderRadius: "8px", // Optional: rounded corners for each row
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)", // Optional: subtle shadow
                }}
              >
                {tableColumns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      padding: "24px 20px",
                      wordBreak: "break-word",
                      fontSize: "14px",
                      color: "#333333",
                      textAlign: colIndex === 0 ? "left" : "center",
                      // Add border radius to first and last cells for rounded row effect
                      borderRadius:
                        colIndex === 0 ? "8px 0 0 8px" : colIndex === tableColumns.length - 1 ? "0 8px 8px 0" : "0",
                    }}
                  >
                    {column.selector(job)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBody> */}
              <CardBody style={{ padding: 0 }}>
                {isLoading && (
                  <div
                    style={{
                      height: "70vh",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spinner />
                  </div>
                )}
                <div
                  style={{
                    maxHeight: `${maxHeight}px`,
                    overflowY: "auto",
                    overflowX: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingBottom: "65px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      tableLayout: "auto",
                      borderCollapse: "separate",
                      borderSpacing: "0 10px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "white",
                          zIndex: 10,
                          borderBottom: "2px solid #E0E0E0",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        }}
                      >
                        {tableColumns.map((column, index) => (
                          <th
                            key={index}
                            style={{
                              padding: "16px 18px",
                              fontWeight: "bold",
                              textAlign: "left",
                              fontSize: "14px",
                              color: "#333333",
                            }}
                          >
                            {column.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {jobsList.map((job, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#F5F9FF" : "#F5F9FF",
                            borderBottom: "1px solid #E0E0E0",
                          }}
                        >
                          {tableColumns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              style={{
                                padding: "16px 20px",
                                wordBreak: "break-word",
                                fontSize: "14px",
                                color: "#333333",
                                textAlign: colIndex === 0 ? "left" : "center",
                              }}
                            >
                              {column.selector(job)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <DataTableComponent
                  paginatedUpdated={paginatedUpdated}
                  paginationDetails={pagination}
                  setPagination={setPagination}
                  setPaginatedUpdated={setPaginatedUpdated}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default JobList;
