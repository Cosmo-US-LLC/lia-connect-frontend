import React, { Fragment, useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { Btn, H4 } from "../../../../AbstractElements";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import Select from "react-select";
import { ChevronLeft, ChevronRight } from "react-feather";

const DataTableComponent = ({
  paginatedUpdated,
  data,
  tableColumns,
  setPaginatedUpdated,
  setPagination,
  paginationDetails,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleDelet, setToggleDelet] = useState(false);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        color: "#1D1D1D",
        borderBottom: "none",
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
        width:"100%",

      },
    },
  };

  const options = [
    { value: 10, label: "10" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 150, label: "150" },
  ];
  const selectedOption = options.find(
    (option) => option.value === paginationDetails.limit
  );

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
    option: (provided) => ({
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

  const handleChangeLimit = (selectedOption) => {
    setPagination({ ...paginationDetails, limit: selectedOption.value });
    setPaginatedUpdated(!paginatedUpdated);
  };

  const handlePageChange = (page) => {
    setPagination({ ...paginationDetails, page: page });
    setPaginatedUpdated(!paginatedUpdated);
  };


  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= paginationDetails.totalPages; i++) {
      items.push(
        <PaginationItem
          key={i}
          active={paginationDetails.page === i}
          className="custom-pagination-item"
        >
          <PaginationLink
            className={`custom-pagination-link ${
              paginationDetails.page === i ? "active" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
            {paginationDetails.page === i && (
              <span className="sr-only">(current)</span>
            )}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
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
      <div style={{position: "fixed",bottom: "40px",width:'100%'}}> 
      <span
        style={{
          fontSize: "10px",
          fontWeight: "400",
          lineHeight: "15px",
          background: "#f5f9ff",
          display:'block',
          top:'30px',
          position:'relative'
        }}
      >
        * To ensure that the system performs at the optimal efficiency, you can
        have up to 5 active jobs at a time.
      </span>
      <br>
      </br>
      <nav
        aria-label="Page navigation example"
        className="py-3"
        style={{
          backgroundColor: "#f5f9ff",
          display: "inline-flex",
          justifyContent: "space-between",        
          width: "80%"
        }}
      >
        <div className="justify-content-start">
          <Form className="me-2">
            <InputGroup style={{ width: "120%", border: "none" }}>
              <InputGroupText
                style={{
                  border: "none",
                  backgroundColor: "#f5f9ff",
                  color: "#5C5E64",
                  fontSize: "12px",
                  fontWeight: "400",
                 
                }}
              >
                View Per Page
              </InputGroupText>
              <Select
                options={options}
                styles={customSelectStyles}
                value={selectedOption}
                className="js-example-basic-single col-sm-6 cusrsor-pointer-apply"
                onChange={handleChangeLimit}
              />
            </InputGroup>
          </Form>
        </div>
        <Pagination className="pagination justify-content-end ">
          <ul className="pagination pagination-alfren">
            <PaginationItem
              disabled={paginationDetails.page === 1}
              className="custom-pagination-item"
            >
              <PaginationLink
                className="custom-pagination-link"
                onClick={() => handlePageChange(paginationDetails.page-1)}
              >
                <ChevronLeft strokeWidth={0.5} />
                Prev
              </PaginationLink>
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem
              disabled={paginationDetails.page === paginationDetails.totalPages}
              className="custom-pagination-item"
            >
              <PaginationLink
                className="custom-pagination-link"
                onClick={() => handlePageChange(paginationDetails.page+1)}
                >
                Next
                <ChevronRight strokeWidth={0.5} />
              </PaginationLink>
            </PaginationItem>
          </ul>
        </Pagination>
      </nav>
      </div>
    </Fragment>
  );
};
export default DataTableComponent;
