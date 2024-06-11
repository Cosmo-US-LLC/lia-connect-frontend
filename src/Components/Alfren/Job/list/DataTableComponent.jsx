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
import SkeletonCard from "Layout/CardSkeleton";

const DataTableComponent = ({
  paginatedUpdated,
  data,
  tableColumns,
  setPaginatedUpdated,
  setPagination,
  paginationDetails,
  isLoading,
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
        width: "100%",
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
    const { page, totalPages } = paginationDetails;
    const items = [];
    const maxDisplayedPages = 5;

    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1} active={page === 1}>
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start" disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i} active={page === i}>
          <PaginationLink onClick={() => handlePageChange(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end" disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages} active={page === totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
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
          <H4 attrH4={{ className: "text-muted m-0" }}>Delet Selected Data..!</H4>
        </div>
      )}
      {isLoading ? (
        <div>
          <DataTable columns={tableColumns} customStyles={customStyles} />
          <SkeletonCard />
        </div>
      ) : (
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
      )}

      <div style={{ position: "fixed", bottom: "22px", width: "100%" }}>
        <span
          style={{
            fontSize: "10px",
            fontWeight: "400",
            lineHeight: "15px",
            background: "#f5f9ff",
          }}
        >
          * To ensure that the system performs at the optimal efficiency, you can
          have up to 5 active jobs at a time.
        </span>

        <br />
        <nav
          aria-label="Page navigation example"
          className="py-3"
          style={{
            backgroundColor: "#f5f9ff",
            display: "inline-flex",
            justifyContent: "space-between",
            width: "80%",
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
                  className="js-example-basic-single col-sm-6"
                  onChange={handleChangeLimit}
                  menuPlacement="top" // Add this line to open the menu above the input
                />
              </InputGroup>
            </Form>
          </div>
          <Pagination className="pagination justify-content-end">
            <ul className="pagination pagination-alfren">
              <PaginationItem
                disabled={paginationDetails.page === 1}
                className="custom-pagination-item"
              >
                <PaginationLink
                  className="custom-pagination-link"
                  onClick={() => handlePageChange(paginationDetails.page - 1)}
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
                  onClick={() => handlePageChange(paginationDetails.page + 1)}
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
