import React from "react";
import { Button } from "reactstrap";
import upgradeAlert from "../../assets/used-files/sidebar/upgradeMessage.png";
import { Image } from "../../AbstractElements";
import "./styles.css"; // already included

const TrialAlertItem = ({ onClose }) => {
  return (
    <div className="trial-alert-card">
      <div className="trial-alert-glow" />

      <button
        className="trial-alert-close"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>

      {/* Image */}
      <Image
        attrImage={{
          src: upgradeAlert,
          alt: "Upgrade Trial",
          className: "trial-alert-image",
        }}
      />

      {/* Title */}
      <h5 className="trial-alert-title">Just 3 Days Left!</h5>

      {/* Description */}
      <p className="trial-alert-text">
      Your Free Trial Will End In 3 Days.
      </p>

      {/* Upgrade Button */}
      <div className="trial-alert-button-wrapper">
        <Button className="trial-alert-button">Upgrade Now</Button>
      </div>
    </div>
  );
};

export default TrialAlertItem;

// const TrialAlertItem = ({ onClose }) => {
//   return (
//     <li className="sidebar-list text-center trailDiv position-relative">
//       {/* ❌ Close Button */}
//       <button
//         onClick={onClose}
//         style={{
//           position: "absolute",
//           top: "5px",
//           right: "5px",
//           background: "transparent",
//           border: "none",
//           fontSize: "16px",
//           fontWeight: "bold",
//           cursor: "pointer",
//         }}
//         aria-label="Close"
//       >
//         &times;
//       </button>

//       <Image
//         attrImage={{
//           src: upgradeAlert,
//           className: "sidebar-icon-margin",
//           alt: "",
//           style: { width: "100px", height: "100px" },
//         }}
//       />
//       <div className="upgradeAlert text-center">
//         <h4 style={{ color: "#000000", fontSize: "14px", fontWeight: 600 }}>
//           3 Days Left
//         </h4>
//         <p style={{ color: "#545454", fontSize: "10px", fontWeight: 400 }}>
//           Your Free Trial Will End In 3 Days.
//         </p>
//       </div>
//       <Button
//         style={{
//           padding: "2% 9% 2% 9%",
//           fontSize: "16px",
//           fontWeight: "400",
//         }}
//       >
//         Upgrade
//       </Button>
//     </li>
//   );
// };

// export default TrialAlertItem;
