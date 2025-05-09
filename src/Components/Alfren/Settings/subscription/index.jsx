import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Btn, H3, LI, P, UL } from "../../../../AbstractElements";
import { Check, X } from "react-feather";
// import SubscriptionPlans from "./SubscriptionPlans";
// import SubscriptionPlans from "./SubscriptionPlans";
import SubscribePlan from "./SubscribePlan";
import PlanDetails from "./PlanDetails";
import { INSTANCE } from "Config/axiosInstance";

const Subscription = () => {
  const [planAndBilling, setPlanAndBilling] = useState(false);
  const [monthlyButtonActive, setMonthlyButtonActive] = useState(true);
  const [activatePlan, setActivatePlan] = useState(null);

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
        <PlanDetails
          setMonthlyButtonActive={setMonthlyButtonActive}
          monthlyButtonActive={monthlyButtonActive}
          subscriptionDetails={subscriptionDetails}
          setPlanAndBilling={setPlanAndBilling}
          setActivatePlan={setActivatePlan}
          activatePlan={activatePlan}
        />
      )}
    </Fragment>
  );
};

export default Subscription;
