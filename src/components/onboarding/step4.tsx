"use client";

import { Textarea } from "@nextui-org/react";
import { OnboardingFormProps } from "./user_onboarding_form";
import CardHeader from "../CardHeader";

const Step4 = ({ feedback, updateDetails }: OnboardingFormProps) => {
  // update email in parent component when user enters new email
  // TODO:
  return (
    <>
      <CardHeader
        title="Any other information or feedback"
        infoText={
          "Any other information you would like to give, or some feedback to help us tailor a service that will serve you better"
        }
      />
      <Textarea
        label="Location and Property descriptions"
        variant="bordered"
        placeholder="Describe where it is located using landmarks (optional) and also some details on whether is is a bedspace, a whole room or full house for rent etc."
        onChange={(e) => updateDetails({ feedback: e.target.value })}
      />
    </>
  );
};

export default Step4;
