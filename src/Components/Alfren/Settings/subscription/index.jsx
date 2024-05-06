import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Btn, H3, LI, P, UL } from "../../../../AbstractElements";
import { Check, X } from "react-feather";
// import SubscriptionPlans from "./SubscriptionPlans";
// import SubscriptionPlans from "./SubscriptionPlans";
import SubscribePlan from "./SubscribePlan";
import PlanDetails from "./PlanDetails";
const Subscription = () => {
  const [planAndBilling, setPlanAndBilling] = useState(false);
  const [monthlyButtonActive, setMonthlyButtonActive] = useState(true);
  const subscriptionDetails = [
    {
      name: "Basics",
      price: 39,
      items: [
        { name: "Drip Campaigns", available: true },
        { name: "Daily Quotas", available: true },
        { name: "Advance Dashboard and Reports", available: true },
        { name: "Complete Performance Automation", available: false },
        { name: "A/B Testing", available: false },
        { name: "Personal Inbox", available: false },
        { name: "Export Candidates to CSV", available: false },
        { name: "Activity Control", available: false },
      ],
    },
    {
      name: "Pro",
      price: 59,
      items: [
        { name: "Drip Campaigns", available: true },
        { name: "Daily Quotas", available: true },
        { name: "Advance Dashboard and Reports", available: true },
        { name: "Complete Performance Automation", available: true },
        { name: "A/B Testing", available: true },
        { name: "Personal Inbox", available: true },
        { name: "Export Candidates to CSV", available: false },
        { name: "Activity Control", available: false },
      ],
    },
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
  const [activatePlan, setActivatePlan] = useState(null);

  return (
    <Fragment>
      {planAndBilling ? (
        <>
          <SubscribePlan
            activePlan={subscriptionDetails[activatePlan]}
            monthlyButtonActive={monthlyButtonActive}
          />
        </>
      ) : (
        <>
          <PlanDetails
            setMonthlyButtonActive={setMonthlyButtonActive}
            monthlyButtonActive={monthlyButtonActive}
            subscriptionDetails={subscriptionDetails}
            setPlanAndBilling={setPlanAndBilling}
            setActivatePlan={setActivatePlan}
          />
        </>
      )}
    </Fragment>
  );
};

export default Subscription;
