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
import user1 from "../../../../assets/images/user/1.jpg";
import { Mail } from "react-feather";
import { Link } from "react-router-dom";
import {
  Check,
  Search,
  User,
  MapPin
} from "react-feather";
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
  const [getJobId, setGetJobId] = useState(null)

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
      background: state.isSelected ? "#333" : "#ECEDFC", // Adjust for selection state
      border: "none",
      boxShadow: state.isFocused ? "0 0 0 1px #ccc" : "none",
      minHeight: "38px",
      padding: "0 10px",
      color: "#8E92ED", // Text color for both regular and selected states
      borderRadius: "0px 30px 30px 0px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#222" : "#ECEDFC", // Adjust for selection state
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
          ]);
          const mappedRecords = mapTableData(results);
          console.log("mappedRecords",mappedRecords);
          setCandidateList(mappedRecords);
        } else {
          const err = resp?.message;
          toast.error(err);
        }
      })
    );
  };



  const mapTableData = (results) => {
    let candidateMappedList = results.map((item, index) => {
      return {
        id: index,
        name: (
          <Link to={'detail/' + item.id} key={item.id}>
            <Media className="d-flex">
              <Image
                attrImage={{
                  className: "rounded-circle img-30 me-3",
                  src: item.image ? item.image : `${user1}`,
                  alt: "Generic placeholder image",
                }}
              />
              <Media body className="align-self-center">
                <div>{item.name}</div>
              </Media>
            </Media>
          </Link>
        ),
        jobTitle: (item.jobTitle),
        linkedin: <Link to={(item.linkedProfile)} target="_blank">{item.linkedProfile}</Link>,
        profileScore: (
          item.profileScore ? <div>
            <div className="font-secondary">{item.profileScore}</div>
            <div className="badge badge-light-warning">Average</div>
          </div> : "N/A"

        ),
        lastAction: (
          item.lastAction ? <div>
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
          </div> : "N/A"
        ),
        blacklist: (
          <Media key="1">
            <Media body className="text-end switch-sm ">
              <Label className="switch">
                <Input type="checkbox" checked={item.blacklist ? true : false} />
                <span className="switch-state"></span>
              </Label>
            </Media>
          </Media>
        ),
      };;
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
                <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                      <MapPin strokeWidth={1} size={16} />
                      <span className="ms-2" style={{ fontSize: "12px" }}>
                        {isDateSelected ? isDateSelected : "Location"}
                      </span>
                    </button>

                    <button
                      style={{
                        display: "inline-flex",
                        position: 'relative',
                        bottom: '3px',
                        marginRight: '8px',
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
                      }}
                      onClick={toggleDateDropdown}
                    >
                      <span className="ms-2" style={{ fontSize: "12px", marginRight: '5px' }}>
                        {isDateSelected ? isDateSelected : "Experience"}
                      </span>
                      <ChevronDown strokeWidth={1} size={16} />
                    </button>
                    <button
                      style={{
                        display: "inline-flex",
                        position: 'relative',
                        bottom: '3px',
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
                      <span className="ms-2" style={{ fontSize: "12px", marginRight: '5px' }}>
                        {isDateSelected ? isDateSelected : "More Filters"}
                      </span>
                      <Sliders strokeWidth={1} size={16} />
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
                          <span className="switch-state" style={{ background: 'black' }}></span>
                        </Label>
                      </Media>
                      <span
                        style={{
                          opacity: activeOnly ? "100%" : "40%",
                          fontSize: "12px",
                          marginLeft: '4px'
                        }}
                      >
                        Blacklisted Only
                      </span>
                    </button>
                  </Col>
                  <Col style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "14px"
                  }}>
                    <span
                      style={{
                        opacity: activeOnly ? "100%" : "40%",
                        fontSize: "12px",
                        marginLeft: '4px'
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
