import { Fragment, useEffect, useState, useRef } from "react";
import { Link, Settings, X } from "react-feather";
import { Col, UncontrolledTooltip } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { setConfigMessage } from "store/slices/createJob";

export const SettingDropdown = ({
  target,
  sequence,
  dropdownActive,
  setSequenceArray,
  setConfigureDropDownActive,
  configureDropDownActive,
  deleteSequence,
  setDropdownActive
}) => {
  const dispatch = useDispatch();
  const tooltipRef = useRef(null);

  const message = sequence.input
    ? sequence.input
    : "<p>Update on Your Job Application</p><p>Dear [Candidate's Name],</p><p>I hope this email finds you well.</p><p>I wanted to reach out and thank you for your interest in the [Job Title] position at [Company Name]. We appreciate the time and effort you've invested in the application process.</p><p>After careful consideration, we regret to inform you that we have decided to pursue other candidates whose qualifications more closely align with the requirements of the role.</p><p>Please know that this decision was not made lightly, and we genuinely appreciate the opportunity to learn about your skills and experiences. We encourage you to continue pursuing opportunities that match your expertise and career goals.</p><p>Thank you once again for your interest in joining our team. We wish you all the best in your future endeavors.</p><p>Warm regards,</p><p>[Your Name]<br>[Your Position]<br>[Company Name]<br>[Contact Information]</p>";

  const [editorContent, setEditorContent] = useState(message);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
  };

  useEffect(() => {
    dispatch(setConfigMessage(editorContent));
  }, [dispatch, editorContent]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setConfigureDropDownActive(false);
      }
    };

    if (configureDropDownActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [configureDropDownActive, setConfigureDropDownActive]);

  const setMessage = () => {
    setDropdownActive(false);
    setConfigureDropDownActive(false);
    setSequenceArray((sequenceArray) =>
      sequenceArray.map((obj) => {
        if (obj.sequenceId === sequence.sequenceId) {
          return {
            ...obj,
            input: editorContent,
          };
        }
        return obj;
      })
    );
  };

  return (
    <Fragment>
      <UncontrolledTooltip
        isOpen={dropdownActive}
        target={target}
        placement="bottom"
        style={{
          backgroundColor: "white",
          boxShadow: "0px 6px 26px -3.89px #0000001A",
        }}
      >
        <div style={{ width: "100%", padding: "3px" }}>
          <button
            className="btn btn-outline d-flex pt-3 pb-3"
            onClick={() => deleteSequence(sequence)}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "black",
              }}
              className="me-2 mt-1"
            >
              <X strokeWidth={2} size={15} />
            </span>
            <span style={{ fontSize: "14px", fontWeight: 400 }}>Remove</span>
          </button>
          <button
            className="btn btn-outline d-flex pt-3 pb-3"
            style={{ borderTop: "1px solid #D7D7D7", borderRadius: "0px" }}
            onClick={() => setConfigureDropDownActive(true)}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "black",
              }}
              className="me-2 mt-1"
            >
              <Settings strokeWidth={2} size={15} />
            </span>
            <span style={{ fontSize: "14px", fontWeight: 400 }}>Configure</span>
          </button>
        </div>
      </UncontrolledTooltip>
      <UncontrolledTooltip
        isOpen={configureDropDownActive}
        popperClassName="custom-tooltip"
        target={"alfrenmessagealfren" + sequence.sequenceId}
        placement="bottom"
        innerRef={tooltipRef}
        style={{
          backgroundColor: "#FAFAFA",
          boxShadow: "0px 10px 26px 0px #0000001A",
          border: "1px solid #E9E9E9",
          maxWidth: "600px",
          maxHeight: "326px",
          width: "600px",
          height: "347px",
          borderRadius: "16px",
          overflowX: "hidden",
          left: "50%",
          transform: "translateX(-50%)",
          position: 'relative'
        }}
      >
        <div
          style={{
            maxWidth: "100%",
            height: "100%",
            padding: "10px",
            color: "#595959",
          }}
        >
          <div
            style={{
              textAlign: "left",
              marginBottom: "15px",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              Input Your LinkedIn Message
            </span>
          </div>
          <div style={{ height: "165px" }}>
            <CKEditor
              required
              editor={ClassicEditor}
              config={{
                placeholder: `Dear John Doe,

                Thank you for your interest in the Software Engineer position at Tech Solutions Inc. After careful consideration, we regret to inform you that we have decided to pursue other candidates for this role.

                We appreciate the effort you've put into your application and encourage you to apply for future openings that align with your expertise.

                Best regards,

                The Hiring Team
                Tech Solutions Inc.
                contact@techsolutions.com`,
                toolbar: ["link"],
                style: { borderRadius: "8px", height: "100px" },
              }}
              onChange={handleEditorChange}
            />
          </div>
          <div style={{ marginTop: "67px" }}>
            <Col xl="12" className="d-flex justify-space-between">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={setMessage}
              >
                <span>Save</span>
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setConfigureDropDownActive(false)}
              >
                <span>Cancel</span>
              </button>
            </Col>
          </div>
        </div>
      </UncontrolledTooltip>
    </Fragment>
  );
};
