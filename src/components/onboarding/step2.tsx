"use client";

import { Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { OnboardingFormProps } from "./user_onboarding_form";
import CardHeader from "../CardHeader";

const Step2 = ({
  addressLine1,
  street,
  rentalType,
  city,
  province,
  country,
  area,
  updateDetails,
}: OnboardingFormProps) => {
  // update email in parent component when user enters new email
  // TODO:
  return (
    <>
      <CardHeader title="Property Information" />

      <div className="flex flex-col gap-4">
        {/* <Input
          isRequired
          type="text"
          variant="bordered"
          label="Property Location (Address)"
          value={addressLine1}
          onChange={(e) => updateDetails({ addressLine1: e.target.value })}
        /> */}
        <Input
          type="text"
          variant="bordered"
          isRequired
          label="House No."
          onChange={(e) => updateDetails({ plotNo: e.target.value })}
        />
        <Input
          type="text"
          variant="bordered"
          isRequired
          label="Street/Road"
          value={street}
          onChange={(e) => updateDetails({ street: e.target.value })}
        />
        <div className="flex gap-4 flex-col md:flex-row">
          <Input
            type="text"
            variant="bordered"
            isRequired
            value={area}
            label="Area/Neighborhood"
            onChange={(e) => updateDetails({ area: e.target.value })}
          />
          <Input
            type="text"
            variant="bordered"
            isRequired
            label="City"
            value={city}
            onChange={(e) => updateDetails({ city: e.target.value })}
          />
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <Input
            type="text"
            variant="bordered"
            isRequired
            label="Province"
            value={province}
            onChange={(e) => updateDetails({ province: e.target.value })}
          />
          <Input
            type="text"
            variant="bordered"
            isRequired
            label="Country"
            isDisabled
            value={"Zambia"}
            onChange={(e) => updateDetails({ country: e.target.value })}
          />
        </div>
        <RadioGroup
          label="Property Listing type"
          orientation="horizontal"
          className=""
          classNames={{
            wrapper: "grid grid-cols-1 md:grid-cols-2 gap-4",
          }}
          value={rentalType}
          onChange={(e: any) =>
            updateDetails({
              rentalType: e.target.value,
            })
          }
        >
          <Radio value="FIXED_PRICE">Fixed Price Room/Bed space</Radio>
          <Radio value="VARIABLE_PRICE">Varibale Price Rooms/Bed space</Radio>
          <Radio value="RENTAL">House for rent</Radio>
          <Radio value="SALE">House for sale</Radio>
        </RadioGroup>
        <Textarea
          label="Property description"
          variant="bordered"
          placeholder="Include details on whether is is a bedspace, a whole room or full house for rent or sale."
          onChange={(e) => updateDetails({ feedback: e.target.value })}
        />
      </div>
    </>
  );
};

export default Step2;
