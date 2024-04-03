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
import { ForgetPasswordRequestSent, Left } from "../../constant";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/auth/authActions";
import emailIcon from "../../assets/auth/emailIcon.svg";
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
    <Fragment>
      <Row>
        <Col xl={6} style={{ display: "flex", objectFit: "contain" }}>
          <Image
            src={rightSideImage}
            style={{
              width: "100%",
              objectFit: "contain",
              paddingLeft: "5%",
              display: "block",
              height: "auto",
            }}
          />
        </Col>
        <Col xl={6} style={{ display: "flex" }}>
          <div
            className="form-section"
            style={{
              flex: 1,
              display: "grid",
              alignContent: "center",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h1 className={styles.heading}>Reset Password</h1>
            <p className={styles.subHeading}>
              Today is a new day. It's your day. You shape it.{" "}
            </p>{" "}
            <p className={styles.subHeading}>
              Sign in to start managing your projects.
            </p>
            <div className="d-flex justify-content-between mt-5">
              <Form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <label className={styles.labelOfInput}>
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className={styles.formGroup}>
                    <Image src={emailIcon} className={styles.icon}></Image>
                    <input
                      type="text"
                      placeholder="Example@email.com"
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
            <span className={styles.copyRightHeading}>
              © 2024 Lia Connect. ALL RIGHTS RESERVED
            </span>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ForgotPassword;
