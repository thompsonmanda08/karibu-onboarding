"use client";

// import { isValidNRCNo, notify, isValidZambianMobileNumber } from "@/lib/utils";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Spinner from "../Spinner";
import useCustomTabsHook from "@/hooks/useCustomTabsHook";
import CompletionBar from "../completion_bar";
import { Button } from "@nextui-org/react";
import Step1 from "./step1";
import Step0 from "./Step0";
import Step2 from "./step2";
import Step3 from "./step3";

const ONBOARDING_STEPS = [
  "Wallet/Mobile Number",
  "OTP Verification",
  "Personal Information",
  "ID Information",
  "Financial Information",
];

export type FormData = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  mobileNumber?: string;
  nrcNumber?: string;
  user_type?: string;
  addressLine?: string;
  city?: string;
  area?: string;
  street?: string;
  addressDescrition?: string;
};

export type OnboardingFormProps = Partial<FormData> & {
  updateDetails: (data: Partial<FormData>) => void;
};

export default function UserOnboardingForm() {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    nrcNumber: "",
    email: "",
  });

  const {
    tabs,
    currentTabIndex,
    firstTab,
    lastTab,
    activeTab,
    isLastTab,
    isFirstTab,
    navigateBackwards,
    navigateForward,
    isLoading,
  } = useCustomTabsHook([
    <Step0 key={"step-0"} {...userDetails} updateDetails={updateDetails} />,
    <Step1 key={"step-1"} {...userDetails} updateDetails={updateDetails} />,
    <Step2 key={"step-2"} {...userDetails} updateDetails={updateDetails} />,
    <Step3 key={"step-3"} {...userDetails} updateDetails={updateDetails} />,
  ]);

  function updateDetails(newDetails: Partial<FormData>) {
    setUserDetails((prev) => ({
      ...prev,
      ...newDetails,
    }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    navigateForward();
  }

  return (
    <>
      <div className="flex flex-col w-full lg:z-20">
        <CompletionBar
          totalSteps={tabs.length}
          currentStep={currentTabIndex + 1}
        />
        <div className="flex-col flex items-start p-8 pb-4 gap-2 fixed top-20 md:top-0 md:left-[35%] right-0 z-30 lg:z-40 bg-white">
          <h3 className="text-sky-950 text-[clamp(20px,1rem+1vw,1.75rem)] font-bold">
            Your Trusted Real Estate Partner
          </h3>
          <p className="text-sm">
            At Karibu, we prioritize your privacy. Your information helps us
            improve your experience, and we keep it secure.
          </p>
        </div>
      </div>
      <form
        id="OnboardingForm"
        onSubmit={onSubmit}
        className="max-w-2xl w-full flex flex-col gap-4 relative my-20 md:mt-40 mt-56 z-"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTabIndex} // Ensure a unique key for each step
            initial={{ opacity: 0, y: -100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                ease: "easeInOut",
                duration: 0.25,
              },
            }}
            exit={{ opacity: 0, y: 100 }}
            // transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center my-10">
                <Spinner size={60} />
              </div>
            ) : (
              <div className="flex gap-4 flex-col px-5 md:px-2">
                {activeTab}
              </div>
            )}
            <div className="flex gap-4 px-2 mt-12">
              {!isFirstTab && (
                <Button
                  color="primary"
                  size="lg"
                  className="flex-1 w-full"
                  variant="bordered"
                  type="button"
                  onClick={navigateBackwards}
                >
                  Back
                </Button>
              )}
              <Button
                size="lg"
                className="flex-1 w-full "
                disabled={isLoading}
                type="submit"
                color="primary"
              >
                {isLastTab ? "Submit" : "Next"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </form>
    </>
  );
}
