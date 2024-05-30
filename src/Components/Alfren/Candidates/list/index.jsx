import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { H6 } from "../../../../AbstractElements";
import DataTableComponent from "./DataTableComponent";
import Select from "react-select";
import { Form, InputGroup, InputGroupText } from "reactstrap";
import { FileText, Filter } from "react-feather";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchCandidates } from "../../../../redux/candidate/candidateActions";
import { Input, Label, Media } from "reactstrap";
import { Image } from "../../../../AbstractElements";
import user1 from "../../../../assets/images/user/1.jpg";
import { Check, Mail } from "react-feather";
import { Link } from "react-router-dom";


const DataTables = () => {
  const dispatch = useDispatch();
  const [candidateList, setCandidateList] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

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

  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    totalPages: null,
    totalResults: null,
  });
  const [paginatedUpdated, setPaginatedUpdated] = useState(false);

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
        if (resp.status == 200) {
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
          setCandidateList(mappedRecords);
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };


  
  const mapTableData = (results) => {
    let candidateMappedList = results.map((item, index) => {
      return   {
        id: index,
        name: (
          <Link to={'detail/'+item.id} key={item.id}>
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
          item.profileScore ?  <div>
            <div className="font-secondary">52/100</div>
            <div className="badge badge-light-warning">Average</div>
          </div> : "N/A"
         
        ),
        lastAction: (
          item.lastAction ?  <div>
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
          </div> :  "N/A"
        ),
        blacklist: (
          <Media key="1">
            <Media body className="text-end switch-sm ">
              <Label className="switch">
                <Input type="checkbox" checked={item.blacklist ? true : false}  />
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
                <Row>
                  <Col xl="2">
                    <H6>
                      <Filter strokeWidth={0.5} />
                      <strong className="ms-1">45263 Candidates</strong>
                    </H6>
                  </Col>
                  <Col xl="7">
                    <Form className="me-2">
                      <InputGroup>
                        <InputGroupText
                          style={{
                            border: "none",
                            backgroundColor: "#ECEDFC",
                            color: "#585DDB",
                            borderRadius: "30px 0px 0px 30px",
                          }}
                        >
                          <Filter strokeWidth={0.5} />
                        </InputGroupText>
                        <Select
                          options={options}
                          styles={customStyles}
                          placeholder="All Campaigns"
                          className="js-example-basic-single col-sm-3"
                          isMulti
                        />
                      </InputGroup>
                    </Form>
                  </Col>
                  <Col xl="3" style={{ textAlign: "end" }}>
                    <button
                      className="btn btn-primary"
                      style={{ display: "inline-flex" }}
                    >
                      <span>Export</span>
                      <FileText strokeWidth={0.5} size={20} />
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
