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

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const plan = subscriptionDetails[activatePlan];

    try {
      // Call your backend to create a payment intent
      const response = await INSTANCE.post("/api/create-payment-intent", {
        plan: plan,
      });

      const { clientSecret } = response.data;

      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement), // CardElement to collect card details
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");

        // Update the subscription on the backend after payment is successful
        await INSTANCE.post("/api/update-subscription", {
          plan: plan, // Send the selected plan details
          stripeSubscriptionId: paymentIntent.id, // The paymentIntent ID from Stripe
          stripeCustomerId: paymentIntent.customer, // The customer ID from Stripe
          stripeStatus: paymentIntent.status, // The subscription status from Stripe
        });
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
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
          <div style={{ minWidth: "400px" }}>
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
        <div
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
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
