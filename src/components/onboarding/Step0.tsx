//BUSINESS REGISTRATION STATUS
"use client";
import React, { useEffect } from "react";
import { RadioGroup } from "@nextui-org/react";
import { motion } from "framer-motion";
import CustomRadioButton from "../ui/RadioButton";
import { FormData, OnboardingFormProps } from "./user_onboarding_form";

export default function Step0({ updateDetails }: OnboardingFormProps) {
  useEffect(() => {
    // Set Default  Registration STAGE
    updateDetails({
      user_type: "LANDLORD",
    });
  }, []);
  return (
    <div className="max-w-">
      <RadioGroup
        label="What best describes you?"
        className="flex w-full"
        description="We would like to know more about you as we tailor your experience to your needs"
        defaultValue={"LANDLORD"}
        onChange={(e) =>
          updateDetails({
            user_type: e.target.value,
          })
        }
      >
        <div className="mt-2 flex flex-col items-center gap-5 sm:flex-row">
          <CustomRadioButton
            description="You have a house or bed space you need to rent out"
            value="LANDLORD"
          >
            <p className="mb-1 font-semibold">Property Owner / Landlord</p>
          </CustomRadioButton>

          <CustomRadioButton
            description="Looking for bedspace or a house for rent"
            value="STUDENT"
            disabled={true}
          >
            <p className="mb-1 font-semibold">Tentant / Student</p>
          </CustomRadioButton>
        </div>
      </RadioGroup>
    </div>
  );
}
