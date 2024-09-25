import { OnboardingFormProps } from "./user_onboarding_form";
import CardHeader from "../CardHeader";
import Universities from "./university_list";

const Step3 = ({
  updateDetails,
  userType,
  universities,
}: OnboardingFormProps) => {
  // update email in parent component when user enters new email
  // TODO:
  return (
    <>
      <CardHeader
        title="University or College Information"
        infoText={
          userType == "LANDLOARD"
            ? "Add a University that is closer to the property you are renting out. You are free to add more than one"
            : "Select the university you are going to attend or the ones you need to be in close proximity to"
        }
      />

      <Universities
        selectedUniversities={universities}
        updateUserDetails={updateDetails}
      />
    </>
  );
};

export default Step3;
