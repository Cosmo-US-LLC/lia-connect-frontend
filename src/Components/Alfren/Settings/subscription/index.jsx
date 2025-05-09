import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Btn, H3, LI, P, UL } from "../../../../AbstractElements";
import { Check, X } from "react-feather";
// import SubscriptionPlans from "./SubscriptionPlans";
// import SubscriptionPlans from "./SubscriptionPlans";
import SubscribePlan from "./SubscribePlan";
import PlanDetails from "./PlanDetails";
import { INSTANCE } from "Config/axiosInstance";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51O0jx3Ath9C2NE0MvIrV1nitk2yYftCYjwr2v2HPghQNJrTuVXbN8R82JPw3DSQzZjm2MBuB69nn88kbYQ4azLOW00WCTYP7Wg"
);

const Subscription = () => {
  const [planAndBilling, setPlanAndBilling] = useState(false);
  const [monthlyButtonActive, setMonthlyButtonActive] = useState(true);
  const [activatePlan, setActivatePlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const subscriptionDetails = [
    {
      name: "Advance",
      price: 79,
      items: [
        { name: "Drip Campaigns", available: true },
        { name: "Daily Quotas", available: true },
        { name: "Advance Dashboard and Reports", available: true },
        { name: "Complete Performance Automation", available: true },
        { name: "A/B Testing", available: true },
        { name: "Personal Inbox", available: true },
        { name: "Export Candidates to CSV", available: true },
        { name: "Activity Control", available: true },
      ],
    },
  ];

  const fetchClientSecret = async () => {
    setLoading(true);
    const plan = subscriptionDetails[activatePlan];
    try {
      const response = await INSTANCE.post("/payment/create-payment-intent", {
        plan: { name: plan, price: 79 },
      });
      const { clientSecret } = response.data;
      return clientSecret;
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {planAndBilling ? (
        <>
          {/* <SubscribePlan
            activePlan={subscriptionDetails[activatePlan]}
            monthlyButtonActive={monthlyButtonActive}
          /> */}
        </>
      ) : (
        <CheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <PlanDetails
            setMonthlyButtonActive={setMonthlyButtonActive}
            monthlyButtonActive={monthlyButtonActive}
            subscriptionDetails={subscriptionDetails}
            setPlanAndBilling={setPlanAndBilling}
            setActivatePlan={setActivatePlan}
            activatePlan={activatePlan}
          />
        </CheckoutProvider>
      )}
    </Fragment>
  );
};

export default Subscription;
