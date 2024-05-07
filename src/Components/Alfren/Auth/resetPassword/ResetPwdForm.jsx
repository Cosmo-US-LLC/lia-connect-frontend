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
import { AlertTriangle, Check, Circle, Eye, Key, X } from "react-feather";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../../../redux/Auth/authActions";
import { PasswordReset } from "../../../../Constant/index";

const ResetPwdForm = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState(true);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [confirmPasswordMatched, setConfirmPasswordMatched] = useState(false);

  const initialState = {
    token: token,
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const passwordRequirements = [
    { text: "Atleast 1 letter should be uppercase.", status: 0 },
    { text: "Atleast 1 special character include.", status: 0 },
    { text: "Atleast 1 number include.", status: 0 },
    { text: "Password should be 8 letter long.", status: 0 },
  ];
  const [requirements, setRequirements] = useState(passwordRequirements);

  const handleChange = (e) => {
    if (e.target.name == "password") {
      const password = e.target.value;

      // Update requirements based on entered password
      const updatedRequirements = passwordRequirements.map((requirement) => {
        const upperCase = /[A-Z]/.test(password);
        const number = /[0-9]/.test(password);
        const symbol = /[!@#$%^&*()_+\-=[\]{};':",./<>?|\\ ]/.test(password);

        setError(true);

        switch (requirement.text) {
          case "Password should be 8 letter long.":
            return {
              ...requirement,
              status: password.length >= 8 ? 1 : 0,
            };
          case "Atleast 1 special character include.":
            return {
              ...requirement,
              status: symbol ? 1 : -1,
            };
          case "Atleast 1 number include.":
            return {
              ...requirement,
              status: number ? 1 : -1,
            };
          case "Atleast 1 letter should be uppercase.":
            return {
              ...requirement,
              status: upperCase ? 1 : -1,
            };
          default:
            return requirement; // Keep other requirements unchanged
        }
      });
      console.log("pppp", updatedRequirements);

      const hasUnfulfilledRequirement = updatedRequirements.some(
        (requirement) => requirement.status <= 0
      );

      console.log("hhhh", hasUnfulfilledRequirement);
      setError(hasUnfulfilledRequirement);

      setRequirements(updatedRequirements);
    } else if (e.target.name == "confirm_password") {
      setConfirmPasswordMatched(
        formData.password !== e.target.value ? false : true
      );
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit1 = (e) => {
    dispatch(
      resetPassword(formData, (resp) => {
        if (resp.status == 204) {
          toast.success(PasswordReset);
          navigate("/auth/login");
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
                    fontSize: "30.16px",
                    fontWeight: 600,
                    lineHeight: "30.16px",
                    letterSpacing: "-0.01em",
                    textAlign: "center",
                    marginBottom: "20px",
                  },
                }}
              >
                Reset Password
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
                  New Password<span className="text-danger ms-1">*</span>
                </Label>

                <InputGroup>
                  <InputGroupText>
                    <Key strokeWidth={0.5} size={16} />
                  </InputGroupText>
                  <Input
                    type={togglePassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputGroupText>
                    <Eye
                      strokeWidth={0.5}
                      size={16}
                      onClick={() => setTogglePassword(!togglePassword)}
                    />
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label className="col-form-label m-0">
                  Confirm New Password
                  <span className="text-danger ms-1">*</span>
                </Label>

                <InputGroup>
                  <InputGroupText>
                    <Key strokeWidth={0.5} size={16} />
                  </InputGroupText>
                  <Input
                    type={toggleConfirmPassword ? "text" : "password"}
                    required
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                  <InputGroupText>
                    <Eye
                      strokeWidth={0.5}
                      size={16}
                      onClick={() =>
                        setToggleConfirmPassword(!toggleConfirmPassword)
                      }
                    />
                  </InputGroupText>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                {requirements.map((element, index) => (
                  <div
                    style={{
                      color:
                        element.status === 0
                          ? "#595959"
                          : element.status === -1
                          ? "#AA1313"
                          : "#299A16",
                    }}
                  >
                    {element.status === 0 ? (
                      <Circle strokeWidth={0.5} size={7} />
                    ) : element.status === -1 ? (
                      <X strokeWidth={0.5} size={7} />
                    ) : (
                      <Check strokeWidth={0.5} size={7} />
                    )}

                    <span style={{ fontSize: "10px", marginLeft: "4px" }}>
                      {element.text}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    color: confirmPasswordMatched ? "white" : "#AA1313",
                  }}
                >
                  <AlertTriangle strokeWidth={0.5} size={7} />
                  <span style={{ fontSize: "10px", marginLeft: "4px" }}>
                    Confirm Password Not matched
                  </span>
                </div>
              </FormGroup>

              <FormGroup>
                <Btn
                  attrBtn={{
                    className: "d-block w-100 mt-2",
                    color: "primary",
                    type: "submit",
                  }}
                >
                  Confirm
                </Btn>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPwdForm;
