import { useState } from "react";
import { Link } from "react-feather";
import { Col, FormGroup, Input, Row, UncontrolledTooltip } from "reactstrap";

export const DelayDropdown = ({
  index,
  target,
  sequence,
  selectedOption,
  dropdownActive,
  setCloseDropdown,
  setSequenceArray,
  sequenceArray,
}) => {
  const [delayTillNextActionValue, setDelayTillNextActionValue] = useState(
    selectedOption.delayTillNextActionValue
  );
  const [delayTillNextActionType, setDelayTillNextActionType] = useState(
    selectedOption.delayTillNextActionType
  );

  const handleChangeDelayTillNextActionValue = (event) => {
    setDelayTillNextActionValue(event.target.value);
  };

  const handleChangeDelayTillNextActionType = (event) => {
    setDelayTillNextActionType(event.target.value);
  };

  const setDelay = (e) => {
    e.preventDefault();
    setSequenceArray((sequenceArray) => {
      return sequenceArray.map((obj) => {
        if (
          obj.sequenceId === sequence.sequenceId &&
          obj.options.some((option) => option.id === selectedOption.id)
        ) {
          return {
            ...obj,
            options: obj.options.map((option) => {
              if (option.id === selectedOption.id) {
                return {
                  ...option,
                  delayTillNextActionValue,
                  delayTillNextActionType,
                };
              }
              return option;
            }),
          };
        }
        return obj;
      });
    });

    setCloseDropdown(index);
  };

  return (
    <UncontrolledTooltip
      isOpen={dropdownActive[index]}
      target={target}
      placement="bottom"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 6px 26px -3.89px #0000001A",
      }}
    >
      <div
        style={{
          width: "100%",
          left: "300px",
        }}
      >
        <div
          className="mb-3"
          style={{
            color: "#595959",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "19.2px",
            textAlign: "center",
          }}
        >
          Delay before the next action:
        </div>
        <div>
          <FormGroup style={{ textAlign: "left" }}>
            <Row>
              <Col xl="5">
                <Input
                  type="number"
                  name="delayTillNextActionValue"
                  value={delayTillNextActionValue}
                  onChange={handleChangeDelayTillNextActionValue}
                />
              </Col>
              <Col xl="7">
                <Input
                  className="form-control"
                  type="select"
                  name="delayTillNextActionType"
                  value={delayTillNextActionType}
                  onChange={handleChangeDelayTillNextActionType}
                >
                  <option className="form-control" value="d">
                    Days
                  </option>
                  <option className="form-control" value="h">
                    Hours
                  </option>
                  <option className="form-control" value="w">
                    {" "}
                    Week
                  </option>
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <Col xl="12" className="d-flex justify-space-between">
            <button
              className="btn btn-outline"
              onClick={() => setCloseDropdown(index)}
            >
              <span>Cancel</span>
            </button>
            <button className="btn btn-primary " onClick={setDelay}>
              <span>Next</span>
            </button>
          </Col>
        </div>
      </div>
    </UncontrolledTooltip>
  );
};
