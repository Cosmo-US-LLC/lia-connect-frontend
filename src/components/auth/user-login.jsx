// import { useNavigate } from "react-router-dom";
// import { Fragment, useState } from "react";
// import styles from "../../style/AuthPages.module.css";
// import iconGoogle from "../../assets/icon/google.svg";
// import iconOutlook from "../../assets/icon/outlook.svg";
// import iconSos from "../../assets/icon/sos.svg";
// import orSection from "../../assets/login/or.svg";
// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

// import {
//   Button,
//   Col,
//   Container,
//   FormGroup,
//   Input,
//   Label,
//   Row,
//   Form,
//   Card,
//   CardBody,
//   CardTitle,
//   ListGroup,
//   ListGroupItem,
// } from "reactstrap";
// import { useForm } from "react-hook-form";
// import { login } from "../../redux/auth/authActions";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { UserLoggedIn } from "../../constant";

// const UserLogin = () => {
//   const navigate = useNavigate();
//   const { handleSubmit } = useForm();
//   const [togglePassword, setTogglePassword] = useState(false);
//   const dispatch = useDispatch();

//   const initialState = {
//     email: "",
//     password: "",
//   };
//   const [formData, setFormData] = useState(initialState);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const HideShowPassword = (tPassword) => {
//     setTogglePassword(!tPassword);
//   };

//   const onSubmit = async (e) => {
//     dispatch(
//       login(formData, (resp) => {
//         if (resp.statusCode == 200) {
//           toast.success(UserLoggedIn);
//           localStorage.setItem("accessToken", resp.accessToken);
//           localStorage.setItem("user", JSON.stringify(resp.user));
//           navigate("/");
//         } else {
//           const err = resp.message;
//           if (Array.isArray(err)) {
//             err.forEach((element) => {
//               toast.error(element);
//             });
//           } else {
//             toast.error(err);
//           }
//         }
//       })
//     );
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
//                 <h3 className={styles.heading}>Hello Mueed</h3>
//                 <h5 className={styles.subHeading}>Not have an an Account?</h5>
//                 <Button className={styles.leftSideButton} href="/register">
//                   Sign Up
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
//               <h1 className={styles.heading}>Sign In to Smart Hire</h1>
//               <div className="d-flex justify-content-between mt-4">
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
//               <div className="d-flex justify-content-between mt-4">
//                 <img src={orSection} />
//               </div>

//               <div className="d-flex justify-content-between mt-4">
//                 <Form
//                   className={styles.forms}
//                   onSubmit={handleSubmit(onSubmit)}
//                 >
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

//                   <div className="form-group mt-2 mb-4">
//                     <div style={{ textAlign: "center" }}>
//                       <a
//                         className={styles.heading}
//                         href="/forgot-password"
//                         style={{ textDecoration: "none" }}
//                       >
//                         Forgot Password
//                       </a>
//                     </div>
//                   </div>
//                   <div className="form-group mt-2">
//                     <Button className={styles.submitButton} type="submit" block>
//                       Sign In
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

// export default UserLogin;
