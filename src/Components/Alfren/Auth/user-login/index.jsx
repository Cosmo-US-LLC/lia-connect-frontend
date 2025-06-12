import React, { useEffect } from "react";
import "./index.scss";
import CarouselSection from "./components/CarousalSection";
import LoginSection from "./components/FormSection";
import LoginOtp from "./components/login-otp/LoginOtp";

const UserLogin = ({ setConnectModel }) => {
  const [isLoginCodeRequired, setIsLoginCodeRequired] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [linkedInEmail, setLinkedInEmail] = React.useState("");
  const [linkedInPassword, setLinkedInPassword] = React.useState("");
  const [codeUrl, setCodeUrl] = React.useState("");

  useEffect(() => {
    if (isLoginCodeRequired === true) {
      setModalOpen(true);
    }
  }, [isLoginCodeRequired]);

  return (
    <div className="row justify-content-center">
      <LoginOtp
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        linkedInEmail={linkedInEmail}
        linkedInPassword={linkedInPassword}
        codeUrl={codeUrl}
      />
      <div className="col-12">
        <div className="card m-0" style={{ paddingTop: "30px" }}>
          <div className="row g-4 inner-cont">
            <div className="col-12 col-md-6">
              <CarouselSection />
            </div>
            <div className="col-12 col-md-6 m-auto">
              <div className="col-12 col-lg-11 col-xl-10">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-12">
                      <div>
                        <h4 className="text-start main-heading">
                          Connect Your LinkedIn <br /> Account.
                        </h4>
                      </div>
                    </div>
                  </div>
                  <LoginSection
                    setConnectModel={setConnectModel}
                    setIsLoginCodeRequired={setIsLoginCodeRequired}
                    setLinkedInEmail={setLinkedInEmail}
                    setLinkedInPassword={setLinkedInPassword}
                    setCodeUrl={setCodeUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
