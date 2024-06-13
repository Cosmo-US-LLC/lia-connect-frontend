import { Fragment, useState } from "react";
import { Link, Settings, X } from "react-feather";
import { Col, UncontrolledTooltip } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const SettingDropdown = ({
  target,
  sequence,
  dropdownActive,
  setSequenceArray,
  setConfigureDropDownActive,
  configureDropDownActive,
  deleteSequence,
  markAsConfigured, // New prop
}) => {
  const message = sequence.input
    ? sequence.input
    : "<p>Update on Your Job Application</p><p>Dear [Candidate's Name],</p><p>I hope this email finds you well.</p><p>I wanted to reach out and thank you for your interest in the [Job Title] position at [Company Name]. We appreciate the time and effort you've invested in the application process.</p><p>After careful consideration, we regret to inform you that we have decided to pursue other candidates whose qualifications more closely align with the requirements of the role.</p><p>Please know that this decision was not made lightly, and we genuinely appreciate the opportunity to learn about your skills and experiences. We encourage you to continue pursuing opportunities that match your expertise and career goals.</p><p>Thank you once again for your interest in joining our team. We wish you all the best in your future endeavors.</p><p>Warm regards,</p><p>[Your Name]<br>[Your Position]<br>[Company Name]<br>[Contact Information]</p>";

  const [editorContent, setEditorContent] = useState(message);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
    console.log('data', data)
  };

  const setMessage = (e) => {
    e.preventDefault();
    setSequenceArray((sequenceArray) => {
      return sequenceArray.map((obj) => {
        if (obj.sequenceId === sequence.sequenceId) {
          return {
            ...obj,
            input: editorContent,
          };
        }
        return obj;
      });
    });

    markAsConfigured(sequence.sequenceId); // Mark as configured
    setConfigureDropDownActive(false);
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
        style={{
          backgroundColor: "#FAFAFA",
          boxShadow: "0px 10px 26px 0px #0000001A",
          border: "1px solid #E9E9E9",
          maxWidth: "660px",
          maxHeight: "450px",
          borderRadius: "16px",
          overflowX: "hidden",
          left: "50%",
          transform: "translateX(-50%)",
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
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Input Your LinkedIn Message
            </span>
          </div>
          <div>
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: ["link"],
                style: { borderRadius: "8px" },
              }}
              data={editorContent}
              onChange={handleEditorChange}
            />
          </div>
          <div className="mt-4">
            <Col xl="12" className="d-flex justify-space-between">
              <button className="btn btn-primary " onClick={setMessage}>
                <span>Save</span>
              </button>
              <button
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
