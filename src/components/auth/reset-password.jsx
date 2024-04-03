import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import styles from "../../style/AuthPages.module.css";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Form,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  List,
  Badge,
  Alert,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { ForgetPasswordRequestSent } from "../../constant";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/auth/authActions";

import rightSideImage from "../../assets/auth/rightSideImage.png";
import { Image } from "react-bootstrap";

const ForgotPassword = () => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const initialState = {
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    dispatch(
      forgotPassword(formData, (resp) => {
        if (resp.statusCode == 200) {
          toast.success(ForgetPasswordRequestSent);
        } else {
          const err = resp.message;
          if (Array.isArray(err)) {
            err.forEach((element) => {
              toast.error(element);
            });
          } else {
            toast.error(err);
          }
        }
      })
    );
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="form-section"
        style={{
          flex: 1,
          padding: "20px",
          display: "grid",
          alignContent: "center",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <h1 className={styles.heading}>Reset Password</h1>
        <p className={styles.subHeading}>
          Today is a new day. It's your day. You shape it.{" "}
        </p>{" "}
        <p className={styles.subHeading}>
          Sign in to start managing your projects.
        </p>
        <div className="d-flex justify-content-between mt-2">
          <Form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <div className={styles.formGroup}>
                <MailOutlineOutlinedIcon
                  className={styles.icon}
                  fontSize="small"
                />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  className={styles.InputField}
                />
                <i className={styles.iconRight}></i>{" "}
              </div>
            </FormGroup>

            <FormGroup>
              <Button className={styles.submitButton} type="submit" block>
                Request
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
      <div
        className="image-section"
        style={{ flex: 1, display: "flex", alignItems: "center" }}
      >
        <img
          style={{
            display: "block",
            width: "110%",
            height: "auto",
            objectFit: "contain",
            paddingLeft: "5%",
          }}
          src={rightSideImage}
          alt="Image Description"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
