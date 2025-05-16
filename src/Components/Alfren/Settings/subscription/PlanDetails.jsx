import {
  CardElement,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { INSTANCE } from "Config/axiosInstance";
import { useState } from "react";
import { Check, X } from "react-feather";
import { Col, Row } from "reactstrap";
import { H3, P, UL } from "../../../../AbstractElements";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const StripeElementsStyles = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "black",
      color: "black",
      fontWeight: 300,
      fontFamily: "'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif",
      fontSize: "21px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "lightgrey",
      },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};

const PlanDetails = ({
  monthlyButtonActive,
  subscriptionDetails,
  setMonthlyButtonActive,
  setPlanAndBilling,
  setActivatePlan,
  activatePlan,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 9999; // Ensure it appears above other content
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    // const confettiSettings = {
    //   target: canvas,
    //   max: 100,
    //   size: 1,
    //   animate: true,
    //   props: ["square", "triangle", "line"],
    //   colors: ["#ff0000", "#00ff00", "#0000ff"],
    //   clock: 25,
    //   rotate: 0,
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    //   startVelocity: 30,
    //   gravity: 0.5,
    //   drift: 0,
    //   spread: 360,
    //   scalar: 1,
    //   scalarStart: 1,
    //   scalarEnd: 1,
    //   origin: { x: 0.5, y: 0.5 },
    //   resize: true,
    //   disableForReducedMotion: true,
    //   onAnimationEnd: () => {
    //     // Remove the canvas after the animation ends
    //     document.body.removeChild(canvas);
    //   },
    // };
    const confettiInstance = confetti.create(canvas, {});
    confettiInstance({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: { x: 0.55, y: 0.5 },
      scalar: 1,
    });
    return () => {
      // Cleanup the canvas when the component unmounts
      // document.body.removeChild(canvas);
    };
  }, []);

  // const stripe = useStripe();
  // const elements = useElements();

  // const handlePayment = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   setLoading(true);
  //   const plan = subscriptionDetails[activatePlan];

  //   try {
  //     // Call your backend to create a payment intent
  //     const response = await INSTANCE.post("/api/create-payment-intent", {
  //       plan: plan,
  //     });

  //     const { clientSecret } = response.data;

  //     // Confirm the payment with Stripe
  //     const { error, paymentIntent } = await stripe.confirmCardPayment(
  //       clientSecret,
  //       {
  //         payment_method: {
  //           card: elements.getElement(CardElement), // CardElement to collect card details
  //         },
  //       }
  //     );

  //     if (error) {
  //       console.error("Payment failed:", error);
  //       alert("Payment failed. Please try again.");
  //     } else if (paymentIntent.status === "succeeded") {
  //       alert("Payment successful!");

  //       // Update the subscription on the backend after payment is successful
  //       await INSTANCE.post("/api/update-subscription", {
  //         plan: plan, // Send the selected plan details
  //         stripeSubscriptionId: paymentIntent.id, // The paymentIntent ID from Stripe
  //         stripeCustomerId: paymentIntent.customer, // The customer ID from Stripe
  //         stripeStatus: paymentIntent.status, // The subscription status from Stripe
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error during payment:", error);
  //     alert("Something went wrong, please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "26px", fontWeight: 600 }} className="pt-5">
          Subscription Plan
        </p>
        <span
          style={{
            border: "1px solid rgb(232, 233, 238)",
            fontSize: "14px",
            paddingTop: "8px",
            paddingBottom: "8px",
            // width: "55%",
            borderRadius: "30px",
            backgroundColor: "white",
          }}
        >
          {monthlyButtonActive ? (
            <>
              <span
                style={{
                  color: "white",
                  backgroundColor: "#1264FD",
                  boxShadow: " 0px 0px 32px 0px #3D64FF94",
                  border: "1px solid #1264FD",
                  fontSize: "14px",
                  borderRadius: "30px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  fontWeight: "400",
                }}
              >
                Monthly
              </span>
              <span
                style={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  fontSize: "14px",
                  color: "black",
                  fontWeight: "400",
                }}
                onClick={() => setMonthlyButtonActive(false)}
              >
                Yearly
              </span>
            </>
          ) : (
            <>
              <span
                style={{
                  color: "black",
                  fontSize: "14px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  fontWeight: "400",
                }}
                onClick={() => setMonthlyButtonActive(true)}
              >
                Monthly
              </span>
              <span
                style={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  fontSize: "14px",
                  fontWeight: "400",
                  backgroundColor: "#1264FD",
                  border: "1px solid #1264FD",
                  borderRadius: "30px",
                  color: "white",
                  boxShadow: " 0px 0px 32px 0px #3D64FF94",
                }}
              >
                Yearly{" "}
              </span>
            </>
          )}
        </span>
        <div className="pt-5 pb-1">
          <span style={{ color: "#299A16", fontSize: "10px", fontWeight: 600 }}>
            Save upto 30 %
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>
          <div style={{ minWidth: "500px" }}>
            {subscriptionDetails.map((item, index) => {
              return (
                <div className="pricingtable">
                  <div className="price-value">
                    <span className="currency">{"$"}</span>
                    <span className="amount">{item.price}</span>
                    <span className="duration">{"per user/month"}</span>
                  </div>
                  <div className="pricingtable-headerTitle">
                    <H3 attrH3={{ className: "title" }}>{item.name}</H3>
                    <P attrH3={{ className: "billed" }}>
                      Billed
                      {monthlyButtonActive ? " Monthly" : " Yearly"}
                    </P>
                  </div>

                  <UL attrUL={{ className: "pricing-content flex-row" }}>
                    {item.items.map((element, index2) => {
                      return (
                        <li className="">
                          {element.name}
                          <span className="me-1" style={{ paddingTop: "3px" }}>
                            {element.available ? (
                              <>
                                <Check
                                  strokeWidth={2}
                                  color="#299A16"
                                  size={15}
                                />
                              </>
                            ) : (
                              <>
                                {" "}
                                <X
                                  strokeWidth={2}
                                  color="#8FA8D7"
                                  size={15}
                                />{" "}
                              </>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </UL>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div
          style={{
            width: "400px",
            height: "450px",
            background: "#fafafa",
            borderRadius: "10px",

            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            padding: 4,
          }}
        >
          <CardElement options={StripeElementsStyles} />
        </div> */}
      </div>
      {/* Glass-like Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.3)", // Semi-transparent white
          backdropFilter: "blur(2px)", // Apply the blur effect
          pointerEvents: "none", // Disable interaction with the underlying content
          borderRadius: "10px", // Optional: Adds rounded corners
          zIndex: 1, // Ensure it appears above other content
        }}
      >
        {/* Centered Text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Centers the text
            fontSize: "28px", // Adjust font size as needed
            fontWeight: "900",
            color: "#3D64FF94", // White text color
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              backgroundColor: "#1264FD",
              boxShadow: " 0px 0px 32px 0px #3D64FF94",
              border: "1px solid #1264FD",
              fontSize: "20px",
              borderRadius: "30px",
              paddingTop: "8px",
              paddingBottom: "8px",
              paddingRight: "20px",
              paddingLeft: "20px",
              fontWeight: "400",
            }}
          >
            Enjoy Your First 3 Months On Us!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
