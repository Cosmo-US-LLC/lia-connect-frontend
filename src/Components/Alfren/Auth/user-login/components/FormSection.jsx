import React from 'react';
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { GoPerson } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { LinkedInlogin } from "../../../../../redux/Auth/authActions";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const schema = yup.object().shape({
  username: yup.string().required('LinkedIn Username is required'),
  password: yup.string().required('LinkedIn Password is required'),
});

const LoginSection = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
   const formData= {
    email:data.username,
    password:data.password
  }
    console.log(data); // This will log the values of username and password
    dispatch(
      LinkedInlogin(formData, (resp) => {
        console.log('resp', resp)
        if (resp && resp?.data && resp?.status === 200 ||resp===undefined) {
          localStorage.setItem("isLinkedInLogin", true);
          navigate("/home");
        } else {
          const err = resp?.message;
          toast.error(err);
        }
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label className="col-form-label m-0 input-label-style">
          LinkedIn Username<span className="text-danger ms-1">*</span>
        </Label>
        <InputGroup>
          <InputGroupText className='input-group-text-custom'>
            <GoPerson className='input-icons-style' />
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
        {errors.username && <p className="text-danger">{errors.username.message}</p>}
      </FormGroup>
      <FormGroup>
        <Label className="col-form-label m-0 input-label-style">
          LinkedIn Password<span className="text-danger ms-1">*</span>
        </Label>
        <InputGroup>
          <InputGroupText className='input-group-text-custom'>
            <IoKeyOutline className='input-icons-style' />
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
        {errors.password && <p className="text-danger">{errors.password.message}</p>}
      </FormGroup>
      <FormGroup check>
        <Input defaultChecked className='bg-primary' type="checkbox" />
        {' '}
        <Label >
          I agree to the <span className='text-primary'>Terms of Services</span>
        </Label>
      </FormGroup>
      <button type="submit" className="sign-btn">Sign in to LinkedIn</button>
    </Form>
  );
}

export default React.memo(LoginSection);
