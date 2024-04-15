import React, { Fragment, useState } from "react";
import SvgIcon from "../../../Components/Common/Component/SvgIcon";
import {
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import searchIcon from "../../../assets/used-files/icons/search.svg";
import { Image } from "../../../AbstractElements";

const Searchbar = () => {
  const [searchresponsive, setSearchresponsive] = useState(false);
  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive);
      document.querySelector(".search-full").classList.add("open");
      document.querySelector(".more_lang").classList.remove("active");
    } else {
      setSearchresponsive(!searchresponsive);
      document.querySelector(".search-full").classList.remove("open");
    }
  };

  return (
    <Fragment>
      <Form className="me-2">
        <InputGroup
          style={{
            boxShadow: "0px 6px 26px 0px #0000001A",
            borderRadius: "4px",
          }}
        >
          <InputGroupText
            style={{
              border: "none",
              backgroundColor: "white",
              borderRadius: "4px 0px 0px 4px",
            }}
          >
            <Image
              attrImage={{
                src: searchIcon,
                className: `header-icon-margin`,
                alt: "",
              }}
            />
          </InputGroupText>
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            style={{ border: "none", borderRadius: "0px 4px 4px 0px" }}
          />
          <div className="valid-feedback">{"Looks good!"}</div>
        </InputGroup>
      </Form>
    </Fragment>
  );
};

export default Searchbar;
