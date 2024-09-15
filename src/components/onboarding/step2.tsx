"use client";

import { Input } from "@nextui-org/react";
import { OnboardingFormProps } from "./user_onboarding_form";
import CardHeader from "../CardHeader";

const Step2 = ({ email, updateDetails }: OnboardingFormProps) => {
  // update email in parent component when user enters new email
  // TODO:
  return (
    <>
      <CardHeader title="Contact Information" />

      <div className="flex flex-col gap-4">
        <Input
          isRequired
          type="number"
          variant="bordered"
          label="Mobile Number"
          // className="max-w-md"
          // endContent={}
          onChange={(e) =>
            updateDetails({
              mobileNumber: e.target.value,
            })
          }
        />
        <Input
          isRequired
          type="email"
          variant="bordered"
          label="Email"
          // className="max-w-md"
          // endContent={}
          onChange={(e) =>
            updateDetails({
              email: e.target.value,
            })
          }
        />
      </div>
    </>
  );
};

export default Step2;
