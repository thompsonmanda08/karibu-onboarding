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
        <RadioGroup
          label="Property Type"
          orientation="horizontal"
          classNames={{
            wrapper:
              "flex flex-col flex-wrap justify-between md:flex-row gap-4",
          }}
          value={rentalType}
          onChange={(e: any) =>
            updateDetails({
              propertyType: e.target.value,
            })
          }
        >
          <Radio value="BED_SITTER">Bed Sitter</Radio>
          <Radio value="BOARDING_HOUSE">Boarding House</Radio>
          <Radio value="SERVANTS_QUARTERS">Quarters</Radio>
          <Radio value="HOUSE">Full House</Radio>
        </RadioGroup>
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
          label="Listing Pricing"
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
          <Radio value="FULL_RENTAL">For rent</Radio>
          <Radio value="FOR_SALE">For sale</Radio>
        </RadioGroup>
        <Textarea
          label="Property description"
          variant="bordered"
          placeholder="Include details on whether is is a bedspace, a whole room or full house for rent or sale."
          onChange={(e) => updateDetails({ details: e.target.value })}
        />
      </div>
    </>
  );
};

export default Step2;
