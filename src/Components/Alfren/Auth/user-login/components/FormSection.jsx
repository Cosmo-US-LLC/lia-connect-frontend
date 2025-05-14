import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { GoPerson } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL, baseURLFlask } from "Config/endpoint";
import { INSTANCE } from "Config/axiosInstance";

const schema = yup.object().shape({
  username: yup.string().required("LinkedIn Username is required"),
  password: yup.string().required("LinkedIn Password is required"),
});

const LoginSection = ({ setConnectModel }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await INSTANCE.post(`/auth/linkWithLinkedIn`, {
        email: data.username,
        password: data.password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("isLinkedInLogin", true);
        toast.success("LinkedIn Login Successful");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Login failed:" + response.data.message);
      }
    } catch (error) {
      toast.error(
        "Error occurred:" + (error.response?.data?.message || error.message)
      );
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label className="col-form-label m-0 input-label-style">
          LinkedIn Username<span className="text-danger ms-1">*</span>
        </Label>
        <InputGroup>
          <InputGroupText className="input-group-text-custom">
            <GoPerson className="input-icons-style" />
          </InputGroupText>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="border-left"
                type="text"
                placeholder="Enter your LinkedIn Username"
              />
            )}
          />
        </InputGroup>
        {errors.username && (
          <p className="text-danger">{errors.username.message}</p>
        )}
      </FormGroup>

      <FormGroup>
        <Label className="col-form-label m-0 input-label-style">
          LinkedIn Password<span className="text-danger ms-1">*</span>
        </Label>
        <InputGroup>
          <InputGroupText className="input-group-text-custom">
            <IoKeyOutline className="input-icons-style" />
          </InputGroupText>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="border-left"
                type="password"
                placeholder="Enter your LinkedIn Password"
              />
            )}
          />
        </InputGroup>
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </FormGroup>

      <FormGroup check>
        <Input defaultChecked className="bg-primary" type="checkbox" />{" "}
        <Label>
          I agree to the <span className="text-primary">Terms of Services</span>
        </Label>
      </FormGroup>

      <button type="submit" className="sign-btn" disabled={loading}>
        {loading ? "Signing in..." : "Sign in to LinkedIn"}
      </button>
      <button
        type="reset"
        className="sign-btn"
        style={{
          backgroundColor: "#fecf41"
        }}
        onClick={() => setConnectModel(false)}
      >
        Cancel
      </button>
    </Form>
  );
};

export default React.memo(LoginSection);
