import React, { Children, Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Progress, Form } from "reactstrap";
import { Image, Progressbar } from "../../../../AbstractElements";
import { Circle } from "react-feather";
import StepActiveIcon from "../../../../assets/used-files/icons/stepActive.svg";
import StepInActiveIcon from "../../../../assets/used-files/icons/stepInActive.svg";
import StepCompletedIcon from "../../../../assets/used-files/icons/stepCompleted.svg";
import StepOne from "./StepOne/index";
import StepTwo from "./StepTwo/index";
import StepThree from "./StepThree/index";
import Completed from "./Completed";
import { useLocation } from "react-router";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllCandidates, stepOne } from "../../../../redux/Job/jobActions";


const JobCreate = () => {
  const location = useLocation();
  const [jobId, setJobId] = useState(null);
  const [step, setStep] = useState(1);
  // console.log('stepstepstepstepstepstepstepstepstepstepstepstepstepstep', step)
  const dispatch = useDispatch()
  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    // setStep(step - 1);
    setStep(1);
  };

  const handleSubmitss = (e) => {
    e.preventDefault();
    // Handle form submission
  };



  const removeSkill = (name) => {
    const updatedItems = skills.filter((item) => item !== name);
    setSkills(updatedItems);
  };

  //stepOne data
  const [jobName, setJobName] = useState(null);
  console.log('jobName', jobName)
  const [jobPriority, setJobPriority] = useState(null);
  console.log('jobPriority', jobPriority)
  const [linkedInSearch, setLinkedInSearch] = useState("");
  console.log('linkedInSearch i want this', linkedInSearch)
  const [skills, setSkills] = useState([]);
  console.log('skills', skills)
  const [skillInputValue, setSkillInputValue] = useState('');
  const [linkedInProfile, setLinkedInProfile] = useState([]);
  console.log('linkedInProfile', linkedInProfile)
  //stepOne data end
  const [candidateInOtherJob, setCandidateInOtherJob] = useState(true);
  const [candidateHaveOpenProfile, setCandidateHaveOpenProfile] = useState(false);
  const [candidateHaveDisplay, setCandidateHaveDisplay] = useState(false);
  //stepTwo Data starts
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [getCandidateCount, setGetTotalCount] = useState(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const jobIdFromQuery = searchParams.get('jobId');
    if (jobIdFromQuery) {
      setJobId(jobIdFromQuery);
    }
    const setFromQuery = searchParams.get('step');
    if (setFromQuery) {
      setStep(+setFromQuery);

    }

  }, [location.search]);


  // Validation schema should be defined here
  let validationSchema = Yup.object().shape({
    jobName: Yup.string().required('Job Name is required'),
    jobPriority: Yup.string().required('Job Priority is required'),
    linkedInSearch: Yup.string()
      .required('LinkedIn Search URL is required')
      .matches(
        /^https:\/\/www\.linkedin\.com\/search\/results\/(people|PEOPLE)\/\?keywords=.*$/i,
        'This LinkedIn Search URL cannot be supported'
      ),
    maxCandidates: Yup.number()
      .typeError('Max Candidate must be a number')
      .required('Max Candidate is required')
      .min(1, 'Max Candidate must be at least 1')
      .max(500, 'Max Candidate cannot be more than 500'),
  });

  // Manually check if skillInputValue is required
  if (!skills || skills.length === 0) {
    validationSchema = validationSchema?.shape({
      skillInputValue: Yup.string().required('Skill is required'),
    });
  }

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const linkedInSearchValue = watch('linkedInSearch');
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    // Check for specific error
    const currentError = !!errors.linkedInSearch;
    setHasErrors(currentError);
  }, [errors.linkedInSearch]);


  const onSubmit = async (data, e) => {
    setIsLoading(true); // Set loading to true before dispatching the action

    const formData = {
      name: data.jobName,
      jobPriority: data.jobPriority.toUpperCase(), // Convert jobPriority to uppercase
      linkedInURL: data?.linkedInSearch?.length
        ? [data.linkedInSearch]
        : linkedInProfile?.length
          ? linkedInProfile
          : [],
      linkedInType: data?.linkedInSearch?.length
        ? 'linkedInSearch'
        : linkedInProfile?.length
          ? 'linkedInProfile'
          : null,
      skills,
      maxCandidates: parseInt(data.maxCandidates, 10), // Convert maxCandidates to a number
    };

    // Check if currentStep is 1 before dispatching stepOne
    if (step === 1) {
      try {
        await dispatch(
          stepOne(formData, (resp) => {
            setIsLoading(false); // Set loading to false when data is received
            if (resp?.status === 201) {
              toast.success('Job details saved!');
              setJobId(resp.data.id);
              handleNext(e);
            } else {
              const err = resp?.message;
              toast.error(err);
            }
          })
        );
      } catch (error) {
        setIsLoading(false); // Set loading to false if an error occurs
        toast.error('Error occurred while processing the request');
      }
    } else {
      setIsLoading(false); // If not step 1, set loading to false
    }
  };
  // useEffect(() => {
  //   const formData = {
  //     url: linkedInSearch,
  //   };
  //   dispatch(
  //     fetchAllCandidates(formData, (resp) => {
  //       setGetTotalCount(resp?.data?.candidateCount)
  //       console.log('resp', resp);
  //     })
  //   );
  // }, [dispatch,linkedInSearch]);

  return (
    <Fragment>
      <Container fluid={true}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "30vh",
            textAlign: "center",
          }}
        >
          <div style={{ width: "40%" }}>
            <Col style={{ display: "flex", paddingTop: "5px" }}>
              <div style={{ scale: "1.3" }}>
                <Image
                  attrImage={{
                    src:
                      step == 2 || step == 3 || step == 4
                        ? StepCompletedIcon
                        : StepActiveIcon,
                  }}
                />
              </div>
              <div style={{ width: "100%", marginTop: "7px" }}>
                <Progressbar
                  attrProgress={{
                    value: `${step == 1 ? "50" : "100"}`,
                    color:
                      true ? "stepActive" : "stepInActive",
                      // step == 2 || step == 3 ? "stepActive" : "stepInActive",
                    className: "sm-progress-bar  mb-0 rounded-0",
                  }}
                />
              </div>
              <div style={{ scale: "1.3" }}>
                <Image
                  attrImage={{
                    src:
                      step == 2
                        ? StepActiveIcon
                        : step == 3
                          ? StepCompletedIcon
                          : StepInActiveIcon,
                  }}
                />
              </div>
            </Col>
          </div>
          <div style={{ width: "45%" }}>
            <Col style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  color:
                    step == 3 || step == 1 || step == 2 || step == 4
                      ? "#1264fd"
                      : "#e0e0e7",
                }}
              >
                Setup New Job
              </span>

              {/* <span
                className="me-4"
                style={{
                  color:
                    step == 3 || step == 2 || step == 4 ? "#1264fd" : "#e0e0e7",
                }}
              >
                Set Sequence
              </span> */}

              <span
                style={{
                  color: step == 2 || step == 3 ? "#1264fd" : "#e0e0e7",
                }}
              >
                Complete
              </span>
            </Col>
          </div>
          <form
            className="form theme-form"
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", margin: "0 10%" }}
          >
            {step === 1 && (
              <StepOne
                getCandidateCount={getCandidateCount}
                hasErrors={hasErrors}
                isLoading={isLoading}
                control={control} setValue={setValue}
                linkedInSearchValue={linkedInSearchValue}
                errors={errors}
                register={register}
                setJobName={setJobName}
                jobName={jobName}
                jobPriority={jobPriority}
                setJobPriority={setJobPriority}
                setSkillInputValue={setSkillInputValue}
                skillInputValue={skillInputValue}
                clearErrors={clearErrors}
                skills={skills}
                setSkills={setSkills}
                removeSkill={removeSkill}
                linkedInSearch={linkedInSearch}
                setLinkedInSearch={setLinkedInSearch}
                linkedInProfile={linkedInProfile}
                setLinkedInProfile={setLinkedInProfile}
                handleNext={handleNext}
                setJobId={setJobId}
              />
            )}
            {step === 2 && (
              // <StepTwo
              //   handlePrevious={handlePrevious}
              //   handleNext={handleNext}
              //   jobId={jobId}
              // />              
              <StepThree
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                candidateHaveDisplay={candidateHaveDisplay}
                setCandidateHaveDisplay={setCandidateHaveDisplay}
                candidateHaveOpenProfile={candidateHaveOpenProfile}
                setCandidateHaveOpenProfile={setCandidateHaveOpenProfile}
                candidateInOtherJob={candidateInOtherJob}
                setCandidateInOtherJob={setCandidateInOtherJob}
                jobId={jobId}
              />
            )}
            {/* {step === 3 && (
              <StepThree
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                candidateHaveDisplay={candidateHaveDisplay}
                setCandidateHaveDisplay={setCandidateHaveDisplay}
                candidateHaveOpenProfile={candidateHaveOpenProfile}
                setCandidateHaveOpenProfile={setCandidateHaveOpenProfile}
                candidateInOtherJob={candidateInOtherJob}
                setCandidateInOtherJob={setCandidateInOtherJob}
                jobId={jobId}
              />
            )} */}
            {step === 3 && <Completed />}
            {/* {step === 4 && <Completed />} */}
          </form>
        </div>
      </Container>
    </Fragment>
  );
};

export default JobCreate;
