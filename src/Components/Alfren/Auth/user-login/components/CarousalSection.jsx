import React, { useState, useEffect } from "react";
import { UncontrolledCarousel } from "reactstrap";
import { CAROUSAL_ITEMS } from "../constants";

const CarouselSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % CAROUSAL_ITEMS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const renderText = () => {
    switch (activeIndex) {
      case 0:
        return (
          <div>
            <strong className="text-style">Security</strong>{" "}
            <strong className="protocol-style">Protocol</strong>
          </div>
        );
      case 1:
        return (
          <div>
            <strong className="text-style">Wider</strong>{" "}
            <strong className="protocol-style">Range</strong>
          </div>
        );
      case 2:
        return (
          <div>
            <strong className="text-style">Top</strong>{" "}
            <strong className="protocol-style">Talent</strong>
          </div>
        );
      case 3:
        return (
          <div>
            <strong className="text-style">Reduced</strong>{" "}
            <strong className="protocol-style">Cost</strong>
          </div>
        );
      default:
        return null;
    }
  };
  const renderParagraph = () => {
    switch (activeIndex) {
      case 0:
        return (
          <div style={{ height: "80px" }} className="text-center mt-2">
            <p className="security-text-color">
              Your security is our priority.
            </p>
            <strong className="font-weight-bold text-highlight">
              AWS Data Protection
            </strong>
            <span className="security-text-color">for</span>
            <p className="mt-1 security-text-color"> secure credentials.</p>
          </div>
        );
      case 1:
        return (
          <div style={{ height: "80px" }} className="text-center mt-2">
            <p className="security-text-color">Reach and build connections</p>
            <span> with </span>{" "}
            <strong className="font-weight-bold text-highlight">
              900 Million Users
            </strong>
            <span className="security-text-color"> , on </span>
            <p className="mt-1 security-text-color"> secure credentials.</p>
          </div>
        );
      case 2:
        return (
          <div style={{ height: "80px" }} className="text-center mt-2">
            <p className="security-text-color">Tap the best</p>
            <strong className="font-weight-bold text-highlight">
              Untapped Talent.
            </strong>
            <p className="d-none mt-1 security-text-color">
              {" "}
              secure credentials.
            </p>
          </div>
        );
      case 3:
        return (
          <div style={{ height: "80px" }} className="text-center mt-2">
            <p className="security-text-color">Reduce your cost of</p>
            <span className="security-text-color"> hiring </span>
            <strong className="font-weight-bold text-highlight">
              Up To 30%.
            </strong>
            <p className="d-none mt-1 security-text-color">
              {" "}
              secure credentials.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderImage = () => {
    switch (activeIndex) {
      case 0:
        return (
          <img
            src={CAROUSAL_ITEMS[0]?.src}
            alt="Image 0"
            style={{
              maxHeight: "440px",
              width: "440px",
              margin: "0 auto",
              objectPosition: "center",
            }}
          />
        );
      case 1:
        return (
          <img
            src={CAROUSAL_ITEMS[1]?.src}
            alt="Image 1"
            style={{
              maxHeight: "440px",
              width: "440px",
              margin: "0 auto",
              objectPosition: "center",
            }}
          />
        );
      case 2:
        return (
          <img
            src={CAROUSAL_ITEMS[2]?.src}
            alt="Image 2"
            style={{
              maxHeight: "440px",
              width: "440px",
              margin: "0 auto",
              objectPosition: "center",
            }}
          />
        );
      case 3:
        return (
          <img
            src={CAROUSAL_ITEMS[3]?.src}
            alt="Image 3"
            style={{
              maxHeight: "440px",
              width: "440px",
              margin: "0 auto",
              objectPosition: "center",
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="security-text-style">{renderText()}</div>
      {/* This is the images carousel section */}
      {/* <UncontrolledCarousel
        fade={true}
        activeIndex={activeIndex}
        items={CAROUSAL_ITEMS}
      /> */}
      <div
        // className='w-full max-h-[440px] flex justify-center items-center'
        style={{
          height: "440px",
          width: "100%",
          // border: "1px solid #E5E5E5",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* {renderImage()} */}
        <div
          style={{
            // D:\projects\lia-connect-frontend\src\assets\alfren-hr.gif
            // src\assets\alfren-hr.gif
            backgroundImage: `url(${require("../../../../../assets/alfren-hr.gif")})`,
            // backgroundImage: {Gif},
            // backgroundImage: `url('/img/alfren-hr.gif')`,
            // backgroundImage: `url(${require("../../../../assets/used-files/images/auth/login.png")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            // backgroundColor: "#F2F4FF",
            display: "block",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </div>
      {renderParagraph()}
    </div>
  );
};

export default React.memo(CarouselSection);
