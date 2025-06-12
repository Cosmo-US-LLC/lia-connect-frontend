import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Button, Input } from "reactstrap";
import { toast } from "react-toastify";
import { INSTANCE } from "Config/axiosInstance";

const LoginOtp = ({
  modalOpen,
  setModalOpen,
  linkedInEmail,
  linkedInPassword,
  codeUrl,
}) => {
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtpCode(value);
    }
  };

  const handleSubmit = async () => {
    if (otpCode.length !== 6) {
      toast.error("Code must be exactly 6 digits.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await INSTANCE.post(`/auth/linkWithLinkedInEnterCode`, {
        code: otpCode,
        linkedInEmail,
        linkedInPassword,
        url: codeUrl,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("isLinkedInLogin", true);
        toast.success("LinkedIn Login Successful");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Login failed: " + response.data.message);
      }
    } catch (error) {
      toast.error(
        "An error occurred: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} centered>
      <ModalHeader toggle={() => setModalOpen(false)}>
        Enter Authentication Code
      </ModalHeader>
      <ModalBody>
        <Input
          type="tel"
          maxLength="6"
          placeholder="Enter 6-digit code"
          value={otpCode}
          onChange={handleInputChange}
          className="mb-3"
          autoFocus
        />
        <div className="d-flex justify-content-end">
          <Button color="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LoginOtp;
