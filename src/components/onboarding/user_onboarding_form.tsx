"use client";

// import { isValidNRCNo, notify, isValidZambianMobileNumber } from "@/lib/utils";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

import Spinner from "../Spinner";
import useCustomTabsHook from "@/hooks/useCustomTabsHook";
import CompletionBar from "../completion_bar";
import { Button } from "@nextui-org/react";
import Step0 from "./Step0";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { notify } from "@/lib/utils";
import { APIResponse } from "@/lib/types";
import Step4 from "./step4";
import { createNewUser } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";

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
  userType?: string;
  addressLine1?: string;
  city?: string;
  area?: string;
  street?: string;
  province?: string;
  country?: string;
  addressDescrition?: string;
  rentalType?: string;
  requiredService?: string;
  feedback?: string;
  [x: string]: any;
};

export type OnboardingFormProps = Partial<FormData> & {
  updateDetails: (data: Partial<FormData>) => void;
};

export default function UserOnboardingForm() {
  const [userDetails, setUserDetails] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    nrcNumber: "",
    email: "",
    feedback: "",

    //
    addressLine1: "",
    street: "",
    rentalType: "",
    city: "",
    province: "",
    country: "",
    requiredService: "", // TO BE USED FOR WHAT
  });

  const [isCompletedRegistration, setIsCompletedRegistration] = useState(false);

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
    <Step0 key={"step-0"} {...userDetails} updateDetails={updateDetails} />, // USER TYPE
    <Step1 key={"step-1"} {...userDetails} updateDetails={updateDetails} />, // PERSONAL & CONTACT INFO
    <Step2 key={"step-2"} {...userDetails} updateDetails={updateDetails} />,
    <Step3 key={"step-3"} {...userDetails} updateDetails={updateDetails} />,
    <Step4 key={"step-4"} {...userDetails} updateDetails={updateDetails} />,
  ]);

  function updateDetails(newDetails: Partial<FormData>) {
    setUserDetails((prev) => ({
      ...prev,
      ...newDetails,
    }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    // SAVE USER INFO
    // if (currentTabIndex == 1) {
    //   const { firstName, lastName, email, mobileNumber, gender, userType } =
    //     userDetails;
    //   // VALIDATIONS
    //   if (
    //     !email ||
    //     !firstName ||
    //     !lastName ||
    //     !mobileNumber ||
    //     !gender ||
    //     !userType
    //   ) {
    //     notify("error", "Missing Required Fields");
    //     return;
    //   }

    //   const response: APIResponse = await createNewUser({
    //     firstName,
    //     lastName,
    //     email,
    //     mobileNumber,
    //     gender,
    //     userType,
    //   });

    //   if (response?.success) {
    //     setUserDetails((prev) => ({ ...prev, ...response.data, userId: response.data.id }));
    //     navigateForward();
    //     return;
    //   }

    //   notify("error", "Error occuredd while saving, Try again!");
    //   return;
    // }

    // if (currentTabIndex == 2) {
    //   const { plotNo, street, rentalType, city,area, province, details,propertyType } =
    //     userDetails;
    //   // VALIDATIONS
    //   if (
    //     !plotNo ||
    //     !street ||
    //     !area ||
    //     !city ||
    //     !rentalType ||
    //     !propertyType ||
    //     !province
    //   ) {
    //     notify("error", "Missing Required Fields");
    //   }

    //   const response: APIResponse = await addNewPropertyAddress({
    //     plotNo, street, rentalType, city,area, province, details,propertyType
    //   });

    //   if (response?.success) {
    //       setUserDetails((prev) => ({ ...prev, ...response.data, propertyAddressId: response.data.id }));
    //     navigateForward();
    //     return;
    //   }
    //     notify("error", "Error occured while adding property address");
    // }

    if (currentTabIndex == 3) {
      const { universities } = userDetails;

      if (!universities || universities?.length == 0) {
        notify("error", "Please select at least one university");
        return;
      }
    }

    navigateForward();
  }

  console.log(userDetails);

  return (
    <>
      <div className="flex flex-col w-full lg:z-20">
        <CompletionBar
          totalSteps={tabs.length}
          currentStep={currentTabIndex + 1}
        />
        <div className="flex-col flex items-start p-8 pb-4 gap-2 relative md:fixed top-14 md:top-0 md:left-[35%] right-0 z-30 lg:z-30 md:bg-white">
          <h3 className="text-sky-950 text-[clamp(20px,1rem+1vw,1.75rem)] font-bold">
            Your Trusted Real Estate Partner
          </h3>
          <p className="text-sm">
            At Karibu, we prioritize your privacy. Your information helps us
            improve your experience, and we keep it secure.
          </p>
        </div>
      </div>
      {isLastTab && isCompletedRegistration ? (
        <CompletedRegisgrationPrompt />
      ) : (
        <form
          id="OnboardingForm"
          onSubmit={onSubmit}
          className="max-w-[412px] md:max-w-[560px] w-full flex flex-col gap-4 relative my-20 md:mt-40 mx-auto z-0 px-5"
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
      )}
    </>
  );
}

export function CompletedRegisgrationPrompt() {
  return (
    <>
      <div className="absolute flex flex-col w-full top-32 justify-center aspect-square ">
        <Confetti />
      </div>
      <motion.div
        whileInView={{
          opacity: [0, 1],
          scaleX: [0.8, 1],
          transition: {
            type: "spring",
            stiffness: 300,
            ease: "easeInOut",
            duration: 0.25,
          },
        }}
        className="max-w-[412px] md:max-w-[560px] w-full flex flex-col gap-4 relative my-20 md:mt-40 mt-56 z-0 px-5 items-center justify-center"

        // className="mx-auto mb-8 rounded-md max-w-md aspect-square bg-gradient-to-br   flex w-full bg-red-500 flex-col items-center justify-center gap-8 text-center p-5"
      >
        <span className="font-semibold p-1 px-4 border border-primary/20 text-primary rounded-full">
          Submitted Successfully!
        </span>
        <span className="text-primary leading-6 text-sm font-medium text-center max-w-md">
          All required documents and information has been submitted. The bank
          will contact you with further instructions to complete your account
          opening process.
        </span>
        <div className="object-contain max-w-sm">
          <Image
            className=""
            src={`/images/done.svg`}
            alt="Complete Application Illustration"
            unoptimized
            width={300}
            height={300}
          />
        </div>
        <Link href={"/"} className={"flex-1 w-full mt-10 mx-auto"}>
          <Button className={"w-full"}>Go Home</Button>
        </Link>
      </motion.div>
    </>
  );
}
