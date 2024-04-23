import React, { Fragment, useEffect, useRef, useState } from "react";
import { Col, Input } from "reactstrap";
import { H4, H6, LI, ToolTip, UL } from "../../../../../AbstractElements";

import { InputGroup, InputGroupText } from "reactstrap";
import { Calendar, Check, Flag, Search, X } from "react-feather";
import DatePicker from "react-datepicker";
import { set } from "date-fns";

const DateModal = ({
  isDateSelected,
  setIsDateSelected,
  closeDateDropdown,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    var formattedDate = new Date(date);
    // formattedDate = formattedDate.toDateString();
    setStartDate(formattedDate);
  };

  const handleEndDateChange = (date) => {
    var formattedDate = new Date(date);
    // formattedDate = formattedDate.toDateString();
    setEndDate(formattedDate);
  };

  const resetDate = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const markDone = () => {
    setIsDateSelected(
      startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }) +
        "  -  " +
        endDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
    );
    closeDateDropdown();
  };
  return (
    <Fragment>
      <div
        style={{
          padding: "10px",
          position: "absolute",
          boxShadow: "0px 10px 26px 0px #0000001A",
          zIndex: 2,
          backgroundColor: "white",
          borderRadius: "8px",
          width: "50%",
          left: "180px",
          border: "1px solid #EBEBEB",
        }}
      >
        <div className="mt-3 row">
          <Col xl="6">
            <div style={{ textAlign: "right", display: "ruby-text" }}>
              <InputGroup
                style={{
                  width: "80%",
                  border: "1px solid #E9E9E9 ",
                  boxShadow: "0px 2px 12px 0px #00000014",
                  borderRadius: "1px",
                  color: "#595959",
                }}
                className="mb-4"
              >
                <InputGroupText
                  style={{ backgroundColor: "white", border: "none" }}
                >
                  <Calendar strokeWidth={0.5} size={18} />
                </InputGroupText>
                <input
                  className="form-control"
                  value={startDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                  style={{ border: "none" }}
                ></input>
              </InputGroup>
              <DatePicker
                style={{
                  width: "80%",
                  border: "1px solid #E9E9E9 ",
                  boxShadow: "0px 2px 12px 0px #00000014",
                  borderRadius: "8px",
                }}
                className="form-control digits"
                selected={startDate}
                onChange={handleStartDateChange}
                WithRange={true}
                inline
                size
              />
            </div>
          </Col>
          <Col xl="6">
            <div style={{ textAlign: "left", display: "ruby-text" }}>
              <InputGroup
                style={{
                  width: "80%",
                  border: "1px solid #E9E9E9 ",
                  boxShadow: "0px 2px 12px 0px #00000014",
                  borderRadius: "1px",
                  color: "#595959",
                }}
                className="mb-4"
              >
                <InputGroupText
                  style={{ backgroundColor: "white", border: "none" }}
                >
                  <Calendar strokeWidth={0.5} size={18} />
                </InputGroupText>
                <input
                  className="form-control"
                  value={endDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                  style={{ border: "none" }}
                ></input>
              </InputGroup>
              <DatePicker
                className="form-control digits"
                selected={endDate}
                onChange={handleEndDateChange}
                WithRange={true}
                inline
                border
              />
            </div>
          </Col>
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            className="btn  pe-4 ps-4 me-1 border-dark"
            onClick={resetDate}
          >
            <span>Reset</span>
          </button>
          <button className="btn btn-primary pe-4 ps-4 ms-1" onClick={markDone}>
            <span>Done</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default DateModal;
