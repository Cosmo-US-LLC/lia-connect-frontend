import React, { useState } from 'react';
import { Button, Modal, ModalBody, Input, Form, FormGroup, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import './OtpLogin.scss';
import { addDynamicColorClass } from 'Hooks/useShowClass';

function LoginOtp(props) {
  const { className } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>
        Click Me
      </Button> */}
      <Modal
        size="md"
        fullscreen='md'          // Set modal size to large
        centered={true}     // Center the modal
        isOpen={modal}
        modalTransition={{ timeout: 100 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={toggle}
        className={`text-align-center custom-modal ${className}`} // Apply custom class
      >
        <div toggle={toggle} className='Linked-text-style'>LinkedIn Security Code</div>
        <div>
          <img src="./otp.png" className='otp-img' alt="" />
        </div>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col sm={10} className='margin-auto-style'>
                <div className='input-box-style'>
                  <Input
                    bsSize="lg"
                    id="exampleEmail"
                    name="otp"
                    placeholder="Enter LinkedIn Security Code *"
                    type="number"
                    required
                    className="center-placeholder input-label-style mb-3"
                  />
                  <Button
                    className='w-100 opt-login-btn'
                    color="primary"
                  >
                    Large
                  </Button>
                </div>
               <div className='space-y-gap'>
               <h1 className={`mt-2 col-form-label text-align-center input-label-style ${addDynamicColorClass('#1264FD', 'linkedInUsernameColor')}`}
                >
                  LinkedIn Username
                </h1>
                <p className={`mb-0 check-span-text text-align-center ${addDynamicColorClass('#595959', 'infoTextColor')}`}>
                  Check your spam folder or click here to resend the confirmation email.
                </p>
               </div>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

LoginOtp.propTypes = {
  className: PropTypes.string,
};

export default LoginOtp;
