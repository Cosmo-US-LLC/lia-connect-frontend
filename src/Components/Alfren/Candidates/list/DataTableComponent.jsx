import React, { Fragment, useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { Btn, H4 } from "../../../../AbstractElements";
import { dummytabledata, tableColumns } from "./Defaultdata";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import Select from "react-select";

const DataTableComponent = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleDelet, setToggleDelet] = useState(false);
  const [data, setData] = useState(dummytabledata);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const customStyles = {
    headCells: {
      style: {
        borderBottom: "1px solid #585DDB",
      },
    },
    rows: {
      style: {
        paddingBottom: "8px", // override the row height
        background: "#f5f9ff",
      },
    },
    cells: {
      style: {
        background: "white",
      },
    },
  };
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete:\r ${selectedRows.map(
          (r) => r.title
        )}?`
      )
    ) {
      setToggleDelet(!toggleDelet);

      setData(
        data.filter((item) =>
          selectedRows.filter((elem) => elem.id === item.id).length > 0
            ? false
            : true
        )
      );
      setSelectedRows("");
    }
  };
  const options = [
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: "150", label: "150" },
  ];

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "white", // Adjust for selection state
      border: "none",
      boxShadow: state.isFocused ? "0 0 0 1px #ccc" : "none",
      maxHeight: "10px",
      maxWidth: "110px",
      padding: "0 10px",
      color: "black", // Text color for both regular and selected states
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "white", // Adjust for selection state
      color: "black",
      cursor: "pointer",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "black",
    }),
  };
  return (
    <Fragment>
      {selectedRows.length !== 0 && (
        <div
          className={`d-flex align-items-center justify-content-between bg-light-info p-2`}
        >
          <H4 attrH4={{ className: "text-muted m-0" }}>
            Delet Selected Data..!
          </H4>
          <Btn attrBtn={{ color: "danger", onClick: () => handleDelete() }}>
            Delete
          </Btn>
        </div>
      )}
      <DataTable
        data={data}
        columns={tableColumns}
        center={true}
        selectableRows
        borderBottom={false}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleDelet}
        customStyles={customStyles}
      />
      <nav
        aria-label="Page navigation example"
        style={{ backgroundColor: "#f5f9ff" }}
      >
        <div className="justify-content-start">
          <Form className="me-2">
            <InputGroup>
              <InputGroupText
                style={{
                  border: "none",
                  backgroundColor: "#f5f9ff",
                  color: "black",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                View Per Page
              </InputGroupText>
              <Select
                options={options}
                styles={customSelectStyles}
                placeholder="50"
                className="js-example-basic-single col-sm-3"
              />
            </InputGroup>
          </Form>
        </div>
        <Pagination className="pagination justify-content-end ">
          <ul className="pagination pagination-primary">
            <PaginationItem disabled className="custom-pagination-item">
              <PaginationLink className="custom-pagination-link">
                <i data-feather="chevron-left"></i>Prev
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active className="custom-pagination-item">
              <PaginationLink
                href="#javascript"
                className="custom-pagination-link"
              >
                01
                <span className="sr-only">{"(current)"}</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="custom-pagination-item">
              <PaginationLink
                href="#javascript"
                className="custom-pagination-link"
              >
                02
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="custom-pagination-item">
              <PaginationLink
                href="#javascript"
                className="custom-pagination-link"
              >
                03
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="custom-pagination-item">
              <PaginationLink
                href="#javascript"
                className="custom-pagination-link"
              >
                04
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="custom-pagination-item">
              <PaginationLink
                href="#javascript"
                className="custom-pagination-link"
              >
                Next<i class="icofont icofont-thin-right"></i>
              </PaginationLink>
            </PaginationItem>
          </ul>
        </Pagination>
      </nav>
    </Fragment>
  );
};
export default DataTableComponent;
