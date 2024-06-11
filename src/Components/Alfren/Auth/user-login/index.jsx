import React from 'react';
import './index.scss';
import CarouselSection from './components/CarousalSection';
import LoginSection from './components/FormSection';
import LoginOtp from './components/login-otp/LoginOtp';


// UI JSX
const UserLogin = () => {
  return (
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card m-0">
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
                          <h4 className="text-start main-heading">Connect Your LinkedIn <br /> Account.</h4>
                        </div>
                      </div>
                    </div>
                    <LoginSection />
                  </div>
                </div>
              </div>
              <LoginOtp/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default UserLogin;
