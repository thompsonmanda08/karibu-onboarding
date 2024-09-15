"use client";

import { Input, Textarea } from "@nextui-org/react";
import { OnboardingFormProps } from "../user_onboarding_form";
import CardHeader from "../CardHeader";

const Step3 = ({ email, updateDetails }: OnboardingFormProps) => {
  // update email in parent component when user enters new email
  // TODO:
  return (
    <>
      <CardHeader title="Property Information" />

      <div className="flex flex-col gap-4">
        <Input
          isRequired
          type="text"
          variant="bordered"
          label="Property Location (Address)"
        />
        <Input type="text" variant="bordered" isRequired label="House No." />
        <Input type="text" variant="bordered" isRequired label="Street/Road" />
        <Input
          type="text"
          variant="bordered"
          isRequired
          label="Area/Neighborhood"
        />
        <Input type="text" variant="bordered" isRequired label="City" />
        <Textarea
          label="Location Description"
          variant="bordered"
          placeholder="Describe where it is located using landmarks (optional)"
        />
      </div>
    </>
  );
};

export default Step3;
