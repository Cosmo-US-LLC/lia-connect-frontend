// import { useNavigate } from "react-router-dom";
// import { Fragment, useState } from "react";
// import styles from "../../style/AuthPages.module.css";
// import iconGoogle from "../../assets/icon/google.svg";
// import iconOutlook from "../../assets/icon/outlook.svg";
// import iconSos from "../../assets/icon/sos.svg";
// import orSection from "../../assets/login/or.svg";
// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
// import {
//   Button,
//   Col,
//   Container,
//   FormGroup,
//   Row,
//   Form,
//   Alert,
// } from "reactstrap";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { UserRegistered } from "../../constant";
// import { registerUser } from "../../redux/auth/authActions";
// import { useDispatch } from "react-redux";

// const UserRegister = () => {
//   const navigate = useNavigate();
//   const [togglePassword, setTogglePassword] = useState(false);
//   const [error, setError] = useState(true);
//   const dispatch = useDispatch();
//   const { handleSubmit } = useForm();
//   const HideShowPassword = (tPassword) => {
//     setTogglePassword(!tPassword);
//   };

//   const initialState = {
//     fullName: "",
//     email: "",
//     password: "",
//   };
//   const [formData, setFormData] = useState(initialState);

//   const passwordRequirements = [
//     { text: "8 Minimum character" },
//     { text: "Symbols" },
//     { text: "Numbers" },
//     { text: "Upper Case" },
//     { text: "Lower Case" },
//   ];
//   const [requirements, setRequirements] = useState(passwordRequirements);

//   const handleChange = (e) => {
//     if (e.target.name == "password") {
//       const password = e.target.value;

//       // Update requirements based on entered password
//       const updatedRequirements = passwordRequirements.filter((requirement) => {
//         const lowerCase = /[a-z]/.test(password);
//         const upperCase = /[A-Z]/.test(password);
//         const number = /[0-9]/.test(password);
//         const symbol = /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\ ]/.test(password);
//         setError(true);

//         switch (requirement.text) {
//           case "8 Minimum character":
//             return password.length < 8;
//           case "Symbols":
//             return !symbol;
//           case "Numbers":
//             return !number;
//           case "Upper Case":
//             return !upperCase;
//           case "Lower Case":
//             return !lowerCase;
//           default:
//             return true; // Keep other requirements by default
//         }
//       });

//       if (updatedRequirements.length == 0) {
//         setError(false);
//       }
//       setRequirements(updatedRequirements);
//     }

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onSubmit = async (e) => {
//     if (error) {
//       toast.error("Fill In The Form");
//     } else {
//       dispatch(
//         registerUser(formData, (resp) => {
//           if (resp.statusCode == 200) {
//             toast.success(UserRegistered);
//             setFormData(initialState);
//             navigate("/login");
//           } else {
//             const err = resp.message;
//             if (Array.isArray(err)) {
//               err.forEach((element) => {
//                 toast.error(element);
//               });
//             } else {
//               toast.error(err);
//             }
//           }
//         })
//       );
//     }
//   };

//   return (
//     <Fragment>
//       <Container
//         fluid={true}
//         style={{
//           width: "65rem",
//           height: "46rem",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#F6F6F6",
//           borderRadius: "20px",
//           border: "1px solid #D0CFCF",
//           boxShadow: "11px 11px 18px 0px #a39898",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column", // Maintain vertical column layout for inner content
//             width: "100%", // Inherit full width from parent container
//             height: "100%", // Inherit full height from parent container
//             justifyContent: "center", // Center content vertically within this div
//           }}
//         >
//           <Row style={{ flex: 1, display: "flex" }}>
//             <Col
//               xl={4}
//               style={{
//                 backgroundColor: "#ffffff",
//                 display: "flex",
//                 flexDirection: "column", // Maintain vertical column layout
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "20px 0px 0px 20px",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <h1 className={styles.heading}>Welcome Back</h1>
//                 <h5 className={styles.subHeading}>Lorem Ipsum has been the</h5>
//                 <Button className={styles.leftSideButton} href="/login">
//                   Sign In
//                 </Button>
//               </div>
//             </Col>
//             <Col
//               xl={8}
//               style={{
//                 display: "flex",
//                 flexDirection: "column", // Maintain vertical column layout
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <h1 className={styles.heading}>Create Account</h1>
//               <div className="d-flex justify-content-between mt-2">
//                 <Button
//                   color="light"
//                   className="btn-block m-1 d-flex align-items-center"
//                   style={{
//                     backgroundColor: "white",
//                     border: "1px solid #cccccc",
//                     color: "primary",
//                     boxShadow: "0px 0px 8px 0px #0000001F",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   <img src={iconGoogle} className="mr-2" alt="Google" />
//                   Google
//                 </Button>
//                 <Button
//                   color="light"
//                   className="btn-block m-1 d-flex align-items-center"
//                   style={{
//                     backgroundColor: "white",
//                     border: "1px solid #cccccc",
//                     color: "primary",
//                     boxShadow: "0px 0px 8px 0px #0000001F",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   <img src={iconOutlook} className="mr-2" alt="Outlook" />
//                   Outlook
//                 </Button>
//                 <Button
//                   color="light"
//                   className="btn-block m-1 d-flex align-items-center"
//                   style={{
//                     backgroundColor: "white",
//                     border: "1px solid #cccccc",
//                     color: "primary",
//                     boxShadow: "0px 0px 8px 0px #0000001F",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   <img src={iconSos} className="mr-2" alt="Outlook" />
//                   SOS
//                 </Button>
//               </div>
//               <div className="d-flex justify-content-between mt-5">
//                 <img src={orSection} />
//               </div>

//               <div className="d-flex justify-content-between mt-5">
//                 <Form
//                   className={styles.forms}
//                   onSubmit={handleSubmit(onSubmit)}
//                 >
//                   <FormGroup>
//                     <div className={styles.formGroup}>
//                       <PersonOutlineOutlinedIcon
//                         className={styles.icon}
//                         fontSize="small"
//                       />
//                       <input
//                         type="text"
//                         name="fullName"
//                         placeholder="Full Name"
//                         className={styles.InputField}
//                         onChange={handleChange}
//                       />
//                       <i className={styles.iconRight}></i>{" "}
//                     </div>
//                   </FormGroup>
//                   <FormGroup>
//                     <div className={styles.formGroup}>
//                       <MailOutlineOutlinedIcon
//                         className={styles.icon}
//                         fontSize="small"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Email"
//                         name="email"
//                         className={styles.InputField}
//                         onChange={handleChange}
//                       />
//                       <i className={styles.iconRight}></i>{" "}
//                     </div>
//                   </FormGroup>
//                   <FormGroup>
//                     <div className={styles.formGroup}>
//                       <input
//                         type={togglePassword ? "text" : "password"}
//                         placeholder="**********"
//                         name="password"
//                         className={styles.InputField}
//                         onChange={handleChange}
//                       />
//                       <RemoveRedEyeOutlinedIcon
//                         className={styles.iconRight}
//                         fontSize="small"
//                         onMouseEnter={() =>
//                           (document.body.style.cursor = "pointer")
//                         }
//                         onMouseLeave={() =>
//                           (document.body.style.cursor = "default")
//                         }
//                         onClick={() => HideShowPassword(togglePassword)}
//                       />
//                     </div>
//                   </FormGroup>
//                   {requirements.length > 0 && (
//                     <div>
//                       <Alert
//                         color="light"
//                         className="password-requirements-container rounded shadow mb-3 p-3"
//                       >
//                         <span className={styles.smallHeading}>
//                           Password Must Contain:
//                         </span>
//                         <ul className={styles.passwordRequirementsUl}>
//                           {requirements.map((element, index) => (
//                             <li key={index}>
//                               <span className="requirement-text">
//                                 {element.text}
//                               </span>
//                             </li>
//                           ))}
//                         </ul>
//                       </Alert>
//                     </div>
//                   )}

//                   <div className="form-group mt-2">
//                     <Button className={styles.submitButton} type="submit" block>
//                       Register
//                     </Button>
//                   </div>
//                 </Form>
//               </div>
//             </Col>
//           </Row>
//         </div>
//       </Container>
//     </Fragment>
//   );
// };

// export default UserRegister;
