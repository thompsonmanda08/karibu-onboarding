type APIResponse = {
  success: boolean;
  message: string;
  data: any;
  status: number;
};

type LoginDetails = {
  email?: FormDataEntryValue | string | undefined | null;
  password?: FormDataEntryValue | string | undefined | null;
  username?: FormDataEntryValue | string | undefined | null;
  mobile?: FormDataEntryValue | string | undefined | null;
  role?: FormDataEntryValue | string | undefined | null;
};

type SignupDetails = LoginDetails & {
  confirmPassword?: FormDataEntryValue | string | undefined | null;
  firstName?: FormDataEntryValue | string | undefined | null;
  lastName?: FormDataEntryValue | string | undefined | null;
  role?: FormDataEntryValue | string | undefined | null;
};

type ListingsProps = {
  name: string;
  price: number;
  perPeriodUnit: string; // respective to price
  image: string;
  fullAddress: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  listingId: string;
  listingUrl?: string;
  listingType: string;
  listingStatus?: string;
  listingStatusColor?: string;
  listingStatusText?: string;
  listingStatusIcon?: string;
  listingStatusIconColor?: string;
  isPopular?: boolean;
  isLandScapeCard?: boolean;
};

export type { ListingsProps, LoginDetails, SignupDetails, APIResponse };
