import React from 'react';
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { GoPerson } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";

const LoginSection = () => {
  return (
    <Form>
    <FormGroup>
      <Label className="col-form-label m-0 input-label-style">
        LinkedIn Username<span className="text-danger ms-1">*</span>
      </Label>

      <InputGroup>
        <InputGroupText className='input-group-text-custom'>
          <GoPerson className='input-icons-style' />
        </InputGroupText>
        <Input
          className="border-left"
          type="email"
          placeholder="example@email.com"
          name="email"
        />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Label className="col-form-label m-0 input-label-style">
        LinkedIn Password<span className="text-danger ms-1">*</span>
      </Label>

      <InputGroup>
        <InputGroupText className='input-group-text-custom'>
          <IoKeyOutline className='input-icons-style' />
        </InputGroupText>
        <Input
          className="border-left"
          type="email"
          placeholder="example@email.com"
          name="email"
        />
      </InputGroup>
    </FormGroup>
    <FormGroup check>
      <Input defaultChecked className='bg-primary' type="checkbox" />
      {' '}
      <Label >
        I agree to the <span className='text-primary'>Terms of Serviecs</span>
      </Label>
    </FormGroup>
    <button className="sign-btn">Sign in to LinkedIn</button>
  </Form>
  );
}

export default React.memo(LoginSection);
