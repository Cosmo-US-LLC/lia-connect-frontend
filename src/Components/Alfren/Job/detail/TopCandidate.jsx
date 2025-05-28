// import React, { Fragment, useEffect, useState } from "react";
// import {
//   Card,
//   CardBody,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Label,
//   Tooltip,
// } from "reactstrap";
// import { CiCircleInfo } from "react-icons/ci";
// import { BiLinkExternal, BiUser } from "react-icons/bi";
// import { BsLinkedin } from "react-icons/bs";
// import { MdMessage } from "react-icons/md";
// import { PiHandshakeLight } from "react-icons/pi";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { fetchJobDetails } from "../../../../redux/Job/jobActions";
// import user1 from "../../../../assets/images/user/user.png";

// const TopCandidate = ({ id }) => {
//   const [topCandidateDetail, setJobDetails] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//    const [tooltipOpen, setTooltipOpen] = useState(false);
//   const toggle = () => setTooltipOpen(!tooltipOpen);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const toggleModal = () => setModalOpen(!modalOpen);

//   useEffect(() => {
//     if (id) {
//       setLoading(true);
//       const url = `/jobs/${id}/top-candidates`;
//       dispatch(fetchJobDetails(url, handleFetchResponse));
//     }
//   }, [dispatch, id]);

//   const handleFetchResponse = (resp) => {
//     setLoading(false);
//     if (resp?.status === 200) {
//       setJobDetails(resp.data);
//     } else {
//       toast.error(resp?.message || "Failed to fetch candidates");
//     }
//   };

//   const handleCandidateClick = (candidateId) => {
//     navigate(`/candidates/detail/${candidateId}`);
//   };

//   const handleAllCandidateClick = () => {
//     navigate(`/candidates?jobId=${id}`);
//   };

//   return (
//     <Card
//       style={{
//         borderRadius: "10px",
//         marginBottom: "120px",
//       }}
//     >
//       <CardBody>
//         <p
//           style={{
//             fontSize: "12px",
//             fontWeight: 400,
//             position: "relative",
//             width: "100%",
//             color: "#595959",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//           }}
//         >
//           {`Shortlisted Candidates (${topCandidateDetail?.length || 0})`}

//           <span
//             style={{
//               position: "absolute",
//               bottom: "3px",
//               left: "0",
//               width: "12%",
//               borderBottom: "1px solid #1264FD",
//             }}
//           ></span>

//           {topCandidateDetail && topCandidateDetail.length > 0 && (
//             <div className="relative">
//               <p
//                 style={{
//                   color: "#1264FD",
//                   fontWeight: 500,
//                   fontSize: "14px",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                 }}
//                 onClick={handleAllCandidateClick}
//               >
//                 View Shortlisted Candidates
//               </p>
//             </div>
//           )}
//         </p>

//         <Modal
//           isOpen={modalOpen}
//           toggle={toggleModal}
//           style={{
//             maxWidth: "1000px",
//             width: "80%",
//             margin: "auto",
//           }}
//           centered
//         >
//           <ModalHeader
//             style={{
//               position: "relative",
//               padding: "1rem",
//               borderBottom: "1px solid #dee2e6",
//             }}
//           >
//             How Scores Are Calculated
//             <button
//               type="button"
//               onClick={toggleModal}
//               style={{
//                 position: "absolute",
//                 right: "20px",
//                 top: "15px",
//                 background: "none",
//                 border: "none",
//                 fontSize: "1.5rem",
//                 cursor: "pointer",
//                 color: "#6c757d",
//                 padding: "0",
//                 margin: "0",
//               }}
//             >
//               &times;
//             </button>
//           </ModalHeader>
//           <ModalBody style={{ padding: "2rem" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexDirection: "column",
//                 gap: "20px",
//                 width: "100%",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "20px",
//                   width: "100%",
//                   justifyContent: "center",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <img
//                   src="../../score-tip1.png"
//                   alt="Skill Matching"
//                   style={{ width: "100%", maxWidth: "350px", height: "auto" }}
//                 />
//                 <span style={{ fontWeight: "bold", fontSize: "32px" }}>+</span>
//                 <img
//                   src="../../score-tip2.png"
//                   alt="Experience Matching"
//                   style={{ width: "100%", maxWidth: "150px", height: "auto" }}
//                 />
//                 <span style={{ fontWeight: "bold", fontSize: "32px" }}>=</span>
//                 <img
//                   src="../../score-tip3.png"
//                   alt="Total Score"
//                   style={{ width: "100%", maxWidth: "270px", height: "auto" }}
//                 />
//               </div>
//             </div>
//           </ModalBody>
//           <ModalFooter
//             style={{ padding: "1rem 2rem", borderTop: "1px solid #dee2e6" }}
//           >
//             <Button
//               color="primary"
//               onClick={toggleModal}
//               style={{
//                 padding: "0.375rem 0.75rem",
//                 fontSize: "1rem",
//                 borderRadius: "0.25rem",
//               }}
//             >
//               Got It
//             </Button>
//           </ModalFooter>
//         </Modal>

//         {loading && (
//           <div className="text-center py-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         )}

//         {!loading &&
//           (!topCandidateDetail || topCandidateDetail.length === 0) && (
//             <div className="text-center py-4 text-muted">
//               No top candidates found
//             </div>
//           )}

//         {!loading && topCandidateDetail && (
//           <div
//             style={{
//               maxHeight: "800px",
//               overflowY: "auto",
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//             }}
//           >
//             {topCandidateDetail.map((topCand, index) => {
//               const activity =
//                 topCand.lastActionPerformed?.activity || "No recent activity";
//               const formattedTime = topCand.lastActionPerformed
//                 ? new Date(
//                     topCand.lastActionPerformed.activityTime
//                   ).toLocaleString(undefined, {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                     // hour: "2-digit",
//                     // minute: "2-digit",
//                   })
//                 : "";

//               return (
//                 <Card
//                   key={index}
//                   style={{
//                     border: "1px solid #EBF1FC",
//                     boxShadow: "3px 3px 3px 0px #BA9FC914",
//                     marginBottom: "10px",
//                     height: "130px",
//                   }}
//                 >
//                   <CardBody style={{ padding: "6px" }}>
//                     <div className="media">
//                       <div
//                         className="avatar me-3 ms-1"
//                         style={{ width: "50px" }}
//                       >
//                         {topCand?.image ? (
//                           <img
//                             src={topCand?.image || user1}
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = user1;
//                             }}
//                             alt=""
//                             className="img-50 rounded-circle"
//                           />
//                         ) : (
//                           <div
//                             style={{
//                               width: "50px",
//                               height: "50px",
//                               borderRadius: "50%",
//                               backgroundColor: "red",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               zIndex: 100,
//                             }}
//                           >
//                             <BiUser
//                               className="img-50 rounded-circle"
//                               style={{ fontSize: "50px", color: "#ccc" }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                       <div className="media-body d-flex justify-content-between">
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "space-between",
//                             alignItems: "flex-start",
//                             width: "75%",
//                           }}
//                         >
//                           <div>
//                             <p
//                               style={{
//                                 fontSize: "14px",
//                                 fontWeight: 400,
//                                 color: "#1264FD",
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "3px",
//                               }}
//                               className="mb-0"
//                               onClick={() => handleCandidateClick(topCand.id)}
//                             >
//                               {topCand.name}
//                               <BiLinkExternal
//                                 style={{ fontSize: "14px", fontWeight: 400 }}
//                               />
//                             </p>
//                             <p
//                               style={{
//                                 color: "#819ACB",
//                                 fontSize: "12px",
//                                 fontWeight: 400,
//                                 height: "44px",
//                               }}
//                               className="mt-0 mb-2"
//                             >
//                               {topCand.currentJob.title}
//                             </p>
//                             <p
//                               style={{
//                                 color: "#819ACB",
//                                 fontSize: "12px",
//                                 fontWeight: 400,
//                                 height: "20px",
//                               }}
//                             >
//                               {topCand?.state}
//                             </p>
//                           </div>
//                           {/* <div
//                             style={{ display: "flex", alignItems: "center", width: "100%" }}
//                           >
//                             <p
//                               style={{
//                                 color: "#595959",
//                                 fontSize: "10px",
//                                 fontWeight: 400,
//                                 height: "22px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 // gap: "4px",
//                                 backgroundColor: "gold",
//                               }}
//                               title={formattedTime}
//                             >
//                               {activity}
//                             </p>
//                             <p
//                               style={{ fontSize: "10px", color: "#999999" }}
//                             >
//                               {formattedTime}
//                             </p>
//                              <PiHandshakeLight
//                               style={{
//                                 fontSize: "large",
//                                 marginBottom: "-5px",
//                                 paddingLeft: "4px",
//                                 color: "#299A16",
//                               }}
//                             />
//                           </div> */}
//                               <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
//       <p
//         id={`activity-tooltip-${topCand.id}`}
//         style={{
//           color: "#595959",
//           fontSize: "10px",
//           fontWeight: 400,
//           height: "22px",
//           display: "flex",
//           alignItems: "center",
//           backgroundColor: "gold",
//           margin: 0,
//           cursor: "pointer",
//         }}
//       >
//         {activity}
//       </p>

//       <Tooltip
//         placement="top"
//         isOpen={tooltipOpen}
//         target={`activity-tooltip-${topCand.id}`}
//         toggle={toggle}
//         delay={{ show: 250, hide: 200 }}
//         style={{
//           backgroundColor: "black",
//           color: "white",
//           borderRadius: "5px",
//           padding: "5px 8px",
//         }}
//       >
//         {formattedTime}
//       </Tooltip>

//       <p
//         style={{
//           fontSize: "10px",
//           color: "#999999",
//           marginLeft: "6px",
//           marginBottom: 0,
//         }}
//       >
//         {formattedTime}
//       </p>

//       <PiHandshakeLight
//         style={{
//           fontSize: "large",
//           marginBottom: "-5px",
//           paddingLeft: "4px",
//           color: "#299A16",
//         }}
//       />
//     </div>
//                           {/* <p
//                             style={{
//                               color: "#595959",
//                               fontSize: "12px",
//                               fontWeight: 400,
//                               height: "22px",
//                               display: "flex",
//                               alignItems: "center",
//                               // gap: "4px",
//                               backgroundColor: "gold",
//                             }}
//                             title={formattedTime} // Tooltip on hover showing exact time
//                           >
//                             {activity}
//                             <PiHandshakeLight
//                               style={{
//                                 fontSize: "large",
//                                 marginBottom: "-5px",
//                                 paddingLeft: "4px",
//                                 color: "#299A16",
//                               }}
//                             />
//                             <span style={{ fontSize: "10px", color: "#999999" }}>
//                               {formattedTime}
//                             </span>
//                           </p> */}
//                         </div>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "space-between",
//                             alignItems: "flex-end",
//                             paddingRight: "4px",
//                           }}
//                         >
//                           <div>
//                             <div
//                               style={{
//                                 fontSize: "10px",
//                                 height: "20px",
//                                 width: "150px",
//                                 fontWeight: 400,
//                                 display: "flex",
//                                 gap: "6px",
//                                 paddingBottom: "0px",
//                                 justifyContent: "end",
//                                 alignItems: "center",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                   paddingTop: "16px",
//                                 }}
//                               >
//                                 Score{" "}
//                                 <CiCircleInfo
//                                   style={{
//                                     color: "#000",
//                                     fontSize: "16px",
//                                     position: "relative",
//                                     cursor: "pointer",
//                                     pointerEvents: "auto",
//                                   }}
//                                   onClick={toggleModal}
//                                 />
//                               </p>
//                               <p
//                                 style={{
//                                   color: "#299A16",
//                                   fontSize: "16px",
//                                   fontWeight: 600,
//                                   paddingTop: "2px",
//                                 }}
//                               >
//                                 {topCand.profileScore}%
//                               </p>
//                             </div>

//                             <p
//                               style={{
//                                 color: "#595959",
//                                 fontSize: "12px",
//                                 fontWeight: 400,
//                                 textAlign: "right",
//                               }}
//                             >
//                               {topCand?.experienceInYear}
//                             </p>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               gap: "6px",
//                             }}
//                           >
//                             <a
//                               href={topCand.linkedIn}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               <BsLinkedin style={{ fontSize: "18px" }} />
//                             </a>

//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                               }}
//                             >
//                               <a
//                                 href={topCand.threadLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 onClick={(e) => e.stopPropagation()}
//                               >
//                                 <MdMessage
//                                   style={{
//                                     color: topCand.threadLink
//                                       ? "#1264FD"
//                                       : "#CCCCCC",
//                                     fontSize: "22px",
//                                     cursor: "pointer",
//                                   }}
//                                 />
//                               </a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardBody>
//                 </Card>
//               );
//             })}
//           </div>
//         )}
//       </CardBody>
//     </Card>
//   );
// };

// export default TopCandidate;

import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { CiCircleInfo } from "react-icons/ci";
import { FiMessageSquare, FiUser, FiLinkedin } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { fetchJobDetails } from "../../../../redux/Job/jobActions";
import { BsLinkedin } from "react-icons/bs";
import { RxDoubleArrowRight } from "react-icons/rx";
import { TbMessageFilled } from "react-icons/tb";
import { MdMessage } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import user1 from "../../../../assets/images/user/user.png";
import { PiHandshakeLight } from "react-icons/pi";

const TopCandidate = ({ id }) => {
  const [topCandidateDetail, setJobDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleModal = () => setModalOpen(!modalOpen);

  const [isMessaged, setIsMessaged] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const url = `/jobs/${id}/top-candidates`;
      dispatch(fetchJobDetails(url, handleFetchResponse));
    }
  }, [dispatch, id]);

  const handleFetchResponse = (resp) => {
    setLoading(false);
    if (resp?.status === 200) {
      setJobDetails(resp.data);
    } else {
      toast.error(resp?.message || "Failed to fetch candidates");
    }
  };

  const handleCandidateClick = (id) => {
    navigate(`/candidates/detail/${id}`);
  };

  const handleAllCandidateClick = () => {
    navigate(`/candidates?jobId=${id}`);
  };

  console.log({ topCandidateDetail });

  return (
    <Card
      style={{
        borderRadius: "10px",
        marginBottom: "120px",
      }}
    >
      <CardBody>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 400,
            position: "relative",
            width: "100%",
            color: "#595959",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {`Shortlisted Candidates (${topCandidateDetail?.length})`}

          <span
            style={{
              position: "absolute",
              bottom: "3px",
              left: "0",
              width: "12%",
              borderBottom: "1px solid #1264FD",
            }}
          ></span>
          {/* <span
            style={{ color: "#819ACB", paddingTop: "4px", cursor: "pointer" }}
          >
            Ranking Method
            <CiCircleInfo
              style={{
                color: "black",
                fontSize: "large",
                position: "relative",
                top: "5px",
                cursor: "pointer",
                left: "1px",
              }}
              onClick={toggleModal}
            />
          </span> */}

          {topCandidateDetail && topCandidateDetail.length > 0 && (
            <div className="relative">
              <p
                style={{
                  color: "#1264FD",
                  fontFamily: 500,
                  fontSize: "14px",
                  textDecoration: "underline",
                  // position: "absolute",
                  // bottom: "2px",
                  // right: "30px",
                  cursor: "pointer",
                }}
              >
                {" "}
                <span
                  onClick={handleAllCandidateClick}
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    position: "relative",
                    // bottom: "3px",
                  }}
                >
                  View Shortlisted Candidates
                </span>
              </p>
            </div>
          )}
        </p>

        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          style={{
            maxWidth: "1000px",
            width: "80%",
            margin: "auto",
          }}
          centered
        >
          <ModalHeader
            style={{
              position: "relative",
              padding: "1rem",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            How Scores Are Calculated
            <button
              type="button"
              onClick={toggleModal}
              style={{
                position: "absolute",
                right: "20px",
                top: "15px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#6c757d",
                padding: "0",
                margin: "0",
              }}
            >
              &times;
            </button>
          </ModalHeader>
          <ModalBody style={{ padding: "2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  width: "100%",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src="../../score-tip1.png"
                  alt="Skill Matching"
                  style={{ width: "100%", maxWidth: "350px", height: "auto" }}
                />
                <span style={{ fontWeight: "bold", fontSize: "32px" }}>+</span>
                <img
                  src="../../score-tip2.png"
                  alt="Experience Matching"
                  style={{ width: "100%", maxWidth: "150px", height: "auto" }}
                />
                <span style={{ fontWeight: "bold", fontSize: "32px" }}>=</span>
                <img
                  src="../../score-tip3.png"
                  alt="Total Score"
                  style={{ width: "100%", maxWidth: "270px", height: "auto" }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter
            style={{ padding: "1rem 2rem", borderTop: "1px solid #dee2e6" }}
          >
            <Button
              color="primary"
              onClick={toggleModal}
              style={{
                padding: "0.375rem 0.75rem",
                fontSize: "1rem",
                borderRadius: "0.25rem",
              }}
            >
              Got It
            </Button>
          </ModalFooter>
        </Modal>

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading &&
          (!topCandidateDetail || topCandidateDetail.length === 0) && (
            <div className="text-center py-4 text-muted">
              No top candidates found
            </div>
          )}

        {!loading && topCandidateDetail && (
          <div
            style={{
              maxHeight: "800px",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {topCandidateDetail.map((topCand, index) => (
              <Card
                // onClick={() => handleCandidateClick(topCand.id)}
                key={index}
                style={{
                  border: "1px solid #EBF1FC",
                  boxShadow: "3px 3px 3px 0px #BA9FC914",
                  marginBottom: "10px",
                  // cursor: "pointer",
                  // backgroundColor: "red",
                  height: "130px",
                }}
              >
                <CardBody style={{ padding: "6px" }}>
                  <div className="media">
                    <div className="avatar me-3 ms-1" style={{ width: "50px" }}>
                      {topCand?.image ? (
                        <img
                          src={topCand?.image || user1}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = user1;
                          }}
                          alt=""
                          className="img-50 rounded-circle"
                        />
                      ) : (
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 100,
                          }}
                        >
                          <FiUser
                            className="img-50 rounded-circle"
                            style={{ fontSize: "50px", color: "#ccc" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="media-body d-flex justify-content-between">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          width: "75%",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#1264FD",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                            className="mb-0"
                            onClick={() => handleCandidateClick(topCand.id)}
                          >
                            {topCand.name}
                            <BiLinkExternal
                              style={{ fontSize: "14px", fontWeight: 400 }}
                            />
                          </p>
                          <p
                            style={{
                              color: "#819ACB",
                              fontSize: "12px",
                              fontWeight: 400,

                              height: "44px",
                            }}
                            className="mt-0 mb-2"
                          >
                            {topCand.currentJob.title}
                          </p>
                          <p
                            style={{
                              color: "#819ACB",
                              fontSize: "12px",
                              fontWeight: 400,
                              height: "20px",
                            }}
                          >
                            {topCand?.state}
                          </p>
                        </div>
                        <p
                          style={{
                            color: "#595959",
                            fontSize: "12px",
                            fontWeight: 400,

                            height: "22px",
                          }}
                        >
                          connection request sent
                          <PiHandshakeLight
                            style={{
                              fontSize: "large",
                              marginBottom: "-5px",
                              paddingLeft: "4px",
                              // color: "#1264FD",
                              // color: "#299A16",
                            }}
                          />
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          paddingRight: "4px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "10px",
                              height: "20px",
                              width: "150px",
                              fontWeight: 400,
                              display: "flex",
                              gap: "6px",
                              paddingBottom: "0px",
                              justifyContent: "end",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "16px",
                                // pointer-events: auto;
                              }}
                            >
                              Score{" "}
                              <CiCircleInfo
                                style={{
                                  color: "#000",
                                  fontSize: "16px",
                                  position: "relative",
                                  // zIndex: 999,
                                  cursor: "pointer",
                                  pointerEvents: "auto",
                                }}
                                onClick={toggleModal}
                              />
                            </p>
                            <p
                              style={{
                                color: "#299A16",
                                fontSize: "16px",
                                fontWeight: 600,
                                paddingTop: "2px",
                              }}
                            >
                              {topCand.profileScore}%
                            </p>
                          </div>

                          <p
                            style={{
                              color: "#595959",
                              fontSize: "12px",
                              fontWeight: 400,
                              textAlign: "right",
                            }}
                          >
                            {topCand?.experienceInYear}
                          </p>
                          {/* <p
                            style={{
                              color: "#819ACB",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {topCand?.state}
                          </p> */}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <a
                            href={topCand.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <BsLinkedin
                              style={{
                                fontSize: "18px",
                                // marginBottom: "-4px",
                              }}
                            />
                          </a>

                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <a
                              href={topCand.threadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MdMessage
                                style={{
                                  color: topCand.threadLink
                                    ? "#1264FD"
                                    : "#CCCCCC",
                                  fontSize: "22px",
                                  cursor: "pointer",
                                }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TopCandidate;
