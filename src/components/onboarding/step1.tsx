"use client";

import { Input, Radio, RadioGroup } from "@nextui-org/react";
import { OnboardingFormProps } from "./user_onboarding_form";
import CardHeader from "../CardHeader";

const Step1 = ({
  gender,
  email,
  firstName,
  lastName,
  updateDetails,
}: OnboardingFormProps) => {
  // update email in parent component when user enters new email
  // TODO:
  return (
    <>
      <CardHeader title="Personal & Contact Information" />
      <div className="flex gap-2">
        <Input
          isRequired
          type="text"
          variant="bordered"
          label="First Name"
          value={firstName}
          onChange={(e) =>
            updateDetails({
              firstName: e.target.value,
            })
          }
        />

        <Input
          isRequired
          type="text"
          variant="bordered"
          label="Last Name"
          value={lastName}
          onChange={(e) =>
            updateDetails({
              lastName: e.target.value,
            })
          }
        />
      </div>
      <RadioGroup
        label="Gender"
        orientation="horizontal"
        value={gender}
        onChange={(e: any) =>
          updateDetails({
            gender: e.target.value,
          })
        }
      >
        <Radio value="MALE">Male</Radio>
        <Radio value="FEMALE">Female</Radio>
      </RadioGroup>
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

export default Step1;
