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
import { mapSearchJobList, mapTableData,tableColumns } from "./mapJobData"
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
import Date from "./modals/date";
import { Link } from "react-router-dom";
import { fetchJobs } from '../../../../redux/Job/jobActions'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const JobList = () => {
  const [jobsList, setJobsList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  
  const [paginatedUpdated, setPaginatedUpdated] = useState(false);
  const [pagination, setPagination] = useState({
    limit:10,
    page:1,
    totalPages:null,
    totalResults:null
});

  const dispatch = useDispatch();
  const [searchDropdown, setsSearchDropdown] = useState(false);
  const toggleSearchDropdown = () => {
    setsSearchDropdown(!searchDropdown);
  };
  const closeSearchDropdown = () => {
    setsSearchDropdown(false);
  };
  const [searchJobs, setSearchJobs] = useState([]);
  const [isJobSelected, setIsJobSelected] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);

  const [priorityDropdown, setPriorityDropdown] = useState(false);
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
  const togglePriorityDropdown = () => {
    setPriorityDropdown(!priorityDropdown);
  };

  const [dateDropdown, setDateDropdown] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const toggleDateDropdown = () => {
    setDateDropdown(!dateDropdown);
  };
  const closeDateDropdown = () => {
    setDateDropdown(false);
  };

  const [activeOnly, setActiveOnly] = useState(false);
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


  
  useEffect(() => {
    fetchJobPaginated();
  }, [paginatedUpdated,selectedJobs,priorities,activeOnly,isDateSelected]);


  useEffect(() => {
    fetchJobNames();
  }, []);

  const  fetchJobPaginated = async (e) => {
    const urlParams = 'page=' + pagination.page + '&limit=' + pagination.limit;
    const ids = selectedJobs.length > 0 ? selectedJobs.map(item => item.id) : [];
    const jobPriority = priorities.filter(item => item.isChecked).map(item => item.title); 
    const isActive = activeOnly;
    const [startDate, endDate] = isDateSelected ? isDateSelected.split('-').map(date => date.trim()) : ['', ''];

    
    const formPayload = {
      urlParams,
      body: {
        ...(selectedJobs.length > 0 && { id: ids }),
        ...(jobPriority.length > 0 && { jobPriority }),
        ...(isDateSelected && { startDate, endDate }), 
        isActive,
      }
    };

    dispatch(
      fetchJobs(formPayload, (resp) => {
        if (resp.status == 200) {
          toast.success("JobsFetched successfully");
          setPagination(resp.data.pagination)
          const results = resp.data.results 
          setTotalResults(resp.data.pagination.totalResults)
          const mappedResult =  mapTableData(results)
          setJobsList(mappedResult)
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };

  const  fetchJobNames = async (e) => {
    const urlParams = 'page='+pagination.page+'&limit='+pagination.limit;
    const formPayload ={
      urlParams,
    }
    dispatch(
      fetchJobs(formPayload, (resp) => {
        if (resp.status == 200) {
          toast.success("JobsFetched successfully");
          const results = resp.data.results 
          const mappedResult =  mapSearchJobList(results)
          setSearchJobs(mappedResult)
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
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
                        Date Created
                      </span>
                    </button>
                    {dateDropdown && (
                      <Date
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
                          <span className="switch-state"></span>
                        </Label>
                      </Media>
                      <span
                        className="ms-2"
                        style={{
                          opacity: activeOnly ? "100%" : "40%",
                          fontSize: "12px",
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
                      <span>Add New Job</span>
                      <Plus strokeWidth={2} size={20} />
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
                      {isDateSelected && (
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
                          <span
                            className="ms-1 me-2"
                            style={{ fontSize: "12px" }}
                          >
                            {isDateSelected}
                          </span>
                          <X
                            strokeWidth={1.5}
                            size={16}
                            onClick={() => setIsDateSelected(false)}
                          />
                        </button>
                      )}
                    </div>
                  </Col>

                  <Col xl="3" className="mt-2" style={{ textAlign: "end" }}>
                    <H6>
                      <strong>{totalResults} Jobs</strong>
                    </H6>
                  </Col>
                </Row>
              </CardHeader>
              <DataTableComponent paginatedUpdated={paginatedUpdated} data={jobsList} paginationDetails={pagination} tableColumns={tableColumns} setPagination={setPagination} setPaginatedUpdated={setPaginatedUpdated}/>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default JobList;
