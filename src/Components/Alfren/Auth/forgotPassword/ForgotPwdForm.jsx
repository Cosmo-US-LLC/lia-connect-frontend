import React, { Fragment, useState } from "react";
import { Btn, H4, P } from "../../../../AbstractElements";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { Mail } from "react-feather";
import { forgotPassword } from "../../../../redux/Auth/authActions";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ForgetPasswordRequestSent } from "../../../../constant/index";
import { useForm } from "react-hook-form";

const ForgotPwdForm = ({ logoClassMain }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    email: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit1 = (e) => {
    dispatch(
      forgotPassword(formData, (resp) => {
        if (resp.status == 204) {
          toast.success(ForgetPasswordRequestSent);
          navigate("auth/login");
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };

  return (
    <Fragment>
      <div className="login-card">
        <div>
          <div className="login-main">
            <Form
              className="theme-form login-form"
              onSubmit={handleSubmit(onSubmit1)}
            >
              <H4
                attrH4={{
                  style: {
                    color: "#1D1D1D",
                    fontSize: "26.16px",
                    fontWeight: 600,
                    lineHeight: "30.16px",
                    letterSpacing: "-0.01em",
                    textAlign: "center",
                    marginBottom: "20px",
                  },
                }}
              >
                Forget Your Password ?
              </H4>
              <P
                attrPara={{
                  style: {
                    color: "#595959",
                    fontSize: "13.4px",
                    fontWeight: 400,
                    lineHeight: "21.45px",
                    textAlign: "center",
                    marginBottom: "40px",
                  },
                }}
              >
                Today is a new day. It's your day. You shape it. Sign in to
                start managing your projects.
              </P>
              <FormGroup>
                <Label className="col-form-label m-0">
                  Email<span className="text-danger ms-1">*</span>
                </Label>

                <InputGroup>
                  <InputGroupText>
                    <Mail strokeWidth={0.5} size={16} />
                  </InputGroupText>
                  <Input
                    type="email"
                    required
                    placeholder="Example@email.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <Btn
                  attrBtn={{
                    className: "d-block w-100 mt-2",
                    color: "primary",
                    type: "submit",
                  }}
                >
                  Send Request
                </Btn>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPwdForm;
