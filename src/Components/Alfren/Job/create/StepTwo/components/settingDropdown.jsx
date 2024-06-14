import { Fragment, useState } from "react";
import { Link, Settings, X } from "react-feather";
import { Col, UncontrolledTooltip } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  // Define the schema for validation using Yup
  const schema = yup.object().shape({
    message: yup.string().required("Message is required"),
  });

  // Set up the form with react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      message: "",
    },
  });

  const setMessage = (data) => {
    setSequenceArray((sequenceArray) => {
      return sequenceArray.map((obj) => {
        if (obj.sequenceId === sequence.sequenceId) {
          return {
            ...obj,
            input: data.message,
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
          maxWidth: "600px", // Increased width
          maxHeight: "300px", // Increased height
          width: "600px", // Set width explicitly
          height: "300px", // Set height explicitly
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
            padding: "10px", // Increased padding for better layout
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
                fontSize: "16px", // Increased font size
                fontWeight: 600,
              }}
            >
              Input Your LinkedIn Message
            </span>
          </div>
          <form onSubmit={handleSubmit(setMessage)}>
            <div>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
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
                      style: { borderRadius: "8px", height: '500px' }, // Set the height here
                    }}
                    data={field.value}
                    onChange={(event, editor) => field.onChange(editor.getData())}
                  />
                )}
              />
              {errors.message && (
                <p style={{ color: "red" }}>{errors.message.message}</p>
              )}
            </div>
            <div className="mt-4">
              <Col xl="12" className="d-flex justify-space-between">
                <button type="submit" className="btn btn-primary ">
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
          </form>
        </div>
      </UncontrolledTooltip>

    </Fragment>
  );
};
