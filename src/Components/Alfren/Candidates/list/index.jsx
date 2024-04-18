import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { H6 } from "../../../../AbstractElements";
import DataTableComponent from "./DataTableComponent";
import Select from "react-select";
import { Form, InputGroup, InputGroupText } from "reactstrap";
import { FileText, Filter } from "react-feather";
const DataTables = () => {
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
              <DataTableComponent />
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DataTables;
