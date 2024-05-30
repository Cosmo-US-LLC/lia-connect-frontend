import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Image, LI, ToolTip, UL } from "../../../../AbstractElements";
import ProfileCard from "./ProfileCard";
import ActivityCard from "./ActivityCard";
import Notes from "./Notes";
import DetailsCard from "./DetailsCard";
import ChatIcon from "../../../../assets/used-files/icons/Chat.svg";
import BlacklistIcon from "../../../../assets/used-files/icons/Blacklisted.svg";
import CommentInfoIcon from "../../../../assets/used-files/icons/commentInfo.svg";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchCandidateDetails } from "../../../../redux/candidate/candidateActions";
import { toast } from "react-toastify";

const CandidatesList = () => {
  const [basictooltip, setbasictooltip] = useState(false);
  const toggle = () => setbasictooltip(!basictooltip);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [candidateDetails, setCandidateDetails] = useState(null);

  useEffect(() => {
    getCandidateDetails();
  }, [dispatch, id]);

  const getCandidateDetails = () => {
    dispatch(
      fetchCandidateDetails(id, (resp) => {
        if (resp.status == 200) {
          toast.success("Candidate Details Fetched successfully");
          const result = resp.data;
          setCandidateDetails(result);
        } else {
          const err = resp.message;
          toast.error(err);
        }
      })
    );
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <div style={{ textAlign: "right" }}>
          <button className="btn btn-primary me-2 py-1 px-2">
            <Image
              attrImage={{
                src: ChatIcon,
                alt: "",
              }}
            />{" "}
            Messages
          </button>
          <button
            className="btn btn-outline-dark py-1 px-2"
            id="TooltipBlacklist"
          >
            <Image
              attrImage={{
                src: BlacklistIcon,
                alt: "",
              }}
            />{" "}
            Add to Blacklist{" "}
          </button>
          <ToolTip
            attrToolTip={{
              placement: "bottom",
              isOpen: basictooltip,
              target: "TooltipBlacklist",
              toggle: toggle,
              style: {
                backgroundColor: "#595959",
                boxShadow: "0px 5px 10px -3.89px #00000040",
                width: "416px",
                // height: "98px",
                // top: " 141px",
                // left: "994px",
                // padding: "12px 16px 16px 16px",
                // gap: "12px",
                // borderRadius: "4px",
                // opacity: "0px",
              },
            }}
          >
            <div
              style={{
                width: "100%",
                left: "300px",
              }}
            >
              <Row>
                <Col xl="2">
                  {" "}
                  <Image
                    attrImage={{
                      src: CommentInfoIcon,
                      alt: "",
                    }}
                  />
                </Col>
                <Col xl="8">
                  <UL
                    attrUL={{
                      style: {
                        listStyleType: "disc",
                      },
                    }}
                  >
                    <LI
                      attrLI={{
                        style: { color: "white" },
                      }}
                    >
                      . The blacklisted profile will not be blocked from
                      LinkedIn. It will only be blacklisted within the system.
                    </LI>
                    <LI
                      attrLI={{
                        style: { color: "white" },
                      }}
                    >
                      . The system will not allow the user to perform actions on
                      the profile which is blacklisted.{" "}
                    </LI>
                  </UL>
                </Col>
              </Row>
            </div>
          </ToolTip>
        </div>
        <div className="user-profile mt-4">
          <Row>
            <Col xxl="5" xl="5" className="col-ed-5 box-col-5">
              <Row>
                <Col xl="12" md="6">
                  {candidateDetails && (
                    <ProfileCard candidateDetails={candidateDetails} />
                  )}
                </Col>
                <Col xl="12" md="6">
                {candidateDetails && (
                  <DetailsCard candidateDetails={candidateDetails} />
                )}
                </Col>
               
              </Row>
            </Col>
            <Col xxl="7" xl="7" className="col-ed-7 box-col-7">
              <Row>
                <Col xl="12" md="6">
                  <ActivityCard />
                </Col>
                <Col xl="12" md="6">
                  <Notes />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default CandidatesList;
